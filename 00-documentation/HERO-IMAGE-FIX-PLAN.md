# Hero Image Fix - Surgical Implementation Plan

**Date:** October 15, 2025
**Status:** 🔍 Investigation Complete - Ready for Surgical Fix
**Priority:** HIGH - Critical Visual Bug

---

## 🎯 Problem Identified

### What Was Missed

The initial implementation successfully updated images **INSIDE the HTML content**, but missed the **actual hero image** that is rendered by the `ArticleWrapper` component.

**Evidence:**
```tsx
// ArticleWrapper.tsx (lines 156-164)
{image && (
  <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-lg">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover"  // ← This is what user saw
    />
  </div>
)}
```

**Root Cause:**
```typescript
// src/app/blog/[slug]/page.tsx (line 52)
image: "https://ext.same-assets.com/4166723710/4128430851.jpeg" // ← Hardcoded external URL
```

All 25 articles are using the SAME hardcoded external URL for their hero images.

---

## ✅ Solution - Surgical Fix

### Target File
**Single file to modify:** `src/app/blog/[slug]/page.tsx`

### Implementation Strategy

**Update the `extractMetadata` function** to:
1. Extract service category from HTML comment
2. Map service to optimized image folder
3. Generate path to category-specific header image
4. Return optimized image path instead of hardcoded URL

---

## 📋 Detailed Implementation

### Category Mapping (Reuse from update-article-images.js)

```typescript
const CATEGORY_MAPPING: Record<string, string> = {
  'Bad': 'bad-og-våtrom',
  'Våtrom': 'bad-og-våtrom',
  'Bad og våtrom': 'bad-og-våtrom',
  'Garasje': 'garasje',
  'Tilbygg': 'tilbygg',
  'Nybygg': 'nybygg',
  'Rehabilitering': 'rehabilitering',
  'Terrasse': 'terrasse',
  'Vinduer': 'vinduer',
  'Flislegging': 'bad-og-våtrom',
  'Isolering': 'rehabilitering',
  'Malearbeid': 'rehabilitering',
  'Snekkerarbeid': 'tilbygg',
  'Utvendig maling': 'rehabilitering'
};
```

### Header Image Mapping

```typescript
const HEADER_IMAGES: Record<string, string> = {
  'bad-og-våtrom': '/images/optimized/bad-og-våtrom/01-header-bad-vatrom-griff-entreprenor.webp',
  'garasje': '/images/optimized/garasje/01-header-garasje-griff-entreprenor.jpg',
  'nybygg': '/images/optimized/nybygg/01-header-nybygg-griff-entreprenor.webp',
  'rehabilitering': '/images/optimized/rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg',
  'terrasse': '/images/optimized/terrasse/01-header-terrasse-griff-entreprenor.jpg',
  'tilbygg': '/images/optimized/tilbygg/01-header-tilbygg-griff-entreprenor.jpg',
  'vinduer': '/images/optimized/vinduer/01-header-vinduer-griff-entreprenor.jpg'
};
```

### Updated extractMetadata Function

```typescript
const extractMetadata = (html: string) => {
  // ... existing code ...

  // Extract services
  const metaServicesMatch = html.match(/<!-- Services: ([^>]+) -->/i);
  const services = metaServicesMatch?.[1] || "";

  // Determine category and mapped folder
  const serviceParts = services.split(',').map(s => s.trim());
  const primaryService = serviceParts[0] || 'Rehabilitering';
  const mappedCategory = CATEGORY_MAPPING[primaryService] || 'rehabilitering';

  // Get optimized header image
  const image = HEADER_IMAGES[mappedCategory] || HEADER_IMAGES['rehabilitering'];

  // ... rest of function ...

  return {
    title,
    description,
    category,
    readTime,
    publishedDate: new Date().toISOString().split('T')[0],
    keywords: `${title}, Trondheim, entreprenør, bygg, ${category.toLowerCase()}`,
    articleId: metaIdMatch?.[1] || slug,
    image  // ← Now returns optimized image path
  };
};
```

