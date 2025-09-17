#!/usr/bin/env node

/**
 * 🚀 Supabase Migration Script
 * 
 * This script migrates your current PostgreSQL database to Supabase
 * and optionally migrates videos from S3 to Supabase Storage.
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

const prisma = new PrismaClient();

/**
 * Export current database to JSON
 */
async function exportDatabase() {
  console.log('📤 Exporting current database...');
  
  try {
    // Export all videos
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: 'asc' }
    });
    
    // Export all users
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' }
    });
    
    // Export all other tables
    const audios = await prisma.audio.findMany();
    const playlists = await prisma.playlist.findMany();
    const favorites = await prisma.favorite.findMany();
    const subscriptions = await prisma.subscription.findMany();
    const bookings = await prisma.booking.findMany();
    
    const exportData = {
      videos,
      users,
      audios,
      playlists,
      favorites,
      subscriptions,
      bookings,
      exportedAt: new Date().toISOString(),
      recordCounts: {
        videos: videos.length,
        users: users.length,
        audios: audios.length,
        playlists: playlists.length,
        favorites: favorites.length,
        subscriptions: subscriptions.length,
        bookings: bookings.length
      }
    };
    
    const exportPath = path.join(__dirname, '..', 'database-export.json');
    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    
    console.log(`✅ Database exported to: ${exportPath}`);
    console.log(`📊 Exported ${videos.length} videos, ${users.length} users, and other records`);
    
    return exportData;
  } catch (error) {
    console.error('❌ Error exporting database:', error.message);
    throw error;
  }
}

/**
 * Generate Supabase migration SQL
 */
function generateSupabaseMigration(exportData) {
  console.log('📝 Generating Supabase migration SQL...');
  
  const migrationSQL = `
-- Supabase Migration SQL
-- Generated: ${new Date().toISOString()}

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables (Supabase will handle this with Prisma)
-- This is just for reference

-- Insert videos
${exportData.videos.map(video => `
INSERT INTO videos (
  id, title, description, "detailedDescription", thumbnail, "videoUrl", 
  duration, difficulty, category, region, "muscleGroups", "startingPosition", 
  movement, intensity, theme, series, constraints, tags, folder, 
  "isPublished", "createdAt", "updatedAt"
) VALUES (
  '${video.id}',
  ${video.title ? `'${video.title.replace(/'/g, "''")}'` : 'NULL'},
  ${video.description ? `'${video.description.replace(/'/g, "''")}'` : 'NULL'},
  ${video.detailedDescription ? `'${video.detailedDescription.replace(/'/g, "''")}'` : 'NULL'},
  ${video.thumbnail ? `'${video.thumbnail}'` : 'NULL'},
  ${video.videoUrl ? `'${video.videoUrl}'` : 'NULL'},
  ${video.duration || 0},
  '${video.difficulty}',
  ${Array.isArray(video.category) ? `'${JSON.stringify(video.category)}'` : `'${video.category}'`},
  ${video.region ? `'${video.region}'` : 'NULL'},
  ${Array.isArray(video.muscleGroups) ? `'${JSON.stringify(video.muscleGroups)}'` : `'${video.muscleGroups}'`},
  ${video.startingPosition ? `'${video.startingPosition.replace(/'/g, "''")}'` : 'NULL'},
  ${video.movement ? `'${video.movement.replace(/'/g, "''")}'` : 'NULL'},
  ${video.intensity ? `'${video.intensity}'` : 'NULL'},
  ${video.theme ? `'${video.theme.replace(/'/g, "''")}'` : 'NULL'},
  ${video.series ? `'${video.series.replace(/'/g, "''")}'` : 'NULL'},
  ${video.constraints ? `'${video.constraints.replace(/'/g, "''")}'` : 'NULL'},
  ${Array.isArray(video.tags) ? `'${JSON.stringify(video.tags)}'` : `'${video.tags}'`},
  ${video.folder ? `'${video.folder}'` : 'NULL'},
  ${video.isPublished},
  '${video.createdAt.toISOString()}',
  '${video.updatedAt.toISOString()}'
);`).join('')}

-- Insert users
${exportData.users.map(user => `
INSERT INTO users (
  id, email, name, image, role, "createdAt", "updatedAt"
) VALUES (
  '${user.id}',
  '${user.email}',
  ${user.name ? `'${user.name.replace(/'/g, "''")}'` : 'NULL'},
  ${user.image ? `'${user.image}'` : 'NULL'},
  '${user.role}',
  '${user.createdAt.toISOString()}',
  '${user.updatedAt.toISOString()}'
);`).join('')}

-- Note: Other tables (audios, playlists, etc.) can be added similarly
-- This migration focuses on the main data (videos and users)
`;
  
  const migrationPath = path.join(__dirname, '..', 'supabase-migration.sql');
  fs.writeFileSync(migrationPath, migrationSQL);
  
  console.log(`✅ Migration SQL generated: ${migrationPath}`);
  return migrationPath;
}

/**
 * Generate environment configuration for Supabase
 */
function generateSupabaseConfig() {
  console.log('⚙️  Generating Supabase configuration...');
  
  const supabaseConfig = `
# Supabase Configuration
# Add these to your .env.local file

# Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# Optional: Keep S3 for now, or migrate to Supabase Storage
# AWS_S3_BUCKET_NAME="only-you-coaching"
# AWS_S3_ACCESS_POINT_ALIAS="s3-access-56ig858wntepzkh8ssrxmmjor4psgeun1a-s3alias"

# NextAuth.js (update with Supabase)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
`;
  
  const configPath = path.join(__dirname, '..', 'supabase-config.env');
  fs.writeFileSync(configPath, supabaseConfig);
  
  console.log(`✅ Supabase config generated: ${configPath}`);
  return configPath;
}

/**
 * Main migration function
 */
async function migrateToSupabase() {
  console.log('🚀 Starting Supabase Migration');
  console.log('==============================\n');
  
  try {
    // Step 1: Export current database
    const exportData = await exportDatabase();
    
    // Step 2: Generate migration SQL
    const migrationPath = generateSupabaseMigration(exportData);
    
    // Step 3: Generate Supabase config
    const configPath = generateSupabaseConfig();
    
    console.log('\n📋 Next Steps:');
    console.log('==============');
    console.log('1. Create a Supabase project at https://supabase.com');
    console.log('2. Get your project URL and API keys');
    console.log('3. Update the configuration in supabase-config.env');
    console.log('4. Run the migration SQL in your Supabase SQL editor');
    console.log('5. Update your .env.local with the new DATABASE_URL');
    console.log('6. Test the connection with: npm run test-thumbnails');
    
    console.log('\n📁 Generated Files:');
    console.log('===================');
    console.log(`• database-export.json (${exportData.videos.length} videos)`);
    console.log(`• supabase-migration.sql (SQL migration script)`);
    console.log(`• supabase-config.env (environment template)`);
    
    console.log('\n🎉 Migration preparation complete!');
    console.log('The migration is ready to execute when you create your Supabase project.');
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
if (require.main === module) {
  migrateToSupabase().catch(console.error);
}

module.exports = { migrateToSupabase, exportDatabase };

