const sharp = require('sharp');

async function testVisualRotation() {
  console.log('🧪 Creating visual test images...\n');

  const testImage = 'all-pictures-again/Rehabilitering/rehabilitering-griff-entreprenor-08.jpg';

  try {
    // Test WITHOUT rotation
    console.log('1️⃣  Creating WITHOUT .rotate()...');
    await sharp(testImage)
      .resize({ width: 800, fit: 'inside' })
      .toFile('test-output-WITHOUT-rotation.jpg');
    console.log('✅ Created: test-output-WITHOUT-rotation.jpg');

    // Test WITH rotation
    console.log('\n2️⃣  Creating WITH .rotate()...');
    await sharp(testImage)
      .rotate()
      .resize({ width: 800, fit: 'inside' })
      .toFile('test-output-WITH-rotation.jpg');
    console.log('✅ Created: test-output-WITH-rotation.jpg');

    // Check output metadata
    console.log('\n📊 Output file analysis:');
    console.log('─'.repeat(70));

    const without = await sharp('test-output-WITHOUT-rotation.jpg').metadata();
    console.log('WITHOUT rotation:', {
      width: without.width,
      height: without.height,
      orientation: without.orientation
    });

    const with_ = await sharp('test-output-WITH-rotation.jpg').metadata();
    console.log('WITH rotation:   ', {
      width: with_.width,
      height: with_.height,
      orientation: with_.orientation
    });

    console.log('\n✅ Test files created successfully!');
    console.log('\n🔍 VALIDATION REQUIRED:');
    console.log('   Please open test-output-WITH-rotation.jpg');
    console.log('   Building should be UPRIGHT (vertical)');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testVisualRotation().catch(console.error);
