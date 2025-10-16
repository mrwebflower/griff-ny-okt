const sharp = require('sharp');

async function rotateProcessedImage() {
  const imagePath = 'public/assets/images/processed/article/isolering-energisparing-trondheim-202506-4-article.jpg';
  const tempPath = imagePath + '.temp';

  console.log('🔧 Rotating processed article image...\n');
  console.log(`Image: ${imagePath}`);

  // Check original dimensions
  const original = await sharp(imagePath).metadata();
  console.log(`Original dimensions: ${original.width}×${original.height}`);

  // Rotate 90° clockwise
  await sharp(imagePath)
    .rotate(90)
    .toFile(tempPath);

  // Check rotated dimensions
  const rotated = await sharp(tempPath).metadata();
  console.log(`Rotated dimensions: ${rotated.width}×${rotated.height}`);

  // Replace original with rotated
  const fs = require('fs').promises;
  await fs.unlink(imagePath);
  await fs.rename(tempPath, imagePath);

  console.log('\n✅ Image rotated successfully!');
  console.log('Building should now be UPRIGHT');
}

rotateProcessedImage().catch(console.error);
