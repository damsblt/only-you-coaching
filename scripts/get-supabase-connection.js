#!/usr/bin/env node

/**
 * 🔑 Get Supabase Database Connection Details
 * 
 * This script helps you get the correct database connection string for Supabase.
 */

console.log('🔑 Supabase Database Connection Setup');
console.log('=====================================\n');

console.log('To get your Supabase database password:');
console.log('1. Go to: https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp');
console.log('2. Click on "Settings" in the left sidebar');
console.log('3. Click on "Database"');
console.log('4. Scroll down to "Connection string"');
console.log('5. Copy the "URI" connection string\n');

console.log('Your Supabase project details:');
console.log('==============================');
console.log('Project URL: https://otqyrsmxdtcvhueriwzp.supabase.co');
console.log('Project Reference: otqyrsmxdtcvhueriwzp');
console.log('Database Host: db.otqyrsmxdtcvhueriwzp.supabase.co');
console.log('Database Port: 5432');
console.log('Database Name: postgres');
console.log('Database User: postgres');
console.log('Database Password: [Get from Supabase Dashboard]\n');

console.log('Expected connection string format:');
console.log('postgresql://postgres:[PASSWORD]@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres\n');

console.log('Once you have the password, update your .env.local file:');
console.log('DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres"\n');

console.log('Then run: npm run setup-supabase');

