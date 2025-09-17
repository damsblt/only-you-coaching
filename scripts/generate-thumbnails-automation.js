#!/usr/bin/env node

/**
 * 🎥 Thumbnail Generation Automation for Only You Coaching
 * 
 * This script automatically generates thumbnails for all videos in S3
 * based on the new organized folder structure:
 * - groupes-musculaires/
 * - programmes-predefinis/
 * 
 * Features:
 * - Generates thumbnails at 5-second mark
 * - Creates consistent naming convention
 * - Uploads to S3 thumbnails folder
 * - Updates database with thumbnail URLs
 * - Progress tracking and error handling
 */

const { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Configuration
const config = {
  region: process.env.AWS_REGION || 'eu-north-1',
  bucket: process.env.AWS_S3_BUCKET_NAME || 'only-you-coaching',
  accessPointAlias: process.env.AWS_S3_ACCESS_POINT_ALIAS || 's3-access-56ig858wntepzkh8ssrxmmjor4psgeun1a-s3alias',
  thumbnailTime: 5, // seconds
  thumbnailQuality: 80,
  thumbnailFormat: 'jpg',
  thumbnailWidth: 320,
  thumbnailHeight: 180
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

// Create temp directory for thumbnails
const tempDir = path.join(__dirname, '../temp-thumbnails');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
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
 * Generate thumbnail for a video
 */
async function generateThumbnail(videoKey, videoUrl) {
  return new Promise((resolve, reject) => {
    const videoName = path.basename(videoKey, '.mp4');
    const thumbnailName = `${videoName}-thumb.${config.thumbnailFormat}`;
    const thumbnailPath = path.join(tempDir, thumbnailName);
    
    console.log(`🎬 Generating thumbnail for: ${videoName}`);
    
    ffmpeg(videoUrl)
      .screenshots({
        timestamps: [config.thumbnailTime],
        filename: thumbnailName,
        folder: tempDir,
        size: `${config.thumbnailWidth}x${config.thumbnailHeight}`,
      })
      .on('end', () => {
        console.log(`✅ Thumbnail generated: ${thumbnailName}`);
        resolve({
          localPath: thumbnailPath,
          s3Key: `thumbnails/${videoName}-thumb.${config.thumbnailFormat}`,
          videoName: videoName,
          originalVideoKey: videoKey
        });
      })
      .on('error', (err) => {
        console.error(`❌ Error generating thumbnail for ${videoName}:`, err.message);
        reject(err);
      });
  });
}

/**
 * Upload thumbnail to S3
 */
async function uploadThumbnail(thumbnailData) {
  const { localPath, s3Key } = thumbnailData;
  
  try {
    const fileContent = fs.readFileSync(localPath);
    
    const command = new PutObjectCommand({
      Bucket: config.bucket,
      Key: s3Key,
      Body: fileContent,
      ContentType: `image/${config.thumbnailFormat}`,
      Metadata: {
        'generated-by': 'thumbnail-automation',
        'video-source': thumbnailData.originalVideoKey,
        'generated-at': new Date().toISOString()
      }
    });
    
    await s3Client.send(command);
    console.log(`☁️  Uploaded thumbnail: ${s3Key}`);
    
    // Clean up local file
    fs.unlinkSync(localPath);
    
    return `https://${config.accessPointAlias}.s3.${config.region}.amazonaws.com/${s3Key}`;
  } catch (error) {
    console.error(`❌ Error uploading thumbnail ${s3Key}:`, error.message);
    throw error;
  }
}

/**
 * Update database with thumbnail URL
 */
async function updateDatabaseThumbnail(videoName, thumbnailUrl, originalVideoKey) {
  try {
    // Find video in database by name or S3 key
    const video = await prisma.video.findFirst({
      where: {
        OR: [
          { name: { contains: videoName } },
          { s3Key: originalVideoKey },
          { s3Key: { contains: videoName } }
        ]
      }
    });
    
    if (video) {
      await prisma.video.update({
        where: { id: video.id },
        data: {
          thumbnailUrl: thumbnailUrl,
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
 * Get signed URL for video
 */
async function getVideoSignedUrl(videoKey) {
  const command = new GetObjectCommand({
    Bucket: config.bucket,
    Key: videoKey,
  });
  
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting Thumbnail Generation Automation');
  console.log('==========================================');
  
  try {
    // Get all videos
    const videos = await getAllVideos();
    
    if (videos.length === 0) {
      console.log('ℹ️  No videos found in S3');
      return;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process videos in batches to avoid overwhelming the system
    const batchSize = 5;
    for (let i = 0; i < videos.length; i += batchSize) {
      const batch = videos.slice(i, i + batchSize);
      
      console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(videos.length / batchSize)}`);
      console.log(`Videos ${i + 1}-${Math.min(i + batchSize, videos.length)} of ${videos.length}`);
      
      const batchPromises = batch.map(async (video) => {
        try {
          // Get signed URL for video
          const videoUrl = await getVideoSignedUrl(video.Key);
          
          // Generate thumbnail
          const thumbnailData = await generateThumbnail(video.Key, videoUrl);
          
          // Upload thumbnail to S3
          const thumbnailUrl = await uploadThumbnail(thumbnailData);
          
          // Update database
          await updateDatabaseThumbnail(thumbnailData.videoName, thumbnailUrl, video.Key);
          
          successCount++;
          return { success: true, video: video.Key };
        } catch (error) {
          errorCount++;
          console.error(`❌ Failed to process ${video.Key}:`, error.message);
          return { success: false, video: video.Key, error: error.message };
        }
      });
      
      // Wait for batch to complete
      await Promise.allSettled(batchPromises);
      
      // Small delay between batches
      if (i + batchSize < videos.length) {
        console.log('⏳ Waiting 2 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Cleanup
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    
    // Summary
    console.log('\n📊 Summary');
    console.log('==========');
    console.log(`✅ Successfully processed: ${successCount} videos`);
    console.log(`❌ Errors: ${errorCount} videos`);
    console.log(`📈 Success rate: ${((successCount / videos.length) * 100).toFixed(1)}%`);
    
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

module.exports = { main, generateThumbnail, uploadThumbnail };

