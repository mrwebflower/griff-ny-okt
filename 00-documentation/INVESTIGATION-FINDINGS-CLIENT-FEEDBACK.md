# Investigation Findings: Client Feedback Analysis

## Date: 2025-10-17
## Project: Griff Entreprenor Website Optimization

---

## Executive Summary

This investigation analyzed client feedback regarding image issues, CTA visibility, and content placement across the Griff Entreprenor website. The analysis covered:
- Old site (griffentreprenor.no)
- New site (griff-seo-okt.netlify.app)
- Project codebase structure
- Recent rotation fixes

**Key Finding**: The client feedback reveals **IMAGE APPROPRIATENESS** issues rather than technical visibility problems. Images exist and are technically visible, but they don't match the service/article content or appear rotated incorrectly.

---

## Part 1: Feedback Translation & Analysis

### Original Feedback (Norwegian → English)

#### Homepage (Forsiden)
**Client Says**: "det blir greit med stor logo (bilde) på forsiden eller andre bilde som passer bedre."
**Translation**: "It would be better with a large logo (image) on the homepage or another image that fits better."
**Analysis**: Client wants either a larger logo OR a more appropriate hero background image.

#### About Us (Om Oss)
**Client Says**: "2 samme bilder som passer ikke til firmas beskrivelsen."
**Translation**: "2 same images that don't fit the company description."
**Finding**: ✅ CONFIRMED - Same image used 3 times (https://ext.same-assets.com/4166723710/4128430851.jpeg)
- Line 38: Hero background
- Lines 104, 112: Company story section (2 identical images)
- Line 406: Team section

**Client Says**: "Vår Reise Gjennom Årene - blir det ikke bedre med det i 'historien' seksjon? Eller vår reise gjennom årene med 2025 på toppen og 2008 nederst?"
**Translation**: "Our Journey Through the Years - wouldn't it be better in the 'history' section? Or our journey through the years with 2025 on top and 2008 at bottom?"
**Finding**: ✅ CONFIRMED - Timeline currently shows 2008 → 2024 (ascending order)
**Client Preference**: Wants timeline REVERSED (2025/2024 → 2008) OR moved to history section

#### Services (Tjenester)
**Client Says**: "Tekst 'få gratis tilbud' og tlf nr. er ikke synlig"
**Translation**: "Text 'get free quote' and phone number are not visible"
**Finding**: ⚠️ **MISINTERPRETATION RISK** - CTAs ARE present in code (lines 682-694 in service template)
**True Meaning**: Likely means "not prominent enough" or styling makes them hard to see on specific devices/screens

**Client Says**: "bilder passer ikke" (for multiple services)
**Translation**: "images don't fit"
**Finding**: ✅ CONFIRMED - Service pages use WRONG category images:
- Nybygg (new construction) uses "tilbygg-bolig-trondheim" (extension) images
- Garasje (garage) uses "tilbygg-bolig-trondheim" (extension) images
- Multiple services share wrong images from different categories

#### Blog (Blogg)
**Client Says**: Multiple articles have "bilder passer ikke, roterte bilder"
**Translation**: "images don't fit, rotated images"
**Finding**: ✅ CONFIRMED - Two issues:
1. **Rotation Issue**: Already partially fixed (commits 9b26955, a98ec87) but more articles may be affected
2. **Appropriateness Issue**: E.g., "Flislegging" (tile laying) uses generic "bad-og-vatrom" (bathroom) images

---

## Part 2: Technical Findings

### 2.1 Homepage Issues

**File**: `src/components/sections/Hero.tsx`

**Current State**:
- Uses external URL: `https://ext.same-assets.com/4166723710/4128430851.jpeg`
- Same image used across multiple pages
- No large logo implementation - logo is standard size in header

**Problem**:
- Generic placeholder image not representing the company
- Logo not prominently displayed on homepage hero

**Solution Required**:
- Replace hero background with appropriate construction/building image
- OR add large logo overlay on hero section
- Use local optimized images from `/public/images/optimized/`

---

### 2.2 About Us (Om Oss) Issues

**File**: `src/app/om-oss/page.tsx`

**Problem 1: Duplicate Images**
```typescript
Line 38: backgroundImage: "url('https://ext.same-assets.com/4166723710/4128430851.jpeg')"
Line 104: src="https://ext.same-assets.com/4166723710/4128430851.jpeg"
Line 112: src="https://ext.same-assets.com/4166723710/4128430851.jpeg"
Line 406: src="https://ext.same-assets.com/4166723710/4128430851.jpeg"
```
**Impact**: Same generic image used 3-4 times, doesn't showcase company work

**Problem 2: Timeline Order**
```typescript
Lines 284-313: Timeline array ordered 2008 → 2024 (ascending)
```
**Client Want**: Reverse order (2024/2025 → 2008) or move to history section

---

### 2.3 Service Pages Issues

**File**: `src/app/tjenester/[slug]/page.tsx`

**Data Structure**: Inline servicesData object (lines 9-610)

**Problem: Wrong Images Mapped to Services**

| Service | Current Images | Should Be |
|---------|---------------|-----------|
| **Nybygg** (New Construction) | tilbygg-bolig-trondheim (extension images) | Actual new construction images |
| **Garasje** (Garage) | tilbygg-bolig-trondheim (extension images) | Actual garage construction images |
| **Isolering** (Insulation) | isolering-energisparing images ✓ | May need better images showing insulation work |
| **Bad og våtrom** (Bathroom) | rehabilitering images (general renovation) | Specific bathroom/wet room images |
| **Utvendig maling** (Exterior Painting) | rehabilitering images | Specific exterior painting images |
| **Malearbeid** (Painting Work) | rehabilitering images | Specific painting work images |
| **Flislegging** (Tile Laying) | rehabilitering images | Specific tile laying images |
| **Snekkerarbeid** (Carpentry) | rehabilitering images | Specific carpentry images |

**Image Directory Structure** (from investigation):
```
/public/images/optimized/
├── Bad og våtrom/          ← Has bathroom images
├── Garasje/               ← Has garage images (but service uses tilbygg images!)
├── Nybygg/                ← Has new construction images (but service uses tilbygg images!)
├── Rehabilitering/         ← General renovation images (overused)
├── Terrasse/              ← Terrace/deck images
├── Tilbygg/               ← Extension images (incorrectly used for multiple services)
└── Vinduer/               ← Window images
```

**Root Cause**: Image paths hardcoded in servicesData don't match available organized image categories.

**CTA Visibility**:
- CTAs ARE present in code (lines 682-694)
- Possible styling/contrast issue on mobile
- Client may mean "not prominent enough" rather than "not visible"

---

### 2.4 Blog Articles Issues

**File**: `src/app/blog/[slug]/page.tsx`
**Articles Location**: `src/content/articles/*.html`

**Problem 1: Image Rotation**
- **Status**: Partially fixed (Oct 16, 2025)
- **Fixed Articles**: isolering-trondheim.html, malearbeid-griff.html
- **Method**: CSS fix `image-orientation: from-image;` applied to ArticleWrapper.tsx
- **Remaining**: Client reports MORE articles with rotation issues:
  - Garasje (3 articles)
  - Hvorfor velge en snekker over DIY
  - Feng shui og snekring
  - Ekspertisolering
  - Profesjonell fasademaling
  - Snekkerarbeid

**Problem 2: Image Appropriateness**

**Category Mapping** (lines 8-23):
```typescript
const CATEGORY_MAPPING: Record<string, string> = {
  'Flislegging': 'bad-og-vatrom',  // Generic bathroom images
  'Isolering': 'rehabilitering',   // Generic renovation images
  'Malearbeid': 'rehabilitering',  // Generic renovation images
  'Snekkerarbeid': 'tilbygg',      // Extension images
  'Utvendig maling': 'rehabilitering' // Generic renovation images
};
```

**Header Images** (lines 26-34):
```typescript
const HEADER_IMAGES: Record<string, string> = {
  'bad-og-vatrom': '/images/optimized/bad-og-vatrom/01-header-bad-vatrom-griff-entreprenor.webp',
  'garasje': '/images/optimized/garasje/01-header-garasje-griff-entreprenor.jpg',
  // ... etc
};
```

**Issue**: Articles get mapped to CATEGORY images, not article-specific images.
- "Flislegging" article → shows generic bathroom header (should show tile laying)
- "Fukt" article → may show wrong category
- Garasje articles → use generic garage images (may be rotated)

---

## Part 3: Image Inventory Analysis

### Available Image Categories:
```
Bad og våtrom/       10 images (bathrooms, wet rooms)
Garasje/             3 images (garages)
Nybygg/              6 images (new construction)
Rehabilitering/     19+ images (general renovation - OVERUSED)
Terrasse/           11 images (decks, terraces)
Tilbygg/            45 images (extensions - INCORRECTLY USED)
Vinduer/            18 images (windows)
```

### Image Quality Issues from Git Status:
```
Deleted webp files: 114 files
Modified jpg files: 7 files in rotation
Rotation-affected categories:
  - Tilbygg (many images)
  - Vinduer (multiple images)
  - Rehabilitering (multiple images)
```

**Interpretation**: Recent image processing may have introduced rotation issues OR deleted needed webp files.

---

## Part 4: Root Cause Analysis

### Why These Issues Occurred:

**1. Template/Placeholder Images Not Replaced**
- Homepage and About Us still use external placeholder URLs
- Images not replaced with actual company project photos

**2. Service Data Hardcoded with Wrong Paths**
- servicesData object has incorrect image paths
- Nybygg → uses tilbygg images
- Garasje → uses tilbygg images
- Multiple services → use generic rehabilitering images

**3. Blog Category Mapping Too Generic**
- CATEGORY_MAPPING maps multiple topics to same category
- Header images selected by category, not by specific article content
- Example: "Flislegging" (tile work) → "bad-og-vatrom" category → generic bathroom header

**4. Image Rotation Issues**
- EXIF orientation metadata causing mobile rotation problems
- Partially fixed with CSS solution (Oct 16)
- More articles affected than initially identified

**5. Image Organization Mismatch**
- Organized folders exist with appropriate images
- Code doesn't reference them correctly
- Example: Garasje/ folder has garage images but service uses Tilbygg/ images

---

## Part 5: Client Intent Interpretation

### What Client REALLY Means:

**"få gratis tilbud og tlf nr. er ikke synlig"**
- NOT technically invisible
- Likely means: Not prominent/eye-catching enough
- Possible: Contrast issue on mobile
- Possible: Positioned below fold on smaller screens

**"bilder passer ikke"**
- Images don't match service/article CONTENT
- Shows wrong type of work (extension images for garage service)
- Generic images instead of specific examples

**"roterte bilder"**
- Images appear sideways/upside-down on mobile
- EXIF orientation issue partially fixed
- More articles need the same CSS fix

**"2 samme bilder"**
- Duplicate image overuse reduces credibility
- Doesn't showcase variety of company's work

**"2025 på toppen og 2008 nederst"**
- Timeline should show most recent first
- More intuitive for users
- Emphasizes current capabilities over history

---

## Part 6: Proposed Solutions Summary

### Homepage:
1. Replace hero background with professional construction photo
2. OR add large logo overlay on hero section
3. Use images from /public/images/optimized/

### About Us:
1. Replace 3 duplicate images with diverse company photos
2. Reverse timeline order (2024 → 2008)
3. Consider moving timeline to separate history section

### Service Pages:
1. **Fix image paths in servicesData**:
   - Nybygg → use /Nybygg/ folder images
   - Garasje → use /Garasje/ folder images
   - Update all services to use correct category images
2. **Enhance CTA visibility**:
   - Increase button size/prominence
   - Improve color contrast
   - Consider sticky CTA bar

### Blog Articles:
1. **Apply rotation fix** to all affected articles:
   - Extend CSS fix from ArticleWrapper.tsx to all article images
   - Test on mobile devices
2. **Update CATEGORY_MAPPING**:
   - Create more specific article → image mappings
   - Consider article-specific images vs. category headers
3. **Review all article images** for appropriateness

### Image Management:
1. Client to provide category-specific images via Google Drive
2. Organize images by service type
3. Replace placeholder images with real project photos
4. Ensure all images have correct orientation

---

## Part 7: Client Question to Ask

Before creating implementation plan, clarify with client:

**Image Selection Questions:**
1. Do you want us to select images from existing folders, or will you provide new images via Google Drive?
2. For services lacking specific images (malearbeid, flislegging, etc.), how many images per service do you need?
3. For blog articles, should each article have unique images or can we reuse category images?
4. Do you have preferred project photos to showcase on About Us page?

**Homepage Questions:**
1. Do you prefer:
   - A) Large logo on hero section OR
   - B) Better background image with standard logo size?
