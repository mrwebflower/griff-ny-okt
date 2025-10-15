#!/usr/bin/env node

/**
 * AGGRESSIVE Image Compression Script using Sharp
 * 2025 Web Performance Standards Compliant
 *
 * Target: All images under 250 KB (200 KB ideal)
 * Strategy: WebP conversion + Quality optimization + Smart resizing
 *
 * Features:
 * - Converts to WebP for 25-35% better compression
 * - Quality 75 for better size reduction
 * - Automatic downsizing for oversized images
 * - Maintains visual quality while hitting file size targets
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration - Aggressive Web Optimization
const CONFIG = {
  sourceDir: 'all-pictures-again',
  outputDir: 'all-pictures-optimized',

  // Target file sizes (2025 standards)
  targetMaxSize: 250 * 1024,  // 250 KB absolute max
  targetIdealSize: 200 * 1024, // 200 KB ideal

  // Quality settings
  quality: {
    webp: 75,    // Lower quality for better compression
    jpeg: 75,    // Fallback for formats that can't convert
    png: 75
  },

  // Convert everything to WebP for best compression
  convertToWebP: true,

  // Max dimensions (will resize larger images)
  maxWidth: 1920,   // Standard full-width
  maxHeight: 1920,

  // Attempt to reduce size further if still over target
  aggressiveMode: true
};

// Statistics
const stats = {
  processed: 0,
  failed: 0,
  originalSize: 0,
  compressedSize: 0,
  oversizedCount: 0,
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
 * Process a single image with aggressive compression
 */
