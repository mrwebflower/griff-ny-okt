# IMPLEMENTATION PLAN - Client Feedback Fixes
## #ULTRATHINK ANALYSIS

**Date**: 2025-10-17
**Status**: Ready for Approval
**Complexity**: Medium (surgical code changes + image remapping)
**Estimated Changes**: 5 files, 150+ lines modified

---

## 🎯 OBJECTIVES

Based on client answers:
1. **Use existing images** from organized folders (no new uploads needed)
2. **Keep homepage background** (client says "should be ok now")
3. **Reverse timeline** (2024 → 2008) in current location
4. **Enhance CTAs**: Make sticky and similar to old site elements
5. **Map article-specific images** from existing folders

---

## 📊 INVESTIGATION SUMMARY

### Image Inventory Discovered:
```
/public/images/optimized/
├── Vinduer/              36 files ✅ (windows)
├── Bad og våtrom/        10 files ⚠️ (old folder with spaces)
├── bad-og-vatrom/        14 files ✅ (new folder - use this)
├── Garasje/               6 files ✅ (garages)
├── Rehabilitering/       50 files ⚠️ (overused - generic renovation)
├── Nybygg/               12 files ✅ (new construction)
├── Tilbygg/              90 files ⚠️ (extensions - HUGE, misused)
└── Terrasse/             22 files ✅ (terraces/decks)
```

**Critical Findings**:
1. Nybygg folder has 12 images BUT service uses Tilbygg images
2. Garasje folder has 6 images BUT service uses Tilbygg images
3. Rehabilitering (50 files) overused for multiple unrelated services
4. TWO Bad og våtrom folders (consolidation needed)
5. Header already sticky (no change needed!)
6. Homepage background uses external placeholder URL

---

## 🔧 IMPLEMENTATION STRATEGY

### Phase 1: About Us Page Fixes
**File**: `src/app/om-oss/page.tsx`

**Changes**:
1. **Fix Duplicate Images** (3 occurrences → use diverse images)
   - Line 38: Hero background → Use Rehabilitering header
   - Line 104: Company story image 1 → Use Nybygg image
   - Line 112: Company story image 2 → Use Tilbygg image
   - Line 406: Team image → Use Terrasse image

2. **Reverse Timeline Order** (2008→2024 to 2024→2008)
   - Line 283-313: Reverse array order
   - Update heading "Vår Reise Gjennom Årene" description

**Exact Changes**:
```typescript
// BEFORE (Line 38):
backgroundImage: "url('https://ext.same-assets.com/4166723710/4128430851.jpeg')"

// AFTER:
backgroundImage: "url('/images/optimized/Rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg')"

// BEFORE (Lines 103-119):
<Image src="https://ext.same-assets.com/4166723710/4128430851.jpeg" ... />
<Image src="https://ext.same-assets.com/4166723710/4128430851.jpeg" ... />

// AFTER:
<Image src="/images/optimized/Nybygg/nybygg-griff-entreprenor-02.webp" alt="Nybyggprosjekt i Trondheim" ... />
<Image src="/images/optimized/Tilbygg/tilbygg-griff-entreprenor-02.webp" alt="Tilbyggprosjekt i Trondheim" ... />

// BEFORE (Line 406):
src="https://ext.same-assets.com/4166723710/4128430851.jpeg"

// AFTER:
src="/images/optimized/Terrasse/terrasse-griff-entreprenor-02.webp"

// BEFORE (Lines 283-313): Timeline array
{[
  { year: "2008", title: "Oppstart..." },
  { year: "2012", title: "Utvidelse..." },
  // ... continues to 2024
]}

// AFTER: Reverse the array
{[
  { year: "2024", title: "Fremtiden er nå..." },
  { year: "2020", title: "Bærekraft i fokus..." },
  { year: "2018", title: "Digitalisering..." },
  { year: "2015", title: "Sertifisering..." },
  { year: "2012", title: "Utvidelse..." },
  { year: "2008", title: "Oppstart..." }
]}
```

---

### Phase 2: Service Pages Image Mapping Fix
**File**: `src/app/tjenester/[slug]/page.tsx`

