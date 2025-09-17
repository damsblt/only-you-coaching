#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

(async () => {
  const key = process.argv[2];
  if (!key) {
    console.error('Usage: node scripts/test-lambda-locally.js "Video/.../file.mp4"');
    process.exit(1);
  }
  const handler = require('../lambda/index.js').handler;
  const event = {
    Records: [
      {
        s3: {
          bucket: { name: process.env.AWS_S3_BUCKET_NAME || 'only-you-coaching' },
          object: { key: key },
        },
      },
    ],
  };
  try {
    const res = await handler(event);
    console.log('Result:', res);
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
})();