async function processImage(inputPath, outputPath, ext) {
  try {
    const originalSize = await getFileSize(inputPath);

    // Create Sharp instance
    let image = sharp(inputPath);

    // Get metadata
    const metadata = await image.metadata();

    // Calculate if we need to resize based on dimensions
    let needsResize = false;
    let targetWidth = metadata.width;
    let targetHeight = metadata.height;

    if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
      needsResize = true;
    }

    // Initial resize if needed
    if (needsResize || CONFIG.maxWidth || CONFIG.maxHeight) {
      const resizeOptions = {
        width: CONFIG.maxWidth,
        height: CONFIG.maxHeight,
        fit: 'inside',
        withoutEnlargement: true
      };
      image = image.resize(resizeOptions);
    }

    // Determine output format and path
    let finalOutputPath = outputPath;
    if (CONFIG.convertToWebP) {
      finalOutputPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }

    // First compression attempt
    if (CONFIG.convertToWebP) {
      await image
        .webp({
          quality: CONFIG.quality.webp,
          effort: 6,
          smartSubsample: true
        })
        .toFile(finalOutputPath);
    } else {
      const lowerExt = ext.toLowerCase();
      if (lowerExt === '.jpg' || lowerExt === '.jpeg') {
        await image
          .jpeg({
            quality: CONFIG.quality.jpeg,
            progressive: true,
            mozjpeg: true
          })
          .toFile(finalOutputPath);
      } else if (lowerExt === '.png') {
        await image
          .png({
            quality: CONFIG.quality.png,
            compressionLevel: 9,
            progressive: true
          })
          .toFile(finalOutputPath);
      } else if (lowerExt === '.webp') {
        await image
          .webp({
            quality: CONFIG.quality.webp,
            effort: 6
          })
          .toFile(finalOutputPath);
      }
    }

    let compressedSize = await getFileSize(finalOutputPath);

    // Aggressive mode: If still too large, try reducing dimensions
    if (CONFIG.aggressiveMode && compressedSize > CONFIG.targetMaxSize) {
      console.log(`  ⚠️  Still too large (${formatBytes(compressedSize)}), reducing dimensions...`);

      // Try 85% of original dimensions
      let scaleFactor = 0.85;
      let attempts = 0;

      while (compressedSize > CONFIG.targetMaxSize && attempts < 3) {
        const newWidth = Math.floor(metadata.width * scaleFactor);
        const newHeight = Math.floor(metadata.height * scaleFactor);

        image = sharp(inputPath).resize({
          width: newWidth,
          height: newHeight,
          fit: 'inside'
        });

        // Delete the old file
        await fs.unlink(finalOutputPath);

        if (CONFIG.convertToWebP) {
          await image
            .webp({
              quality: CONFIG.quality.webp,
              effort: 6,
              smartSubsample: true
            })
            .toFile(finalOutputPath);
        }

        compressedSize = await getFileSize(finalOutputPath);
        scaleFactor *= 0.85;
        attempts++;

        console.log(`    Attempt ${attempts}: ${formatBytes(compressedSize)} (${newWidth}x${newHeight})`);
      }
    }

    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    const isOversized = compressedSize > CONFIG.targetMaxSize;

    if (isOversized) {
      stats.oversizedCount++;
    }

    stats.originalSize += originalSize;
    stats.compressedSize += compressedSize;
    stats.processed++;

    stats.files.push({
      name: path.basename(inputPath),
      outputName: path.basename(finalOutputPath),
      folder: path.dirname(inputPath).replace(CONFIG.sourceDir + '/', ''),
      originalSize,
      compressedSize,
      savings: parseFloat(savings),
      meetsTarget: !isOversized
    });

    const statusIcon = isOversized ? '⚠️' : '✓';
    console.log(`${statusIcon} ${path.basename(finalOutputPath)} → ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (${savings}% saved)`);

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
  console.log('─'.repeat(70));

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
  console.log('\n🚀 AGGRESSIVE Image Compression Starting...');
  console.log('═'.repeat(70));
  console.log(`Source: ${CONFIG.sourceDir}`);
  console.log(`Output: ${CONFIG.outputDir}`);
  console.log(`Target: Under ${formatBytes(CONFIG.targetMaxSize)} per image`);
  console.log(`Format: WebP (${CONFIG.quality.webp}% quality)`);
  console.log(`Max Dimensions: ${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
  console.log(`Aggressive Mode: ${CONFIG.aggressiveMode ? 'ENABLED' : 'DISABLED'}`);
  console.log('═'.repeat(70));

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
    const targetCompliance = ((stats.processed - stats.oversizedCount) / stats.processed * 100).toFixed(2);

    console.log('\n═'.repeat(70));
    console.log('📊 AGGRESSIVE COMPRESSION REPORT');
    console.log('═'.repeat(70));
    console.log(`✓ Successfully processed: ${stats.processed} images`);
    console.log(`✗ Failed: ${stats.failed} images`);
    console.log(`⚠️  Still oversized (>250KB): ${stats.oversizedCount} images`);
    console.log(`✅ Meeting target: ${stats.processed - stats.oversizedCount} images (${targetCompliance}%)`);
    console.log(`⏱  Duration: ${duration} seconds`);
    console.log('');
    console.log(`📦 Original total size: ${formatBytes(stats.originalSize)}`);
    console.log(`📦 Compressed total size: ${formatBytes(stats.compressedSize)}`);
    console.log(`💾 Total saved: ${formatBytes(totalSavings)} (${savingsPercent}%)`);
    console.log('═'.repeat(70));

    // Save detailed report
    const report = {
      summary: {
        processed: stats.processed,
        failed: stats.failed,
        oversized: stats.oversizedCount,
        targetCompliance: `${targetCompliance}%`,
        duration: `${duration}s`,
        originalSize: stats.originalSize,
        compressedSize: stats.compressedSize,
        totalSavings: totalSavings,
        savingsPercent: `${savingsPercent}%`
      },
      oversizedImages: stats.files
        .filter(f => !f.meetsTarget)
        .sort((a, b) => b.compressedSize - a.compressedSize),
      allFiles: stats.files.sort((a, b) => b.savings - a.savings)
    };

    await fs.writeFile(
      'compression-report-aggressive.json',
      JSON.stringify(report, null, 2)
    );
    console.log('\n📄 Detailed report saved to: compression-report-aggressive.json\n');

    if (stats.oversizedCount > 0) {
      console.log('⚠️  WARNING: Some images still exceed 250KB target.');
      console.log('Consider manual review or further dimension reduction.\n');
    }

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run
main().catch(console.error);