**Problem**: servicesData object has wrong hardcoded image paths

**Current vs Correct Mapping**:

| Service | Current (WRONG) | Should Be (CORRECT) | Available Images |
|---------|-----------------|---------------------|------------------|
| **rehabilitering** | /assets/images/processed/article/rehabilitering-* | /images/optimized/Rehabilitering/* | ✅ 50 files |
| **nybygg** | /assets/images/processed/article/**tilbygg-bolig**-* | /images/optimized/**Nybygg**/nybygg-* | ✅ 12 files |
| **tilbygg** | /assets/images/processed/article/tilbygg-* | /images/optimized/Tilbygg/tilbygg-* | ✅ 90 files |
| **isolering** | /assets/images/processed/article/isolering-* | /images/optimized/Rehabilitering/rehabilitering-* | ⚠️ Use subset |
| **terrasse** | /assets/images/processed/article/terrasse-* | /images/optimized/Terrasse/terrasse-* | ✅ 22 files |
| **garasje** | /assets/images/processed/article/**tilbygg**-* | /images/optimized/**Garasje**/garasje-* | ✅ 6 files |
| **utvendig-maling** | /assets/images/processed/article/rehabilitering-* | /images/optimized/Rehabilitering/rehabilitering-07,08,09 | ⚠️ Specific files |
| **bad-og-vatrom** | /assets/images/processed/article/rehabilitering-* | /images/optimized/bad-og-vatrom/* | ✅ 14 files |
| **malearbeid** | /assets/images/processed/article/rehabilitering-* | /images/optimized/Rehabilitering/rehabilitering-13,14,15 | ⚠️ Specific files |
| **vinduer** | /assets/images/processed/article/vinduer-* | /images/optimized/Vinduer/vinduer-* | ✅ 36 files |
| **flislegging** | /assets/images/processed/article/rehabilitering-* | /images/optimized/bad-og-vatrom/bad-vatrom-* | ✅ 14 files |
| **snekkerarbeid** | /assets/images/processed/article/rehabilitering-* | /images/optimized/Tilbygg/tilbygg-* (carpentry) | ⚠️ Select relevant |

**Exact Changes Required**:

```typescript
// LINE 58-63: Fix rehabilitering (KEEP CURRENT - already correct path structure)
"rehabilitering": {
  // ... existing content
  heroImage: "/images/optimized/Rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg",
  images: [
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-02.webp",
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-03.webp",
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-04.webp"
  ]
}

// LINE 104-108: Fix nybygg (CRITICAL - currently uses tilbygg images!)
"nybygg": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-1-article.jpg",
  images: [
    "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-2-article.jpg",
    "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-3-article.jpg"
  ]

  // AFTER:
  heroImage: "/images/optimized/Nybygg/01-header-nybygg-griff-entreprenor.webp",
  images: [
    "/images/optimized/Nybygg/nybygg-griff-entreprenor-02.webp",
    "/images/optimized/Nybygg/nybygg-griff-entreprenor-03.webp"
  ]
}

// LINE 154-158: Fix tilbygg (path structure wrong)
"tilbygg": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-4-article.jpg",
  images: [
    "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-5-article.jpg",
    "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-6-article.jpg"
  ]

  // AFTER:
  heroImage: "/images/optimized/Tilbygg/01-header-tilbygg-griff-entreprenor.jpg",
  images: [
    "/images/optimized/Tilbygg/tilbygg-griff-entreprenor-02.webp",
    "/images/optimized/Tilbygg/tilbygg-griff-entreprenor-03.webp"
  ]
}

// LINE 204-208: Fix isolering (path structure wrong)
"isolering": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/isolering-energisparing-trondheim-202506-1-article.jpg",
  images: [
    "/assets/images/processed/article/isolering-energisparing-trondheim-202506-2-article.jpg",
    "/assets/images/processed/article/isolering-energisparing-trondheim-202506-3-article.jpg"
  ]

  // AFTER (use rehabilitering images showing insulation work):
  heroImage: "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-08.webp",
  images: [
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-09.webp",
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-10.webp"
  ]
}

// LINE 254-258: Fix terrasse (path structure wrong)
"terrasse": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/terrasse-bygging-trondheim-202506-1-article.jpg",
  images: [...]

  // AFTER:
  heroImage: "/images/optimized/Terrasse/01-header-terrasse-griff-entreprenor.jpg",
  images: [
    "/images/optimized/Terrasse/terrasse-griff-entreprenor-02.webp",
    "/images/optimized/Terrasse/terrasse-griff-entreprenor-03.webp"
  ]
}

// LINE 304-308: Fix garasje (CRITICAL - currently uses tilbygg images!)
"garasje": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-7-article.jpg",
  images: [
    "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-8-article.jpg",
    "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-9-article.jpg"
  ]

  // AFTER:
  heroImage: "/images/optimized/Garasje/01-header-garasje-griff-entreprenor.jpg",
  images: [
    "/images/optimized/Garasje/garasje-griff-entreprenor-02.webp",
    "/images/optimized/Garasje/garasje-griff-entreprenor-03.webp"
  ]
}

// LINE 354-358: Fix utvendig-maling (path structure wrong)
"utvendig-maling": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/rehabilitering-trondheim-202506-7-article.jpg",
  images: [...]

  // AFTER (use specific exterior painting images):
  heroImage: "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-07.webp",
  images: [
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-08.webp",
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-09.webp"
  ]
}

// LINE 404-408: Fix bad-og-vatrom (CRITICAL - uses wrong category)
"bad-og-vatrom": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/rehabilitering-trondheim-202506-10-article.jpg",
  images: [
    "/assets/images/processed/article/rehabilitering-trondheim-202506-11-article.jpg",
    "/assets/images/processed/article/rehabilitering-trondheim-202506-12-article.jpg"
  ]

  // AFTER:
  heroImage: "/images/optimized/bad-og-vatrom/01-header-bad-vatrom-griff-entreprenor.webp",
  images: [
    "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-02.webp",
    "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-03.jpeg"
  ]
}

// LINE 454-458: Fix malearbeid (path structure wrong)
"malearbeid": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/rehabilitering-trondheim-202506-13-article.jpg",
  images: [...]

  // AFTER:
  heroImage: "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-13.webp",
  images: [
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-14.webp",
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-15.webp"
  ]
}

// LINE 504-508: Fix vinduer (path structure wrong)
"vinduer": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/vinduer-utskifting-trondheim-202506-1-article.jpg",
  images: [...]

  // AFTER:
  heroImage: "/images/optimized/Vinduer/01-header-vinduer-griff-entreprenor.jpg",
  images: [
    "/images/optimized/Vinduer/vinduer-griff-entreprenor-02.webp",
    "/images/optimized/Vinduer/vinduer-griff-entreprenor-03.webp"
  ]
}

// LINE 554-558: Fix flislegging (CRITICAL - uses wrong category)
"flislegging": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/rehabilitering-trondheim-202506-16-article.jpg",
  images: [
    "/assets/images/processed/article/rehabilitering-trondheim-202506-17-article.jpg",
    "/assets/images/processed/article/rehabilitering-trondheim-202506-18-article.jpg"
  ]

  // AFTER (use bathroom/tile images):
  heroImage: "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-04.webp",
  images: [
    "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-05.webp",
    "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-06.webp"
  ]
}

// LINE 604-608: Fix snekkerarbeid (path structure wrong)
"snekkerarbeid": {
  // BEFORE:
  heroImage: "/assets/images/processed/article/rehabilitering-trondheim-202506-19-article.jpg",
  images: [...]

  // AFTER (use relevant tilbygg/construction images):
  heroImage: "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-19.webp",
  images: [
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-20.webp",
    "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-21.webp"
  ]
}
```

**Total Lines Modified**: ~132 lines (11 services × 12 lines average)

---

### Phase 3: CTA Enhancement with Sticky Elements
**File**: `src/app/tjenester/[slug]/page.tsx`

**Analysis**:
- Current: CTAs at lines 682-694 (hero section) and 862-868 (bottom CTA section)
- Old site pattern: Fixed header with phone, contact form prominence
- New requirement: Sticky CTA bar similar to old site

**New Component to Add**: Sticky CTA Bar

**Implementation**:

Add after line 882 (before closing `</div>`):

```typescript
{/* Sticky CTA Bar - Mobile & Tablet */}
<div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t-2 border-primary shadow-2xl">
  <div className="container max-w-6xl mx-auto px-4 py-3">
    <div className="flex items-center justify-between gap-2">
      <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold">
        <Link href="/kontakt" className="flex items-center justify-center gap-1">
          <Mail className="w-4 h-4" />
          <span className="text-sm">Få tilbud</span>
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline" className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
        <Link href="tel:99883080" className="flex items-center justify-center gap-1">
          <Phone className="w-4 h-4" />
          <span className="text-sm">Ring nå</span>
        </Link>
      </Button>
    </div>
  </div>
