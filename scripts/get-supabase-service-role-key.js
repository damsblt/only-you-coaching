#!/usr/bin/env node

/**
 * Script to help you get the correct Supabase Service Role Key
 * 
 * The service role key is different from the anon key and has elevated permissions.
 * You can find it in your Supabase dashboard:
 * 1. Go to https://supabase.com/dashboard
 * 2. Select your project (otqyrsmxdtcvhueriwzp)
 * 3. Go to Settings > API
 * 4. Copy the "service_role" key (not the "anon" key)
 */

console.log('🔑 Supabase Service Role Key Helper');
console.log('');
console.log('To get your Supabase Service Role Key:');
console.log('1. Go to: https://supabase.com/dashboard');
console.log('2. Select your project: otqyrsmxdtcvhueriwzp');
console.log('3. Navigate to: Settings > API');
console.log('4. Copy the "service_role" key (NOT the "anon" key)');
console.log('');
console.log('The service role key should look like:');
console.log('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXlyc214ZHRjdmh1ZXJpd3pwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyMzQ3MCwiZXhwIjoyMDczNTk5NDcwfQ.XXXXX');
console.log('');
console.log('Once you have it, run:');
console.log('vercel env add SUPABASE_SERVICE_ROLE_KEY production');
console.log('Then paste the service role key when prompted.');
