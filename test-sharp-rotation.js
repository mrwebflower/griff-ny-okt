const sharp = require('sharp');

async function testRotation() {
  const testImages = [
    'all-pictures-again/Rehabilitering/rehabilitering-griff-entreprenor-08.jpg',
    'all-pictures-again/Rehabilitering/rehabilitering-griff-entreprenor-09.jpg'
  ];

  console.log('🧪 Testing Sharp .rotate() with EXIF orientation\n');
  console.log('═'.repeat(70));

  for (const imagePath of testImages) {
    console.log(`\n📸 Testing: ${imagePath}`);
    console.log('─'.repeat(70));

    try {
      // Without rotation
      const withoutRotate = await sharp(imagePath).metadata();
      console.log('WITHOUT .rotate():', {
        width: withoutRotate.width,
        height: withoutRotate.height,
        orientation: withoutRotate.orientation
      });

      // With rotation
      const rotatedImage = sharp(imagePath).rotate();
      const withRotate = await rotatedImage.metadata();
      console.log('WITH .rotate():   ', {
        width: withRotate.width,
        height: withRotate.height,
        orientation: withRotate.orientation
      });

      // Check if dimensions swapped
      const dimensionsSwapped =
        withoutRotate.width === withRotate.height &&
        withoutRotate.height === withRotate.width;

      console.log('\n✅ Result:', dimensionsSwapped ?
        '✓ Dimensions SWAPPED (rotation applied!)' :
        '✗ Dimensions NOT swapped (no rotation)');

      // Expected outcome
      if (withoutRotate.orientation === 6) {
        console.log('Expected: EXIF orientation=6 should rotate 90° CW');
        console.log('Expected dimensions: 3000×4000 (portrait)');
        console.log('Status:', dimensionsSwapped ? '✅ PASS' : '❌ FAIL');
      }

    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }

  console.log('\n' + '═'.repeat(70));
  console.log('✅ Test complete!\n');
}

testRotation().catch(console.error);