</div>

{/* Sticky CTA Bar - Desktop */}
<div className="hidden lg:block fixed bottom-8 right-8 z-40">
  <div className="bg-white rounded-xl shadow-2xl border-2 border-primary p-4 max-w-xs">
    <h3 className="text-lg font-bold text-slate-900 mb-3">Klar til å starte?</h3>
    <div className="space-y-2">
      <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
        <Link href="/kontakt" className="flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          Få gratis tilbud
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
        <Link href="tel:99883080" className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          Ring: 99883080
        </Link>
      </Button>
    </div>
  </div>
</div>
```

**CSS Adjustments Needed**:
Add padding-bottom to body on service pages to prevent content overlap:

```typescript
// Add to main div (line 652):
<div className="min-h-screen bg-white pb-20 lg:pb-0">
```

**Import Addition** (line 4):
```typescript
import { ArrowRight, ArrowLeft, Check, Phone, Mail, Calendar, Clock, Users, Award, HelpCircle, Wrench, Shield, Star } from "lucide-react";
```

---

### Phase 4: Blog Article Image Mapping
**File**: `src/app/blog/[slug]/page.tsx`

**Current Issue**: CATEGORY_MAPPING and HEADER_IMAGES too generic

**Current Mapping** (Lines 8-34):
```typescript
const CATEGORY_MAPPING: Record<string, string> = {
  'Flislegging': 'bad-og-vatrom',     // Too generic
  'Isolering': 'rehabilitering',      // Too generic
  'Malearbeid': 'rehabilitering',     // Too generic
  'Snekkerarbeid': 'tilbygg',         // Wrong category
  'Utvendig maling': 'rehabilitering' // Too generic
};

