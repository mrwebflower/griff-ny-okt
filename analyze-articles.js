#!/usr/bin/env node

/**
 * Article Analysis Script
 * Analyzes all blog articles and prepares data for image optimization
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ARTICLES_DIR = 'src/content/articles';
const OPTIMIZED_DIR = 'all-pictures-optimized';

// Category mapping
const categoryMapping = {
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

// Statistics
const stats = {
  totalArticles: 0,
  articlesByCategory: {},
  articleDetails: [],
  imageAvailability: {}
};

/**
 * Extract metadata from article HTML
 */
function extractArticleMetadata(filePath, filename) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract article name
  const nameMatch = content.match(/<!--\s*Article Name:\s*([^>]+?)\s*-->/);
  const articleName = nameMatch ? nameMatch[1].trim() : filename.replace('.html', '');

  // Extract services
  const servicesMatch = content.match(/<!--\s*Services:\s*([^>]+?)\s*-->/);
  const services = servicesMatch ? servicesMatch[1].trim() : 'Unknown';

  // Determine primary category
  const serviceParts = services.split(',').map(s => s.trim());
  const primaryService = serviceParts[0];
  const mappedCategory = categoryMapping[primaryService] || 'Rehabilitering'; // default

  // Count images in article
  const imgMatches = content.match(/<img[^>]*>/gi) || [];
  const imageCount = imgMatches.length;

  // Get word count for article length classification
  const textContent = content.replace(/<[^>]+>/g, ' ');
  const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;

  // Classify article length
  let articleLength = 'short';
  if (wordCount > 2000) articleLength = 'long';
  else if (wordCount > 1000) articleLength = 'medium';

  return {
    filename,
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
  const categoryPath = path.join(OPTIMIZED_DIR, category);

  if (!fs.existsSync(categoryPath)) {
    return { header: null, body: [] };
  }

  const files = fs.readdirSync(categoryPath);
  const imageFiles = files.filter(f => f.endsWith('.webp') || f.endsWith('.jpg'));

  // Find header image
  const header = imageFiles.find(f => f.startsWith('01-header-'));

  // Get body images (exclude header)
  const body = imageFiles.filter(f => !f.startsWith('01-header-')).sort();

  return { header, body, total: imageFiles.length };
}

/**
 * Main analysis function
 */
function analyzeArticles() {
  console.log('🔍 Analyzing Articles...\n');
  console.log('='.repeat(70));

  // Get all article files
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.html'));
  stats.totalArticles = files.length;

  console.log(`\n📄 Found ${files.length} articles\n`);

  // Analyze each article
  files.forEach(filename => {
    const filePath = path.join(ARTICLES_DIR, filename);
    const metadata = extractArticleMetadata(filePath, filename);

    stats.articleDetails.push(metadata);

    // Count by category
    if (!stats.articlesByCategory[metadata.mappedCategory]) {
      stats.articlesByCategory[metadata.mappedCategory] = [];
    }
    stats.articlesByCategory[metadata.mappedCategory].push(metadata);
  });

  // Get image availability for each category
  console.log('📊 Category Breakdown:\n');
  Object.keys(stats.articlesByCategory).sort().forEach(category => {
    const articles = stats.articlesByCategory[category];
    const images = getAvailableImages(category);
    stats.imageAvailability[category] = images;

    console.log(`\n  ${category}`);
    console.log(`  ${'─'.repeat(category.length)}`);
    console.log(`    Articles: ${articles.length}`);
    console.log(`    Images available: ${images.total} (1 header + ${images.body.length} body)`);
    console.log(`    Images per article: ${(images.body.length / articles.length).toFixed(1)}`);
  });

  // Article length distribution
  console.log('\n\n📏 Article Length Distribution:\n');
  const lengthCounts = { short: 0, medium: 0, long: 0 };
  stats.articleDetails.forEach(a => lengthCounts[a.articleLength]++);
  console.log(`  Short (<1000 words):  ${lengthCounts.short} articles`);
  console.log(`  Medium (1000-2000):   ${lengthCounts.medium} articles`);
  console.log(`  Long (>2000 words):   ${lengthCounts.long} articles`);

  // Current image usage
  console.log('\n\n🖼️  Current Image Usage:\n');
  const noImages = stats.articleDetails.filter(a => a.imageCount === 0).length;
  const hasImages = stats.totalArticles - noImages;
  console.log(`  Articles with images: ${hasImages}`);
  console.log(`  Articles without images: ${noImages}`);

  // Save detailed JSON report
  const report = {
    summary: {
      totalArticles: stats.totalArticles,
      categoryCounts: Object.fromEntries(
        Object.entries(stats.articlesByCategory).map(([cat, articles]) => [cat, articles.length])
      ),
      lengthDistribution: lengthCounts
    },
    articlesByCategory: stats.articlesByCategory,
    imageAvailability: stats.imageAvailability,
    allArticles: stats.articleDetails
  };

  fs.writeFileSync('article-analysis-report.json', JSON.stringify(report, null, 2));
  console.log('\n\n📄 Detailed report saved to: article-analysis-report.json');

  console.log('\n' + '='.repeat(70));
  console.log('✅ Analysis Complete\n');

  return report;
}

// Run analysis
try {
  analyzeArticles();
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
