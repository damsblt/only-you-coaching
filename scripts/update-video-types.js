#!/usr/bin/env node

/**
 * 🔄 Update Video Types
 * 
 * This script updates existing videos to have the correct videoType values.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateVideoTypes() {
  console.log('🔄 Updating video types...');
  console.log('==========================\n');

  try {
    // Get all videos without videoType
    const videosWithoutType = await prisma.video.findMany({
      where: {
        OR: [
          { videoType: null },
          { videoType: undefined }
        ]
      },
      select: {
        id: true,
        title: true,
        videoUrl: true,
        category: true
      }
    });

    console.log(`📊 Found ${videosWithoutType.length} videos without videoType`);

    let updatedCount = 0;

    for (const video of videosWithoutType) {
      let videoType = 'MUSCLE_GROUPS'; // Default

      // Determine video type based on URL or category
      if (
        video.videoUrl && (
          video.videoUrl.includes('/programmes-predefinis/') ||
          video.videoUrl.includes('/Video/programmes/')
        )
      ) {
        videoType = 'PROGRAMMES';
      } else if (video.category && video.category.toLowerCase().includes('program')) {
        videoType = 'PROGRAMMES';
      }

      await prisma.video.update({
        where: { id: video.id },
        data: { videoType }
      });

      console.log(`✅ Updated: ${video.title} → ${videoType}`);
      updatedCount++;
    }

    console.log(`\n🎉 Updated ${updatedCount} videos`);

    // Show final counts
    const muscleGroupsCount = await prisma.video.count({ where: { videoType: 'MUSCLE_GROUPS' } });
    const programmesCount = await prisma.video.count({ where: { videoType: 'PROGRAMMES' } });
    const noTypeCount = await prisma.video.count({ where: { videoType: null } });

    console.log('\n📈 Final video counts:');
    console.log(`🏋️ Muscle Groups: ${muscleGroupsCount}`);
    console.log(`📋 Programmes: ${programmesCount}`);
    console.log(`❓ No Type: ${noTypeCount}`);

  } catch (error) {
    console.error('❌ Error updating video types:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  updateVideoTypes();
}