const HEADER_IMAGES: Record<string, string> = {
  'bad-og-vatrom': '/images/optimized/bad-og-vatrom/01-header-bad-vatrom-griff-entreprenor.webp',
  'garasje': '/images/optimized/garasje/01-header-garasje-griff-entreprenor.jpg',
  // ... etc
};
```

**New Improved Mapping**:

```typescript
// Replace CATEGORY_MAPPING (lines 8-23) with more specific mapping:
const CATEGORY_MAPPING: Record<string, string> = {
  // Direct category matches
  'Bad': 'bad-og-vatrom',
  'Våtrom': 'bad-og-vatrom',
  'Bad og våtrom': 'bad-og-vatrom',
  'Garasje': 'garasje',
  'Tilbygg': 'tilbygg',
  'Nybygg': 'nybygg',
  'Rehabilitering': 'rehabilitering',
  'Terrasse': 'terrasse',
  'Vinduer': 'vinduer',

  // Specific service mappings
  'Flislegging': 'bad-og-vatrom',     // Tile work → bathroom images
  'Isolering': 'rehabilitering',      // Insulation → renovation images
  'Malearbeid': 'rehabilitering',     // Painting → renovation images
  'Snekkerarbeid': 'rehabilitering',  // Carpentry → renovation images (changed from tilbygg)
  'Utvendig maling': 'rehabilitering' // Exterior painting → renovation images
};

