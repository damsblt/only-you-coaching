#!/usr/bin/env node

/**
 * 🧪 Test Thumbnail Setup
 * 
 * This script tests the thumbnail generation system
 * by creating a single test thumbnail.
 */

const path = require('path');
// Load environment variables from .env.local (preferred) or .env
try {
  const dotenv = require('dotenv');
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  const envPath = path.join(__dirname, '..', '.env');
  const loaded = dotenv.config({ path: envLocalPath });
  if (loaded.error) {
    dotenv.config({ path: envPath });
  }
} catch (_) {}

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { PrismaClient } = require('@prisma/client');

// Configuration
const config = {
  region: process.env.AWS_REGION || 'eu-north-1',
  bucket: process.env.AWS_S3_BUCKET_NAME || 'only-you-coaching',
  accessPointAlias: process.env.AWS_S3_ACCESS_POINT_ALIAS || 's3-access-56ig858wntepzkh8ssrxmmjor4psgeun1a-s3alias',
};

// Initialize clients
const s3Client = new S3Client({
  region: config.region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const prisma = new PrismaClient();

/**
 * Create a test thumbnail
 */
function createTestThumbnail() {
  const svg = `
<svg width="320" height="180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad1)"/>
  <rect x="10" y="10" width="300" height="160" fill="none" stroke="white" stroke-width="2" rx="8"/>
  <circle cx="160" cy="90" r="25" fill="white" opacity="0.9"/>
  <polygon points="150,80 150,100 170,90" fill="#667eea"/>
  <text x="160" y="130" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
    Test Thumbnail
  </text>
  <text x="160" y="145" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" opacity="0.8">
    Setup Test
  </text>
</svg>`;
  
  return Buffer.from(svg);
}

/**
 * Test S3 connection and upload
 */
async function testS3Connection() {
  try {
    console.log('🔍 Testing S3 connection...');
    
    const testThumbnail = createTestThumbnail();
    const testKey = 'thumbnails/test-thumbnail.svg';
    
    const command = new PutObjectCommand({
      Bucket: config.bucket,
      Key: testKey,
      Body: testThumbnail,
      ContentType: 'image/svg+xml',
      Metadata: {
        'test': 'true',
        'generated-at': new Date().toISOString()
      }
    });
    
    await s3Client.send(command);
    console.log('✅ S3 connection successful');
    console.log(`📁 Test thumbnail uploaded: ${testKey}`);
    
    return true;
  } catch (error) {
    console.error('❌ S3 connection failed:', error.message);
    return false;
  }
}

/**
 * Test database connection
 */
async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    const videoCount = await prisma.video.count();
    console.log(`✅ Database connection successful`);
    console.log(`📊 Found ${videoCount} videos in database`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

/**
 * Main test function
 */
async function main() {
  console.log('🧪 Thumbnail Setup Test');
  console.log('======================\n');
  
  const s3Success = await testS3Connection();
  const dbSuccess = await testDatabaseConnection();
  
  console.log('\n📊 Test Results:');
  console.log('================');
  console.log(`S3 Connection: ${s3Success ? '✅' : '❌'}`);
  console.log(`Database Connection: ${dbSuccess ? '✅' : '❌'}`);
  
  if (s3Success && dbSuccess) {
    console.log('\n🎉 All tests passed! You can now run: npm run thumbnails');
  } else {
    console.log('\n⚠️  Some tests failed. Please check your configuration.');
  }
  
  await prisma.$disconnect();
}

// Run the test
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, testS3Connection, testDatabaseConnection };
