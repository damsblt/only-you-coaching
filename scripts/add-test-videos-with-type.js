#!/usr/bin/env node

/**
 * 🎬 Add Test Videos with VideoType
 * 
 * This script adds test videos with the new videoType column to the database.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const testVideos = [
  // Muscle Groups Videos
  {
    title: "Exercices Abdos - Crunch Classique",
    description: "Exercice de base pour renforcer les abdominaux",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/groupes-musculaires/abdos/crunch-classique.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/crunch-classique-thumb.jpg",
    duration: 300,
    difficulty: "BEGINNER",
    category: "Muscle Groups",
    region: "abdos",
    muscleGroups: ["Abdos"],
    tags: ["abdos", "muscle-groups", "débutant"],
    isPublished: true,
    videoType: "MUSCLE_GROUPS",
    startingPosition: "Allongé sur le dos",
    movement: "Crunch",
    theme: "Renforcement abdominal",
    series: "1",
    constraints: "Aucune",
  },
  {
    title: "Exercices Dos - Superman",
    description: "Exercice pour renforcer les muscles du dos",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/groupes-musculaires/dos/superman.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/superman-thumb.jpg",
    duration: 240,
    difficulty: "BEGINNER",
    category: "Muscle Groups",
    region: "dos",
    muscleGroups: ["Dos"],
    tags: ["dos", "muscle-groups", "débutant"],
    isPublished: true,
    videoType: "MUSCLE_GROUPS",
    startingPosition: "Allongé sur le ventre",
    movement: "Superman",
    theme: "Renforcement du dos",
    series: "1",
    constraints: "Aucune",
  },
  {
    title: "Cardio - Jumping Jacks",
    description: "Exercice cardio pour améliorer l'endurance",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/groupes-musculaires/cardio/jumping-jacks.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/jumping-jacks-thumb.jpg",
    duration: 600,
    difficulty: "INTERMEDIATE",
    category: "Muscle Groups",
    region: "cardio",
    muscleGroups: ["Cardio"],
    tags: ["cardio", "muscle-groups", "intermédiaire"],
    isPublished: true,
    videoType: "MUSCLE_GROUPS",
    startingPosition: "Debout",
    movement: "Jumping Jacks",
    theme: "Cardio",
    series: "1",
    constraints: "Aucune",
  },
  {
    title: "Biceps - Curls avec Bande",
    description: "Renforcement des biceps avec bande élastique",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/groupes-musculaires/biceps/curls-bande.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/curls-bande-thumb.jpg",
    duration: 180,
    difficulty: "INTERMEDIATE",
    category: "Muscle Groups",
    region: "biceps",
    muscleGroups: ["Biceps"],
    tags: ["biceps", "muscle-groups", "bande"],
    isPublished: true,
    videoType: "MUSCLE_GROUPS",
    startingPosition: "Debout",
    movement: "Curls",
    theme: "Renforcement biceps",
    series: "1",
    constraints: "Aucune",
  },
  // Predefined Programs Videos
  {
    title: "Programme Brûle Graisse - Séance 1",
    description: "Première séance du programme brûle graisse",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/programmes-predefinis/brule-graisse/seance-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/brule-graisse-1-thumb.jpg",
    duration: 900,
    difficulty: "INTERMEDIATE",
    category: "Predefined Programs",
    region: "brule-graisse",
    muscleGroups: ["Cardio", "Abdos"],
    tags: ["brûle-graisse", "programmes", "cardio"],
    isPublished: true,
    videoType: "PROGRAMMES",
    startingPosition: "Diverses",
    movement: "Corps entier",
    theme: "Perte de poids",
    series: "1",
    constraints: "Aucune",
  },
  {
    title: "Programme Dos Renforcé - Séance 1",
    description: "Première séance du programme de renforcement du dos",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/programmes-predefinis/rehabilitation-dos/seance-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/rehabilitation-dos-1-thumb.jpg",
    duration: 720,
    difficulty: "BEGINNER",
    category: "Predefined Programs",
    region: "rehabilitation-dos",
    muscleGroups: ["Dos"],
    tags: ["réhabilitation-dos", "programmes", "débutant"],
    isPublished: true,
    videoType: "PROGRAMMES",
    startingPosition: "Diverses",
    movement: "Focus dos",
    theme: "Réhabilitation",
    series: "1",
    constraints: "Douleurs dorsales",
  },
  {
    title: "Programme Haute Intensité - HIIT 1",
    description: "Première séance HIIT du programme haute intensité",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/programmes-predefinis/haute-intensite/hiit-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/hiit-1-thumb.jpg",
    duration: 1200,
    difficulty: "ADVANCED",
    category: "Predefined Programs",
    region: "haute-intensite",
    muscleGroups: ["Cardio", "Abdos", "Jambes"],
    tags: ["haute-intensité", "programmes", "HIIT"],
    isPublished: true,
    videoType: "PROGRAMMES",
    startingPosition: "Diverses",
    movement: "HIIT",
    theme: "Haute intensité",
    series: "1",
    constraints: "Aucune",
  },
  {
    title: "Programme Spécial Femme - Séance 1",
    description: "Première séance du programme spécialement conçu pour les femmes",
    videoUrl: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/Video/programmes-predefinis/special-femme/seance-1.mp4",
    thumbnail: "https://only-you-coaching.s3.eu-north-1.amazonaws.com/thumbnails/special-femme-1-thumb.jpg",
    duration: 600,
    difficulty: "INTERMEDIATE",
    category: "Predefined Programs",
    region: "special-femme",
    muscleGroups: ["Abdos", "Fessiers", "Jambes"],
    tags: ["spécial-femme", "programmes", "fitness"],
    isPublished: true,
    videoType: "PROGRAMMES",
    startingPosition: "Diverses",
    movement: "Corps entier",
    theme: "Fitness féminin",
    series: "1",
    constraints: "Aucune",
  },
];

async function addTestVideos() {
  console.log('🎬 Adding test videos with videoType to the database...');
  console.log('=====================================================\n');
  
  let addedCount = 0;
  let skippedCount = 0;
  
  for (const videoData of testVideos) {
    try {
      // Check if video already exists to prevent duplicates
      const existingVideo = await prisma.video.findFirst({
        where: { 
          OR: [
            { videoUrl: videoData.videoUrl },
            { title: videoData.title }
          ]
        }
      });

      if (existingVideo) {
        console.log(`⏭️  Video "${videoData.title}" already exists. Skipping.`);
        skippedCount++;
      } else {
        await prisma.video.create({
          data: {
            ...videoData,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        console.log(`✅ Added video: "${videoData.title}" (${videoData.videoType})`);
        addedCount++;
      }
    } catch (error) {
      console.error(`❌ Error adding video "${videoData.title}":`, error.message);
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Added: ${addedCount} videos`);
  console.log(`⏭️  Skipped: ${skippedCount} videos`);
  console.log('\n🎉 Test videos added successfully!');
  
  // Show count by video type
  const muscleGroupsCount = await prisma.video.count({ where: { videoType: 'MUSCLE_GROUPS' } });
  const programmesCount = await prisma.video.count({ where: { videoType: 'PROGRAMMES' } });
  
  console.log('\n📈 Videos by type:');
  console.log(`Muscle Groups: ${muscleGroupsCount}`);
  console.log(`Programmes: ${programmesCount}`);
}

if (require.main === module) {
  addTestVideos()
    .catch(e => {
      console.error('❌ Unhandled error in add-test-videos-with-type:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