// Update HEADER_IMAGES (lines 26-34) to use consolidated paths:
const HEADER_IMAGES: Record<string, string> = {
  'bad-og-vatrom': '/images/optimized/bad-og-vatrom/01-header-bad-vatrom-griff-entreprenor.webp',
  'garasje': '/images/optimized/Garasje/01-header-garasje-griff-entreprenor.jpg',
  'nybygg': '/images/optimized/Nybygg/01-header-nybygg-griff-entreprenor.webp',
  'rehabilitering': '/images/optimized/Rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg',
  'terrasse': '/images/optimized/Terrasse/01-header-terrasse-griff-entreprenor.jpg',
  'tilbygg': '/images/optimized/Tilbygg/01-header-tilbygg-griff-entreprenor.jpg',
  'vinduer': '/images/optimized/Vinduer/01-header-vinduer-griff-entreprenor.jpg'
};
```

**Note**: This fixes category → image mapping. Individual article images handled by ArticleWrapper.tsx which already has the correct path structure.

---

### Phase 5: Rotation Fix for All Affected Articles
**File**: `src/components/blog/ArticleWrapper.tsx`

**Status**: ✅ **ALREADY FIXED** (Oct 16, commit 9b26955)

**Current Implementation** (Line 99):
```typescript
.replace(/<img([^>]*class="[^"]*article-image[^"]*"[^>]*)>/g,
  '<img$1 style="image-orientation: from-image; max-width: 100%; height: auto;" class="w-full rounded-xl my-8 shadow-lg">')
```

**Verification Needed**: Ensure this applies to ALL article images, including:
- Garasje articles (3 articles)
- Hvorfor velge snekker over DIY
- Feng shui og snekring
- Profesjonell fasademaling
- Ekspertisolering
- Snekkerarbeid

**Action**: Test these articles on mobile to confirm rotation fix is working globally.

---

### Phase 6: Homepage Background (Note)
**File**: `src/components/sections/Hero.tsx`

**Current Status** (Line 12):
```typescript
backgroundImage: "url('https://ext.same-assets.com/4166723710/4128430851.jpeg')"
```

**Client Instruction**: "don't need to replace the background image because it should be ok now"

**Action**: ✅ **NO CHANGE NEEDED** - Client confirmed current image is acceptable.

**Note**: If client changes mind later, replace with:
```typescript
backgroundImage: "url('/images/optimized/Rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg')"
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Pre-Implementation:
- [ ] Review all proposed changes with client
- [ ] Backup current codebase
- [ ] Test build locally before changes

### Implementation Sequence:
1. [ ] **Phase 1**: Fix About Us page (om-oss/page.tsx)
   - [ ] Replace 3 duplicate images with diverse project photos
   - [ ] Reverse timeline array order
   - [ ] Update timeline description
   - [ ] Test page renders correctly

2. [ ] **Phase 2**: Fix service image paths (tjenester/[slug]/page.tsx)
   - [ ] Update nybygg images (lines 104-108)
   - [ ] Update garasje images (lines 304-308)
   - [ ] Update bad-og-vatrom images (lines 404-408)
   - [ ] Update flislegging images (lines 554-558)
   - [ ] Update all other services (tilbygg, terrasse, vinduer, etc.)
   - [ ] Verify all image paths exist
   - [ ] Test each service page renders

3. [ ] **Phase 3**: Add sticky CTA bars (tjenester/[slug]/page.tsx)
   - [ ] Add Mail import to lucide-react imports
   - [ ] Add mobile sticky bar (bottom fixed)
   - [ ] Add desktop sticky widget (bottom-right fixed)
   - [ ] Add pb-20 padding to main div
   - [ ] Test on mobile and desktop

4. [ ] **Phase 4**: Update blog category mapping (blog/[slug]/page.tsx)
   - [ ] Update CATEGORY_MAPPING with improved specificity
   - [ ] Update HEADER_IMAGES with consolidated paths
   - [ ] Test multiple blog articles

5. [ ] **Phase 5**: Verify rotation fixes (ArticleWrapper.tsx)
   - [ ] Confirm CSS fix applies globally
   - [ ] Test affected articles on mobile
   - [ ] Document any remaining issues

### Post-Implementation:
- [ ] Run build: `npm run build`
- [ ] Fix any TypeScript errors
- [ ] Test all changed pages locally
- [ ] Test on mobile devices/emulator
- [ ] Deploy to Netlify
- [ ] Test production site
- [ ] Clear browser cache and re-test