---

## 🔬 Testing Strategy

### 1. Test Sample Articles

**Test Articles (one per category):**
```
- bad-vatrom-griff.html → Bad og våtrom
- garasje-trondheim.html → Garasje
- nybygg-trondheim.html → Nybygg
- rehabilitering-trondheim.html → Rehabilitering
- terrasse-investering.html → Terrasse
- tilbygg-bolig-trondheim.html → Tilbygg
- riktig-ventilasjon-moderne-hus.html → Vinduer
```

### 2. Verification Checklist

For each test article, verify:
- [ ] Hero image displays at top of article (after breadcrumb, before title)
- [ ] Image is category-specific header (01-header-[category]...)
- [ ] Image has correct classes: `w-full h-full object-cover`
- [ ] Image is WebP format (or JPG for some categories)
- [ ] No broken image icon
- [ ] No external URL (ext.same-assets.com)

### 3. Browser Test

```bash
npm run dev
# Navigate to:
http://localhost:3000/blog/bad-vatrom-griff
http://localhost:3000/blog/garasje-trondheim
http://localhost:3000/blog/nybygg-trondheim
```

---

## 📊 Expected Results

### Before Fix
```html
<!-- ALL articles use same external URL -->
<img src="https://ext.same-assets.com/4166723710/4128430851.jpeg"
     alt="..."
     class="w-full h-full object-cover">
```

### After Fix
```html
<!-- Bad og våtrom articles -->
<img src="/images/optimized/bad-og-våtrom/01-header-bad-vatrom-griff-entreprenor.webp"
     alt="Bad og våtrom Trondheim: Trygge og moderne løsninger fra Griff Entreprenør"
     class="w-full h-full object-cover">

<!-- Garasje articles -->
<img src="/images/optimized/garasje/01-header-garasje-griff-entreprenor.jpg"
     alt="Hvordan kan en garasje øke verdien på eiendommen din i Trondheim?"
     class="w-full h-full object-cover">

<!-- etc. for each category -->
```

---

## ⚠️ Risk Assessment

### Risk Level: **LOW**

**Why:**
- Single file change
- Simple logic (extract service → map category → return image path)
- No database changes
- No external dependencies
- Fallback to default category if service not found
- Images already deployed to `public/images/optimized/`

### Rollback Plan

If issues occur:
1. Git checkout previous version of `page.tsx`
2. Images in HTML content will still work
3. Hero images will revert to external URL (working state)

---

## 📝 Implementation Steps

### Step 1: Update page.tsx
1. Add category mapping constants
2. Add header image mapping constants
3. Update extractMetadata function
4. Test locally

### Step 2: Verification
1. Run dev server
2. Test 7 sample articles (one per category)
3. Check browser console for errors
4. Verify images load correctly
5. Check mobile responsiveness

### Step 3: Commit & Push
1. Git add page.tsx
2. Commit with message: "Fix: Replace hardcoded hero image URL with category-specific optimized headers"
3. Push to GitHub

---

## 🎯 Success Criteria

- [x] Investigation complete
- [ ] page.tsx updated with surgical precision
- [ ] All 7 categories tested
- [ ] No broken images
- [ ] Hero images match article categories
- [ ] WebP format serving correctly
- [ ] Changes committed and pushed to GitHub

---

## 📦 Files Modified

### Modified:
- `src/app/blog/[slug]/page.tsx` (1 file)

### Not Modified:
- All 25 article HTML files (already updated)
- ArticleWrapper.tsx (no changes needed)
- Image files (already deployed)

---

## 🚀 Execution Timeline

**Total Time Estimate:** 10 minutes

1. **Update code:** 3 minutes
2. **Test locally:** 5 minutes
3. **Commit & push:** 2 minutes

---

**Status:** ✅ Plan Ready - Awaiting Execution
**Complexity:** Simple (one-file surgical fix)
**Confidence:** 100%
