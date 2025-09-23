const STRAPI_URL = 'http://localhost:1337';

const possibleEndpoints = [
  'homepage',
  'nhomepage', 
  'homepages',
  'nhomepages',
  'home-page',
  'home-pages'
];

console.log('🔍 Discovering Strapi endpoints...\n');

async function testEndpoint(endpoint) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    const data = await response.json();
    
    if (response.status === 200) {
      console.log(`✅ /${endpoint} - FOUND (Status: ${response.status})`);
      return true;
    } else if (response.status === 403) {
      console.log(`🔒 /${endpoint} - EXISTS but needs permissions (Status: ${response.status})`);  
      return true;
    } else {
      console.log(`❌ /${endpoint} - Not found (Status: ${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ /${endpoint} - Error: ${error.message}`);
    return false;
  }
}

async function discoverEndpoints() {
  console.log('Testing possible Homepage content type endpoints:\n');
  
  let found = false;
  for (const endpoint of possibleEndpoints) {
    const exists = await testEndpoint(endpoint);
    if (exists) found = true;
    await new Promise(resolve => setTimeout(resolve, 200)); // Small delay
  }
  
  if (!found) {
    console.log('\n🔧 No homepage endpoints found. Next steps:');
    console.log('1. Verify Homepage content type was created in Strapi admin');
    console.log('2. Check the API ID in Content-Type Builder → Homepage');
    console.log('3. Ensure Strapi was restarted after creating the content type'); 
    console.log('4. Set permissions: Settings → Roles → Public → Homepage (find)');
  }
  
  console.log('\n📋 For reference, working endpoints:');
  await testEndpoint('nfeatures'); // We know this works
  await testEndpoint('nnews');     // We know this works
}

discoverEndpoints().catch(console.error);