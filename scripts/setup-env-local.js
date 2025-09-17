#!/usr/bin/env node

/**
 * 🔧 Setup .env.local file
 * 
 * This script helps you create the .env.local file with the correct Supabase configuration.
 */

const fs = require('fs');
const path = require('path');

const envContent = `# Database - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://otqyrsmxdtcvhueriwzp.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AWS S3 Configuration (for video storage)
AWS_REGION="eu-north-1"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_S3_BUCKET_NAME="only-you-coaching"

# Stripe (optional)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
`;

const envPath = path.join(__dirname, '..', '.env.local');

console.log('🔧 Setting up .env.local file...');
console.log('================================\n');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists. Backing up to .env.local.backup');
  fs.copyFileSync(envPath, envPath + '.backup');
}

fs.writeFileSync(envPath, envContent);

console.log('✅ Created .env.local file!');
console.log('\n📋 Next steps:');
console.log('1. Go to: https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp');
console.log('2. Click on "Settings" → "API"');
console.log('3. Copy the following values and update .env.local:');
console.log('   - Database password (for DATABASE_URL)');
console.log('   - anon/public key (for NEXT_PUBLIC_SUPABASE_ANON_KEY)');
console.log('   - service_role key (for SUPABASE_SERVICE_ROLE_KEY)');
console.log('\n4. Run: npm run dev');
console.log('\n🔑 Current Supabase project: https://otqyrsmxdtcvhueriwzp.supabase.co');

