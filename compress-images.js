#!/usr/bin/env node

/**
 * Image Compression Script using Sharp
 * Optimizes all images in all-pictures-again folder
 * Outputs to all-pictures-optimized with same structure
 *
 * Features:
 * - JPEG: Quality 80, progressive, optimize
 * - PNG: Quality 80, compression level 9
 * - WebP: Quality 80 (better compression than JPEG/PNG)
 * - Maintains folder structure
 * - Progress tracking
 * - Compression statistics
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: 'all-pictures-again',
  outputDir: 'all-pictures-optimized',
  quality: {
    jpeg: 80,
    png: 80,
    webp: 80
  },
  // Convert images to WebP for best compression?
  convertToWebP: false, // Set to true to convert all to WebP
  // Resize large images?
  maxWidth: 2400, // Max width (null to disable)
  maxHeight: 2400 // Max height (null to disable)
};

// Statistics
const stats = {
  processed: 0,
  failed: 0,
  originalSize: 0,
  compressedSize: 0,
  files: []
};

/**
 * Get file size in bytes
 */
async function getFileSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Process a single image
 */
async function processImage(inputPath, outputPath, ext) {
  try {
    const originalSize = await getFileSize(inputPath);

    // Create Sharp instance
    let image = sharp(inputPath);

    // Get metadata
    const metadata = await image.metadata();

    // Apply EXIF orientation (auto-rotate based on EXIF before resizing)
    image = image.rotate();

    // Resize if needed
    if (CONFIG.maxWidth || CONFIG.maxHeight) {
      const resizeOptions = {};
      if (CONFIG.maxWidth) resizeOptions.width = CONFIG.maxWidth;
      if (CONFIG.maxHeight) resizeOptions.height = CONFIG.maxHeight;
      resizeOptions.fit = 'inside';
      resizeOptions.withoutEnlargement = true;

      image = image.resize(resizeOptions);
    }

    // Apply compression based on format
    const lowerExt = ext.toLowerCase();

    if (CONFIG.convertToWebP) {
      // Convert to WebP for best compression
      await image
        .webp({ quality: CONFIG.quality.webp, effort: 6 })
        .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    } else if (lowerExt === '.jpg' || lowerExt === '.jpeg') {
      // JPEG optimization
      await image
        .jpeg({
          quality: CONFIG.quality.jpeg,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
    } else if (lowerExt === '.png') {
      // PNG optimization
      await image
        .png({
          quality: CONFIG.quality.png,
          compressionLevel: 9,
          progressive: true
        })
        .toFile(outputPath);
    } else if (lowerExt === '.webp') {
      // WebP optimization
      await image
        .webp({
          quality: CONFIG.quality.webp,
          effort: 6
        })
        .toFile(outputPath);
    } else {
      // Copy other formats as-is
      await fs.copyFile(inputPath, outputPath);
    }

    const compressedSize = await getFileSize(outputPath);
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    stats.originalSize += originalSize;
    stats.compressedSize += compressedSize;
    stats.processed++;

    stats.files.push({
      name: path.basename(inputPath),
      folder: path.dirname(inputPath).replace(CONFIG.sourceDir + '/', ''),
      originalSize,
      compressedSize,
      savings: parseFloat(savings)
    });

    console.log(`✓ ${path.basename(inputPath)} → ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (${savings}% saved)`);

    return true;
  } catch (error) {
    console.error(`✗ Failed to process ${inputPath}:`, error.message);
    stats.failed++;
    return false;
  }
}

/**
 * Process all images in a folder
 */
async function processFolder(folderName) {
  const sourcePath = path.join(CONFIG.sourceDir, folderName);
  const outputPath = path.join(CONFIG.outputDir, folderName);

  console.log(`\n📁 Processing: ${folderName}`);
  console.log('─'.repeat(60));

  // Create output directory if it doesn't exist
  await fs.mkdir(outputPath, { recursive: true });

  try {
    const files = await fs.readdir(sourcePath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();

      // Skip non-image files
      if (!['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
        continue;
      }

      const inputPath = path.join(sourcePath, file);
      const outputFile = CONFIG.convertToWebP && ['.jpg', '.jpeg', '.png'].includes(ext)
        ? file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
        : file;
      const outputFilePath = path.join(outputPath, outputFile);

      await processImage(inputPath, outputFilePath, ext);
    }
  } catch (error) {
    console.error(`Error processing folder ${folderName}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('\n🚀 Image Compression Starting...');
  console.log('═'.repeat(60));
  console.log(`Source: ${CONFIG.sourceDir}`);
  console.log(`Output: ${CONFIG.outputDir}`);
  console.log(`JPEG Quality: ${CONFIG.quality.jpeg}`);
  console.log(`PNG Quality: ${CONFIG.quality.png}`);
  console.log(`WebP Quality: ${CONFIG.quality.webp}`);
  console.log(`Convert to WebP: ${CONFIG.convertToWebP ? 'Yes' : 'No'}`);
  console.log(`Max Dimensions: ${CONFIG.maxWidth || 'unlimited'}x${CONFIG.maxHeight || 'unlimited'}`);
  console.log('═'.repeat(60));

  const startTime = Date.now();

  try {
    // Get all folders
    const folders = await fs.readdir(CONFIG.sourceDir);

    // Process each folder
    for (const folder of folders) {
      const folderPath = path.join(CONFIG.sourceDir, folder);
      const stat = await fs.stat(folderPath);

      if (stat.isDirectory()) {
        await processFolder(folder);
      }
    }

    // Print statistics
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    const totalSavings = stats.originalSize - stats.compressedSize;
    const savingsPercent = ((totalSavings / stats.originalSize) * 100).toFixed(2);

    console.log('\n═'.repeat(60));
    console.log('📊 COMPRESSION REPORT');
    console.log('═'.repeat(60));
    console.log(`✓ Successfully processed: ${stats.processed} images`);
    console.log(`✗ Failed: ${stats.failed} images`);
    console.log(`⏱  Duration: ${duration} seconds`);
    console.log('');
    console.log(`📦 Original total size: ${formatBytes(stats.originalSize)}`);
    console.log(`📦 Compressed total size: ${formatBytes(stats.compressedSize)}`);
    console.log(`💾 Total saved: ${formatBytes(totalSavings)} (${savingsPercent}%)`);
    console.log('═'.repeat(60));

    // Save detailed report
    const report = {
      summary: {
        processed: stats.processed,
        failed: stats.failed,
        duration: `${duration}s`,
        originalSize: stats.originalSize,
        compressedSize: stats.compressedSize,
        totalSavings: totalSavings,
        savingsPercent: `${savingsPercent}%`
      },
      files: stats.files.sort((a, b) => b.savings - a.savings)
    };

    await fs.writeFile(
      'compression-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('\n📄 Detailed report saved to: compression-report.json\n');

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run
main().catch(console.error);
