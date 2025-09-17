#!/usr/bin/env node

/**
 * 🎬 Add Test Videos with Correct URL Patterns
 * 
 * This script adds some test videos with the expected URL patterns to the database.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const testVideos = [
  // Muscle Groups Videos
  {
    title: "Test Abdos Video 1",
    description: "Test video for abdominal exercises",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/groupes-musculaires/abdos/test-abdos-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/test-abdos-1-thumb.jpg",
    duration: 300,
    difficulty: "INTERMEDIATE",
    category: "Muscle Groups",
    region: "abdos",
    muscleGroups: ["Abdos"],
    tags: ["abdos", "muscle-groups"],
    isPublished: true,
    startingPosition: "Allongé sur le dos",
    movement: "Relevé de buste",
    theme: "Renforcement abdominal",
    series: "Série 1",
    constraints: "Éviter si problèmes de dos"
  },
  {
    title: "Test Biceps Video 1",
    description: "Test video for biceps exercises",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/groupes-musculaires/biceps/test-biceps-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/test-biceps-1-thumb.jpg",
    duration: 240,
    difficulty: "BEGINNER",
    category: "Muscle Groups",
    region: "biceps",
    muscleGroups: ["Biceps"],
    tags: ["biceps", "muscle-groups"],
    isPublished: true,
    startingPosition: "Debout",
    movement: "Flexion de bras",
    theme: "Renforcement des bras",
    series: "Série 1",
    constraints: "Éviter si problèmes d'épaule"
  },
  {
    title: "Test Cardio Video 1",
    description: "Test video for cardio exercises",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/groupes-musculaires/cardio/test-cardio-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/test-cardio-1-thumb.jpg",
    duration: 600,
    difficulty: "ADVANCED",
    category: "Muscle Groups",
    region: "cardio",
    muscleGroups: ["Cardio"],
    tags: ["cardio", "muscle-groups"],
    isPublished: true,
    startingPosition: "Debout",
    movement: "Saut avec écart",
    theme: "Cardio haute intensité",
    series: "Série 1",
    constraints: "Éviter si problèmes cardiaques"
  },
  // Programmes Videos
  {
    title: "Test Programme Abdos 1",
    description: "Test programme for abdominal exercises",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/programmes-predefinis/abdos/test-programme-abdos-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/test-programme-abdos-1-thumb.jpg",
    duration: 1800,
    difficulty: "INTERMEDIATE",
    category: "Predefined Programs",
    region: "abdos",
    muscleGroups: ["Abdos"],
    tags: ["abdos", "programmes"],
    isPublished: true,
    startingPosition: "Allongé sur le dos",
    movement: "Séquence complète abdos",
    theme: "Programme abdos complet",
    series: "Programme 1",
    constraints: "Éviter si problèmes de dos"
  },
  {
    title: "Test Programme Brule Graisse 1",
    description: "Test programme for fat burning",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/programmes-predefinis/brule-graisse/test-programme-brule-graisse-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/test-programme-brule-graisse-1-thumb.jpg",
    duration: 2400,
    difficulty: "ADVANCED",
    category: "Predefined Programs",
    region: "brule-graisse",
    muscleGroups: ["Cardio", "Abdos"],
    tags: ["brule-graisse", "programmes"],
    isPublished: true,
    startingPosition: "Debout",
    movement: "Circuit complet",
    theme: "Programme brûle graisse",
    series: "Programme 1",
    constraints: "Éviter si problèmes cardiaques"
  }
];

async function addTestVideos() {
  console.log('🎬 Adding test videos with correct URL patterns...\n');

  try {
    for (const video of testVideos) {
      const existingVideo = await prisma.video.findFirst({
        where: { videoUrl: video.videoUrl }
      });

      if (existingVideo) {
        console.log(`⚠️  Video already exists: ${video.title}`);
        continue;
      }

      await prisma.video.create({
        data: {
          ...video,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });

      console.log(`✅ Added: ${video.title} (${video.category})`);
    }

    console.log('\n📊 Database counts after adding test videos:');
    const counts = {
      total: await prisma.video.count(),
      muscleGroups: await prisma.video.count({
        where: { videoUrl: { contains: '/Video/groupes-musculaires/' } }
      }),
      programmes: await prisma.video.count({
        where: { videoUrl: { contains: '/Video/programmes-predefinis/' } }
      })
    };

    console.log(`Total videos: ${counts.total}`);
    console.log(`Muscle groups videos: ${counts.muscleGroups}`);
    console.log(`Programmes videos: ${counts.programmes}`);

    console.log('\n🎉 Test videos added successfully!');
    console.log('\n🧪 Test the API:');
    console.log('curl "http://localhost:3000/api/videos?videoType=muscle-groups" | jq length');
    console.log('curl "http://localhost:3000/api/videos?videoType=programmes" | jq length');

  } catch (error) {
    console.error('❌ Error adding test videos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  addTestVideos();
}
