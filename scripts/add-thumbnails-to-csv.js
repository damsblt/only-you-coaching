#!/usr/bin/env node

/**
 * Append a new column "S3 Thumbnail JPG URL" to the Wix export CSV.
 * The value is computed from the S3 Video URL by swapping the path to
 * thumbnails/{base}-thumb.jpg (keeping the same URL-encoded filename).
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { stringify } = require('csv-stringify/sync');

const INPUT = '/Users/damien/Documents/only-you-coaching/Dossier Cliente/Wix CMS/desired_output.csv';
const OUTPUT = '/Users/damien/Documents/only-you-coaching/Dossier Cliente/Wix CMS/desired_output_with_thumbnails.csv';

function computeThumbnailUrlFromVideoUrl(videoUrl) {
  try {
    if (!videoUrl) return '';
    // Expect: https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/.../<encodedName>.mp4
    const url = new URL(videoUrl);
    const parts = url.pathname.split('/');
    const last = parts[parts.length - 1]; // encoded name.mp4
    if (!last.toLowerCase().endsWith('.mp4')) return '';
    const encodedBase = last.slice(0, -4); // drop .mp4
    const thumbName = `${encodedBase}-thumb.jpg`;
    return `${url.protocol}//${url.host}/thumbnails/${thumbName}`;
  } catch (e) {
    return '';
  }
}

async function main() {
  console.log('🔧 Reading CSV and appending JPG thumbnail column...');
  const rows = [];
  // The input CSV appears to be semicolon-separated. We'll parse it manually line-wise to preserve structure.
  const content = fs.readFileSync(INPUT, 'utf8');
  const lines = content.split(/\r?\n/);
  if (lines.length === 0) throw new Error('Empty CSV');

  // Header
  const header = lines[0];
  const delimiter = header.includes(';') ? ';' : ',';
  const newHeader = `${header}${delimiter}S3 Thumbnail JPG URL`;
  const outLines = [newHeader];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    // Find S3 Video URL column (second field per sample)
    // We'll split on the delimiter, but avoid breaking quoted segments.
    const fields = [];
    let current = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (ch === '"') {
        inQuotes = !inQuotes;
        current += ch;
      } else if (ch === delimiter && !inQuotes) {
        fields.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    fields.push(current);

    const s3VideoUrlIdx = 1; // per sample: Title;S3 Video URL;...
    const videoUrl = fields[s3VideoUrlIdx] ? fields[s3VideoUrlIdx].replace(/^\"|\"$/g, '') : '';
    const jpgUrl = computeThumbnailUrlFromVideoUrl(videoUrl);
    outLines.push(`${line}${delimiter}${jpgUrl}`);
  }

  fs.writeFileSync(OUTPUT, outLines.join('\n'));
  console.log(`✅ Wrote: ${OUTPUT}`);
}

if (require.main === module) {
  main().catch((e) => { console.error('❌ Failed:', e.message); process.exit(1); });
}



