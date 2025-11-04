import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const minSizeKB = 100; // Only optimize images larger than 100KB

async function optimizeImage(filePath) {
  const stats = fs.statSync(filePath);
  const sizeKB = stats.size / 1024;
  
  // Skip if smaller than threshold
  if (sizeKB < minSizeKB) {
    return null;
  }

  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);
  
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let optimized = false;
    let originalSize = stats.size;
    let newSize = originalSize;

    // Optimize JPEG images
    if (ext === '.jpg' || ext === '.jpeg') {
      const outputPath = path.join(dirName, `${fileName}${ext}`);
      const webpPath = path.join(dirName, `${fileName}.webp`);
      
      // Compress JPEG to 80% quality
      await sharp(filePath)
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath + '.tmp');
      
      // Create WebP version
      await sharp(filePath)
        .webp({ quality: 85 })
        .toFile(webpPath);
      
      // Replace original with optimized
      fs.renameSync(outputPath + '.tmp', outputPath);
      
      const newStats = fs.statSync(outputPath);
      newSize = newStats.size;
      optimized = true;
    }
    
    // Optimize PNG images
    if (ext === '.png') {
      const outputPath = path.join(dirName, `${fileName}${ext}`);
      const webpPath = path.join(dirName, `${fileName}.webp`);
      
      // Compress PNG losslessly
      await sharp(filePath)
        .png({ compressionLevel: 9, progressive: true })
        .toFile(outputPath + '.tmp');
      
      // Create WebP version
      await sharp(filePath)
        .webp({ quality: 90, lossless: false })
        .toFile(webpPath);
      
      // Replace original with optimized
      fs.renameSync(outputPath + '.tmp', outputPath);
      
      const newStats = fs.statSync(outputPath);
      newSize = newStats.size;
      optimized = true;
    }

    if (optimized) {
      const savedKB = ((originalSize - newSize) / 1024).toFixed(2);
      const savedPercent = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
      console.log(`✓ ${path.basename(filePath)}: ${(originalSize/1024).toFixed(2)}KB → ${(newSize/1024).toFixed(2)}KB (saved ${savedKB}KB, ${savedPercent}%)`);
      return { originalSize, newSize, saved: originalSize - newSize };
    }
  } catch (error) {
    console.error(`✗ Error optimizing ${filePath}:`, error.message);
    return null;
  }
  
  return null;
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  const results = [];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      const subResults = await processDirectory(filePath);
      results.push(...subResults);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const result = await optimizeImage(filePath);
        if (result) {
          results.push(result);
        }
      }
    }
  }
  
  return results;
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  console.log(`📁 Scanning: ${imagesDir}`);
  console.log(`📏 Min size: ${minSizeKB}KB\n`);
  
  const results = await processDirectory(imagesDir);
  
  if (results.length === 0) {
    console.log('\n✓ No images needed optimization');
    return;
  }
  
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
  const totalSaved = totalOriginal - totalNew;
  const percentSaved = ((totalSaved / totalOriginal) * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Optimization Summary:');
  console.log('='.repeat(60));
  console.log(`Images optimized: ${results.length}`);
  console.log(`Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`New size: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${percentSaved}%)`);
  console.log('='.repeat(60));
}

main().catch(console.error);
