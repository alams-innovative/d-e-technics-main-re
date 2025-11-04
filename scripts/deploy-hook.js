/**
 * Deployment Hook for D.E. Technics
 * Automatically submits updated URLs to IndexNow after deployment
 */

import { submitToIndexNow, ALL_URLS } from './indexnow.js';
import { fileURLToPath } from 'node:url';

async function deploymentHook() {
  console.log('🚀 Running D.E. Technics deployment hook...');
  
  try {
    // Use all URLs by default (CHANGED_FILES can be passed via CLI if needed)
    const changedUrls = ALL_URLS;
    
    await submitToIndexNow(changedUrls);
    console.log('✅ Successfully submitted URLs to IndexNow');
    
  } catch (error) {
    console.error('❌ Deployment hook failed:', error);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  deploymentHook();
}

export { deploymentHook };
