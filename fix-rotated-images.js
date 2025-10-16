#!/usr/bin/env node

/**
 * Fix Rotated Images Script
 *
 * Surgically fixes images confirmed to be rotated incorrectly
 * Based on client reports and visual inspection
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images confirmed as rotated (need 90° clockwise rotation)
const ROTATED_IMAGES = [
  {
    category: 'Rehabilitering',
    file: 'rehabilitering-griff-entreprenor-08.jpg',
    rotation: 90, // 90° clockwise to make building upright
    reason: 'Client screenshot #2 - construction framing sideways'
  },
  {
    category: 'Rehabilitering',
    file: 'rehabilitering-griff-entreprenor-09.jpg',
    rotation: 90, // 90° clockwise
    reason: 'Visual inspection - construction site sideways'
  },
  // Add more as we identify them
];

async function backupImage(sourcePath) {
  const backupDir = 'all-pictures-again-backup';
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const categoryBackup = path.join(backupDir, path.dirname(sourcePath).split('/').pop());
  if (!fs.existsSync(categoryBackup)) {
    fs.mkdirSync(categoryBackup, { recursive: true });
  }

  const backupPath = path.join(categoryBackup, path.basename(sourcePath));
  fs.copyFileSync(sourcePath, backupPath);

  return backupPath;
}

async function rotateImage(imagePath, degrees) {
  try {
    console.log(`\n🔄 Rotating ${path.basename(imagePath)} by ${degrees}°`);

    // Backup original
    const backupPath = await backupImage(imagePath);
    console.log(`   ✓ Backup created: ${backupPath}`);

    // Get original metadata
    const originalMeta = await sharp(imagePath).metadata();
    console.log(`   Original: ${originalMeta.width}x${originalMeta.height}`);

    // Rotate image
    const tempPath = imagePath + '.tmp';
    await sharp(imagePath)
      .rotate(degrees)
      .toFile(tempPath);

    // Get new metadata
    const newMeta = await sharp(tempPath).metadata();
    console.log(`   Rotated: ${newMeta.width}x${newMeta.height}`);

    // Replace original
    fs.renameSync(tempPath, imagePath);
    console.log(`   ✓ Image rotated successfully`);

    return {
      success: true,
      originalDimensions: `${originalMeta.width}x${originalMeta.height}`,
      newDimensions: `${newMeta.width}x${newMeta.height}`
    };

  } catch (error) {
    console.error(`   ✗ Error rotating image: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

async function reoptimizeImage(sourcePath, category) {
  try {
    const basename = path.basename(sourcePath, path.extname(sourcePath));
    const optimizedDir = path.join('public/images/optimized', category.toLowerCase());

    // Check for webp version
    const webpPath = path.join(optimizedDir, basename + '.webp');
    const jpgPath = path.join(optimizedDir, basename + '.jpg');

    console.log(`\n📦 Re-optimizing for deployment...`);

    // Re-optimize to WebP if it exists
    if (fs.existsSync(webpPath)) {
      await sharp(sourcePath)
        .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath + '.tmp');
      fs.renameSync(webpPath + '.tmp', webpPath);
      console.log(`   ✓ WebP updated: ${path.basename(webpPath)}`);
    }

    // Re-optimize to JPG if it exists
    if (fs.existsSync(jpgPath)) {
      await sharp(sourcePath)
        .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .toFile(jpgPath + '.tmp');
      fs.renameSync(jpgPath + '.tmp', jpgPath);
      console.log(`   ✓ JPG updated: ${path.basename(jpgPath)}`);
    }

    return { success: true };

  } catch (error) {
    console.error(`   ✗ Error re-optimizing: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('\n🔧 Fix Rotated Images - Surgical Precision\n');
  console.log('='.repeat(80));
  console.log(`\nImages to fix: ${ROTATED_IMAGES.length}`);
  console.log('\nThis script will:');
  console.log('  1. Backup original images');
  console.log('  2. Rotate source images');
  console.log('  3. Re-optimize for deployment');
  console.log('\n' + '='.repeat(80));

  let successCount = 0;
  let failCount = 0;

  for (const img of ROTATED_IMAGES) {
    console.log(`\n📁 Processing: ${img.category}/${img.file}`);
    console.log(`   Reason: ${img.reason}`);
    console.log(`   Rotation: ${img.rotation}° clockwise`);

    const sourcePath = path.join('all-pictures-again', img.category, img.file);

    if (!fs.existsSync(sourcePath)) {
      console.log(`   ✗ Source image not found!`);
      failCount++;
      continue;
    }

    // Step 1: Rotate source image
    const rotateResult = await rotateImage(sourcePath, img.rotation);

    if (!rotateResult.success) {
      failCount++;
      continue;
    }

    // Step 2: Re-optimize for deployment
    const optimizeResult = await reoptimizeImage(sourcePath, img.category);

    if (optimizeResult.success) {
      successCount++;
      console.log(`   ✅ Complete!`);
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`\n✅ Successfully fixed: ${successCount}/${ROTATED_IMAGES.length}`);
  console.log(`✗ Failed: ${failCount}/${ROTATED_IMAGES.length}`);

  if (successCount > 0) {
    console.log(`\n📂 Backups saved to: all-pictures-again-backup/`);
    console.log(`\n✨ Next steps:`);
    console.log(`   1. Verify images look correct in source folders`);
    console.log(`   2. Run 'npm run build' to test`);
    console.log(`   3. Deploy to Netlify`);
    console.log(`   4. Verify on mobile device\n`);
  }
}

main().catch(console.error);