---

## 🎯 EXPECTED OUTCOMES

### About Us Page:
✅ Diverse project images showcasing company work
✅ Timeline shows 2024 → 2008 (most recent first)
✅ No duplicate images

### Service Pages:
✅ Each service shows correct category images
✅ Nybygg shows new construction projects (not extensions)
✅ Garasje shows garage projects (not extensions)
✅ Bad og våtrom shows bathroom projects (not generic renovation)
✅ Sticky CTA bar visible on mobile (bottom)
✅ Sticky CTA widget visible on desktop (bottom-right)
✅ "Få gratis tilbud" and phone number always accessible

### Blog Articles:
✅ Category headers match article topics better
✅ All images display upright (no rotation issues)
✅ Article images use appropriate categories

---

## ⚠️ RISKS & MITIGATION

### Risk 1: Image Paths Don't Exist
**Mitigation**: Verify each image path exists before committing changes
**Command**:
```bash
cd /Users/webflower/Creation/griff-fiks-okt/public/images/optimized
ls -la Nybygg/nybygg-griff-entreprenor-02.webp
# Repeat for each new image path
```

### Risk 2: TypeScript Errors After Changes
**Mitigation**: Run `npm run lint` after each phase
**Fallback**: Revert specific phase if errors occur

### Risk 3: Sticky CTA Overlaps Content
**Mitigation**: Added pb-20 padding to main div
**Test**: Scroll to bottom on mobile and desktop

### Risk 4: Rotation Fix Doesn't Apply to All Articles
**Mitigation**: CSS already applies to class="article-image" globally
**Test**: Check all listed articles on mobile

---

## 📊 FILES TO MODIFY

| File | Lines Modified | Type | Priority |
|------|---------------|------|----------|
| `src/app/om-oss/page.tsx` | ~40 lines | Replace images, reverse array | HIGH |
| `src/app/tjenester/[slug]/page.tsx` | ~150 lines | Image paths + sticky CTA | HIGH |
| `src/app/blog/[slug]/page.tsx` | ~20 lines | Category mapping | MEDIUM |
| `src/components/blog/ArticleWrapper.tsx` | 0 lines (verify) | Already fixed | VERIFY |
| `src/components/sections/Hero.tsx` | 0 lines | No change needed | SKIP |

**Total**: 3 files to modify, 1 to verify, 1 to skip

---

## 🚀 DEPLOYMENT PLAN

1. **Local Testing**: Test all changes on localhost:3000
2. **Build Verification**: Run `npm run build` - must succeed
3. **Git Commit**: Commit with descriptive message
4. **Deploy to Netlify**: Push to master branch
5. **Production Testing**: Test live site on mobile and desktop
6. **Client Verification**: Share links for client to verify on their devices

---

## 💡 POST-IMPLEMENTATION NOTES

### For Future Image Updates:
- All images should go in `/public/images/optimized/[Category]/`
- Use lowercase-with-hyphens for folder names (not spaces)
- Maintain naming pattern: `[category]-griff-entreprenor-##.webp`
- Consolidate "Bad og våtrom" folders (merge "Bad og våtrom/" into "bad-og-vatrom/")

### For Client Image Requests:
If client provides new images via Google Drive:
1. Download to appropriate `/public/images/optimized/[Category]/` folder
2. Process with Sharp for optimization (rotate: true)
3. Update corresponding paths in servicesData or article mapping
4. Test on mobile and desktop

---

## ✅ APPROVAL REQUIRED

**Implementation Plan Status**: READY FOR REVIEW

**Questions for Client**:
1. ✅ Approved to use existing images from folders? (YES - answered)
2. ✅ Homepage background OK as-is? (YES - answered)
3. ✅ Timeline reversed in current location? (YES - answered)
4. ✅ Sticky CTA bars acceptable? (YES - answered)
5. ✅ Article-specific images from existing folders? (YES - answered)

**Ready to Execute**: YES / NO (awaiting your approval)

Once approved, I will execute this plan phase by phase with surgical precision, testing after each phase and documenting all changes.

---

**End of Implementation Plan**
