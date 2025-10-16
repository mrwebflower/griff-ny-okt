#!/usr/bin/env node

/**
 * Visual Rotation Detection Script
 *
 * Detects images that are likely rotated incorrectly by analyzing aspect ratios
 * and comparing similar dimensions that might indicate rotation
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function analyzeImage(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    const aspectRatio = metadata.width / metadata.height;
    const isPortrait = metadata.height > metadata.width;
    const isLandscape = metadata.width > metadata.height;
    const isSquare = Math.abs(metadata.width - metadata.height) < 10;

    // Detect likely rotation issues:
    // Images that are very wide or very tall might be rotated
    const likelyRotated = (aspectRatio > 1.5 || aspectRatio < 0.67) && !isSquare;

    return {
      path: imagePath,
      filename: path.basename(imagePath),
      width: metadata.width,
      height: metadata.height,
      aspectRatio: aspectRatio.toFixed(2),
      orientation: isSquare ? 'square' : (isPortrait ? 'portrait' : 'landscape'),
      likelyRotated,
      metadata
    };
  } catch (error) {
    return {
      path: imagePath,
      error: error.message
    };
  }
}

async function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|webp|png)$/i.test(f));

  const results = [];
  for (const file of imageFiles) {
    const filePath = path.join(dir, file);
    const analysis = await analyzeImage(filePath);
    results.push(analysis);
  }

  return results;
}

async function main() {
  console.log('\n🔍 Visual Rotation Detection - Rehabilitering Category\n');
  console.log('='.repeat(80));

  const sourceDir = 'all-pictures-again/Rehabilitering';

  console.log(`\nScanning: ${sourceDir}\n`);
  console.log('-'.repeat(80));

  const results = await scanDirectory(sourceDir);

  let suspiciousCount = 0;

  results.forEach(r => {
    if (r.error) {
      console.log(`❌ ${r.filename}: ERROR`);
      return;
    }

    const status = r.likelyRotated ? '⚠️  SUSPICIOUS' : '✅ OK';
    const orientationInfo = `${r.width}x${r.height} (${r.orientation}, AR: ${r.aspectRatio})`;

    console.log(`${status} ${r.filename}`);
    console.log(`   ${orientationInfo}`);

    if (r.likelyRotated) {
      suspiciousCount++;
      if (r.aspectRatio > 1.5) {
        console.log(`   📐 Very wide - might be portrait rotated to landscape`);
      } else if (r.aspectRatio < 0.67) {
        console.log(`   📐 Very tall - might be landscape rotated to portrait`);
      }
    }
    console.log('');
  });

  console.log('='.repeat(80));
  console.log(`\n📊 Summary: ${suspiciousCount} suspicious images found out of ${results.length}\n`);

  if (suspiciousCount > 0) {
    console.log('⚠️  These images may need manual visual inspection to confirm rotation.\n');
  }
}

main().catch(console.error);
