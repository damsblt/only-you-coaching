#!/usr/bin/env node

/**
 * 📊 Metadata-Only Migration to Supabase
 * 
 * This script migrates only the video metadata to Supabase
 * while keeping S3 for video storage. Perfect for management interface!
 */

const path = require('path');
const fs = require('fs');

// Load environment variables
try {
  const dotenv = require('dotenv');
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  const envPath = path.join(__dirname, '..', '.env');
  const loaded = dotenv.config({ path: envLocalPath });
  if (loaded.error) {
    dotenv.config({ path: envPath });
  }
} catch (_) {}

// Set Supabase DATABASE_URL
process.env.DATABASE_URL = "postgresql://postgres:tIwji3-gergiv-mihsew@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Migrate video metadata to Supabase
 */
async function migrateMetadata() {
  console.log('📊 Migrating Video Metadata to Supabase');
  console.log('======================================\n');
  
  try {
    // Read exported data
    const exportPath = path.join(__dirname, '..', 'database-export.json');
    const exportData = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
    
    console.log(`📹 Found ${exportData.videos.length} videos to migrate`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process videos in batches
    const batchSize = 20;
    for (let i = 0; i < exportData.videos.length; i += batchSize) {
      const batch = exportData.videos.slice(i, i + batchSize);
      
      console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(exportData.videos.length / batchSize)}`);
      console.log(`Videos ${i + 1}-${Math.min(i + batchSize, exportData.videos.length)} of ${exportData.videos.length}`);
      
      for (const video of batch) {
        try {
          await prisma.video.create({
            data: {
              id: video.id,
              title: video.title,
              description: video.description,
              detailedDescription: video.detailedDescription,
              thumbnail: video.thumbnail, // Keep S3 thumbnail URLs
              videoUrl: video.videoUrl,   // Keep S3 video URLs
              duration: video.duration,
              difficulty: video.difficulty,
              category: video.category,
              region: video.region,
              muscleGroups: video.muscleGroups,
              startingPosition: video.startingPosition,
              movement: video.movement,
              intensity: video.intensity,
              theme: video.theme,
              series: video.series,
              constraints: video.constraints,
              tags: video.tags,
              folder: video.folder,
              isPublished: video.isPublished,
              createdAt: new Date(video.createdAt),
              updatedAt: new Date(video.updatedAt)
            }
          });
          successCount++;
          console.log(`✅ ${video.title}`);
        } catch (error) {
          errorCount++;
          console.log(`❌ ${video.title}: ${error.message}`);
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n📊 Migration Summary:');
    console.log('=====================');
    console.log(`✅ Successfully migrated: ${successCount} videos`);
    console.log(`❌ Errors: ${errorCount} videos`);
    console.log(`📈 Success rate: ${((successCount / exportData.videos.length) * 100).toFixed(1)}%`);
    
    return { successCount, errorCount };
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    throw error;
  }
}

/**
 * Verify the migration
 */
async function verifyMigration() {
  console.log('\n🔍 Verifying Migration...');
  
  try {
    const videoCount = await prisma.video.count();
    const sampleVideos = await prisma.video.findMany({
      take: 3,
      select: {
        title: true,
        thumbnail: true,
        videoUrl: true,
        category: true,
        difficulty: true
      }
    });
    
    console.log(`✅ Found ${videoCount} videos in Supabase`);
    
    console.log('\n📋 Sample Videos:');
    sampleVideos.forEach((video, index) => {
      console.log(`\n${index + 1}. ${video.title}`);
      console.log(`   Category: ${Array.isArray(video.category) ? video.category.join(', ') : video.category}`);
      console.log(`   Difficulty: ${video.difficulty}`);
      console.log(`   Thumbnail: ${video.thumbnail ? '✅ (S3)' : '❌'}`);
      console.log(`   Video URL: ${video.videoUrl ? '✅ (S3)' : '❌'}`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return false;
  }
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting Metadata-Only Migration');
  console.log('===================================\n');
  
  try {
    // Migrate metadata
    const { successCount, errorCount } = await migrateMetadata();
    
    if (successCount > 0) {
      // Verify migration
      const verified = await verifyMigration();
      
      if (verified) {
        console.log('\n🎉 Migration Complete!');
        console.log('=====================');
        console.log('✅ Video metadata migrated to Supabase');
        console.log('✅ S3 videos and thumbnails remain unchanged');
        console.log('✅ Perfect for management interface!');
        
        console.log('\n🔗 Next Steps:');
        console.log('==============');
        console.log('1. View your data: https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp');
        console.log('2. Test connection: npm run test-thumbnails');
        console.log('3. Start your app: npm run dev');
        
        console.log('\n💡 Benefits of this approach:');
        console.log('• Easy data management via Supabase dashboard');
        console.log('• Keep existing S3 setup (no video migration needed)');
        console.log('• Real-time updates for your app');
        console.log('• Cost-effective (metadata is tiny)');
      }
    }
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, migrateMetadata };

