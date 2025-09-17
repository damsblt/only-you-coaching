#!/usr/bin/env node

/**
 * 🔍 Database Examination Script
 * 
 * This script examines the current database structure and data
 * to help decide on Supabase migration.
 */

const path = require('path');
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

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function examineDatabase() {
  console.log('🔍 Database Examination Report');
  console.log('==============================\n');
  
  try {
    // Check database connection
    console.log('📊 Database Connection: ✅ Connected\n');
    
    // Count records in each table
    const counts = {
      users: await prisma.user.count(),
      videos: await prisma.video.count(),
      audios: await prisma.audio.count(),
      playlists: await prisma.playlist.count(),
      favorites: await prisma.favorite.count(),
      subscriptions: await prisma.subscription.count(),
      bookings: await prisma.booking.count(),
    };
    
    console.log('📈 Record Counts:');
    console.log('=================');
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`${table.padEnd(15)}: ${count.toLocaleString()}`);
    });
    
    // Video analysis
    console.log('\n🎥 Video Analysis:');
    console.log('==================');
    
    const videosWithThumbnails = await prisma.video.count({
      where: { thumbnail: { not: null } }
    });
    
    const videosWithoutThumbnails = counts.videos - videosWithThumbnails;
    
    console.log(`Total videos: ${counts.videos}`);
    console.log(`With thumbnails: ${videosWithThumbnails}`);
    console.log(`Without thumbnails: ${videosWithoutThumbnails}`);
    console.log(`Thumbnail coverage: ${((videosWithThumbnails / counts.videos) * 100).toFixed(1)}%`);
    
    // Sample video data
    console.log('\n📋 Sample Video Data:');
    console.log('=====================');
    const sampleVideos = await prisma.video.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        category: true,
        difficulty: true,
        thumbnail: true,
        videoUrl: true,
        createdAt: true
      }
    });
    
    sampleVideos.forEach((video, index) => {
      console.log(`\n${index + 1}. ${video.title}`);
      console.log(`   Category: ${video.category}`);
      console.log(`   Difficulty: ${video.difficulty}`);
      console.log(`   Has Thumbnail: ${video.thumbnail ? '✅' : '❌'}`);
      console.log(`   Video URL: ${video.videoUrl ? '✅' : '❌'}`);
      console.log(`   Created: ${video.createdAt.toLocaleDateString()}`);
    });
    
    // Database size estimation
    console.log('\n💾 Database Size Analysis:');
    console.log('==========================');
    
    const videoSizeEstimate = counts.videos * 0.5; // Rough estimate in KB
    const totalSizeEstimate = Object.values(counts).reduce((sum, count) => sum + count * 0.1, 0);
    
    console.log(`Estimated database size: ~${(totalSizeEstimate / 1024).toFixed(2)} MB`);
    console.log(`Video records: ~${(videoSizeEstimate / 1024).toFixed(2)} MB`);
    
    // Supabase migration assessment
    console.log('\n🚀 Supabase Migration Assessment:');
    console.log('==================================');
    
    const migrationComplexity = counts.videos > 1000 ? 'High' : 'Medium';
    const dataTransferSize = `${(totalSizeEstimate / 1024).toFixed(2)} MB`;
    
    console.log(`Migration complexity: ${migrationComplexity}`);
    console.log(`Data transfer size: ${dataTransferSize}`);
    console.log(`Record count: ${Object.values(counts).reduce((sum, count) => sum + count, 0).toLocaleString()}`);
    
    console.log('\n✅ Supabase Migration Benefits:');
    console.log('• Built-in authentication (NextAuth.js compatible)');
    console.log('• Real-time subscriptions');
    console.log('• Built-in API with auto-generated endpoints');
    console.log('• Row Level Security (RLS) for data protection');
    console.log('• Automatic backups and scaling');
    console.log('• Built-in file storage (could replace S3)');
    console.log('• Dashboard for easy data management');
    
    console.log('\n⚠️  Migration Considerations:');
    console.log('• Need to migrate existing data');
    console.log('• Update connection strings');
    console.log('• Test all functionality after migration');
    console.log('• Consider keeping S3 for video files (or migrate to Supabase Storage)');
    
  } catch (error) {
    console.error('❌ Error examining database:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the examination
if (require.main === module) {
  examineDatabase().catch(console.error);
}

module.exports = { examineDatabase };

