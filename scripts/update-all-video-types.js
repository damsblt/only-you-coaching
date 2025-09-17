#!/usr/bin/env node

/**
 * 🔄 Update All Video Types
 * 
 * This script updates all videos to have MUSCLE_GROUPS as default.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateAllVideoTypes() {
  console.log('🔄 Updating all video types...');
  console.log('==============================\n');

  try {
    // Update all videos to have MUSCLE_GROUPS as default
    const result = await prisma.video.updateMany({
      data: {
        videoType: 'MUSCLE_GROUPS'
      }
    });

    console.log(`✅ Updated ${result.count} videos to MUSCLE_GROUPS`);

    // Show final counts
    const muscleGroupsCount = await prisma.video.count({ where: { videoType: 'MUSCLE_GROUPS' } });
    const programmesCount = await prisma.video.count({ where: { videoType: 'PROGRAMMES' } });

    console.log('\n📈 Final video counts:');
    console.log(`🏋️ Muscle Groups: ${muscleGroupsCount}`);
    console.log(`📋 Programmes: ${programmesCount}`);

  } catch (error) {
    console.error('❌ Error updating video types:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  updateAllVideoTypes();
}

