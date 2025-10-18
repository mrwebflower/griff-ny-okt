# Manual Testing Checklist - Client Feedback Implementation

**Live Site**: https://griff-seo-okt.netlify.app
**Last Deploy**: 2025-10-17 (commit 66b432f)
**Purpose**: Verify all client feedback changes are working correctly

---

## ✅ Quick Pre-Check (2 minutes)

Before detailed testing, verify site is deployed:

- [ ] Visit https://griff-seo-okt.netlify.app
- [ ] Site loads without errors
- [ ] No broken layout or missing styles
- [ ] Images appear to be loading

---

## 📱 Device Setup

**Test on at least 2 devices**:
- [ ] Desktop/Laptop (Chrome, Safari, or Firefox)
- [ ] Mobile phone (Safari on iPhone or Chrome on Android)

**Clear cache before testing**:
- Safari: ⌘+⌥+E (Mac) or Settings → Clear History
- Chrome: ⌘+Shift+Delete (Mac) or Settings → Clear browsing data
- Check "Cached images and files"

---

## 🏠 Homepage Testing

**URL**: https://griff-seo-okt.netlify.app

### Desktop:
- [ ] Hero section background image loads
- [ ] Logo is visible and appropriately sized
- [ ] No duplicate images visible
- [ ] All service cards display correctly

### Mobile:
- [ ] Hero section looks good on small screen
- [ ] Logo is visible and sized appropriately
- [ ] Layout is responsive (no horizontal scrolling)

**Expected**: Background should be acceptable (client approved current state)

---

## 👥 About Us Page Testing

**URL**: https://griff-seo-okt.netlify.app/om-oss

### Critical Changes to Verify:

#### 1. Hero Background Image
- [ ] **Desktop**: Hero section has background image
- [ ] **Mobile**: Hero background displays correctly
- [ ] **Check**: Should NOT be using external URL `ext.same-assets.com`
- [ ] **Expected**: Local image from Rehabilitering folder

#### 2. Story Section Images (2 images)
- [ ] **Image 1**: Shows construction/renovation project
- [ ] **Image 2**: Shows different construction/renovation project
- [ ] **Check**: Two images should be DIFFERENT (not same image twice)
- [ ] **Expected**: One from Nybygg, one from Tilbygg folder

#### 3. Timeline Order
- [ ] **First item**: Should show "2024" or most recent year
- [ ] **Last item**: Should show "2008" or earliest year
- [ ] **Order**: Timeline goes from newest → oldest (top to bottom)
- [ ] **Expected**: 2024 → 2020 → 2018 → 2015 → 2012 → 2008

#### 4. Team/Values Section
- [ ] Images display appropriately
- [ ] No obvious broken images

**Open browser DevTools** (F12 or right-click → Inspect):
- [ ] Console tab shows no critical errors
- [ ] Network tab shows all images return 200 status (no 404s)

---

## 🔧 Service Pages Testing - CRITICAL FIXES

Test these 4 services that had WRONG images before:

### 1. Nybygg Service
**URL**: https://griff-seo-okt.netlify.app/tjenester/nybygg

- [ ] **Hero image**: Shows new construction project (NOT extension/tilbygg)
- [ ] **Gallery images**: Show new building projects
- [ ] **All images**: Should be from Nybygg category
- [ ] **No images**: From tilbygg (extensions) category

**How to verify**: Images should show ground-up construction, not additions to existing buildings

### 2. Garasje Service
**URL**: https://griff-seo-okt.netlify.app/tjenester/garasje

- [ ] **Hero image**: Shows garage construction (NOT extension/tilbygg)
- [ ] **Gallery images**: Show garage projects
- [ ] **All images**: Should be from Garasje category
- [ ] **No images**: From tilbygg category

**How to verify**: Images should clearly show garages, not house extensions

### 3. Bad og våtrom Service
**URL**: https://griff-seo-okt.netlify.app/tjenester/bad-og-vatrom

- [ ] **Hero image**: Shows bathroom/wet room (NOT generic renovation)
- [ ] **Gallery images**: Show bathroom/wet room projects
- [ ] **All images**: Should be from bad-og-vatrom category
- [ ] **No images**: From rehabilitering (general renovation) category

**How to verify**: Images should show bathrooms, showers, tiles - not general construction

### 4. Flislegging Service
**URL**: https://griff-seo-okt.netlify.app/tjenester/flislegging

- [ ] **Hero image**: Shows tile work (NOT generic renovation)
- [ ] **Gallery images**: Show tile installation projects
- [ ] **All images**: Should be from bad-og-vatrom category
- [ ] **No images**: From rehabilitering category

**How to verify**: Images should show tiling, wet room work

---

## 🔧 Service Pages Testing - ALL SERVICES

Quick check on remaining 8 services (images should match service type):

