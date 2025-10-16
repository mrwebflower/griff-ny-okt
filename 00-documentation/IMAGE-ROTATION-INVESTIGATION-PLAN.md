# Image Rotation Issue - Investigation Plan

**Date**: 2025-10-16
**Issue Reporter**: Client via User
**Severity**: High (affects visual quality on live site)

## Problem Statement

**Client Report**: Some images on article pages display with incorrect rotation
**User Verification**: Source images checked - none are rotated incorrectly
**Hypothesis**: EXIF orientation metadata issue during WebP optimization

## Investigation Plan

### Phase 1: Understanding EXIF Orientation

**Objective**: Understand how EXIF orientation metadata affects image display

**Background**:
- EXIF orientation is metadata stored in JPEG/image files
- Camera sensors capture images in one orientation, but record the "correct" orientation in EXIF
- Values range from 1-8 representing different rotations/flips
- Browsers/tools interpret EXIF orientation differently
- WebP format supports EXIF metadata but requires explicit handling during conversion

**Questions to Answer**:
1. Do any of our source images contain EXIF orientation metadata?
2. Did the WebP conversion process preserve or strip EXIF data?
3. Are browsers displaying images based on EXIF data or physical pixel orientation?
4. Which specific images are affected?

**Investigation Steps**:
1. Check if `exiftool` or similar is available on system
2. Sample 5-10 images from different categories
3. Check EXIF orientation tag in both source (JPEG) and optimized (WebP) files
4. Document findings

### Phase 2: Image Pipeline Analysis

**Objective**: Understand how images were processed from source to optimized

**Current Known Pipeline**:
```
Source: all-pictures-again/ (original photos)
  ↓
Optimization: unknown tool/process
  ↓
Output: all-pictures-optimized/ (WebP with SEO filenames)
  ↓
Deployment: public/images/optimized/ (live site)
```

**Questions to Answer**:
1. What tool was used for WebP conversion? (sharp, imagemagick, cwebp, etc.)
2. Were any EXIF-related flags used during conversion?
3. Did the process auto-rotate images based on EXIF?
4. Were images physically rotated or just metadata preserved?

**Investigation Steps**:
1. Search for image optimization scripts in codebase
2. Check package.json for image processing libraries
3. Review any existing documentation about image processing
4. Test sample image with different optimization approaches

### Phase 3: Affected Images Identification

**Objective**: Create definitive list of which images display rotated incorrectly

**Questions to Answer**:
1. How many images are affected?
2. Which categories have affected images?
3. Is there a pattern (all portrait orientation? specific camera model?)
4. Are headers or body images more affected?

**Investigation Steps**:
1. Sample images from each category folder
2. Check EXIF orientation for all sampled images
3. Cross-reference with live site display
4. Create list of affected images
5. Determine if pattern exists

### Phase 4: Solution Research

**Objective**: Identify best technical approach to fix rotation issues

**Solution Options to Evaluate**:

**Option A: Auto-Rotate During Optimization**
- Use image processing library to apply EXIF rotation physically
- Strip EXIF orientation metadata after rotation
- Re-optimize all affected images
- Pros: Fixes root cause, no code changes needed
- Cons: Requires re-processing images

**Option B: Client-Side CSS Fixes**
- Detect images needing rotation
- Apply CSS transforms
- Pros: Quick fix, no image re-processing
- Cons: Doesn't fix actual images, not ideal for SEO/performance

**Option C: Server-Side Orientation Handling**
- Read EXIF on server, pass rotation info to components
- Apply CSS transforms dynamically
- Pros: No image re-processing
- Cons: Complex, adds server overhead

**Option D: Batch Fix with ImageMagick/Sharp**
- Use auto-orient feature
- Re-process only affected images
- Pros: Targeted fix, preserves quality
- Cons: Need to identify all affected images first

**Evaluation Criteria**:
1. Does it fix the root cause?
2. Image quality preservation
3. Implementation complexity
4. Build/deployment impact
5. Future-proof solution

**Investigation Steps**:
1. Test each approach with sample affected image
2. Measure image quality/size differences
3. Assess implementation effort
4. Recommend best approach

### Phase 5: Technical Requirements Analysis

**Objective**: Define exact technical requirements for chosen solution

**Questions to Answer**:
1. What tools/libraries are needed?
2. What is the script/process workflow?
3. How to verify fix worked correctly?
4. How to prevent this in future image additions?
5. What is the rollback plan if something goes wrong?

**Investigation Steps**:
1. Check available Node.js libraries (sharp, jimp, etc.)
2. Check system utilities (imagemagick, exiftool)
3. Define acceptance criteria for fix
4. Document testing approach

## Investigation Execution Order

1. ✅ Create this investigation plan
2. ⏳ Phase 1: EXIF Understanding (1-2 sample images)
3. ⏳ Phase 2: Pipeline Analysis (review optimization process)
4. ⏳ Phase 3: Identify Affected Images (comprehensive scan)
5. ⏳ Phase 4: Solution Research (evaluate options)
6. ⏳ Phase 5: Technical Requirements (define implementation)
7. ⏳ Synthesize Findings (document investigation results)
8. ⏳ Create Implementation Plan (based on findings)
9. ⏳ Present Executive Summary (for approval)

## Success Criteria for Investigation

- [ ] Clear understanding of EXIF orientation issue
- [ ] Definitive list of affected images
- [ ] Root cause identified
- [ ] 3+ solution approaches evaluated
- [ ] Recommended approach selected with justification
- [ ] Technical requirements documented
- [ ] Implementation risks identified
- [ ] Testing strategy defined

## Next Steps After Investigation

Once investigation complete:
1. Document all findings in IMAGE-ROTATION-FINDINGS.md
2. Create IMAGE-ROTATION-IMPLEMENTATION-PLAN.md
3. Present executive summary to user for approval
4. Upon approval: Execute implementation with surgical precision
