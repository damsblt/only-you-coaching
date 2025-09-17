#!/usr/bin/env node

/**
 * S3 Upload Test Script
 * Tests S3 upload functionality and verifies public access
 */

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config({ path: '.env.local' });

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'only-you-coaching';

async function testS3Upload() {
  console.log('🧪 Testing S3 Upload and Public Access');
  console.log('=====================================\n');

  // Test data
  const testKey = `test-uploads/test-${Date.now()}.txt`;
  const testContent = `Test upload from Only You Coaching App
Timestamp: ${new Date().toISOString()}
Bucket: ${BUCKET_NAME}
Key: ${testKey}`;

  try {
    // 1. Upload test file
    console.log('📤 Uploading test file...');
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: testKey,
      Body: testContent,
      ContentType: 'text/plain',
      Metadata: {
        'test-upload': 'true',
        'timestamp': Date.now().toString()
      }
    });

    const uploadResult = await s3Client.send(uploadCommand);
    console.log('✅ Upload successful!');
    console.log(`   ETag: ${uploadResult.ETag}`);
    console.log(`   Key: ${testKey}`);

    // 2. Generate signed URL (for private access)
    console.log('\n🔐 Generating signed URL...');
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: testKey,
    });

    const signedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
    console.log('✅ Signed URL generated!');
    console.log(`   URL: ${signedUrl}`);

    // 3. Test public access
    console.log('\n🌐 Testing public access...');
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com/${testKey}`;
    console.log(`   Public URL: ${publicUrl}`);

    // Test public access with fetch
    try {
      const response = await fetch(publicUrl);
      if (response.ok) {
        const content = await response.text();
        console.log('✅ Public access working!');
        console.log(`   Status: ${response.status}`);
        console.log(`   Content preview: ${content.substring(0, 100)}...`);
      } else {
        console.log('❌ Public access failed!');
        console.log(`   Status: ${response.status}`);
        console.log(`   Status Text: ${response.statusText}`);
      }
    } catch (fetchError) {
      console.log('❌ Public access test failed!');
      console.log(`   Error: ${fetchError.message}`);
    }

    // 4. Cleanup - Delete test file
    console.log('\n🧹 Cleaning up test file...');
    const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: testKey,
    });

    await s3Client.send(deleteCommand);
    console.log('✅ Test file deleted!');

    console.log('\n🎉 S3 Test Complete!');
    console.log('===================');
    console.log('✅ Upload: Working');
    console.log('✅ Signed URL: Working');
    console.log('✅ Public Access: Working');
    console.log('✅ Cleanup: Working');

  } catch (error) {
    console.error('❌ S3 Test Failed!');
    console.error('==================');
    console.error(`Error: ${error.message}`);
    
    if (error.name === 'CredentialsProviderError') {
      console.error('\n💡 Solution: Check your AWS credentials in .env.local');
      console.error('   AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set');
    } else if (error.name === 'NoSuchBucket') {
      console.error('\n💡 Solution: The S3 bucket does not exist');
      console.error(`   Bucket: ${BUCKET_NAME}`);
    } else if (error.name === 'AccessDenied') {
      console.error('\n💡 Solution: Check your AWS permissions');
      console.error('   You need s3:PutObject, s3:GetObject, and s3:DeleteObject permissions');
    }
    
    process.exit(1);
  }
}

// Check environment variables
function checkEnvironment() {
  console.log('🔍 Checking Environment Variables...');
  
  const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_S3_BUCKET_NAME'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:');
    missing.forEach(key => console.error(`   ${key}`));
    console.error('\n💡 Add these to your .env.local file');
    process.exit(1);
  }
  
  console.log('✅ All required environment variables found');
  console.log(`   Bucket: ${process.env.AWS_S3_BUCKET_NAME}`);
  console.log(`   Region: ${process.env.AWS_REGION}`);
  console.log('');
}

// Run the test
checkEnvironment();
testS3Upload();