### 5. Rehabilitering
**URL**: https://griff-seo-okt.netlify.app/tjenester/rehabilitering
- [ ] Images show renovation/rehabilitation work

### 6. Tilbygg
**URL**: https://griff-seo-okt.netlify.app/tjenester/tilbygg
- [ ] Images show house extensions/additions

### 7. Isolering
**URL**: https://griff-seo-okt.netlify.app/tjenester/isolering
- [ ] Images show insulation or relevant renovation work

### 8. Terrasse
**URL**: https://griff-seo-okt.netlify.app/tjenester/terrasse
- [ ] Images show deck/terrace construction

### 9. Utvendig maling
**URL**: https://griff-seo-okt.netlify.app/tjenester/utvendig-maling
- [ ] Images show exterior painting work

### 10. Malearbeid
**URL**: https://griff-seo-okt.netlify.app/tjenester/malearbeid
- [ ] Images show painting work

### 11. Vinduer
**URL**: https://griff-seo-okt.netlify.app/tjenester/vinduer
- [ ] Images show window installation work

### 12. Snekkerarbeid
**URL**: https://griff-seo-okt.netlify.app/tjenester/snekkerarbeid
- [ ] Images show carpentry work

---

## 📲 CTA Visibility Testing - CRITICAL NEW FEATURE

Test on **EVERY service page** you visit above.

### Mobile Testing (≤ 768px width):

**On your phone or resize browser window to mobile size**:

- [ ] **Scroll down** any service page
- [ ] **Bottom of screen**: Fixed bar should appear with 2 buttons
- [ ] **Button 1**: "Få tilbud" (Get quote) - primary color
- [ ] **Button 2**: "Ring nå" (Call now) - outlined style
- [ ] **Buttons**: Both are tappable/clickable
- [ ] **Layout**: Buttons side-by-side, taking equal space
- [ ] **Sticky behavior**: Bar stays at bottom when scrolling
- [ ] **Content**: Page has padding so content isn't hidden behind bar

**Test interaction**:
- [ ] Tap "Få tilbud" → should navigate to contact page
- [ ] Tap "Ring nå" → should open phone dialer with number

### Desktop Testing (> 768px width):

**On laptop/desktop browser**:

- [ ] **Scroll down** any service page
- [ ] **Bottom-right corner**: Floating widget should appear
- [ ] **Widget heading**: "Trenger du hjelp?" (Need help?)
- [ ] **Button 1**: "Få gratis tilbud" (Get free quote)
- [ ] **Button 2**: "Ring oss: 99883080" (Call us)
- [ ] **Footer text**: "Svar innen 24 timer" (Response within 24 hours)
- [ ] **Design**: White card with shadow, rounded corners
- [ ] **Position**: Fixed in bottom-right, doesn't move when scrolling
- [ ] **No overlap**: Doesn't cover important content

**Test interaction**:
- [ ] Click "Få gratis tilbud" → should navigate to contact page
- [ ] Click "Ring oss" → should open phone dialer or copy number

---

## 📝 Blog Article Testing

Test these specific articles that were updated:

### Blog 1: Garasje Article
**URL**: https://griff-seo-okt.netlify.app/blog/kostnadseffektiv-garasjebygging-trondheim

- [ ] **Header image**: Shows garage-related image
- [ ] **Inline images**: All images display (no broken images)
- [ ] **No old images**: Should NOT see images from tilbygg folder
- [ ] **Category match**: Images are appropriate for garage topic

### Blog 2: Another Garasje Article
**URL**: https://griff-seo-okt.netlify.app/blog/garasje-bygging-griff

- [ ] Header image loads correctly
- [ ] No broken images in article content
- [ ] Images match garage topic

### Blog 3: Bad og våtrom Article
**URL**: https://griff-seo-okt.netlify.app/blog/bad-vatrom-griff

- [ ] Header image shows bathroom/wet room
- [ ] Article images are appropriate
- [ ] No broken images

### Blog 4: Tilbygg Article
**URL**: https://griff-seo-okt.netlify.app/blog/tilbygg-bolig-trondheim

- [ ] Header image shows extension/addition work
- [ ] Article images display correctly

### Blog 5: Rehabilitering Article
**URL**: https://griff-seo-okt.netlify.app/blog/rehabilitering-trondheim

- [ ] Header image shows renovation work
- [ ] Article images display correctly

---

## 🔄 Image Rotation Testing (Mobile Critical)

**Use actual mobile phone** for this test (not just browser resize):

Visit these blog articles on your phone:

- [ ] https://griff-seo-okt.netlify.app/blog/garasje-bygging-griff
- [ ] https://griff-seo-okt.netlify.app/blog/snekkerarbeid-feng-shui
- [ ] https://griff-seo-okt.netlify.app/blog/utvendig-maling-hus-trondheim
- [ ] https://griff-seo-okt.netlify.app/blog/isolering-trondheim