2. If logo option: What size should it be?

**Timeline Questions:**
1. Do you prefer:
   - A) Reversed timeline (2024 → 2008) in current location OR
   - B) Move entire timeline to separate "History" section?

**CTA Visibility Questions:**
1. On which devices/screen sizes do CTAs appear not visible?
2. Should we make CTAs more prominent (larger, different colors, sticky)?

---

## Part 8: Files Requiring Changes

### High Priority:
- `src/components/sections/Hero.tsx` (homepage hero)
- `src/app/om-oss/page.tsx` (about us images + timeline)
- `src/app/tjenester/[slug]/page.tsx` (service data image paths)
- `src/app/blog/[slug]/page.tsx` (category mapping, rotation fix)

### Medium Priority:
- `src/components/blog/ArticleWrapper.tsx` (ensure rotation fix applied)
- Image files in `/public/images/optimized/` (organize, verify rotation)

### Low Priority:
- Individual article HTML files (if article-specific image updates needed)

---

## Next Steps

1. **Get client clarification** on questions above
2. **Create detailed implementation plan** based on findings
3. **Estimate image requirements** per service/article
4. **Plan testing strategy** for mobile rotation issues
5. **Execute changes** with surgical precision

---

## Conclusion

The client feedback reveals **systematic image mismatches** rather than technical bugs. The solution requires:
1. Correcting image paths in service data
2. Replacing placeholder images with real project photos
3. Applying rotation fixes to remaining articles
4. Reversing timeline order
5. Potentially enhancing CTA prominence

All issues are **fixable through code changes** and **proper image selection**. No architectural changes required.
