#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://142.132.205.187';

// Get token from command line argument, environment, or .env file
let STRAPI_TOKEN = process.argv[2] || process.env.NUXT_PUBLIC_STRAPI_TOKEN;

// If no token from args/env, try reading from .env file
if (!STRAPI_TOKEN || STRAPI_TOKEN === 'YOUR_NEW_TOKEN_HERE') {
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const tokenMatch = envContent.match(/NUXT_PUBLIC_STRAPI_TOKEN=(.+)/);
    STRAPI_TOKEN = tokenMatch ? tokenMatch[1].trim() : null;
  } catch (error) {
    // .env file not found or unreadable - will show error below
  }
}

if (!STRAPI_TOKEN || STRAPI_TOKEN === 'YOUR_NEW_TOKEN_HERE') {
  console.log('❌ No API token provided!');
  console.log('\nUsage:');
  console.log('  node test-strapi-connection.js YOUR_TOKEN_HERE');
  console.log('  or set NUXT_PUBLIC_STRAPI_TOKEN in .env file');
  console.log('\n🔧 Get your token from: http://142.132.205.187/admin/');
  console.log('   Settings → API Tokens → Create new API Token');
  process.exit(1);
}

console.log('🧪 Testing Strapi connection...\n');

async function testConnection() {
  try {
    console.log('🔗 Testing basic connection...');
    const response = await fetch(`${STRAPI_URL}/api/homepage`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`📡 Response status: ${response.status}`);
    
    if (response.status === 401) {
      console.log('❌ Invalid API token');
      console.log('🔧 Generate a new token at: http://142.132.205.187/admin/');
      return false;
    }
    
    if (response.status === 404) {
      console.log('❌ Homepage content type not found');
      console.log('🔧 Create the Homepage content type in Strapi admin');
      console.log('   Content-Types Builder → Create new single type → "Homepage"');
      return false;
    }
    
    if (response.status === 403) {
      console.log('❌ Permission denied');
      console.log('🔧 Enable public permissions for Homepage content type');
      console.log('   Settings → Users & Permissions → Roles → Public → Homepage → find & findOne');
      return false;
    }

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Connection successful!');
      
      if (data.data) {
        console.log('📄 Homepage content found');
        console.log(`📝 Content fields: ${Object.keys(data.data.attributes || data.data).length}`);
      } else {
        console.log('📝 No homepage content yet (this is normal for new setup)');
      }
      
      return true;
    } else {
      console.log(`❌ Unexpected response: ${response.status}`);
      console.log('Response:', data);
      return false;
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('🔧 Check if Strapi server is running at: http://142.132.205.187');
      console.log('🔧 Check firewall rules for port 80');
    }
    
    return false;
  }
}

async function testFeatures() {
  console.log('\n🧪 Testing features endpoint...');
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/nfeatures`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Features endpoint working');
      console.log(`📊 Found ${data.data?.length || 0} features`);
    } else {
      console.log(`⚠️  Features endpoint issue: ${response.status}`);
    }
  } catch (error) {
    console.log('⚠️  Features test failed:', error.message);
  }
}

// Run tests
testConnection().then(success => {
  if (success) {
    testFeatures().then(() => {
      console.log('\n🎉 Testing complete!');
      
      if (success) {
        console.log('\n📋 Next steps:');
        console.log('1. Update your .env file with the working token');
        console.log('2. Run: node setup-homepage-cms.cjs');
        console.log('3. Visit: http://localhost:3002/strapi-test');
        console.log('4. Check your site: http://localhost:3002/');
      }
    });
  }
});