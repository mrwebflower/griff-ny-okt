#!/usr/bin/env node

/**
 * Fix Article Images and Formatting Script
 *
 * Fixes two issues:
 * 1. Removes 01-header images from article body (duplicate hero image bug)
 * 2. Simplifies complex grid/SVG structures to simple lists (formatting bug)
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = 'src/content/articles';

// Get all HTML files
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.html'));

console.log(`\n🔧 Fixing Article Images & Formatting in ${files.length} articles\n`);
console.log('='.repeat(70));

let filesFixed = 0;
let headerImagesRemoved = 0;
let gridsSimplified = 0;

files.forEach(filename => {
  const filePath = path.join(ARTICLES_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Remove 01-header images from article body (these duplicate the hero)
  // We need to match <img> tags that contain BOTH "01-header" AND class="article-image"
  // in ANY order of attributes
  const imgTags = content.match(/<img[^>]*>/gi) || [];

  imgTags.forEach(imgTag => {
    // Check if this img contains both "01-header" and class="article-image"
    if (imgTag.includes('01-header') && imgTag.includes('class="article-image"')) {
      content = content.replace(imgTag, '');
      headerImagesRemoved++;
      modified = true;
    }
  });

  if (headerImagesRemoved > 0) {
    console.log(`✅ ${filename}: Removed ${imgTags.filter(tag => tag.includes('01-header') && tag.includes('class="article-image"')).length} duplicate header image(s)`);
  }

  // 2. Simplify complex grid structures
  // Pattern: <div class="minimalist-grid-container">...</div> followed by <style>...</style>

  // Match the entire grid block with associated style
  const gridPattern = /<div class="minimalist-grid-container[^"]*">\s*([\s\S]*?)<\/div>\s*<style>[\s\S]*?<\/style>/gi;

  const gridMatches = content.match(gridPattern);
  if (gridMatches) {
    gridMatches.forEach(gridBlock => {
      // Extract all grid-item blocks
      const gridItemPattern = /<div class="grid-item">\s*(?:<svg[\s\S]*?<\/svg>)?\s*<h3>([^<]+)<\/h3>\s*<p>([^<]+)<\/p>\s*<\/div>/gi;

      const items = [];
      let itemMatch;
      while ((itemMatch = gridItemPattern.exec(gridBlock)) !== null) {
        const heading = itemMatch[1].trim();
        const text = itemMatch[2].trim();
        items.push({ heading, text });
      }

      if (items.length > 0) {
        // Create simple list replacement
        const listItems = items.map(item =>
          `  <li><strong>${item.heading}:</strong> ${item.text}</li>`
        ).join('\n');

        const replacement = `<ul>\n${listItems}\n</ul>`;

        // Replace the entire grid block with the simple list
        content = content.replace(gridBlock, replacement);
        gridsSimplified++;
        modified = true;
      }
    });

    if (modified) {
      console.log(`✅ ${filename}: Simplified ${gridMatches.length} complex grid(s) to simple lists`);
    }
  }

  // Save if modified
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesFixed++;
  }
});

console.log('\n' + '='.repeat(70));
console.log('📊 SUMMARY');
console.log('='.repeat(70));
console.log(`\nFiles fixed: ${filesFixed}/${files.length}`);
console.log(`Header images removed: ${headerImagesRemoved}`);
console.log(`Grids simplified: ${gridsSimplified}`);
console.log('\n✅ Fix complete!');
console.log('\nAffected issues:');
console.log('  - No more duplicate header images in article body');
console.log('  - Complex grid/SVG structures replaced with simple lists');
console.log('\n');
