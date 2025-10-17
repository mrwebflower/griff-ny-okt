const sharp = require('sharp');

async function convertToWebP() {
  const images = [
    'all-pictures-optimized/Rehabilitering/rehabilitering-griff-entreprenor-08.jpg',
    'all-pictures-optimized/Rehabilitering/rehabilitering-griff-entreprenor-09.jpg'
  ];

  for (const img of images) {
    const outputPath = img.replace('.jpg', '.webp');
    console.log(`Converting ${img} → ${outputPath}`);
    await sharp(img)
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);
    console.log('✅ Done');
  }
}

convertToWebP().catch(console.error);
