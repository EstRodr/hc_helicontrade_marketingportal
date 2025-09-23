const fs = require('fs');

// Test current token
async function testCurrentToken() {
  console.log('🔄 Testing current Strapi token...\n');
  
  // Read token from .env
  const envContent = fs.readFileSync('.env', 'utf8');
  const tokenMatch = envContent.match(/NUXT_PUBLIC_STRAPI_TOKEN=(.+)/);
  const token = tokenMatch ? tokenMatch[1].trim() : null;
  
  if (!token) {
    console.log('❌ No token found in .env file');
    return;
  }
  
  console.log(`📝 Found token: ${token.substring(0, 20)}...`);
  
  try {
    // Test the articles endpoint
    const response = await fetch('http://localhost:1337/api/articles', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    const data = await response.text();
    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log('✅ Token works! Connection successful.');
      console.log('📄 Response:', data.substring(0, 100) + '...');
      
      console.log('\n🎉 Authentication is working!');
      console.log('Next steps:');
      console.log('1. Run: node scripts/setup-strapi-content.js');
      console.log('2. Test at: http://helicontrade.local:3000/strapi-test');
    } else {
      console.log('❌ Token failed');
      console.log('📄 Error response:', data);
      
      if (response.status === 401) {
        console.log('\n🔧 Fix: Token is invalid. Create a new one:');
        console.log('1. Go to http://localhost:1337/admin');
        console.log('2. Settings → API Tokens');
        console.log('3. Create new "Full Access" token');
        console.log('4. Update .env file with new token');
      } else if (response.status === 404) {
        console.log('\n🔧 Fix: Article content type missing');
        console.log('1. Go to http://localhost:1337/admin');
        console.log('2. Content-Type Builder → Create Collection Type: "Article"');
        console.log('3. Add fields: title, slug, content, excerpt, author');
        console.log('4. Settings → Roles → Public → Enable Article permissions');
      }
    }
    
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    console.log('\n🔧 Check that Strapi is running on http://localhost:1337');
  }
}

testCurrentToken();