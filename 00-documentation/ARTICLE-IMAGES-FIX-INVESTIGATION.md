# Article Images & Formatting Fix Investigation

**Date**: 2025-10-15
**Issue Reporter**: User
**Severity**: High (affects user experience on live site)

## Issues Identified

### Issue 1: Duplicate Header Images in Article Body

**Problem**: Some articles have the 01-header image appearing BOTH as hero (rendered by ArticleWrapper) AND as first body image, causing duplicate images to display sequentially.

**Example**: https://griff-seo-okt.netlify.app/blog/byggesoknad-trondheim-veiledning
- Hero image: `/images/optimized/garasje/01-header-garasje-griff-entreprenor.webp`
- First body image: Same image appears again in article content

**Root Cause**: `update-article-images.js` script inserted 01-header images into article HTML body content. ArticleWrapper component separately renders hero from metadata, resulting in two instances of the same image.

**Affected Articles** (10 total):
1. byggesoknad-trondheim-veiledning.html
2. garasje-bygging-griff.html
3. garasje-trondheim.html
4. isolering-trondheim.html
5. kostnadseffektiv-garasjebygging-trondheim.html
6. rehabilitering-trondheim.html
7. rehabilitering-trondheim-generell.html
8. terrasse-investering.html
9. terrasse-trondheim-bygging.html
10. tilbygg-bolig-trondheim.html

### Issue 2: Complex Grid/SVG Formatting Breaks Layout

**Problem**: Articles contain complex `<div class="minimalist-grid-container">` structures with SVG icons that don't render properly, causing bad formatting with excessive whitespace.

**Example**: https://griff-seo-okt.netlify.app/blog/flislegging-trondheim-tips
- Complex grid with 4 items, each containing SVG icon + heading + paragraph
- Results in malformed display with odd spacing

**User Feedback**:
```
"Sertifiserte fagfolk

Våre flisleggere har våtromssertifikat og omfattende erfaring

[weird spacing]

Komplett tjeneste

Fra planlegging og forberedelse til ferdig resultat
..."
```

**Affected Articles** (4 total):
1. flislegging-trondheim-tips.html
2. kostnadsberegning-baderomsrenovering-trondheim.html
3. kostnadseffektiv-garasjebygging-trondheim.html
4. isolering-trondheim.html

## Fix Strategy

### Fix 1: Remove Duplicate Header Images

**Approach**: Remove all `<img>` tags from article body that contain "01-header" in the src path.

**Pattern to Match**:
```regex
<img[^>]*src="[^"]*01-header[^"]*"[^>]*class="article-image"[^>]*>
```

**Expected Result**:
- Hero image only appears once (rendered by ArticleWrapper)
- Article body starts with first non-header image (numbered 02, 03, etc.)

### Fix 2: Simplify Complex Grid Formatting

**Approach**: Replace complex `<div class="minimalist-grid-container">...</div>` blocks (including associated styles) with simple semantic HTML.

**Pattern to Match**:
```regex
<div class="minimalist-grid-container[^>]*>[\s\S]*?<\/div>\s*<style>[\s\S]*?<\/style>
```

**Replacement Strategy**:
Extract the text content from each grid-item:
- h3 text → list item heading (bold)
- p text → list item content

Convert to simple unordered list:
```html
<ul>
  <li><strong>[H3 Text]:</strong> [P Text]</li>
  ...
</ul>
```

**Example Transformation**:

**Before**:
```html
<div class="minimalist-grid-container grid-2x2">
  <div class="grid-item">
    <svg>...</svg>
    <h3>Sertifiserte fagfolk</h3>
    <p>Våre flisleggere har våtromssertifikat</p>
  </div>
  ...
</div>
<style>
.minimalist-grid-container { ... }
</style>
```

**After**:
```html
<ul>
  <li><strong>Sertifiserte fagfolk:</strong> Våre flisleggere har våtromssertifikat</li>
  ...
</ul>
```

## Implementation Plan

1. **Create fix script** (`fix-article-images-formatting.js`):
   - Remove all 01-header images from article body
   - Simplify all minimalist-grid-container blocks

2. **Test on problem articles**:
   - byggesoknad-trondheim-veiledning.html
   - flislegging-trondheim-tips.html

3. **Apply to all affected articles** (14 total unique files)

4. **Verify build** with `npm run build`

5. **Commit and push** to GitHub

## Expected Results

- **10 articles**: No more duplicate header images
- **4 articles**: Simple, clean formatting without complex grids
- **All 25 articles**: Build successfully
- **Live site**: Better UX with single hero images and readable formatting

## User Requirements

1. "I dont want double header images" ✅
2. "under the real heading/hero image should be the start of the text!" ✅
3. "change that formatting please more simple guaranteed to work" ✅
4. "It must not be like that anywhere!!" ✅

## Technical Notes

- ArticleWrapper (lines 156-164 in ArticleWrapper.tsx) renders hero from `image` prop
- page.tsx extractMetadata() (lines 45-91) determines which header image to use
- Header images should NEVER appear in article HTML body content
- Simple HTML (lists, paragraphs) is more reliable than complex CSS grid structures
