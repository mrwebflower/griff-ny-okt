#!/usr/bin/env node

/**
 * Image Orientation Investigation Script
 *
 * Checks EXIF orientation metadata in images using sharp library
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function checkImageOrientation(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    return {
      path: imagePath,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      orientation: metadata.orientation || 'none',
      hasProfile: !!metadata.exif,
      space: metadata.space,
    };
  } catch (error) {
    return {
      path: imagePath,
      error: error.message
    };
  }
}

async function scanDirectory(dir, limit = 5) {
  const files = fs.readdirSync(dir);
  const imageFiles = files
    .filter(f => /\.(jpg|jpeg|webp|png)$/i.test(f))
    .slice(0, limit);

  const results = [];
  for (const file of imageFiles) {
    const filePath = path.join(dir, file);
    const info = await checkImageOrientation(filePath);
    results.push(info);
  }

  return results;
}

async function main() {
  console.log('\n🔍 Image Orientation Investigation\n');
  console.log('='.repeat(70));

  // Check source images
  console.log('\n📁 SOURCE IMAGES (all-pictures-again/)');
  console.log('-'.repeat(70));

  const sourceCategories = ['Garasje', 'Bad og våtrom', 'Nybygg', 'Terrasse'];

  for (const category of sourceCategories) {
    const dir = path.join('all-pictures-again', category);
    if (fs.existsSync(dir)) {
      console.log(`\n${category}:`);
      const results = await scanDirectory(dir, 3);
      results.forEach(r => {
        if (r.error) {
          console.log(`  ❌ ${path.basename(r.path)}: ERROR - ${r.error}`);
        } else {
          const orientationDesc = r.orientation !== 'none' && r.orientation !== undefined
            ? `ORIENTATION-${r.orientation}`
            : 'no EXIF orientation';
          console.log(`  📷 ${path.basename(r.path)}`);
          console.log(`     ${r.width}x${r.height} ${r.format} | ${orientationDesc}`);
        }
      });
    }
  }

  // Check optimized images
  console.log('\n\n📁 OPTIMIZED IMAGES (public/images/optimized/)');
  console.log('-'.repeat(70));

  const optimizedCategories = ['garasje', 'bad-og-vatrom', 'nybygg', 'terrasse'];

  for (const category of optimizedCategories) {
    const dir = path.join('public/images/optimized', category);
    if (fs.existsSync(dir)) {
      console.log(`\n${category}:`);
      const results = await scanDirectory(dir, 3);
      results.forEach(r => {
        if (r.error) {
          console.log(`  ❌ ${path.basename(r.path)}: ERROR - ${r.error}`);
        } else {
          const orientationDesc = r.orientation !== 'none' && r.orientation !== undefined
            ? `ORIENTATION-${r.orientation}`
            : 'no EXIF orientation';
          console.log(`  📷 ${path.basename(r.path)}`);
          console.log(`     ${r.width}x${r.height} ${r.format} | ${orientationDesc}`);
        }
      });
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✅ Investigation complete!\n');
  console.log('📝 EXIF Orientation values:');
  console.log('  1 = Normal (0°)');
  console.log('  3 = Upside down (180°)');
  console.log('  6 = Rotated 90° CW');
  console.log('  8 = Rotated 90° CCW');
  console.log('  + other values for flipped orientations\n');
}

main().catch(console.error);
