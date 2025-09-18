#!/usr/bin/env node

/**
 * AWS Lambda: S3 -> Thumbnail -> Supabase
 * - Trigger: S3 ObjectCreated:Put on mp4 files under prefix Video/
 * - Action: download video to /tmp, capture mid-frame JPG, upload to S3 /thumbnails,
 *           insert a row into Supabase (videos table) using service_role key.
 *
 * Requirements in Lambda environment:
 * - ffmpeg and ffprobe binaries available (use a Lambda layer providing static ffmpeg)
 * - Environment variables set (see below)
 *
 * Env vars:
 *   AWS_REGION
 *   S3_BUCKET_NAME
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const crypto = require('crypto');

const REGION = process.env.AWS_REGION || 'eu-north-1';
const BUCKET = process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME || 'only-you-coaching';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const s3 = new S3Client({ region: REGION });
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function isVideoKeyEligible(key) {
  if (!key) return false;
  if (!key.startsWith('Video/')) return false;
  if (!key.toLowerCase().endsWith('.mp4')) return false;
  if (key.includes('/thumbnails/')) return false;
  return true;
}

async function streamToFile(readable, outPath) {
  await new Promise((resolve, reject) => {
    const write = fs.createWriteStream(outPath);
    readable.pipe(write);
    readable.on('error', reject);
    write.on('error', reject);
    write.on('finish', resolve);
  });
  return outPath;
}

function ffprobeDurationSeconds(filePath) {
  return new Promise((resolve) => {
    const proc = spawn('ffprobe', ['-i', filePath]);
    let stderr = '';
    proc.stderr.on('data', (d) => (stderr += d.toString()));
    proc.on('close', () => {
      const match = stderr.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
      if (!match) return resolve(0);
      const h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const s = parseFloat(match[3]);
      resolve(h * 3600 + m * 60 + s);
    });
    proc.on('error', () => resolve(0));
  });
}

async function captureMidFrame(videoPath, outPath) {
  const dur = await ffprobeDurationSeconds(videoPath);
  const ts = Math.max(1, Math.floor(dur / 2));
  const args = ['-ss', String(ts), '-i', videoPath, '-frames:v', '1', '-q:v', '2', outPath, '-y'];
  await new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args, { stdio: 'ignore' });
    proc.on('error', reject);
    proc.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('ffmpeg failed'))));
  });
  return { durationSeconds: Math.floor(dur) };
}

function parseCategoryAndRegionFromKey(key) {
  // key: Video/<category-folder>/<region-or-subfolder>/file.mp4
  const parts = key.split('/');
  // parts[0] = 'Video'
  const categoryFolder = parts[1] || '';
  const region = parts[2] || null;
  if (categoryFolder === 'groupes-musculaires') {
    return { category: 'Muscle Groups', region };
  }
  if (categoryFolder === 'programmes-predefinis') {
    return { category: 'Predefined Programs', region };
  }
  return { category: 'General', region };
}

function extractRegionFromFolder(folder) {
  if (!folder) return null;
  
  // Split by '/' and take the last part (region)
  const parts = folder.split('/');
  if (parts.length > 1) {
    return parts[parts.length - 1]; // Last part after the last '/'
  }
  
  // If no '/', return the folder as is
  return folder;
}

function inferTitleFromKey(key) {
  const base = path.basename(key, '.mp4');
  const decoded = decodeURIComponent(base).replace(/\+/g, ' ');
  // Replace dashes/underscores with spaces and collapse multiple spaces
  const spaced = decoded.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  // Lowercase all, then capitalize only the first letter (Unicode-safe)
  const lower = spaced.toLocaleLowerCase('fr-FR');
  const result = lower.replace(/^\p{L}/u, (m) => m.toLocaleUpperCase('fr-FR'));
  return result;
}

function inferVideoTypeFromKey(key) {
  try {
    const parts = (key || '').split('/');
    const categoryFolder = parts[1] || '';
    if (categoryFolder === 'programmes-predefinis' || key.includes('/Video/programmes/')) {
      return 'PROGRAMMES';
    }
    if (categoryFolder === 'groupes-musculaires') {
      return 'MUSCLE_GROUPS';
    }
    return 'MUSCLE_GROUPS';
  } catch (_) {
    return 'MUSCLE_GROUPS';
  }
}

exports.handler = async (event) => {
  // S3 Put event can contain multiple Records
  const records = event?.Records || [];
  const results = [];
  try { console.log('Lambda start', { recordCount: records.length, region: REGION, bucket: BUCKET }); } catch (_) {}

  for (const rec of records) {
    const bucket = rec.s3?.bucket?.name || BUCKET;
    const key = decodeURIComponent(rec.s3?.object?.key || '');

    if (!isVideoKeyEligible(key)) {
      results.push({ key, skipped: true, reason: 'not eligible' });
      continue;
    }

    const tmpVideo = path.join(os.tmpdir(), `${Date.now()}-${path.basename(key)}`);
    const fileName = path.basename(key, '.mp4');
    const thumbKey = `thumbnails/${fileName}-thumb.jpg`;
    const tmpThumb = path.join(os.tmpdir(), `${fileName}-${Date.now()}.jpg`);

    try {
      console.log('STEP 1: GetObject', { bucket, key });
      const get = new GetObjectCommand({ Bucket: bucket, Key: key });
      const obj = await s3.send(get);
      console.log('STEP 1: GetObject success, streaming to', tmpVideo);
      await streamToFile(obj.Body, tmpVideo);

      console.log('STEP 2: ffmpeg captureMidFrame start');
      const { durationSeconds } = await captureMidFrame(tmpVideo, tmpThumb);
      console.log('STEP 2: ffmpeg captureMidFrame done', { durationSeconds, tmpThumb });

      const body = fs.readFileSync(tmpThumb);
      console.log('STEP 3: PutObject thumbnail', { bucket, thumbKey, size: body.length });
      await s3.send(new PutObjectCommand({
        Bucket: bucket,
        Key: thumbKey,
        Body: body,
        ContentType: 'image/jpeg',
        Metadata: { 'generated-by': 'lambda-auto-thumbnail' },
      }));
      console.log('STEP 3: PutObject thumbnail success');

      const videoUrl = `https://${bucket}.s3.${REGION}.amazonaws.com/${key}`;
      const thumbnailUrl = `https://${bucket}.s3.${REGION}.amazonaws.com/${thumbKey}`;

      const { category, region } = parseCategoryAndRegionFromKey(key);
      const title = inferTitleFromKey(key);
      const videoType = inferVideoTypeFromKey(key);
      const folder = path.dirname(key).replace(/^Video\//, '') || null;
      const extractedRegion = extractRegionFromFolder(folder);

      const insertPayload = {
        id: crypto.randomUUID(),
        title,
        thumbnail: thumbnailUrl,
        videoUrl,
        duration: durationSeconds || 120,
        difficulty: 'INTERMEDIATE',
        category,
        region: extractedRegion, // Extract region from folder path
        isPublished: true,
        folder,
        videoType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('STEP 4: Supabase insert start', { title, folder: insertPayload.folder, region: insertPayload.region, videoType });
      const { error } = await supabase.from('videos_new').insert(insertPayload);
      if (error) {
        console.error('STEP 4: Supabase insert error', error);
        throw new Error(`Supabase insert failed: ${error.message}`);
      }
      console.log('STEP 4: Supabase insert success');

      results.push({ key, success: true, thumbnailKey: thumbKey });
    } catch (err) {
      console.error('PROCESS ERROR', { key, message: err?.message, stack: err?.stack });
      results.push({ key, success: false, error: err.message });
    } finally {
      try { fs.unlinkSync(tmpVideo); } catch (_) {}
      try { fs.unlinkSync(tmpThumb); } catch (_) {}
    }
  }

  return { statusCode: 200, body: JSON.stringify({ results }) };
}
