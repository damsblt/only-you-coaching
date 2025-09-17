#!/usr/bin/env node

/**
 * 🎥 Generate JPG thumbnails from actual video frames (midpoint)
 * - Downloads each S3 video to a temp file (streaming)
 * - Uses ffmpeg to capture a frame at 50% duration
 * - Uploads a high-quality JPG to S3 at thumbnails/{videoName}-thumb.jpg
 * - Updates Prisma `video.thumbnail` with the S3 URL
 *
 * Requirements:
 * - ffmpeg installed (brew install ffmpeg)
 * - AWS creds in .env.local
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const { spawn } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Load env from .env.local or .env
try {
  const dotenv = require('dotenv');
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  const envPath = path.join(__dirname, '..', '.env');
  const loaded = dotenv.config({ path: envLocalPath });
  if (loaded.error) dotenv.config({ path: envPath });
} catch (_) {}

const config = {
  region: process.env.AWS_REGION || 'eu-north-1',
  bucket: process.env.AWS_S3_BUCKET_NAME || 'only-you-coaching',
  accessPointAlias: process.env.AWS_S3_ACCESS_POINT_ALIAS || 's3-access-56ig858wntepzkh8ssrxmmjor4psgeun1a-s3alias',
  thumbnailQuality: 85,
  maxParallel: 3,
  batchSize: 10,
};

const prisma = new PrismaClient();
const s3 = new S3Client({
  region: config.region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function ensureFfmpeg() {
  return new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', ['-version']);
    proc.on('error', () => reject(new Error('ffmpeg not found. Install with: brew install ffmpeg')));
    proc.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('ffmpeg not available'))));
  });
}

async function listAllVideos(prefix = 'Video/') {
  const out = [];
  let token;
  do {
    const res = await s3.send(new ListObjectsV2Command({ Bucket: config.bucket, Prefix: prefix, ContinuationToken: token }));
    for (const obj of res.Contents || []) {
      if (obj.Key.endsWith('.mp4')) out.push(obj);
    }
    token = res.NextContinuationToken;
  } while (token);
  return out;
}

async function downloadToTemp(key) {
  const tmpPath = path.join(os.tmpdir(), `${Date.now()}-${path.basename(key)}`);
  const res = await s3.send(new GetObjectCommand({ Bucket: config.bucket, Key: key }));
  await new Promise((resolve, reject) => {
    const write = fs.createWriteStream(tmpPath);
    res.Body.pipe(write);
    res.Body.on('error', reject);
    write.on('finish', resolve);
    write.on('error', reject);
  });
  return tmpPath;
}

function getDurationSeconds(filePath) {
  return new Promise((resolve, reject) => {
    const args = ['-i', filePath];
    const proc = spawn('ffprobe', args);
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
    proc.on('error', reject);
  });
}

async function captureMidFrameJpg(videoPath, outPath) {
  const duration = await getDurationSeconds(videoPath);
  const ts = Math.max(1, Math.floor(duration / 2));
  const args = [
    '-ss', String(ts),
    '-i', videoPath,
    '-frames:v', '1',
    '-q:v', '2', // high quality
    outPath,
    '-y',
  ];
  await new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args, { stdio: 'ignore' });
    proc.on('error', reject);
    proc.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('ffmpeg failed to extract frame'))));
  });
  return outPath;
}

async function uploadJpg(localPath, s3Key) {
  const Body = fs.readFileSync(localPath);
  await s3.send(new PutObjectCommand({
    Bucket: config.bucket,
    Key: s3Key,
    Body,
    ContentType: 'image/jpeg',
    Metadata: { 'generated-by': 'ffmpeg-midframe' },
  }));
  fs.unlinkSync(localPath);
  return `https://${config.accessPointAlias}.s3.${config.region}.amazonaws.com/${s3Key}`;
}

async function processOne(key) {
  const base = path.basename(key, '.mp4');
  const thumbKey = `thumbnails/${base}-thumb.jpg`;

  // Skip if exists
  try {
    await s3.send(new HeadObjectCommand({ Bucket: config.bucket, Key: thumbKey }));
  } catch (_) {
    // not found -> proceed
  }

  const tmpVideo = await downloadToTemp(key);
  const tmpJpg = path.join(os.tmpdir(), `${base}-${Date.now()}.jpg`);
  await captureMidFrameJpg(tmpVideo, tmpJpg);
  try { fs.unlinkSync(tmpVideo); } catch (_) {}
  const url = await uploadJpg(tmpJpg, thumbKey);

  // Update DB thumbnail by matching videoUrl contains filename
  const filename = path.basename(key);
  const video = await prisma.video.findFirst({ where: { videoUrl: { contains: filename } }, select: { id: true } });
  if (video) {
    await prisma.video.update({ where: { id: video.id }, data: { thumbnail: url } });
  }
  return { key, url };
}

async function main() {
  console.log('🎬 Generating thumbnails from video mid-frames');
  await ensureFfmpeg();
  const all = await listAllVideos('Video/');
  console.log(`📹 Found ${all.length} videos`);

  let completed = 0; let failed = 0;
  for (let i = 0; i < all.length; i += config.batchSize) {
    const batch = all.slice(i, i + config.batchSize);
    console.log(`\n📦 Batch ${Math.floor(i / config.batchSize) + 1}/${Math.ceil(all.length / config.batchSize)} (${i + 1}-${i + batch.length})`);
    const results = await Promise.allSettled(batch.map(obj => processOne(obj.Key)));
    for (const r of results) {
      if (r.status === 'fulfilled') { completed++; }
      else { failed++; console.error('❌', r.reason?.message || r.reason); }
    }
  }
  console.log('\n📊 Summary');
  console.log(`✅ Completed: ${completed}`);
  console.log(`❌ Failed: ${failed}`);
  await prisma.$disconnect();
}

if (require.main === module) {
  main().catch(err => { console.error('💥 Fatal', err); process.exit(1); });
}

module.exports = { main };



