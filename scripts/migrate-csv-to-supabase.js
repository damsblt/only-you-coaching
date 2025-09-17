#!/usr/bin/env node

/**
 * 📊 Migrate CSV Data to Supabase
 * 
 * This script reads the CSV template and creates video records in Supabase
 * with all the metadata from the CSV file.
 */

const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

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

const CSV_FILE_PATH = '/Users/damien/Documents/only-you-coaching/Dossier Cliente/Wix CMS/desired_output_updated.csv';

/**
 * Parse CSV file
 */
async function parseCSV() {
  console.log('📖 Reading CSV file...');
  
  const fileContent = await fs.promises.readFile(CSV_FILE_PATH, { encoding: 'utf8' });
  
  const records = await new Promise((resolve, reject) => {
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ';'
    }, (err, records) => {
      if (err) reject(err);
      else resolve(records);
    });
  });
  
  console.log(`✅ Found ${records.length} records in CSV`);
  return records;
}

/**
 * Extract category and region from S3 URL
 */
function extractCategoryAndRegion(s3Url) {
  if (!s3Url) return { category: 'General', region: null };
  
  const urlParts = s3Url.split('/');
  const videoIndex = urlParts.findIndex(part => part === 'Video');
  
  if (videoIndex === -1) return { category: 'General', region: null };
  
  const pathParts = urlParts.slice(videoIndex + 1);
  
  if (pathParts[0] === 'groupes-musculaires') {
    return {
      category: 'Muscle Groups',
      region: pathParts[1] || null
    };
  } else if (pathParts[0] === 'programmes-predefinis') {
    return {
      category: 'Predefined Programs',
      region: pathParts[1] || null
    };
  }
  
  return { category: 'General', region: null };
}

/**
 * Extract difficulty from title
 */
function extractDifficulty(title) {
  if (!title) return 'INTERMEDIATE';
  
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('niveau 1') || titleLower.includes('débutant') || titleLower.includes('débutante')) {
    return 'BEGINNER';
  } else if (titleLower.includes('niveau 3') || titleLower.includes('avancé') || titleLower.includes('avancée')) {
    return 'ADVANCED';
  }
  
  return 'INTERMEDIATE';
}

/**
 * Convert CSV record to video data
 */
function convertToVideoData(record) {
  const { category, region } = extractCategoryAndRegion(record['S3 Video URL']);
  const difficulty = extractDifficulty(record['Title']);
  
  // Extract muscle groups from "Muscle cible" column
  const muscleGroups = record['Muscle cible'] 
    ? record['Muscle cible'].split(',').map(m => m.trim()).filter(m => m.length > 0)
    : [];
  
  // Create tags from various columns
  const tags = [
    category,
    region,
    record['Thème'],
    record['Position de depart']?.split(' ')[0], // First word of position
    record['Mouvement']?.split(' ')[0] // First word of movement
  ].filter(Boolean);
  
  return {
    title: record['Title'] || 'Untitled Exercise',
    description: [
      record['Position de depart'],
      record['Mouvement'],
      record['Thème'],
      record['serie'],
      record['Contre-indication']
    ].filter(Boolean).join('\n\n'),
    videoUrl: record['S3 Video URL'],
    thumbnail: record['Image de couverture'],
    category: category,
    region: region,
    difficulty: difficulty,
    muscleGroups: muscleGroups,
    tags: tags,
    isPublished: true,
    duration: Math.floor(Math.random() * 300) + 60, // Random duration 1-6 minutes
    // Additional metadata using correct schema field names
    startingPosition: record['Position de depart'],
    movement: record['Mouvement'],
    theme: record['Thème'],
    series: record['serie'],
    constraints: record['Contre-indication']
  };
}

/**
 * Migrate all records to Supabase
 */
async function migrateToSupabase() {
  console.log('📊 Migrating CSV Data to Supabase');
  console.log('==================================\n');
  
  try {
    // 1. Parse CSV
    const records = await parseCSV();
    
    if (records.length === 0) {
      console.log('❌ No records found in CSV file');
      return;
    }
    
    // 2. Convert and validate records
    console.log('🔄 Converting records...');
    const videoData = records.map(convertToVideoData);
    
    // 3. Show sample data
    console.log('\n📋 Sample record:');
    console.log(JSON.stringify(videoData[0], null, 2));
    
    // 4. Create videos in batches
    console.log('\n💾 Creating videos in Supabase...');
    const batchSize = 50;
    let created = 0;
    
    for (let i = 0; i < videoData.length; i += batchSize) {
      const batch = videoData.slice(i, i + batchSize);
      
      try {
        await prisma.video.createMany({
          data: batch,
          skipDuplicates: true
        });
        
        created += batch.length;
        console.log(`✅ Created batch ${Math.floor(i / batchSize) + 1}: ${batch.length} videos (Total: ${created})`);
        
      } catch (error) {
        console.error(`❌ Error creating batch ${Math.floor(i / batchSize) + 1}:`, error.message);
        
        // Try creating individually to identify problematic records
        for (const video of batch) {
          try {
            await prisma.video.create({ data: video });
            created++;
          } catch (individualError) {
            console.error(`❌ Failed to create video "${video.title}":`, individualError.message);
          }
        }
      }
    }
    
    // 5. Verify migration
    const totalVideos = await prisma.video.count();
    console.log(`\n📊 Migration complete!`);
    console.log(`Total videos in database: ${totalVideos}`);
    
    // 6. Show statistics
    const stats = await prisma.video.groupBy({
      by: ['category'],
      _count: { category: true }
    });
    
    console.log('\n📈 Videos by category:');
    stats.forEach(stat => {
      console.log(`${stat.category.padEnd(20)}: ${stat._count.category}`);
    });
    
    const regionStats = await prisma.video.groupBy({
      by: ['region'],
      _count: { region: true },
      where: { region: { not: null } }
    });
    
    console.log('\n🏷️  Videos by region:');
    regionStats.forEach(stat => {
      console.log(`${(stat.region || 'Unknown').padEnd(20)}: ${stat._count.region}`);
    });
    
    console.log('\n🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  migrateToSupabase().catch(console.error);
}

module.exports = { migrateToSupabase };
