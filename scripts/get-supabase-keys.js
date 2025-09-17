#!/usr/bin/env node

/**
 * 🔑 Get Supabase API Keys
 * 
 * This script helps you get the correct Supabase API keys.
 */

console.log('🔑 Supabase API Keys Setup');
console.log('==========================\n');

console.log('To get your Supabase API keys:');
console.log('1. Go to: https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp');
console.log('2. Click on "Settings" in the left sidebar');
console.log('3. Click on "API"');
console.log('4. Copy the following keys:\n');

console.log('📋 Copy these values:');
console.log('=====================');
console.log('Project URL: https://otqyrsmxdtcvhueriwzp.supabase.co');
console.log('anon/public key: [Copy from API settings]');
console.log('service_role key: [Copy from API settings]\n');

console.log('🔧 Then update your .env.local file with:');
console.log('NEXT_PUBLIC_SUPABASE_URL="https://otqyrsmxdtcvhueriwzp.supabase.co"');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"');
console.log('SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"');

console.log('\n📝 After updating .env.local, restart the dev server:');
console.log('npm run dev');

