#!/usr/bin/env node

/**
 * 🛠️ Setup Script for Thumbnail Automation
 * 
 * This script helps set up the thumbnail generation system
 * by checking dependencies and providing installation instructions.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🛠️  Thumbnail Automation Setup');
console.log('==============================\n');

// Check if ffmpeg is installed
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    console.log('✅ FFmpeg is installed');
    return true;
  } catch (error) {
    console.log('❌ FFmpeg is not installed');
    return false;
  }
}

// Check environment variables
function checkEnvironment() {
  const requiredVars = [
    'AWS_REGION',
    'AWS_ACCESS_KEY_ID', 
    'AWS_SECRET_ACCESS_KEY',
    'AWS_S3_BUCKET_NAME',
    'AWS_S3_ACCESS_POINT_ALIAS'
  ];
  
  const missing = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length === 0) {
    console.log('✅ All required environment variables are set');
    return true;
  } else {
    console.log('❌ Missing environment variables:');
    missing.forEach(varName => console.log(`   - ${varName}`));
    return false;
  }
}

// Check if .env.local exists
function checkEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    console.log('✅ .env.local file exists');
    return true;
  } else {
    console.log('❌ .env.local file not found');
    return false;
  }
}

// Main setup function
async function setup() {
  console.log('Checking system requirements...\n');
  
  const ffmpegInstalled = checkFFmpeg();
  const envVarsSet = checkEnvironment();
  const envFileExists = checkEnvFile();
  
  console.log('\n📋 Setup Summary:');
  console.log('================');
  console.log(`FFmpeg: ${ffmpegInstalled ? '✅' : '❌'}`);
  console.log(`Environment Variables: ${envVarsSet ? '✅' : '❌'}`);
  console.log(`Environment File: ${envFileExists ? '✅' : '❌'}`);
  
  if (!ffmpegInstalled) {
    console.log('\n🔧 FFmpeg Installation Instructions:');
    console.log('====================================');
    console.log('macOS: brew install ffmpeg');
    console.log('Ubuntu/Debian: sudo apt update && sudo apt install ffmpeg');
    console.log('Windows: Download from https://ffmpeg.org/download.html');
    console.log('Or use: npm install -g @ffmpeg-installer/ffmpeg');
  }
  
  if (!envFileExists) {
    console.log('\n📝 Environment Setup:');
    console.log('====================');
    console.log('Create a .env.local file with:');
    console.log(`
AWS_REGION="eu-north-1"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_S3_BUCKET_NAME="only-you-coaching"
AWS_S3_ACCESS_POINT_ALIAS="s3-access-56ig858wntepzkh8ssrxmmjor4psgeun1a-s3alias"
    `);
  }
  
  if (ffmpegInstalled && envVarsSet) {
    console.log('\n🎉 Setup Complete!');
    console.log('==================');
    console.log('You can now run: npm run generate-thumbnails');
  } else {
    console.log('\n⚠️  Please complete the setup steps above before running the automation.');
  }
}

// Run setup
setup().catch(console.error);

