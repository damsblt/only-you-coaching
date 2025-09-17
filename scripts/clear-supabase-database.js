#!/usr/bin/env node

/**
 * 🗑️ Clear Supabase Database
 * 
 * This script removes all entries from the Supabase database
 * to start fresh for the new template-based system.
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

// Set Supabase DATABASE_URL
process.env.DATABASE_URL = "postgresql://postgres:tIwji3-gergiv-mihsew@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('🗑️  Clearing Supabase Database');
  console.log('=============================\n');
  
  try {
    // Get counts before deletion
    const counts = {
      videos: await prisma.video.count(),
      users: await prisma.user.count(),
      audios: await prisma.audio.count(),
      playlists: await prisma.playlist.count(),
      favorites: await prisma.favorite.count(),
      subscriptions: await prisma.subscription.count(),
      bookings: await prisma.booking.count(),
    };
    
    console.log('📊 Current database counts:');
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`${table.padEnd(15)}: ${count.toLocaleString()}`);
    });
    
    if (counts.videos === 0 && counts.users === 0) {
      console.log('\n✅ Database is already empty');
      return;
    }
    
    console.log('\n🗑️  Deleting all records...');
    
    // Delete in order to respect foreign key constraints
    await prisma.favorite.deleteMany();
    console.log('✅ Deleted favorites');
    
    await prisma.playlistItem.deleteMany();
    console.log('✅ Deleted playlist items');
    
    await prisma.playlist.deleteMany();
    console.log('✅ Deleted playlists');
    
    await prisma.booking.deleteMany();
    console.log('✅ Deleted bookings');
    
    await prisma.subscription.deleteMany();
    console.log('✅ Deleted subscriptions');
    
    await prisma.session.deleteMany();
    console.log('✅ Deleted sessions');
    
    await prisma.account.deleteMany();
    console.log('✅ Deleted accounts');
    
    await prisma.verificationToken.deleteMany();
    console.log('✅ Deleted verification tokens');
    
    await prisma.audio.deleteMany();
    console.log('✅ Deleted audios');
    
    await prisma.video.deleteMany();
    console.log('✅ Deleted videos');
    
    await prisma.user.deleteMany();
    console.log('✅ Deleted users');
    
    // Verify deletion
    const finalCounts = {
      videos: await prisma.video.count(),
      users: await prisma.user.count(),
      audios: await prisma.audio.count(),
      playlists: await prisma.playlist.count(),
      favorites: await prisma.favorite.count(),
      subscriptions: await prisma.subscription.count(),
      bookings: await prisma.booking.count(),
    };
    
    console.log('\n📊 Final database counts:');
    Object.entries(finalCounts).forEach(([table, count]) => {
      console.log(`${table.padEnd(15)}: ${count.toLocaleString()}`);
    });
    
    const totalRemaining = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
    
    if (totalRemaining === 0) {
      console.log('\n🎉 Database cleared successfully!');
      console.log('Ready for fresh data from the CSV template.');
    } else {
      console.log('\n⚠️  Some records may still remain. Check the counts above.');
    }
    
  } catch (error) {
    console.error('❌ Error clearing database:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  clearDatabase().catch(console.error);
}

module.exports = { clearDatabase };

