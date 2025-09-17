#!/usr/bin/env node

/**
 * Environment Setup Script for Only You Coaching App
 * 
 * This script helps set up environment variables for both local development and Vercel deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Only You Coaching - Environment Setup');
console.log('==========================================\n');

// Environment template for local development
const localEnvTemplate = `# Database - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:tIwji3-gergiv-mihsew@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://otqyrsmxdtcvhueriwzp.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXlyc214ZHRjdmh1ZXJpd3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjM0NzAsImV4cCI6MjA3MzU5OTQ3MH0.d5jzLsK3V_rHWGN7xNK1g8dTKm7DXuGEbFOrURGM0s4"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY_HERE"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

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

// Vercel environment variables to set
const vercelEnvVars = {
  'NEXT_PUBLIC_SUPABASE_URL': 'https://otqyrsmxdtcvhueriwzp.supabase.co',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXlyc214ZHRjdmh1ZXJpd3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjM0NzAsImV4cCI6MjA3MzU5OTQ3MH0.d5jzLsK3V_rHWGN7xNK1g8dTKm7DXuGEbFOrURGM0s4',
  'DATABASE_URL': 'postgresql://postgres:tIwji3-gergiv-mihsew@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres',
  'NEXTAUTH_URL': 'https://only-you-coaching.vercel.app',
  'NEXTAUTH_SECRET': 'your-production-secret-key-here',
  'AWS_REGION': 'eu-north-1',
  'AWS_S3_BUCKET_NAME': 'only-you-coaching'
};

console.log('📋 Current Environment Status:');
console.log('==============================');

// Check if .env.local exists
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  console.log('✅ .env.local file exists');
} else {
  console.log('❌ .env.local file missing');
  console.log('📝 Creating .env.local template...');
  fs.writeFileSync(envLocalPath, localEnvTemplate);
  console.log('✅ .env.local template created');
}

console.log('\n🔧 Vercel Environment Variables:');
console.log('=================================');

Object.entries(vercelEnvVars).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

console.log('\n⚠️  IMPORTANT: You need to set the SUPABASE_SERVICE_ROLE_KEY manually!');
console.log('1. Get it from: https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp/settings/api');
console.log('2. Run: vercel env add SUPABASE_SERVICE_ROLE_KEY production');
console.log('3. Also set your AWS credentials: vercel env add AWS_ACCESS_KEY_ID production');

console.log('\n🚀 Next Steps:');
console.log('==============');
console.log('1. Update .env.local with your actual service role key');
console.log('2. Set up AWS credentials in both .env.local and Vercel');
console.log('3. Test locally: npm run dev');
console.log('4. Deploy to Vercel: vercel --prod');

console.log('\n✨ Environment setup complete!');
