#!/usr/bin/env node

/**
 * Comprehensive Image Rotation Investigation
 *
 * Compares source vs optimized images to find rotation issues
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function getImageInfo(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    return {
      exists: true,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      orientation: metadata.orientation,
      aspectRatio: (metadata.width / metadata.height).toFixed(2),
      isPortrait: metadata.height > metadata.width,
      isLandscape: metadata.width > metadata.height,
    };
  } catch (error) {
    return {
      exists: false,
      error: error.message
    };
  }
}

function findMatchingOptimizedFile(sourcePath, sourceCategory) {
  const basename = path.basename(sourcePath, path.extname(sourcePath));
  const categoryMap = {
    'Garasje': 'garasje',
    'Bad og våtrom': 'bad-og-vatrom',
    'Nybygg': 'nybygg',
    'Terrasse': 'terrasse',
    'Tilbygg': 'tilbygg',
    'Vinduer': 'vinduer',
    'Rehabilitering': 'rehabilitering'
  };

  const optimizedCategory = categoryMap[sourceCategory];
  if (!optimizedCategory) return null;

  const optimizedDir = path.join('public/images/optimized', optimizedCategory);
  if (!fs.existsSync(optimizedDir)) return null;

  // Check for webp, jpg, jpeg, png versions
  const extensions = ['.webp', '.jpg', '.jpeg', '.png'];
  for (const ext of extensions) {
    const optimizedPath = path.join(optimizedDir, basename + ext);
    if (fs.existsSync(optimizedPath)) {
      return optimizedPath;
    }
  }

  return null;
}

async function compareImages(sourcePath, optimizedPath) {
  const source = await getImageInfo(sourcePath);
  const optimized = await getImageInfo(optimizedPath);

  if (!source.exists || !optimized.exists) {
    return { error: 'One or both images not found' };
  }

  const dimensionsSwapped =
    source.width === optimized.height && source.height === optimized.width;

  const orientationChanged =
    source.isPortrait !== optimized.isPortrait;

  const suspiciousRotation = dimensionsSwapped || orientationChanged;

  return {
    source,
    optimized,
    dimensionsSwapped,
    orientationChanged,
    suspiciousRotation,
    sourceFile: path.basename(sourcePath),
    optimizedFile: path.basename(optimizedPath),
  };
}

async function scanCategory(sourceCategory) {
  const sourceDir = path.join('all-pictures-again', sourceCategory);
  if (!fs.existsSync(sourceDir)) {
    return [];
  }

  const files = fs.readdirSync(sourceDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|webp|png)$/i.test(f));

  const comparisons = [];

  for (const file of imageFiles) {
    const sourcePath = path.join(sourceDir, file);
    const optimizedPath = findMatchingOptimizedFile(sourcePath, sourceCategory);

    if (optimizedPath) {
      const comparison = await compareImages(sourcePath, optimizedPath);
      if (!comparison.error) {
        comparisons.push(comparison);
      }
    }
  }

  return comparisons;
}

async function main() {
  console.log('\n🔍 Comprehensive Image Rotation Investigation\n');
  console.log('='.repeat(80));

  const categories = [
    'Garasje',
    'Bad og våtrom',
    'Nybygg',
    'Terrasse',
    'Tilbygg',
    'Vinduer',
    'Rehabilitering'
  ];

  let totalImages = 0;
  let suspiciousImages = 0;
  const suspiciousList = [];

  for (const category of categories) {
    console.log(`\n📁 ${category}`);
    console.log('-'.repeat(80));

    const comparisons = await scanCategory(category);
    totalImages += comparisons.length;

    for (const comp of comparisons) {
      const status = comp.suspiciousRotation ? '⚠️ SUSPICIOUS' : '✅ OK';

      console.log(`\n  ${status} ${comp.sourceFile}`);
      console.log(`     Source:    ${comp.source.width}x${comp.source.height} (${comp.source.isPortrait ? 'Portrait' : 'Landscape'}) AR: ${comp.source.aspectRatio}`);
      console.log(`     Optimized: ${comp.optimized.width}x${comp.optimized.height} (${comp.optimized.isPortrait ? 'Portrait' : 'Landscape'}) AR: ${comp.optimized.aspectRatio}`);

      if (comp.dimensionsSwapped) {
        console.log(`     🔄 DIMENSIONS SWAPPED - Likely rotated!`);
      }
      if (comp.orientationChanged) {
        console.log(`     📐 ORIENTATION CHANGED - Portrait/Landscape mismatch!`);
      }

      if (comp.suspiciousRotation) {
        suspiciousImages++;
        suspiciousList.push({
          category,
          source: comp.sourceFile,
          optimized: comp.optimizedFile,
          issue: comp.dimensionsSwapped ? 'Dimensions swapped' : 'Orientation changed'
        });
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`\nTotal images checked: ${totalImages}`);
  console.log(`Suspicious rotations found: ${suspiciousImages}`);
  console.log(`Success rate: ${((totalImages - suspiciousImages) / totalImages * 100).toFixed(1)}%`);

  if (suspiciousImages > 0) {
    console.log('\n⚠️  SUSPICIOUS IMAGES DETECTED:\n');
    suspiciousList.forEach((item, index) => {
      console.log(`${index + 1}. ${item.category}/${item.source}`);
      console.log(`   Issue: ${item.issue}`);
      console.log(`   Optimized: ${item.optimized}\n`);
    });
  } else {
    console.log('\n✅ All images have consistent dimensions between source and optimized versions.');
    console.log('   The rotation issue may be browser-specific or related to display CSS.');
  }

  console.log('\n');
}

main().catch(console.error);
