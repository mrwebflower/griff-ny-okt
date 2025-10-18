# Live Site Verification Plan - Client Feedback Implementation

**Site URL**: https://griff-seo-okt.netlify.app
**Investigation Date**: 2025-10-17
**Purpose**: Verify all client feedback implementation changes are working correctly on live site

---

## Investigation Phases

### Phase 1: Homepage Verification
**Objective**: Verify homepage background image status (client said "should be ok now")

**Tasks**:
- [ ] Navigate to homepage
- [ ] Take screenshot of hero section
- [ ] Verify background image loads correctly
- [ ] Check logo size and visibility
- [ ] Verify responsive behavior on mobile (resize to 375px width)
- [ ] Verify responsive behavior on desktop (1920px width)

**Expected Results**:
- Homepage background should be acceptable per client
- Logo should be appropriately sized
- No duplicate or inappropriate images

---

### Phase 2: About Us Page Verification
**Objective**: Verify 4 critical changes on /om-oss page

**Tasks**:
- [ ] Navigate to /om-oss page
- [ ] **Hero Background**: Verify using `/images/optimized/Rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg`
- [ ] **Story Section Images**: Verify 2 diverse project images (not duplicates)
  - Image 1: Should show `/images/optimized/Nybygg/nybygg-griff-entreprenor-02.webp`
  - Image 2: Should show `/images/optimized/Tilbygg/tilbygg-griff-entreprenor-02.webp`
- [ ] **Team Section Image**: Verify using `/images/optimized/Terrasse/terrasse-griff-entreprenor-02.webp`
- [ ] **Timeline Order**: Verify displays 2024 → 2020 → 2018 → 2015 → 2012 → 2008
- [ ] Take screenshots of each section
- [ ] Verify images load correctly (no 404s)
- [ ] Check for any broken images

**Expected Results**:
- Hero background: Local rehabilitering header image (not external URL)
- Story images: 2 different images from nybygg and tilbygg
- Team image: Terrasse project image (not duplicate external URL)
- Timeline: Reversed order starting with 2024 at top

---

### Phase 3: Service Pages Verification (12 Services)
**Objective**: Verify all 12 services use correct category images

**Critical Services to Check First**:
1. **Nybygg** (/tjenester/nybygg)
   - Should use Nybygg images (NOT tilbygg)
   - Hero: `/images/optimized/Nybygg/01-header-nybygg-griff-entreprenor.webp`

2. **Garasje** (/tjenester/garasje)
   - Should use Garasje images (NOT tilbygg)
   - Hero: `/images/optimized/Garasje/01-header-garasje-griff-entreprenor.jpg`

3. **Bad og våtrom** (/tjenester/bad-og-vatrom)
   - Should use bad-og-vatrom images (NOT rehabilitering)
   - Hero: `/images/optimized/bad-og-vatrom/01-header-bad-vatrom-griff-entreprenor.webp`

4. **Flislegging** (/tjenester/flislegging)
   - Should use bad-og-vatrom images (NOT rehabilitering)
   - Hero: `/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-04.webp`

**All Services to Check**:
- [ ] /tjenester/rehabilitering
- [ ] /tjenester/nybygg (CRITICAL)
- [ ] /tjenester/tilbygg
- [ ] /tjenester/isolering
- [ ] /tjenester/terrasse
- [ ] /tjenester/garasje (CRITICAL)
- [ ] /tjenester/utvendig-maling
- [ ] /tjenester/bad-og-vatrom (CRITICAL)
- [ ] /tjenester/malearbeid
- [ ] /tjenester/vinduer
- [ ] /tjenester/flislegging (CRITICAL)
- [ ] /tjenester/snekkerarbeid

**For Each Service**:
- [ ] Navigate to service page
- [ ] Take screenshot of hero section
- [ ] Verify hero image loads from correct category folder
- [ ] Scroll to gallery images section
- [ ] Verify 2-3 gallery images load from correct category
- [ ] Check for any rotated images
- [ ] Check for any inappropriate/mismatched images

**Expected Results**:
- All services show images from their correct category folder
- No services show images from wrong categories
- All images load without 404 errors
- No rotated images (CSS fix should apply)

---

### Phase 4: CTA Visibility Verification
**Objective**: Verify sticky CTA elements work on mobile and desktop

**Mobile Testing (375px width)**:
- [ ] Resize browser to mobile width
- [ ] Navigate to any service page
- [ ] Scroll down the page
- [ ] **Verify mobile sticky bar appears at bottom**:
  - Fixed to bottom of viewport
  - Shows "Få tilbud" button (left)
  - Shows "Ring nå" button (right)
  - Background: white with border
  - Buttons are responsive and clickable
- [ ] Verify page has bottom padding (content not hidden)
- [ ] Take screenshot of mobile sticky CTA

