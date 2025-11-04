/**
 * IndexNow Implementation for D.E. Technics
 * Automatically notifies search engines when content is updated
 *
 * Usage:
 * - Single URL: node indexnow.js https://detechnics.com/de-210-horizontal-form-fill-seal-machine.html
 * - Multiple URLs: node indexnow.js url1 url2 url3
 * - All pages: node indexnow.js --all
 */

import https from "node:https";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// IndexNow configuration
const INDEXNOW_KEY = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"; // Generate your own key
const HOST = "detechnics.com";
const INDEXNOW_ENDPOINTS = ["api.indexnow.org", "www.bing.com"];

// All website URLs for --all option
const ALL_URLS = [
  "https://detechnics.com/",
  "https://detechnics.com/about.html",
  "https://detechnics.com/products.html",
  "https://detechnics.com/services.html",
  "https://detechnics.com/clients.html",
  "https://detechnics.com/export.html",
  "https://detechnics.com/blog.html",
  "https://detechnics.com/contact.html",
  "https://detechnics.com/quote-form.html",
  "https://detechnics.com/policy.html",
  // HFFS Machines
  "https://detechnics.com/de-200-horizontal-form-fill-seal-machine.html",
  "https://detechnics.com/de-2000-horizontal-form-fill-seal-machine.html",
  "https://detechnics.com/de-2000CW-horizontal-form-fill-seal-machine.html",
  "https://detechnics.com/de-202-horizontal-form-fill-seal-machine.html",
  "https://detechnics.com/de-210-horizontal-form-fill-seal-machine.html",
  "https://detechnics.com/de-2050SS-horizontal-form-fill-seal-machine.html",
  "https://detechnics.com/de-800-super-wrap.html",
  // Biscuit Wrapping Machines
  "https://detechnics.com/de-300-on-edge-biscuit-wrapping-machine.html",
  "https://detechnics.com/de-310-on-edge-biscuit-wrapping-machine.html",
  "https://detechnics.com/de-4050-on-edge-biscuit-wrapping-machine.html",
  // Wafer Equipment
  "https://detechnics.com/wafer-lines.html",
  "https://detechnics.com/wafer-spreading-machine.html",
  "https://detechnics.com/automatic-wafer-spread-machine.html",
  "https://detechnics.com/wafer-cutter.html",
  "https://detechnics.com/turbo-mixer.html",
  "https://detechnics.com/control-panel.html",
  "https://detechnics.com/cream-mixer.html",
  "https://detechnics.com/batter-holding-tank.html",
  // Other Equipment
  "https://detechnics.com/de-ow-overwrapper.html",
  "https://detechnics.com/de-br-batch-roller.html",
  "https://detechnics.com/de-rs-rope-sizer.html",
];

/**
 * Submit URLs to IndexNow with enhanced error handling
 */
async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    throw new Error("No URLs provided for submission");
  }

  // Validate URLs
  const validUrls = urls.filter(url => {
    try {
      new URL(url);
      return url.startsWith('https://');
    } catch {
      console.warn(`⚠️ Invalid URL skipped: ${url}`);
      return false;
    }
  });

  if (validUrls.length === 0) {
    throw new Error("No valid URLs found for submission");
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    urlList: validUrls,
  };

  const data = JSON.stringify(payload);
  const results = [];

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const result = await submitToEndpoint(endpoint, data);
      console.log(
        `✅ Successfully submitted ${validUrls.length} URLs to ${endpoint} (Status: ${result.statusCode})`
      );
      results.push({
        endpoint,
        success: true,
        statusCode: result.statusCode,
        urlCount: validUrls.length
      });
    } catch (error) {
      console.error(`❌ Failed to submit to ${endpoint}:`, error.message);
      results.push({
        endpoint,
        success: false,
        error: error.message,
        urlCount: validUrls.length
      });
    }
  }

  return results;
}

/**
 * Submit to a specific IndexNow endpoint with retry logic
 */
