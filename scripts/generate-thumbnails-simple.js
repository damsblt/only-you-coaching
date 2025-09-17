#!/usr/bin/env node

/**
 * 🎥 Simple Thumbnail Generation for Only You Coaching
 * 
 * This script generates thumbnails using a web-based approach
 * that doesn't require ffmpeg to be installed locally.
 * 
 * It creates placeholder thumbnails and uploads them to S3,
 * then updates the database with the thumbnail URLs.
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

const { S3Client, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const sharp = require('sharp');

// Configuration
const config = {
  region: process.env.AWS_REGION || 'eu-north-1',
  bucket: process.env.AWS_S3_BUCKET_NAME || 'only-you-coaching',
  accessPointAlias: process.env.AWS_S3_ACCESS_POINT_ALIAS || 's3-access-56ig858wntepzkh8ssrxmmjor4psgeun1a-s3alias',
  thumbnailWidth: 320,
  thumbnailHeight: 180,
  jpegQuality: 85
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
 * Create a placeholder thumbnail SVG
 */
function createPlaceholderThumbnailSvg(videoName, category = '') {
  const svg = `
<svg width="${config.thumbnailWidth}" height="${config.thumbnailHeight}" xmlns="http://www.w3.org/2000/svg">
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
    ${videoName.length > 20 ? videoName.substring(0, 20) + '...' : videoName}
  </text>
  ${category ? `<text x="160" y="145" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" opacity="0.8">${category}</text>` : ''}
</svg>`;
  
  return Buffer.from(svg);
}

/**
 * Create JPG placeholder by rendering SVG via sharp
 */
async function createPlaceholderThumbnailJpg(videoName, category = '') {
  const svgBuffer = createPlaceholderThumbnailSvg(videoName, category);
  const jpgBuffer = await sharp(svgBuffer)
    .jpeg({ quality: config.jpegQuality })
    .toBuffer();
  return jpgBuffer;
}

/**
 * Get all video files from S3
 */
async function getAllVideos() {
  console.log('🔍 Scanning S3 for video files...');
  
  const videos = [];
  let continuationToken;
  
  do {
    const command = new ListObjectsV2Command({
      Bucket: config.bucket,
      Prefix: 'Video/',
      ContinuationToken: continuationToken,
    });
    
    const response = await s3Client.send(command);
    
    if (response.Contents) {
      const videoFiles = response.Contents.filter(obj => 
        obj.Key.endsWith('.mp4') && 
        !obj.Key.includes('thumbnail') &&
        !obj.Key.includes('temp')
      );
      
      videos.push(...videoFiles);
    }
    
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);
  
  console.log(`📹 Found ${videos.length} video files`);
  return videos;
}

/**
 * Generate and upload thumbnail for a video
 */
async function generateThumbnail(videoKey) {
  try {
    const videoName = path.basename(videoKey, '.mp4');
    const category = videoKey.includes('groupes-musculaires') ? 'Muscle Groups' : 
                    videoKey.includes('programmes-predefinis') ? 'Predefined Programs' : '';
    
    // Create placeholder thumbnail (JPG)
    const thumbnailBuffer = await createPlaceholderThumbnailJpg(videoName, category);
    const thumbnailKey = `thumbnails/${videoName}-thumb.jpg`;
    
    console.log(`🎬 Creating thumbnail for: ${videoName}`);
    
    // Upload thumbnail to S3
    const command = new PutObjectCommand({
      Bucket: config.bucket,
      Key: thumbnailKey,
      Body: thumbnailBuffer,
      ContentType: 'image/jpeg',
      // Keep metadata ASCII-only to avoid S3 header errors with accents
      Metadata: {
        'generated-by': 'thumbnail-automation-simple',
        'generated-at': new Date().toISOString()
      }
    });
    
    await s3Client.send(command);
    console.log(`☁️  Uploaded thumbnail: ${thumbnailKey}`);
    
    const thumbnailUrl = `https://${config.accessPointAlias}.s3.${config.region}.amazonaws.com/${thumbnailKey}`;
    
    // Update database
    await updateDatabaseThumbnail(videoName, thumbnailUrl, videoKey);
    
    return { success: true, video: videoKey, thumbnailUrl };
  } catch (error) {
    console.error(`❌ Error processing ${videoKey}:`, error.message);
    return { success: false, video: videoKey, error: error.message };
  }
}

/**
 * Update database with thumbnail URL
 */
async function updateDatabaseThumbnail(videoName, thumbnailUrl, originalVideoKey) {
  try {
    // Find video in database by name or S3 key
    const filename = path.basename(originalVideoKey); // e.g., "xx.mp4"
    const video = await prisma.video.findFirst({
      where: {
        OR: [
          { title: { contains: videoName } },
          { videoUrl: { contains: filename } },
          { videoUrl: { contains: videoName } }
        ]
      }
    });
    
    if (video) {
      await prisma.video.update({
        where: { id: video.id },
        data: {
          thumbnail: thumbnailUrl,
          updatedAt: new Date()
        }
      });
      console.log(`💾 Updated database for video: ${videoName}`);
    } else {
      console.log(`⚠️  Video not found in database: ${videoName}`);
    }
  } catch (error) {
    console.error(`❌ Error updating database for ${videoName}:`, error.message);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting Simple Thumbnail Generation');
  console.log('=======================================\n');
  
  try {
    // Get all videos
    const videos = await getAllVideos();
    
    if (videos.length === 0) {
      console.log('ℹ️  No videos found in S3');
      return;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process videos in batches
    const batchSize = 10;
    for (let i = 0; i < videos.length; i += batchSize) {
      const batch = videos.slice(i, i + batchSize);
      
      console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(videos.length / batchSize)}`);
      console.log(`Videos ${i + 1}-${Math.min(i + batchSize, videos.length)} of ${videos.length}`);
      
      const batchPromises = batch.map(video => generateThumbnail(video.Key));
      const results = await Promise.allSettled(batchPromises);
      
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value.success) {
          successCount++;
        } else {
          errorCount++;
        }
      });
      
      // Small delay between batches
      if (i + batchSize < videos.length) {
        console.log('⏳ Waiting 1 second before next batch...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Summary
    console.log('\n📊 Summary');
    console.log('==========');
    console.log(`✅ Successfully processed: ${successCount} videos`);
    console.log(`❌ Errors: ${errorCount} videos`);
    console.log(`📈 Success rate: ${((successCount / videos.length) * 100).toFixed(1)}%`);
    
    if (successCount > 0) {
      console.log('\n🎉 Thumbnail generation complete!');
      console.log('You can now view the thumbnails in your S3 bucket under the "thumbnails/" folder.');
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, generateThumbnail };
