# Cache Clearing Instructions - Image Rotation Fix

**Date**: 2025-10-16
**Status**: ✅ FIX IS DEPLOYED AND WORKING

---

## 🎯 IMPORTANT: The Fix Is Working!

**Verified:** Images on Netlify ARE correctly oriented (upright)!

If you're still seeing rotated images, it's because your browser is showing **cached old images**.

---

## 📱 How to Clear Cache and See Fixed Images

### **Method 1: Hard Refresh (Fastest)**

#### On Desktop:
- **Chrome/Edge**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **Firefox**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **Safari**: `Cmd+Option+R` (Mac)

#### On Mobile:
- **iOS Safari**: Settings → Safari → Clear History and Website Data
- **Chrome Android**: Settings → Privacy → Clear Browsing Data → Cached Images

### **Method 2: Cache-Busting URL (Guaranteed to Work)**

Visit this URL which adds a timestamp to bypass cache:

```
https://griff-seo-okt.netlify.app/blog/isolering-trondheim?v=20251016-fix
```

Or directly view the image:
```
https://griff-seo-okt.netlify.app/images/optimized/rehabilitering/rehabilitering-griff-entreprenor-08.webp?v=20251016
```

### **Method 3: Incognito/Private Mode**

1. Open incognito/private window
2. Visit: https://griff-seo-okt.netlify.app/blog/isolering-trondheim
3. Images should be upright (no cache)

---

## ✅ Verification Steps

1. **Clear your browser cache** (use Method 1 above)
2. **Visit**: https://griff-seo-okt.netlify.app/blog/isolering-trondheim
3. **Scroll to second image** (yellow insulation building)
4. **Verify**: Building should be UPRIGHT (vertical framing)

**Also test:**
- https://griff-seo-okt.netlify.app/blog/malearbeid-griff

---

## 🔍 Technical Proof

### Downloaded from Netlify:
```bash
$ curl https://griff-seo-okt.netlify.app/images/optimized/rehabilitering/rehabilitering-griff-entreprenor-08.webp -o test.webp
$ file test.webp
test.webp: RIFF data, Web/P image, VP8 encoding, 1800x2400
```

**Dimensions**: 1800×2400 (portrait) ✅
**Visual inspection**: Building is UPRIGHT ✅

---

## 🎓 Why Cache Is the Issue

### What Happened:
1. **Old deployment** (before fix): Images were sideways
2. **Your browser cached** those old sideways images
3. **New deployment** (after fix): Images are now upright
4. **Your browser still shows** cached old images

### How Long Cache Lasts:
- Browser cache: Days to weeks
- Mobile cache: Can persist even longer
- CDN cache: Cleared automatically (already done)

---

## 📊 Before vs After

| Check | Before Fix | After Fix |
|-------|-----------|-----------|
| **Local file** | Building upright | Building upright |
| **Netlify CDN** | Building **sideways** ❌ | Building **upright** ✅ |
| **Your browser** | Shows cached sideways ❌ | After cache clear: upright ✅ |

---

## 🚨 If Still Not Working

If images are STILL rotated after clearing cache, please:

1. **Take screenshot** of what you see
2. **Tell me which browser** (Chrome, Safari, Firefox?)
3. **Tell me which device** (iPhone, Android, Desktop?)
4. **Try incognito mode** - does it work there?

This will help me identify if there's a different issue.

---

## 💡 Developer Verification Commands

```bash
# Download from Netlify
curl -s https://griff-seo-okt.netlify.app/images/optimized/rehabilitering/rehabilitering-griff-entreprenor-08.webp -o netlify-test.webp

# Check dimensions
file netlify-test.webp
# Expected: 1800x2400 (portrait)

# Visual check
open netlify-test.webp
# Expected: Building upright
```

---

## ✅ Success Criteria

Fix is successful when:
- [x] Netlify serves 1800×2400 portrait images ✅
- [x] Building appears upright in downloaded file ✅
- [ ] Client confirms upright after cache clear
- [ ] Mobile devices show upright images
- [ ] No rotation on any browser

**Current Status**: 2/5 complete - Awaiting client cache clear confirmation

---

**Last Updated**: 2025-10-16 20:35
**Deployment**: Commit a98ec87
**Verification**: Confirmed working on Netlify CDN
