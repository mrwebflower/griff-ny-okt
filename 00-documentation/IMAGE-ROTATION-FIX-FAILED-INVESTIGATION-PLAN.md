# Image Rotation Fix - Failed Investigation Plan

**Date**: 2025-10-16
**Status**: INVESTIGATION IN PROGRESS
**Priority**: CRITICAL

---

## 🚨 Problem Statement

**Client Report**: CSS fix deployed but images STILL rotated on live site!

### Confirmed Issues:
1. **isolering-trondheim article**: Second image (rehabilitering-griff-entreprenor-08.webp) - ROTATED
2. **isolering-trondheim article**: Third image in body text - ROTATED
3. **URL**: https://griff-seo-okt.netlify.app/blog/isolering-trondheim

### Previous Fix Attempt:
- Applied CSS: `image-orientation: from-image; max-width: 100%; height: auto;`
- Location: ArticleWrapper.tsx lines 99-100
- Result: ❌ FAILED - Images still rotated

---

## 🎯 Investigation Objectives

### Primary Questions:
1. **WHY did the CSS fix fail?**
   - Is the inline style being applied in rendered HTML?
   - CSS specificity issues?
   - Browser compatibility with `image-orientation`?

2. **What is the ACTUAL root cause?**
   - Image file orientation incorrect?
   - EXIF metadata issue?
   - CSS rendering problem?
   - Next.js build/optimization issue?

3. **What is the third rotated image?**
   - Which image file?
   - Same source as images 08/09?
   - Same EXIF orientation?

4. **Are the optimized images actually correct?**
   - Did Sharp process them correctly?
   - Are dimensions correct (2400×1800 landscape)?
   - Visual verification needed

---

## 📋 Investigation Phases

### Phase 1: Verify Current State (15 min)
**Objective**: Confirm what's actually deployed and rendered

#### Step 1.1: Check Live Site HTML
- Fetch live HTML from Netlify
- Inspect rendered `<img>` tags
- Verify if inline styles are present
- Check if regex replacements worked

#### Step 1.2: Check Build Output
- Inspect `.next/` build directory
- Check static HTML generation
- Verify ArticleWrapper.tsx is being used

#### Step 1.3: Check Deployed Files
- Verify optimized images on Netlify
- Check file dimensions
- Verify EXIF data stripped

#### Step 1.4: Identify Third Rotated Image
- Read isolering-trondheim.html source
- List ALL images in article
- Identify which is "third image"

**Expected Findings**:
- Inline styles present/absent in HTML?
- Image dimensions correct?
- Third image identified

---

### Phase 2: Root Cause Analysis (20 min)
**Objective**: Determine why CSS fix failed

#### Step 2.1: Test CSS Property
- Research `image-orientation: from-image` browser support
- Check if property works on stripped EXIF images
- Test alternative CSS properties

#### Step 2.2: Analyze Image Files
- Open optimized images in image viewer
- Check if images are PHYSICALLY rotated
- Compare backup vs current optimized
- Use Sharp to analyze orientation

#### Step 2.3: Test Regex Replacement
- Create test HTML snippet
- Run regex replacement locally
- Verify output matches expected

#### Step 2.4: Check Next.js Image Handling
- Review Next.js 15.5.5 image optimization
- Check if Next.js re-processes images
- Verify static generation workflow

**Expected Findings**:
- Real reason CSS fix failed
- Whether images need physical rotation
- Alternative fix strategies

---

### Phase 3: Browser Compatibility Check (10 min)
**Objective**: Verify CSS solution works across browsers

#### Step 3.1: Test CSS Properties
Research and test:
- `image-orientation: from-image;` (standard)
- `image-orientation: none;` (disable auto-rotation)
- `transform: rotate()` (force rotation)
- `object-fit` properties

#### Step 3.2: Check Mobile Safari Specifics
- iOS Safari image-orientation support
- Mobile Chrome support
- Webkit quirks

**Expected Findings**:
- Which CSS properties actually work
- Browser-specific issues

---

### Phase 4: Alternative Solutions Research (15 min)
**Objective**: Identify working fix strategies

#### Strategy A: Physical Image Rotation
- Rotate optimized images 90° CW using Sharp
- Keep source images as backup
- Strip all EXIF data

#### Strategy B: Transform CSS
- Use `transform: rotate(-90deg)` for specific images
- Adjust container dimensions
- Preserve layout

#### Strategy C: Picture Element
- Use `<picture>` with media queries
- Serve different orientations for mobile/desktop
- More complex but guaranteed to work

#### Strategy D: Next.js Image Component
- Replace raw `<img>` with Next.js `<Image>`
- Let Next.js handle optimization
- May require refactoring

**Expected Findings**:
- Best alternative solution
- Implementation complexity
- Trade-offs

---

### Phase 5: Sharp Processing Verification (10 min)
**Objective**: Verify Sharp is processing EXIF correctly

#### Step 5.1: Test Sharp with Sample Image
- Create test script
- Process image with EXIF orientation
- Verify output is correct

#### Step 5.2: Check compress-images.js
- Review Sharp configuration
- Verify `.rotate()` is NOT being called manually
- Check if Sharp auto-rotation is enabled

#### Step 5.3: Test with Original Images
- Process rehabilitering-griff-entreprenor-08.jpg
- Compare output to deployed version
- Visual verification

**Expected Findings**:
- Is Sharp processing correctly?
- Are optimized images actually upright?

---

## 🔍 Investigation Tools

### Tools to Use:
1. **WebFetch** - Fetch live HTML from Netlify
2. **Read** - Check source files
3. **Bash + Sharp** - Analyze image metadata and orientation
4. **Grep** - Find all image references
5. **Image Viewer** - Visual verification of optimized images

### Commands to Run:
```bash
# Check optimized images
file public/images/optimized/rehabilitering/*.webp
identify public/images/optimized/rehabilitering/*.webp

# Test Sharp processing
node -e "const sharp = require('sharp'); sharp('test.jpg').metadata().then(console.log)"

# Check build output
ls -la .next/static/

# Fetch live HTML
curl https://griff-seo-okt.netlify.app/blog/isolering-trondheim
```

---

## 📊 Success Criteria

Investigation is complete when:
- [ ] Live site HTML inspected and inline styles verified
- [ ] Third rotated image identified
- [ ] Optimized images visually verified (upright or rotated?)
- [ ] Root cause of CSS fix failure determined
- [ ] Browser compatibility issues identified
- [ ] Sharp processing verified
- [ ] Alternative solutions researched and ranked
- [ ] Clear implementation plan ready

---

## 📝 Output Documents

1. **IMAGE-ROTATION-FIX-FAILED-FINDINGS.md**
   - All investigation results
   - Root cause analysis
   - Evidence (screenshots, code snippets)

2. **IMAGE-ROTATION-FIX-V2-IMPLEMENTATION-PLAN.md**
   - Detailed fix strategy
   - Step-by-step implementation
   - Testing plan
   - Rollback strategy

---

## ⚠️ Critical Questions to Answer

1. Are the optimized .webp images PHYSICALLY rotated in the files?
2. Is the CSS fix being applied in the rendered HTML?
3. Does `image-orientation: from-image` work when EXIF is stripped?
4. Should we rotate the optimized images 90° clockwise instead?

---

**Next Step**: Execute Phase 1 - Verify Current State
