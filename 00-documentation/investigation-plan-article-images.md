# Investigation Plan: Article Image Optimization

**Date:** October 15, 2025
**Objective:** Replace all article images with optimized WebP images from category-matched folders
**Status:** 🔍 Investigation Phase

---

## 🎯 Project Goals

### Primary Objectives:
1. Replace all hero images with `01-header-[category]-griff-entreprenor.webp`
2. Replace body images with optimized WebP images from matching category folders
3. Ensure minimum 1-2 images per article (depending on length)
4. Distribute body images to avoid same first image across articles in one category
5. Maintain category alignment (article category → image folder)

### Success Criteria:
- ✅ All 25 articles updated with optimized images
- ✅ Hero images use category-specific headers
- ✅ Body images use appropriate category images
- ✅ No repeated first body image within same category
- ✅ All images in WebP format
- ✅ Image paths correctly reference optimized folders
- ✅ Articles maintain semantic HTML structure

---

## 📋 Investigation Steps

### Phase 1: Data Collection
**Duration:** 30 minutes

#### Step 1.1: Analyze All Articles
- [x] List all 25 HTML files in `src/content/articles/`
- [ ] Extract service categories from each article
- [ ] Categorize articles by primary service
- [ ] Count articles per category

#### Step 1.2: Map Image Availability
- [ ] Count available images per optimized folder
- [ ] Identify header images (01-header-*)
- [ ] Count body images available per category
- [ ] Calculate image-to-article ratio

#### Step 1.3: Analyze Current Image Usage
- [ ] Find all `<img>` tags in articles
- [ ] Identify hero image patterns
- [ ] Identify body image patterns
- [ ] Document current image paths
- [ ] Note any special image attributes (alt text, classes)

---

### Phase 2: Strategy Design
**Duration:** 20 minutes

#### Step 2.1: Category Mapping Strategy
```
Article Services → Optimized Folder
├── Bad, Våtrom, Rehabilitering → Bad og våtrom/
├── Garasje → Garasje/
├── Garasje, Tilbygg → Tilbygg/
├── Nybygg → Nybygg/
├── Rehabilitering → Rehabilitering/
├── Terrasse → Terrasse/
├── Tilbygg → Tilbygg/
├── Vinduer → Vinduer/
└── Other services → Best match folder
```

#### Step 2.2: Image Distribution Strategy
**Hero Images:**
- Always use `01-header-[category]-griff-entreprenor.webp`
- One header per category (consistent across category)

**Body Images:**
- Distribute sequentially across articles
- Article 1 in category: images 02, 03
- Article 2 in category: images 04, 05
- Article 3 in category: images 06, 07
- etc.

**For Categories with Multiple Articles:**
- Calculate: `available_images / article_count`
- Assign unique image sets to each article
- Avoid overlap on first body image

#### Step 2.3: Image Count Per Article
- **Short articles (< 1000 words):** 1-2 body images
- **Medium articles (1000-2000 words):** 2-3 body images
- **Long articles (> 2000 words):** 3-4 body images

---

### Phase 3: Technical Implementation Plan
**Duration:** 60 minutes

#### Step 3.1: Script Design
**Tool:** Node.js script with filesystem operations

**Script Functions:**
1. `parseArticleMetadata(filePath)` - Extract Services comment
2. `mapCategoryToFolder(services)` - Map to optimized folder
3. `getHeaderImage(category)` - Get 01-header path
4. `getBodyImages(category, articleIndex, count)` - Get distributed images
5. `updateArticleImages(filePath, headerImg, bodyImgs)` - Replace HTML
6. `processAllArticles()` - Main execution function

#### Step 3.2: HTML Parsing & Replacement Strategy
**Approach:** Use regex or HTML parser

**Hero Image Replacement:**
- Find: First `<img>` tag or specific hero image pattern
- Replace with: Category-specific header image
- Preserve: alt text, class attributes

**Body Image Replacement:**
- Find: All `<img>` tags in article body
- Replace: With distributed category images
- Maintain: Semantic image placement (after headers/paragraphs)
- Preserve: alt text attributes (update if needed)
- Keep: CSS classes for styling

#### Step 3.3: Path Resolution
**Current paths:** `/assets/images/processed/article/[name].jpg`
**New paths:** `/images/optimized/[category]/[name].webp`

OR (if we copy to public):
**New paths:** `/assets/images/optimized/[category]/[name].webp`

**Decision needed:** Where to deploy optimized images?

#### Step 3.4: Backup Strategy
- Create backup of `src/content/articles/` folder
- Name: `src/content/articles-backup-[timestamp]`
- Verify backup before processing

---

### Phase 4: Validation
**Duration:** 20 minutes