**Desktop Testing (1920px width)**:
- [ ] Resize browser to desktop width
- [ ] Navigate to any service page
- [ ] Scroll down the page
- [ ] **Verify desktop sticky widget appears at bottom-right**:
  - Fixed position in bottom-right corner
  - Floating card design with shadow
  - Shows "Trenger du hjelp?" heading
  - Shows "Få gratis tilbud" button
  - Shows "Ring oss: 99883080" button
  - Shows "Svar innen 24 timer" text
- [ ] Verify widget doesn't overlap content
- [ ] Take screenshot of desktop sticky widget

**Expected Results**:
- Mobile: Bottom sticky bar visible with 2 CTA buttons
- Desktop: Bottom-right floating widget visible with 2 CTA buttons
- Both: CTAs remain visible while scrolling
- No content overlap or layout issues

---

### Phase 5: Blog Article Images Verification
**Objective**: Verify blog articles use correct category images and rotation fix works

**Sample Articles to Check**:
- [ ] /blog/garasje-bygging-trondheim (Garasje category)
- [ ] /blog/bad-vatrom-griff (Bad og våtrom category)
- [ ] /blog/nybygg-trondheim-guide (Nybygg category)
- [ ] /blog/tilbygg-bolig-trondheim (Tilbygg category)
- [ ] /blog/profesjonell-fasademaling (Should use rehabilitering)
- [ ] /blog/ekspertisolering (Should use rehabilitering)

**For Each Article**:
- [ ] Navigate to article page
- [ ] Take screenshot of header image
- [ ] Verify header image loads from appropriate category
- [ ] Scroll through article content
- [ ] Check all inline images for:
  - Correct orientation (no rotation)
  - Appropriate content match
  - No 404 errors
- [ ] Verify CSS `image-orientation: from-image;` is applied
- [ ] Test on mobile (375px) for rotation issues

**Expected Results**:
- Header images match article category
- No rotated images (CSS fix working)
- All images load successfully
- Images are appropriate for article content

---

### Phase 6: Network Performance Check
**Objective**: Verify all images load successfully without errors

**Tasks**:
- [ ] Open Chrome DevTools Network tab
- [ ] Navigate through 3-4 key pages
- [ ] Filter network requests by "Img"
- [ ] Check for any failed image requests (404, 500 errors)
- [ ] Verify image paths match expected structure
- [ ] Document any broken image paths

**Expected Results**:
- All images return 200 status
- No 404 errors for image assets
- Paths follow `/images/optimized/[Category]/` structure

---

### Phase 7: Console Errors Check
**Objective**: Verify no JavaScript errors related to changes

**Tasks**:
- [ ] Open Chrome DevTools Console
- [ ] Navigate through all modified pages
- [ ] Check for any errors or warnings
- [ ] Document any issues found

**Expected Results**:
- No console errors related to images
- No JavaScript errors from new sticky CTAs
- Clean console output

---

## Investigation Execution Order

1. **Setup**: Launch Chrome DevTools MCP and navigate to site
2. **Quick Overview**: Take homepage screenshot, verify site loads
3. **Deep Dive - About Us**: Comprehensive check of all 4 changes
4. **Deep Dive - Critical Services**: Check 4 critical services first
5. **Breadth Check - All Services**: Quick verification of remaining 8 services
6. **CTA Testing**: Mobile and desktop sticky element verification
7. **Blog Sampling**: Check 5-6 representative blog articles
8. **Technical Check**: Network errors and console issues
9. **Documentation**: Compile all findings with screenshots
10. **Issue Identification**: List what works, what needs fixing

---

## Success Criteria

### Must Pass:
- ✓ About Us: No duplicate images, timeline reversed
- ✓ Services: All 12 use correct category images
- ✓ Services: 4 critical services fixed (nybygg, garasje, bad-og-vatrom, flislegging)
- ✓ CTAs: Mobile sticky bar visible and functional
- ✓ CTAs: Desktop sticky widget visible and functional
- ✓ Images: No 404 errors
- ✓ Rotation: CSS fix prevents rotated images

### Should Pass:
- ✓ Blog: Articles use appropriate category images
- ✓ Performance: Images load quickly
- ✓ Responsive: Works on mobile and desktop
- ✓ Console: No critical errors

### Nice to Have:
- ✓ All images optimized and loading fast
- ✓ Sticky CTAs enhance user experience
- ✓ Visual consistency across all pages

---

## Next Steps After Investigation

1. Create `LIVE-SITE-VERIFICATION-FINDINGS.md` with detailed results
2. Document all issues found with screenshots
3. Create `LIVE-SITE-FIX-IMPLEMENTATION-PLAN.md` if issues found
4. Present executive summary to user for approval
5. Execute fixes with surgical precision

---

**Investigation Status**: Ready to Execute
**Tools**: Chrome DevTools MCP
**Expected Duration**: 20-30 minutes comprehensive testing
