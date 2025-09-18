#!/usr/bin/env node

/**
 * Mobile Responsiveness Test Script
 * Tests admin panel on various mobile screen sizes
 */

const puppeteer = require('puppeteer');
const path = require('path');

const MOBILE_DEVICES = {
  'iPhone SE': { width: 375, height: 667, deviceScaleFactor: 2, isMobile: true },
  'iPhone 12 Pro': { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
  'iPhone 12 Pro Max': { width: 428, height: 926, deviceScaleFactor: 3, isMobile: true },
  'Pixel 5': { width: 393, height: 851, deviceScaleFactor: 3, isMobile: true },
  'Galaxy S20 Ultra': { width: 412, height: 915, deviceScaleFactor: 3.5, isMobile: true },
  'Small Mobile': { width: 320, height: 568, deviceScaleFactor: 2, isMobile: true }, // Very small screen
};

async function testMobileResponsiveness() {
  console.log('🚀 Starting mobile responsiveness tests...\n');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false, // Set to true for headless testing
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const baseUrl = 'http://localhost:3000';
    
    // Test each device
    for (const [deviceName, viewport] of Object.entries(MOBILE_DEVICES)) {
      console.log(`📱 Testing on ${deviceName} (${viewport.width}x${viewport.height})`);
      
      const page = await browser.newPage();
      await page.setViewport(viewport);
      
      try {
        // Test mobile test page first
        console.log('  → Testing mobile test page...');
        await page.goto(`${baseUrl}/test-mobile-admin`, { waitUntil: 'networkidle0' });
        
        // Check if page loaded successfully
        const title = await page.title();
        console.log(`  ✓ Page loaded: ${title}`);
        
        // Test touch targets
        const touchTargets = await page.$$eval('button, input[type="checkbox"], input[type="range"]', elements => {
          return elements.map(el => {
            const rect = el.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(el);
            return {
              tag: el.tagName.toLowerCase(),
              width: Math.max(rect.width, parseFloat(computedStyle.minWidth) || 0),
              height: Math.max(rect.height, parseFloat(computedStyle.minHeight) || 0),
              className: el.className
            };
          });
        });
        
        // Check touch target sizes (should be at least 44px)
        const invalidTargets = touchTargets.filter(target => 
          target.width < 44 || target.height < 44
        );
        
        if (invalidTargets.length === 0) {
          console.log('  ✓ All touch targets meet 44px minimum requirement');
        } else {
          console.log('  ❌ Found touch targets smaller than 44px:', invalidTargets);
        }
        
        // Test admin panel
        console.log('  → Testing admin panel...');
        await page.goto(`${baseUrl}/admin/personalization`, { waitUntil: 'networkidle0' });
        
        // Check if admin panel loads
        const adminTitle = await page.title();
        console.log(`  ✓ Admin panel loaded: ${adminTitle}`);
        
        // Test horizontal scrolling
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        
        if (!hasHorizontalScroll) {
          console.log('  ✓ No horizontal scrolling detected');
        } else {
          console.log('  ❌ Horizontal scrolling detected');
        }
        
        // Test tab navigation
        const tabs = await page.$$('[role="tab"], button[class*="tab"]');
        if (tabs.length > 0) {
          console.log(`  ✓ Found ${tabs.length} navigation tabs`);
          
          // Test clicking the first tab
          await tabs[0].click();
          await page.waitForTimeout(500);
          console.log('  ✓ Tab navigation works');
        }
        
        // Test form inputs don't cause zoom (font-size should be >= 16px)
        const inputSizes = await page.$$eval('input[type="text"], input[type="url"], input[type="email"]', inputs => {
          return inputs.map(input => {
            const computedStyle = window.getComputedStyle(input);
            return parseFloat(computedStyle.fontSize);
          });
        });
        
        const zoomCausingInputs = inputSizes.filter(size => size < 16);
        if (zoomCausingInputs.length === 0) {
          console.log('  ✓ All text inputs have font-size >= 16px (prevents zoom)');
        } else {
          console.log('  ❌ Found inputs that may cause zoom:', zoomCausingInputs);
        }
        
        // Take screenshot
        await page.screenshot({
          path: `mobile-test-${deviceName.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true
        });
        console.log(`  📸 Screenshot saved for ${deviceName}`);
        
      } catch (error) {
        console.log(`  ❌ Error testing ${deviceName}:`, error.message);
      }
      
      await page.close();
      console.log(`  ✅ ${deviceName} testing completed\n`);
    }
    
    console.log('🎉 Mobile responsiveness testing completed!');
    console.log('\n📊 Summary:');
    console.log('- Tested admin panel on 6 different mobile devices');
    console.log('- Verified touch target sizes (minimum 44px)');
    console.log('- Checked for horizontal scrolling issues');
    console.log('- Validated input font sizes to prevent zoom');
    console.log('- Captured screenshots for visual verification');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  testMobileResponsiveness().catch(console.error);
}

module.exports = { testMobileResponsiveness };
