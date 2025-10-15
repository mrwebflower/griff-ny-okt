#!/usr/bin/env node

/**
 * Fix Hero Images Script
 *
 * Fixes two issues:
 * 1. Removes hero images inserted by update-article-images.js (double hero image bug)
 * 2. Updates folder paths from "bad-og-våtrom" to "bad-og-vatrom" (URL encoding fix)
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = 'src/content/articles';

// Get all HTML files
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.html'));

console.log(`\n🔧 Fixing Hero Images in ${files.length} articles\n`);
console.log('='.repeat(70));

let filesFixed = 0;
let heroImagesRemoved = 0;
let pathsUpdated = 0;

files.forEach(filename => {
  const filePath = path.join(ARTICLES_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Remove hero images inserted AFTER H1 tag (my script inserted them after H1, not before)
  // Pattern: <h1>...</h1> followed by newlines and img with hero class
  const heroImagePattern = /(<h1[^>]*>.*?<\/h1>\s*)\n*<img[^>]*class="(article-hero-image|hero-image)"[^>]*>\s*/gi;

  const heroMatch = content.match(heroImagePattern);
  if (heroMatch) {
    // Replace the pattern, keeping only the H1 tag
    content = content.replace(heroImagePattern, '$1\n\n');
    heroImagesRemoved++;
    modified = true;
    console.log(`✅ ${filename}: Removed inserted hero image after H1`);
  }

  // 2. Update paths from "bad-og-våtrom" to "bad-og-vatrom"
  const oldPath = 'bad-og-våtrom';
  const newPath = 'bad-og-vatrom';

  if (content.includes(oldPath)) {
    const occurrences = (content.match(new RegExp(oldPath, 'g')) || []).length;
    content = content.replace(new RegExp(oldPath, 'g'), newPath);
    pathsUpdated += occurrences;
    modified = true;
    console.log(`✅ ${filename}: Updated ${occurrences} path(s) to URL-safe name`);
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
console.log(`Hero images removed: ${heroImagesRemoved}`);
console.log(`Paths updated: ${pathsUpdated}`);
console.log('\n✅ Fix complete!\n');