**For each article**:
- [ ] **All images**: Should display in CORRECT orientation
- [ ] **No sideways images**: Photos taken vertically should display vertically
- [ ] **No upside-down images**: All images right-side up

**Expected**: CSS fix `image-orientation: from-image` prevents rotation issues

---

## 🌐 Network & Performance Check

**Open browser DevTools** (F12 or Cmd+Option+I):

### Network Tab:
- [ ] Filter by "Img"
- [ ] Navigate through 3-4 pages
- [ ] **All images**: Should show 200 status (green)
- [ ] **No 404 errors**: No images failing to load (red)
- [ ] **No old paths**: Should NOT see `/assets/images/processed/` URLs

### Console Tab:
- [ ] Navigate through key pages (home, about, 2-3 services, 2-3 blogs)
- [ ] **No critical errors**: Red error messages are concerning
- [ ] **Warnings OK**: Yellow warnings about metadata are fine
- [ ] **React errors**: Should not see component rendering errors

---

## 📋 Issue Reporting Template

If you find issues, document them like this:

```
### Issue: [Short description]
**Page**: [URL]
**Device**: [Desktop/Mobile, Browser]
**Expected**: [What should happen]
**Actual**: [What actually happens]
**Screenshot**: [Attach if possible]
**Severity**: [Critical/Medium/Low]
```

**Example**:
```
### Issue: Nybygg hero image shows tilbygg
**Page**: https://griff-seo-okt.netlify.app/tjenester/nybygg
**Device**: Desktop, Chrome
**Expected**: Hero should show new construction
**Actual**: Hero shows house extension image
**Severity**: Critical (wrong category image)
```

---

## ✅ Final Verification Checklist

After completing all tests above:

- [ ] **Homepage**: Working correctly
- [ ] **About Us**: All 4 changes verified
- [ ] **4 Critical Services**: All using correct images (nybygg, garasje, bad-og-vatrom, flislegging)
- [ ] **8 Other Services**: Images appropriate for each service
- [ ] **Mobile CTAs**: Working on all service pages
- [ ] **Desktop CTAs**: Working on all service pages
- [ ] **Blog Headers**: Appropriate category images
- [ ] **Blog Content**: No broken images
- [ ] **Mobile Rotation**: No sideways/upside-down images
- [ ] **Network**: No 404 image errors
- [ ] **Console**: No critical JavaScript errors

---

## 🎯 Success Criteria

### Must Pass (Critical):
- ✅ No 404 image errors
- ✅ Sticky CTAs visible on mobile AND desktop
- ✅ 4 critical services show correct category images
- ✅ About Us timeline in correct order (2024 first)
- ✅ No rotated images on mobile devices

### Should Pass (Important):
- ✅ All 12 services show appropriate images
- ✅ Blog articles have matching header images
- ✅ No duplicate images on About Us
- ✅ No console JavaScript errors

### Nice to Have (Enhancement):
- ✅ Fast page load times
- ✅ Smooth scrolling with sticky CTAs
- ✅ Professional appearance on all devices

---

## 🚀 Quick Testing Order (15-20 minutes)

If you're short on time, test in this priority order:

1. **Homepage** (2 min) - Quick visual check
2. **About Us** (3 min) - Verify timeline + no duplicates
3. **4 Critical Services** (5 min) - nybygg, garasje, bad-og-vatrom, flislegging
4. **Mobile CTA** (2 min) - Check sticky bar on one service page
5. **Desktop CTA** (2 min) - Check floating widget
6. **1-2 Blog Articles** (3 min) - Verify images + rotation
7. **Network Tab** (2 min) - Check for 404 errors

**Total**: ~20 minutes for core functionality verification

---

## 📞 Questions to Ask While Testing

While going through each page, ask yourself:

1. **Does this image match the service/content?**
2. **Are the images professional and high-quality?**
3. **Can I easily contact the company?** (CTAs visible?)
4. **Does the site work smoothly on my phone?**
5. **Would I trust this company based on the site?**

---

## 📊 Testing Results Summary

After completing all tests, fill this out:

**Date Tested**: _______________
**Devices Used**: _______________
**Browser(s)**: _______________

**Overall Status**:
- [ ] ✅ All tests passed - Ready for client approval
- [ ] ⚠️ Minor issues found - See notes below
- [ ] ❌ Critical issues found - Needs immediate fixes

**Critical Issues Found**: _______________

**Minor Issues Found**: _______________

**Overall Impression**: _______________

**Recommendation**:
- [ ] Approve and show to client
- [ ] Fix issues first, then approve
- [ ] Major rework needed

---

**Testing Checklist Version**: 1.0
**Last Updated**: 2025-10-17
**Created By**: Claude Code Implementation Team