#### Step 4.1: Pre-Execution Checks
- [ ] Verify all optimized images exist
- [ ] Confirm folder structure correct
- [ ] Test script on 2-3 sample articles
- [ ] Review sample output HTML

#### Step 4.2: Post-Execution Validation
- [ ] Verify all 25 articles updated
- [ ] Check hero images correct per category
- [ ] Verify body images distributed properly
- [ ] Confirm no broken image paths
- [ ] Test image loading in dev environment
- [ ] Validate WebP paths correct

#### Step 4.3: Quality Assurance
- [ ] Check alt text maintained/updated
- [ ] Verify CSS classes preserved
- [ ] Ensure semantic HTML intact
- [ ] Test responsive image behavior
- [ ] Validate accessibility (alt text)

---

## 📊 Expected Data Structure

### Article Categories Count (Estimated):
```
Bad og våtrom:      ~3-4 articles
Garasje:            ~2-3 articles
Rehabilitering:     ~5-6 articles
Tilbygg:            ~4-5 articles
Nybygg:             ~2-3 articles
Terrasse:           ~1-2 articles
Vinduer:            ~1-2 articles
Mixed/Other:        ~3-4 articles
```

### Image Availability:
```
Bad og våtrom:      10 images (1 header + 9 body)
Garasje:            3 images (1 header + 2 body)
Nybygg:             6 images (1 header + 5 body)
Rehabilitering:     25 images (1 header + 24 body)
Terrasse:           11 images (1 header + 10 body)
Tilbygg:            45 images (1 header + 44 body)
Vinduer:            18 images (1 header + 17 body)
```

### Image Distribution Example (Rehabilitering):
```
5 articles × 3 images each = 15 images needed
Available: 24 body images

Article 1: images 02, 03, 04
Article 2: images 05, 06, 07
Article 3: images 08, 09, 10
Article 4: images 11, 12, 13
Article 5: images 14, 15, 16
```

---

## 🛠 Implementation Tools

### Required Dependencies:
- Node.js (installed ✅)
- Filesystem module (fs)
- Path module (path)
- Optional: cheerio (HTML parsing)

### Script Structure:
```javascript
// update-article-images.js
const fs = require('fs');
const path = require('path');

// Configuration
const ARTICLES_DIR = 'src/content/articles';
const OPTIMIZED_DIR = 'all-pictures-optimized';

// Category mapping
const categoryToFolder = {
  'Bad': 'Bad og våtrom',
  'Våtrom': 'Bad og våtrom',
  'Garasje': 'Garasje',
  'Tilbygg': 'Tilbygg',
  // ... etc
};

// Functions
function extractServiceCategory(htmlContent) { ... }
function getOptimizedImages(category) { ... }
function distributeImages(articles, images) { ... }
function updateArticleHTML(html, headerImg, bodyImgs) { ... }
function processAllArticles() { ... }

// Execute
processAllArticles();
```

---

## ⚠️ Risk Assessment

### Potential Issues:
1. **Insufficient images per category**
   - Risk: Medium
   - Mitigation: Reuse images if needed

2. **Complex HTML structure**
   - Risk: Low
   - Mitigation: Use robust HTML parsing

3. **Image path resolution**
   - Risk: Medium
   - Mitigation: Test paths in dev environment

4. **Breaking article layout**
   - Risk: Low
   - Mitigation: Preserve all CSS classes and structure

5. **Loss of alt text**
   - Risk: Low
   - Mitigation: Extract and preserve alt text

---

## 📅 Timeline

### Investigation Phase: 30 minutes
- Data collection
- Analysis
- Documentation

### Implementation Phase: 60 minutes
- Script development
- Testing on samples
- Full execution

### Validation Phase: 20 minutes
- Quality checks
- Testing
- Documentation

**Total Estimated Time:** 110 minutes (< 2 hours)

---

## 🔄 Next Steps

### Immediate Actions:
1. ✅ Create this investigation plan
2. [ ] Analyze all 25 articles in detail
3. [ ] Create investigation findings document
4. [ ] Count articles per category
5. [ ] Design image distribution matrix
6. [ ] Develop update script
7. [ ] Test on 3 sample articles
8. [ ] Execute on all 25 articles
9. [ ] Validate and document results

### Deliverables:
- [ ] `investigation-plan-article-images.md` (this document)
- [ ] `investigation-findings-article-images.md` (analysis results)
- [ ] `update-article-images.js` (implementation script)
- [ ] `article-image-mapping.json` (distribution record)
- [ ] `article-update-report.md` (results summary)

---

**Status:** ✅ Investigation Plan Complete - Ready to Execute
**Next:** Begin detailed article analysis and create findings document