async function submitToEndpoint(endpoint, data, retryCount = 0) {
  const maxRetries = 3;
  const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff

  return new Promise((resolve, reject) => {
    const options = {
      hostname: endpoint,
      port: 443,
      path: "/indexnow",
      method: "POST",
      timeout: 10000, // 10 second timeout
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
        "User-Agent": "IndexNow-Client/1.0",
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          resolve({
            statusCode: res.statusCode,
            data: responseData,
            endpoint: endpoint
          });
        } else if (res.statusCode === 429 && retryCount < maxRetries) {
          // Rate limited - retry with exponential backoff
          console.log(`⏳ Rate limited by ${endpoint}, retrying in ${retryDelay}ms...`);
          setTimeout(async () => {
            try {
              const result = await submitToEndpoint(endpoint, data, retryCount + 1);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }, retryDelay);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on("error", async (error) => {
      if (retryCount < maxRetries && (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT')) {
        console.log(`🔄 Connection error to ${endpoint}, retrying in ${retryDelay}ms...`);
        setTimeout(async () => {
          try {
            const result = await submitToEndpoint(endpoint, data, retryCount + 1);
            resolve(result);
          } catch (retryError) {
            reject(retryError);
          }
        }, retryDelay);
      } else {
        reject(error);
      }
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error(`Request timeout to ${endpoint}`));
    });

    req.write(data);
    req.end();
  });
}

/**
 * Validate IndexNow key file exists and is accessible
 */
function validateKeyFile() {
  const keyFilePath = `public/${INDEXNOW_KEY}.txt`;
  
  try {
    if (!fs.existsSync(keyFilePath)) {
      throw new Error(`IndexNow key file not found: ${keyFilePath}`);
    }
    
    const keyContent = fs.readFileSync(keyFilePath, 'utf8').trim();
    if (keyContent !== INDEXNOW_KEY) {
      throw new Error(`IndexNow key file content mismatch. Expected: ${INDEXNOW_KEY}, Found: ${keyContent}`);
    }
    
    console.log(`✅ IndexNow key file validated: ${keyFilePath}`);
    return true;
  } catch (error) {
    console.error(`❌ IndexNow key file validation failed:`, error.message);
    return false;
  }
}

/**
 * Create IndexNow key file
 */
function createKeyFile() {
  const keyFilePath = `public/${INDEXNOW_KEY}.txt`;

  if (!fs.existsSync(keyFilePath)) {
    try {
      fs.writeFileSync(keyFilePath, INDEXNOW_KEY);
      console.log(`✅ Created IndexNow key file: ${keyFilePath}`);
      console.log(
        `📝 Upload this file to your website root: https://${HOST}/${INDEXNOW_KEY}.txt`
      );
    } catch (error) {
      console.error(`❌ Failed to create IndexNow key file:`, error.message);
      throw error;
    }
  } else {
    console.log(`📁 IndexNow key file already exists: ${keyFilePath}`);
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🚀 IndexNow for D.E. Technics

Usage:
  node indexnow.js <url1> [url2] [url3] ...     Submit specific URLs
  node indexnow.js --all                        Submit all website URLs
  node indexnow.js --setup                      Create key file only

Examples:
  node indexnow.js https://detechnics.com/de-210-horizontal-form-fill-seal-machine.html
  node indexnow.js --all
    `);
    return;
  }

  // Create and validate key file
  createKeyFile();
  
  if (!validateKeyFile()) {
    console.error("❌ IndexNow setup failed. Please check the key file.");
    return;
  }

  if (args[0] === "--setup") {
    console.log("✅ Setup complete! Upload the key file to your website.");
    return;
  }

  let urlsToSubmit = [];

  if (args[0] === "--all") {
    urlsToSubmit = ALL_URLS;
    console.log(`📤 Submitting all ${ALL_URLS.length} URLs to IndexNow...`);
  } else {
    urlsToSubmit = args.filter((url) => url.startsWith("http"));
    console.log(`📤 Submitting ${urlsToSubmit.length} URLs to IndexNow...`);
  }

  if (urlsToSubmit.length === 0) {
    console.error("❌ No valid URLs provided");
    return;
  }

  // Submit in batches of 10 (IndexNow limit)
  const batchSize = 10;
  for (let i = 0; i < urlsToSubmit.length; i += batchSize) {
    const batch = urlsToSubmit.slice(i, i + batchSize);
    await submitToIndexNow(batch);

    // Small delay between batches
    if (i + batchSize < urlsToSubmit.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("🎉 IndexNow submission complete!");
}

// Run the script if called directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main().catch(console.error);
}

export { submitToIndexNow, validateKeyFile, createKeyFile, ALL_URLS };
