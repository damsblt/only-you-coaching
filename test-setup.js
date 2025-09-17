#!/usr/bin/env node

/**
 * 🧪 Test Setup Script
 * 
 * This script tests the basic setup to ensure everything is working.
 */

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

async function testSetup() {
  console.log('🧪 Testing Setup...');
  console.log('==================\n');

  // Test 1: Environment Variables
  console.log('1️⃣ Testing Environment Variables:');
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  let envVarsOk = true;
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      console.log(`   ✅ ${envVar}: Set`);
    } else {
      console.log(`   ❌ ${envVar}: Missing`);
      envVarsOk = false;
    }
  }

  if (!envVarsOk) {
    console.log('\n❌ Environment variables are missing. Please check your .env.local file.');
    return;
  }

  // Test 2: Database Connection
  console.log('\n2️⃣ Testing Database Connection:');
  const prisma = new PrismaClient();
  
  try {
    const videoCount = await prisma.video.count();
    console.log(`   ✅ Database connected successfully`);
    console.log(`   📊 Total videos in database: ${videoCount}`);

    // Test 3: Sample Videos
    console.log('\n3️⃣ Testing Sample Videos:');
    const sampleVideos = await prisma.video.findMany({
      take: 3,
      select: {
        id: true,
        title: true,
        videoType: true,
        isPublished: true,
        thumbnail: true,
        videoUrl: true
      }
    });

    console.log(`   📹 Sample videos:`);
    sampleVideos.forEach((video, index) => {
      console.log(`   ${index + 1}. ${video.title} (${video.videoType || 'No type'})`);
      console.log(`      Published: ${video.isPublished}`);
      console.log(`      Thumbnail: ${video.thumbnail ? 'Yes' : 'No'}`);
      console.log(`      Video URL: ${video.videoUrl ? 'Yes' : 'No'}`);
    });

    // Test 4: Video Types
    console.log('\n4️⃣ Testing Video Types:');
    const muscleGroupsCount = await prisma.video.count({ where: { videoType: 'MUSCLE_GROUPS' } });
    const programmesCount = await prisma.video.count({ where: { videoType: 'PROGRAMMES' } });
    // const noTypeCount = await prisma.video.count({ where: { videoType: null } });

    console.log(`   🏋️ Muscle Groups: ${muscleGroupsCount}`);
    console.log(`   📋 Programmes: ${programmesCount}`);

    console.log('\n✅ All tests passed! Your setup is working correctly.');
    console.log('\n🌐 Next steps:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Visit: http://localhost:3000/videos-simple');
    console.log('3. Check the browser console for any errors');

  } catch (error) {
    console.log(`   ❌ Database connection failed: ${error.message}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your DATABASE_URL in .env.local');
    console.log('2. Make sure your Supabase project is active');
    console.log('3. Verify your database password is correct');
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  testSetup().catch(console.error);
}
