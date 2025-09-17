#!/usr/bin/env node

/**
 * 🔧 Setup Environment Variables
 * 
 * This script creates the .env.local file with the correct Supabase configuration.
 */

const fs = require('fs');
const path = require('path');

const envContent = `# Database
DATABASE_URL="postgresql://postgres:otqyrsmxdtcvhueriwzp@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://otqyrsmxdtcvhueriwzp.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXlyc214ZHRjdmh1ZXJpd3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MzQ4MDAsImV4cCI6MjA1MDAxMDgwMH0.placeholder"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXlyc214ZHRjdmh1ZXJpd3pwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDQzNDgwMCwiZXhwIjoyMDUwMDEwODAwfQ.placeholder"

# AWS S3 Configuration (for video storage)
AWS_REGION="eu-north-1"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_S3_BUCKET_NAME="only-you-coaching"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
`;

const envPath = path.join(__dirname, '..', '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('📝 Please update the Supabase keys with the real values from your Supabase dashboard.');
  console.log('🔗 Get your keys from: https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp/settings/api');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
}

