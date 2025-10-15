#!/usr/bin/env node

/**
 * Article Image Update Script
 *
 * Updates all blog articles with optimized images from category-matched folders.
 * - Replaces hero images with category-specific header images
 * - Adds/replaces body images with optimized WebP images
 * - Distributes images to avoid repetition within categories
 * - Generates SEO-friendly alt text
 * - Preserves HTML structure and CSS classes
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  articlesDir: 'src/content/articles',
  optimizedDir: 'all-pictures-optimized',
  backupDir: 'src/content/articles-backup',
  outputDir: 'src/content/articles',
  imagePath: '/images/optimized', // Web path for images
  dryRun: false, // Set to true for testing without file changes
};

// Category mapping (from analyze-articles.js)
const CATEGORY_MAPPING = {
  'Bad': 'Bad og våtrom',
  'Våtrom': 'Bad og våtrom',
  'Bad og våtrom': 'Bad og våtrom',
  'Garasje': 'Garasje',
  'Tilbygg': 'Tilbygg',
  'Nybygg': 'Nybygg',
  'Rehabilitering': 'Rehabilitering',
  'Terrasse': 'Terrasse',
  'Vinduer': 'Vinduer',
  'Flislegging': 'Bad og våtrom',
  'Isolering': 'Rehabilitering',
  'Malearbeid': 'Rehabilitering',
  'Snekkerarbeid': 'Tilbygg',
  'Utvendig maling': 'Rehabilitering'
};

// Image distribution tracking (by category)
const imageDistribution = {};

// Execution log
const executionLog = {
  timestamp: new Date().toISOString(),
  articlesProcessed: 0,
  articlesUpdated: 0,
  articlesFailed: 0,
  imagesAdded: 0,
  imagesReplaced: 0,
  details: []
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create backup of articles directory
 */
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${CONFIG.backupDir}-${timestamp}`;

  console.log(`\n📦 Creating backup at: ${backupPath}`);

  if (CONFIG.dryRun) {
    console.log('   [DRY RUN] Backup skipped');
    return;
  }

  fs.cpSync(CONFIG.articlesDir, backupPath, { recursive: true });
  console.log('   ✅ Backup created successfully');
}

/**
 * Extract metadata from article HTML
 */
function extractArticleMetadata(htmlContent, filename) {
  // Extract article name
  const nameMatch = htmlContent.match(/<!--\s*Article Name:\s*([^>]+?)\s*-->/);
  const articleName = nameMatch ? nameMatch[1].trim() : filename.replace('.html', '');

  // Extract services
  const servicesMatch = htmlContent.match(/<!--\s*Services:\s*([^>]+?)\s*-->/);
  const services = servicesMatch ? servicesMatch[1].trim() : 'Rehabilitering';

  // Determine primary category
  const serviceParts = services.split(',').map(s => s.trim());
  const primaryService = serviceParts[0];
  const mappedCategory = CATEGORY_MAPPING[primaryService] || 'Rehabilitering';

  // Count existing images
  const imgMatches = htmlContent.match(/<img[^>]*>/gi) || [];
  const imageCount = imgMatches.length;

  // Get word count
  const textContent = htmlContent.replace(/<[^>]+>/g, ' ');
  const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;

  // Classify article length
  let articleLength = 'short';
  if (wordCount > 2000) articleLength = 'long';
  else if (wordCount > 1000) articleLength = 'medium';

  return {
    articleName,
    services,
    primaryService,
    mappedCategory,
    imageCount,
    wordCount,
    articleLength
  };
}

/**
 * Get available images for a category
 */
function getAvailableImages(category) {
  const categoryPath = path.join(CONFIG.optimizedDir, category);

  if (!fs.existsSync(categoryPath)) {
    console.warn(`   ⚠️  Category folder not found: ${categoryPath}`);
    return { header: null, body: [] };
  }

  const files = fs.readdirSync(categoryPath);
  const imageFiles = files.filter(f => f.endsWith('.webp') || f.endsWith('.jpg'));

  // Find header image (prefer WebP)
  const headers = imageFiles.filter(f => f.startsWith('01-header-'));
  const header = headers.find(f => f.endsWith('.webp')) || headers[0] || null;

  // Get body images (prefer WebP, exclude header)
  const allBody = imageFiles.filter(f => !f.startsWith('01-header-'));
  const webpBody = allBody.filter(f => f.endsWith('.webp'));
  const jpgBody = allBody.filter(f => f.endsWith('.jpg') && !webpBody.includes(f.replace('.jpg', '.webp')));

  const body = [...webpBody, ...jpgBody].sort();

  return { header, body, total: imageFiles.length };
}

/**
 * Get next images for article (sequential distribution)
 */
function getNextImages(category, count) {
  if (!imageDistribution[category]) {
    imageDistribution[category] = { currentIndex: 0 };
  }

  const available = getAvailableImages(category);
  const bodyImages = available.body;

  if (bodyImages.length === 0) {
    return [];
  }

  const images = [];
  let index = imageDistribution[category].currentIndex;

  for (let i = 0; i < count; i++) {
    images.push(bodyImages[index % bodyImages.length]);
    index++;
  }

  imageDistribution[category].currentIndex = index;

  return images;
}

/**
 * Calculate image count based on article length
 */
function calculateImageCount(articleLength, existingCount) {
  const targets = {
    short: 1,
    medium: 2,
    long: 3
  };

  return targets[articleLength] || 1;
}

/**
 * Generate SEO-friendly alt text
 */
function generateAltText(category, articleName, imageNumber) {
  const categoryClean = category.toLowerCase().replace(/\s+/g, '-');
  return `${articleName} - ${category} - Griff Entreprenør Trondheim ${imageNumber}`;
}

/**
 * Find first H1 position in HTML
 */
function findH1Position(html) {
  const h1Match = html.match(/<h1[^>]*>/i);
  if (!h1Match) return -1;

  const h1End = html.indexOf('</h1>', h1Match.index);
  return h1End !== -1 ? h1End + 5 : -1;
}

/**
 * Find all H2 positions in HTML
 */
function findH2Positions(html) {
  const positions = [];
  const h2Regex = /<h2[^>]*>.*?<\/h2>/gi;
  let match;

  while ((match = h2Regex.exec(html)) !== null) {
    positions.push(match.index + match[0].length);
  }

  return positions;
}

/**
 * Insert hero image after H1
 */
function insertHeroImage(html, headerImage, category, articleName) {
  const h1Pos = findH1Position(html);

  if (h1Pos === -1) {
    console.warn('   ⚠️  No H1 found, inserting at top of article');
    return html; // Skip if no H1
  }

  const categoryFolder = category.replace(/\s+/g, '-').toLowerCase();
  const imagePath = `${CONFIG.imagePath}/${categoryFolder}/${headerImage}`;
  const altText = generateAltText(category, articleName, 'hero');

  const heroImageHtml = `\n\n<img src="${imagePath}" alt="${altText}" class="article-hero-image" />\n\n`;

  return html.slice(0, h1Pos) + heroImageHtml + html.slice(h1Pos);
}

/**
 * Replace existing hero/header image
 */
function replaceHeroImage(html, headerImage, category, articleName) {
  const categoryFolder = category.replace(/\s+/g, '-').toLowerCase();
  const imagePath = `${CONFIG.imagePath}/${categoryFolder}/${headerImage}`;
  const altText = generateAltText(category, articleName, 'hero');

  // Find first image (assumed to be hero)
  const firstImgMatch = html.match(/<img[^>]*>/i);

  if (!firstImgMatch) {
    // No existing image, insert after H1
    return insertHeroImage(html, headerImage, category, articleName);
  }

  // Replace first image src and alt
  const updatedImg = firstImgMatch[0]
    .replace(/src="[^"]*"/, `src="${imagePath}"`)
    .replace(/alt="[^"]*"/, `alt="${altText}"`);

  return html.replace(firstImgMatch[0], updatedImg);
}

/**
 * Insert body images at H2 positions
 */
function insertBodyImages(html, bodyImages, category, articleName, existingCount) {
  if (bodyImages.length === 0) return html;

  const h2Positions = findH2Positions(html);

  if (h2Positions.length === 0) {
    console.warn('   ⚠️  No H2 headers found, skipping body images');
    return html;
  }

  const categoryFolder = category.replace(/\s+/g, '-').toLowerCase();
  let updatedHtml = html;
  let offset = 0;

  // Distribute images across H2 positions
  const step = Math.floor(h2Positions.length / bodyImages.length) || 1;

  bodyImages.forEach((image, idx) => {
    const posIndex = Math.min(idx * step, h2Positions.length - 1);
    const insertPos = h2Positions[posIndex] + offset;

    const imagePath = `${CONFIG.imagePath}/${categoryFolder}/${image}`;
    const altText = generateAltText(category, articleName, idx + 1);

    const imageHtml = `\n\n<img src="${imagePath}" alt="${altText}" class="article-image" />\n\n`;

    updatedHtml = updatedHtml.slice(0, insertPos) + imageHtml + updatedHtml.slice(insertPos);
    offset += imageHtml.length;
  });

  return updatedHtml;
}

/**
 * Replace existing body images
 */
function replaceBodyImages(html, bodyImages, category, articleName) {
  if (bodyImages.length === 0) return html;

  const categoryFolder = category.replace(/\s+/g, '-').toLowerCase();
  let updatedHtml = html;

  // Find all img tags except the first (hero)
  const imgRegex = /<img[^>]*>/gi;
  const matches = html.match(imgRegex) || [];

  if (matches.length <= 1) {
    // Only hero image exists, insert body images
    return insertBodyImages(html, bodyImages, category, articleName, 0);
  }

  // Replace body images (skip first one - hero)
  const bodyImgMatches = matches.slice(1);

  bodyImgMatches.forEach((imgTag, idx) => {
    if (idx >= bodyImages.length) return;

    const imagePath = `${CONFIG.imagePath}/${categoryFolder}/${bodyImages[idx]}`;
    const altText = generateAltText(category, articleName, idx + 1);

    const updatedImg = imgTag
      .replace(/src="[^"]*"/, `src="${imagePath}"`)
      .replace(/alt="[^"]*"/, `alt="${altText}"`);

    updatedHtml = updatedHtml.replace(imgTag, updatedImg);
  });

  // If more body images than existing, insert the rest
  if (bodyImages.length > bodyImgMatches.length) {
    const remainingImages = bodyImages.slice(bodyImgMatches.length);
    updatedHtml = insertBodyImages(updatedHtml, remainingImages, category, articleName, bodyImgMatches.length);
  }

  return updatedHtml;
}

/**
 * Process a single article
 */
function processArticle(filename) {
  const filePath = path.join(CONFIG.articlesDir, filename);

  console.log(`\n📄 Processing: ${filename}`);
  executionLog.articlesProcessed++;

  const articleLog = {
    filename,
    status: 'pending',
    category: '',
    heroAdded: false,
    bodyImagesAdded: 0,
    bodyImagesReplaced: 0,
    error: null
  };

  try {
    // Read article
    const htmlContent = fs.readFileSync(filePath, 'utf8');

    // Extract metadata
    const metadata = extractArticleMetadata(htmlContent, filename);
    articleLog.category = metadata.mappedCategory;

    console.log(`   Category: ${metadata.mappedCategory}`);
    console.log(`   Length: ${metadata.articleLength} (${metadata.wordCount} words)`);
    console.log(`   Existing images: ${metadata.imageCount}`);

    // Get available images
    const available = getAvailableImages(metadata.mappedCategory);

    if (!available.header) {
      console.warn(`   ⚠️  No header image found for category: ${metadata.mappedCategory}`);
      articleLog.error = 'No header image available';
      articleLog.status = 'failed';
      executionLog.articlesFailed++;
      executionLog.details.push(articleLog);
      return;
    }

    // Calculate how many body images needed
    const bodyImageCount = calculateImageCount(metadata.articleLength, metadata.imageCount);
    console.log(`   Target body images: ${bodyImageCount}`);

    // Get next sequential images for this category
    const bodyImages = getNextImages(metadata.mappedCategory, bodyImageCount);
    console.log(`   Assigned images: ${bodyImages.join(', ')}`);

    let updatedHtml = htmlContent;

    // Process hero image
    if (metadata.imageCount === 0) {
      // No existing images - insert hero
      updatedHtml = insertHeroImage(updatedHtml, available.header, metadata.mappedCategory, metadata.articleName);
      articleLog.heroAdded = true;
      executionLog.imagesAdded++;
      console.log(`   ✅ Hero image added: ${available.header}`);
    } else {
      // Has existing images - replace hero
      updatedHtml = replaceHeroImage(updatedHtml, available.header, metadata.mappedCategory, metadata.articleName);
      articleLog.heroAdded = true;
      executionLog.imagesReplaced++;
      console.log(`   ✅ Hero image replaced: ${available.header}`);
    }

    // Process body images
    if (metadata.imageCount === 0) {
      // No existing images - insert body images
      updatedHtml = insertBodyImages(updatedHtml, bodyImages, metadata.mappedCategory, metadata.articleName, 0);
      articleLog.bodyImagesAdded = bodyImages.length;
      executionLog.imagesAdded += bodyImages.length;
      console.log(`   ✅ ${bodyImages.length} body images added`);
    } else {
      // Has existing images - replace body images
      updatedHtml = replaceBodyImages(updatedHtml, bodyImages, metadata.mappedCategory, metadata.articleName);
      articleLog.bodyImagesReplaced = Math.min(bodyImages.length, metadata.imageCount - 1);
      articleLog.bodyImagesAdded = Math.max(0, bodyImages.length - (metadata.imageCount - 1));
      executionLog.imagesReplaced += articleLog.bodyImagesReplaced;
      executionLog.imagesAdded += articleLog.bodyImagesAdded;
      console.log(`   ✅ ${articleLog.bodyImagesReplaced} body images replaced, ${articleLog.bodyImagesAdded} added`);
    }

    // Save updated article
    if (!CONFIG.dryRun) {
      fs.writeFileSync(filePath, updatedHtml, 'utf8');
      console.log(`   💾 Article updated successfully`);
    } else {
      console.log(`   [DRY RUN] Changes not saved`);
    }

    articleLog.status = 'success';
    executionLog.articlesUpdated++;

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    articleLog.error = error.message;
    articleLog.status = 'failed';
    executionLog.articlesFailed++;
  }

  executionLog.details.push(articleLog);
}

/**
 * Process all articles
 */
function processAllArticles() {
  console.log('\n' + '='.repeat(70));
  console.log('📸 ARTICLE IMAGE UPDATE SCRIPT');
  console.log('='.repeat(70));

  if (CONFIG.dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No files will be modified\n');
  }

  // Create backup
  createBackup();

  // Get all article files
  const files = fs.readdirSync(CONFIG.articlesDir).filter(f => f.endsWith('.html'));
  console.log(`\n📊 Found ${files.length} articles to process\n`);

  // Process each article
  files.forEach(processArticle);

  // Print summary
  console.log('\n' + '='.repeat(70));
  console.log('📈 EXECUTION SUMMARY');
  console.log('='.repeat(70));
  console.log(`\nArticles processed: ${executionLog.articlesProcessed}`);
  console.log(`Articles updated:   ${executionLog.articlesUpdated} ✅`);
  console.log(`Articles failed:    ${executionLog.articlesFailed} ❌`);
  console.log(`\nImages added:       ${executionLog.imagesAdded}`);
  console.log(`Images replaced:    ${executionLog.imagesReplaced}`);
  console.log(`Total image updates: ${executionLog.imagesAdded + executionLog.imagesReplaced}`);

  // Save execution log
  const logPath = 'article-image-update-log.json';
  fs.writeFileSync(logPath, JSON.stringify(executionLog, null, 2));
  console.log(`\n📄 Detailed log saved to: ${logPath}`);

  // Print category distribution
  console.log('\n📊 Image Distribution by Category:');
  Object.entries(imageDistribution).forEach(([category, data]) => {
    console.log(`   ${category}: ${data.currentIndex} images used`);
  });

  console.log('\n' + '='.repeat(70));
  console.log('✅ EXECUTION COMPLETE');
  console.log('='.repeat(70) + '\n');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

try {
  // Check if --dry-run flag is present
  if (process.argv.includes('--dry-run')) {
    CONFIG.dryRun = true;
  }

  processAllArticles();

} catch (error) {
  console.error('\n❌ Fatal Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
