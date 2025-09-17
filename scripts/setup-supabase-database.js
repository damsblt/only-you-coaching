#!/usr/bin/env node

/**
 * 🚀 Supabase Database Setup Script
 * 
 * This script sets up the database schema in Supabase and migrates the data.
 */

const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

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

// Update DATABASE_URL to Supabase
process.env.DATABASE_URL = "postgresql://postgres:otqyrsmxdtcvhueriwzp@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres";

const prisma = new PrismaClient();

/**
 * Create database schema in Supabase
 */
async function createSupabaseSchema() {
  console.log('🏗️  Creating Supabase database schema...');
  
  try {
    // Push the schema to Supabase
    const { execSync } = require('child_process');
    
    console.log('📤 Pushing Prisma schema to Supabase...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    console.log('✅ Database schema created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error creating schema:', error.message);
    return false;
  }
}

/**
 * Migrate data to Supabase
 */
async function migrateDataToSupabase() {
  console.log('📤 Migrating data to Supabase...');
  
  try {
    // Read the exported data
    const exportPath = path.join(__dirname, '..', 'database-export.json');
    const exportData = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
    
    console.log(`📊 Found ${exportData.videos.length} videos to migrate`);
    
    // Migrate videos in batches
    const batchSize = 50;
    let migratedCount = 0;
    
    for (let i = 0; i < exportData.videos.length; i += batchSize) {
      const batch = exportData.videos.slice(i, i + batchSize);
      
      console.log(`📦 Migrating batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(exportData.videos.length / batchSize)}`);
      
      for (const video of batch) {
        try {
          await prisma.video.create({
            data: {
              id: video.id,
              title: video.title,
              description: video.description,
              detailedDescription: video.detailedDescription,
              thumbnail: video.thumbnail,
              videoUrl: video.videoUrl,
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
          migratedCount++;
        } catch (error) {
          console.error(`❌ Error migrating video ${video.title}:`, error.message);
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`✅ Successfully migrated ${migratedCount} videos to Supabase`);
    return migratedCount;
  } catch (error) {
    console.error('❌ Error migrating data:', error.message);
    return 0;
  }
}

/**
 * Verify Supabase connection and data
 */
async function verifySupabaseConnection() {
  console.log('🔍 Verifying Supabase connection...');
  
  try {
    const videoCount = await prisma.video.count();
    const sampleVideo = await prisma.video.findFirst({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        videoUrl: true
      }
    });
    
    console.log(`✅ Connected to Supabase successfully!`);
    console.log(`📊 Found ${videoCount} videos in Supabase`);
    
    if (sampleVideo) {
      console.log(`📋 Sample video: ${sampleVideo.title}`);
      console.log(`   Thumbnail: ${sampleVideo.thumbnail ? '✅' : '❌'}`);
      console.log(`   Video URL: ${sampleVideo.videoUrl ? '✅' : '❌'}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error verifying connection:', error.message);
    return false;
  }
}

/**
 * Main setup function
 */
async function setupSupabaseDatabase() {
  console.log('🚀 Setting up Supabase Database');
  console.log('===============================\n');
  
  try {
    // Step 1: Create schema
    const schemaCreated = await createSupabaseSchema();
    if (!schemaCreated) {
      console.log('❌ Schema creation failed. Please check your Supabase connection.');
      return;
    }
    
    // Step 2: Migrate data
    const migratedCount = await migrateDataToSupabase();
    if (migratedCount === 0) {
      console.log('❌ Data migration failed.');
      return;
    }
    
    // Step 3: Verify connection
    const verified = await verifySupabaseConnection();
    if (!verified) {
      console.log('❌ Connection verification failed.');
      return;
    }
    
    console.log('\n🎉 Supabase setup complete!');
    console.log('===========================');
    console.log(`✅ Schema created`);
    console.log(`✅ ${migratedCount} videos migrated`);
    console.log(`✅ Connection verified`);
    
    console.log('\n📋 Next Steps:');
    console.log('==============');
    console.log('1. Update your .env.local with the Supabase DATABASE_URL');
    console.log('2. Test the connection: npm run test-thumbnails');
    console.log('3. Start your app: npm run dev');
    
    console.log('\n🔗 Supabase Dashboard:');
    console.log('https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp');
    
  } catch (error) {
    console.error('💥 Setup failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
if (require.main === module) {
  setupSupabaseDatabase().catch(console.error);
}

module.exports = { setupSupabaseDatabase };

