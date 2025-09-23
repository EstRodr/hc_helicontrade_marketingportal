#!/usr/bin/env node

/**
 * Strapi Authentication Fix Script
 * 
 * This script helps diagnose and fix Strapi authentication issues
 * by testing the current token and providing guidance for fixes.
 */

import fs from 'fs';
const STRAPI_URL = 'http://localhost:1337';

// Get token from environment or current .env file
function getTokenFromEnv() {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const tokenMatch = envContent.match(/NUXT_PUBLIC_STRAPI_TOKEN=(.+)/);
    return tokenMatch ? tokenMatch[1].trim().replace(/["']/g, '') : null;
  } catch (error) {
    return null;
  }
}

async function testConnection(token) {
  if (!token) {
    return { success: false, error: 'No token provided' };
  }

  try {
    const response = await fetch(`${STRAPI_URL}/api/articles`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    const data = await response.text();
    
    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function testBasicAccess() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin`);
    return {
      success: response.ok,
      status: response.status,
      accessible: response.status === 200 || response.status === 302
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      accessible: false
    };
  }
}

function updateEnvToken(newToken) {
  try {
    let envContent = fs.readFileSync('.env', 'utf8');
    
    // Replace existing token or add new one
    if (envContent.includes('NUXT_PUBLIC_STRAPI_TOKEN=')) {
      envContent = envContent.replace(
        /NUXT_PUBLIC_STRAPI_TOKEN=.*/,
        `NUXT_PUBLIC_STRAPI_TOKEN=${newToken}`
      );
    } else {
      envContent += `\nNUXT_PUBLIC_STRAPI_TOKEN=${newToken}\n`;
    }
    
    fs.writeFileSync('.env', envContent);
    return true;
  } catch (error) {
    console.error('❌ Failed to update .env file:', error.message);
    return false;
  }
}

async function diagnoseStrapi() {
  console.log('🔍 Strapi Authentication Diagnosis\n');
  
  // Step 1: Check if Strapi admin is accessible
  console.log('1️⃣ Checking Strapi admin accessibility...');
  const adminAccess = await testBasicAccess();
  
  if (!adminAccess.accessible) {
    console.log('❌ Strapi admin is not accessible');
    console.log('   → Make sure Strapi is running on http://localhost:1337');
    console.log('   → Check if the tunnel is working correctly');
    process.exit(1);
  }
  
  console.log('✅ Strapi admin is accessible');
  console.log(`   → Status: ${adminAccess.status}\n`);
  
  // Step 2: Test current token
  console.log('2️⃣ Testing current API token...');
  const currentToken = getTokenFromEnv();
  
  if (!currentToken) {
    console.log('❌ No API token found in .env file');
  } else {
    console.log(`✅ Found token: ${currentToken.substring(0, 20)}...`);
    
    const connectionTest = await testConnection(currentToken);
    
    if (connectionTest.success) {
      console.log('✅ Current token works!');
      console.log('   → Connection successful');
      return;
    } else {
      console.log(`❌ Current token failed: ${connectionTest.status} ${connectionTest.statusText || connectionTest.error}`);
      
      // Analyze the error
      if (connectionTest.status === 401) {
        console.log('   → Token is invalid or expired');
      } else if (connectionTest.status === 404) {
        console.log('   → Article content type does not exist');
      } else if (connectionTest.status === 403) {
        console.log('   → Permission denied - check role permissions');
      }
    }
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Go to: http://localhost:1337/admin');
  console.log('2. Login to your admin account');
  console.log('3. Navigate to Settings → API Tokens');
  console.log('4. Create a new "Full access" token');
  console.log('5. Copy the token and run: node scripts/fix-strapi-auth.js --token YOUR_NEW_TOKEN');
  console.log('\n🔧 Alternative: Run this script with --interactive for step-by-step guidance');
}

async function interactiveSetup() {
  console.log('🛠️  Interactive Strapi Setup\n');
  
  console.log('Please follow these steps:');
  console.log('1. Open http://localhost:1337/admin in your browser');
  console.log('2. Login with your admin credentials');
  console.log('3. Click Settings (gear icon) in the left sidebar');
  console.log('4. Click "API Tokens" under Global settings');
  console.log('5. Click "Create new API Token"');
  console.log('6. Fill in:');
  console.log('   - Name: Marketing Site');
  console.log('   - Description: HeliconTrade marketing site integration');
  console.log('   - Token duration: Unlimited');
  console.log('   - Token type: Full access');
  console.log('7. Click Save and COPY THE TOKEN immediately');
  console.log('\nOnce you have the token, run:');
  console.log('node scripts/fix-strapi-auth.js --token YOUR_NEW_TOKEN\n');
  
  console.log('🎯 Expected token format: c4375317631dd92245... (64+ characters)');
  console.log('⚠️  Important: You can only see the token once after creation!\n');
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--interactive')) {
    await interactiveSetup();
    return;
  }
  
  const tokenIndex = args.indexOf('--token');
  if (tokenIndex !== -1 && args[tokenIndex + 1]) {
    const newToken = args[tokenIndex + 1];
    
    console.log('🔄 Testing new token...');
    const testResult = await testConnection(newToken);
    
    if (testResult.success) {
      console.log('✅ New token works!');
      
      // Update .env file
      if (updateEnvToken(newToken)) {
        console.log('✅ Updated .env file with new token');
        console.log('\n🎉 Authentication fixed!');
        console.log('Next steps:');
        console.log('1. Restart your dev server to pick up the new token');
        console.log('2. Run: node scripts/setup-strapi-content.js');
        console.log('3. Test integration at: http://helicontrade.local:3000/strapi-test');
      }
    } else {
      console.log(`❌ New token failed: ${testResult.status} ${testResult.statusText || testResult.error}`);
      
      if (testResult.status === 404) {
        console.log('\n📝 Article content type is missing. Creating content types...');
        console.log('Please create the Article content type in Strapi admin:');
        console.log('1. Go to Content-Type Builder');
        console.log('2. Create Collection Type: "Article"');
        console.log('3. Add fields: title (Text), slug (UID), content (Rich text), excerpt (Text), author (Text)');
        console.log('4. Save and restart');
        console.log('5. Set permissions: Settings → Roles → Public → Article → Enable find & findOne');
      }
    }
    return;
  }
  
  await diagnoseStrapi();
}

// Run the script
main().catch(console.error);