#!/usr/bin/env node

/**
 * 🔑 Update Supabase Credentials Helper
 * 
 * This script helps you update the .env.local file with real Supabase credentials.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '..', '.env.local');

console.log('🔑 Supabase Credentials Update Helper');
console.log('=====================================\n');

console.log('📋 Please get your credentials from:');
console.log('https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp');
console.log('Settings → API\n');

async function updateCredentials() {
  try {
    // Read current .env.local
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Get database password
    const dbPassword = await new Promise((resolve) => {
      rl.question('🔐 Enter your Supabase database password: ', resolve);
    });

    // Get anon key
    const anonKey = await new Promise((resolve) => {
      rl.question('🔑 Enter your Supabase anon/public key: ', resolve);
    });

    // Get service role key
    const serviceRoleKey = await new Promise((resolve) => {
      rl.question('🔑 Enter your Supabase service_role key: ', resolve);
    });

    // Update the .env.local content
    const updatedContent = envContent
      .replace(/DATABASE_URL="postgresql:\/\/postgres:\[.*?\]@db\.otqyrsmxdtcvhueriwzp\.supabase\.co:5432\/postgres"/, 
               `DATABASE_URL="postgresql://postgres:${dbPassword}@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres"`)
      .replace(/NEXT_PUBLIC_SUPABASE_ANON_KEY="\[.*?\]"/, 
               `NEXT_PUBLIC_SUPABASE_ANON_KEY="${anonKey}"`)
      .replace(/SUPABASE_SERVICE_ROLE_KEY="\[.*?\]"/, 
               `SUPABASE_SERVICE_ROLE_KEY="${serviceRoleKey}"`);

    // Write updated content
    fs.writeFileSync(envPath, updatedContent);

    console.log('\n✅ Credentials updated successfully!');
    console.log('\n🔄 Please restart your development server:');
    console.log('npm run dev');
    console.log('\n🌐 Then visit:');
    console.log('http://localhost:3000/videos');
    console.log('http://localhost:3000/programmes');

  } catch (error) {
    console.error('❌ Error updating credentials:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  updateCredentials();
}

