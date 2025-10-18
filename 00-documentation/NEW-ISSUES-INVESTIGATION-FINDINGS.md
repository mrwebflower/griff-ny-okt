# Investigation Findings - Mobile UX & CTA Issues

**Investigation Date**: 2025-10-17
**Status**: ✅ COMPLETE
**Files Analyzed**: 8 core files
**Issues Found**: 7 confirmed issues

---

## Executive Summary

Investigation reveals 7 UX/design issues affecting mobile experience and branding:
- **3 CRITICAL**: Mobile menu visibility, blog CTAs, mobile CTA design
- **2 HIGH**: Company name branding, homepage spacing
- **2 MEDIUM**: Stats box layout, service menu icons

**Total Estimated Fix Time**: 4-5 hours

---

## Issue #1: Blog Posts Missing Desktop CTAs ❌ CRITICAL

### Current State:
- **File**: `src/app/blog/[slug]/page.tsx` (lines 142-164)
- **Problem**: Blog articles use `ArticleWrapper` component with NO sticky CTAs
- **Desktop**: No floating widget visible
- **Mobile**: Has bottom bar (but client wants different design)

### Root Cause:
CTAs were added ONLY to service pages (`src/app/tjenester/[slug]/page.tsx` lines 883-923).
Blog pages use completely different layout component.

### Impact:
Desktop users on blog posts cannot easily contact company.

### Solution Approach:
Add same sticky CTA components to blog article layout.

**Files to Modify**:
- `src/app/blog/[slug]/page.tsx` (add CTAs)
- Or create shared CTA component

**Complexity**: LOW
**Time**: 30 minutes

---

## Issue #2: Mobile CTA Design Wrong ❌ CRITICAL

### Client Requirement:
> "On phone it should be a floating small icon bottom right corner with gift symbol, when clicked that free offer and put your phone number in!"
> "Should look like the old website one just better! Maybe just input mobile phone!"

### Current Implementation:
- **Location**: Service pages bottom
- **Design**: Full-width bottom bar with 2 buttons ("Få tilbud" + "Ring nå")
- **Problem**: Client wants small gift icon, not full bar

### Desired Implementation:
- **Position**: Small floating button, bottom-right corner
- **Icon**: Gift symbol (lucide-react `<Gift />`)
- **Size**: ~50-60px circle button
- **Interaction**: Click → Modal/popup with simple phone input form
- **Form Fields**: Phone number (+ maybe name)
- **Visual**: Primary color, shadow, pulse animation?

### Root Cause:
Implementation followed common pattern (bottom bar) instead of client's old site pattern (gift icon).

### Solution Approach:
1. Create new `FloatingGiftCTA.tsx` component
2. Small circular button with Gift icon
3. Click opens modal with phone form
4. Mobile only (replace current bottom bar)
5. Keep desktop widget as-is

**Complexity**: MEDIUM
**Time**: 90 minutes (new component + form + modal)

---

## Issue #3: Mobile Menu "Totally White" ❌ CRITICAL

### Client Report:
> "The menu in nav on mobile is totally white, that does not work"

### Investigation Result:
**File**: `src/components/layout/Header.tsx` (lines 188-242)

**Current Code**:
```tsx
Line 190: className="lg:hidden bg-white border-t shadow-lg"
Line 199: className="text-griffen-text font-semibold..."
Line 216: className="... text-griffen-text-light..."
```

**Color Definitions** (from `tailwind.config.ts`):
```ts
'griffen-text': {
  DEFAULT: '#3C454D',  // Dark gray
  light: '#777777',    // Medium gray
}
```

### Analysis:
**Colors SHOULD work** - dark text on white background. But client reports white menu.

**Possible Causes**:
1. CSS override somewhere making text white
2. Client seeing desktop menu instead (which might have white text)
3. Contrast issue on certain phones
4. Another CSS class conflicting

### Testing Needed:
Cannot fully diagnose without live mobile testing, BUT code appears correct.

### Recommended Fix:
Explicitly force dark text colors to ensure visibility:
```tsx
className="text-slate-900" // Instead of text-griffen-text
```

**Complexity**: LOW (if just color fix)
**Time**: 15 minutes

---

## Issue #4: Service Menu Icons Cluttered ⚠️ MEDIUM

### Client Report:
> "the services have many icons each see image here [Image #1]"

### Investigation Result:
**File**: `src/components/layout/Header.tsx` (lines 205-226)

**Current Structure**:
```tsx
{Object.entries(serviceCategories).map(([key, category]) => (
  <div key={key}>
    <h4>{category.title}</h4>  {/* Category heading */}
    {category.services.map((service) => {
      const Icon = service.icon;  {/* Each service has icon */}
      return (
        <Link>
          <Icon className="w-3 h-3 text-primary" />  {/* Icon here */}
          {service.title}
        </Link>
      );
    })}
  </div>
))}
```

### Findings:
- Each service link has ONE icon (line 219)
- Multiple services under each category heading
- Client sees "many icons" = likely many services listed

### Possible Issues:
1. Too many services showing (12 services = 12 icons)
2. Icon size too large or layout cluttered
3. Client wants fewer icons or different organization

### Solution Options:
A. Remove icons from service links (show only text)
B. Collapse services into fewer categories
C. Use smaller icons + tighter spacing
D. Show only category icons, not individual service icons

**Recommended**: Option A or C (simplify)

**Complexity**: LOW-MEDIUM
**Time**: 30 minutes

---

## Issue #5: Company Name Missing ø Character ⚠️ HIGH

### Client Report:
> "Also it is 'Griff Entreprenør'!"

### Current State:
**Incorrect**: "Griffentreprenor"
**Correct**: "Griff Entreprenør"

### Affected Locations (19 instances found):
```
src/components/sections/Hero.tsx:26
src/app/om-oss/page.tsx:25,26,80,84,311,407
src/app/kontakt/layout.tsx:4,5,8
src/app/tjenester/page.tsx:8,12
src/app/tjenester/[slug]/page.tsx:620,625,629
src/app/blog/page.tsx:6,10
src/app/blog/[slug]/page.tsx:56,112,117,125
```

### Additional Locations to Check:
- Header logo alt text
- Footer
- Meta tags
- Any JSON-LD schema
- README files?

### Solution Approach:
Global find & replace:
```bash
# Case sensitive
"Griffentreprenor" → "Griff Entreprenør"
```

**Note**: Keep URL slugs as-is (griffentreprenor.no) for consistency.

**Complexity**: LOW
**Time**: 30 minutes (search, replace, test)

---

## Issue #6: Homepage Spacing Too Tight ⚠️ HIGH

### Client Report:
> "Also on phone we need some space between Velkommen til Griffentreprenor and the header!"

### Investigation Result:
**File**: `src/components/sections/Hero.tsx` (lines 7-23)

**Current Code**:
```tsx
<section className="relative min-h-[80vh]...">  {/* Line 7 */}
  <div className="relative z-10 container text-center...">  {/* Line 19 */}
    <div className="max-w-4xl mx-auto space-y-8">  {/* Line 20 */}
      <div className="space-y-4">  {/* Line 22 */}
        <h1>Velkommen til...</h1>  {/* Line 23 */}
```

### Issue:
No explicit top padding/margin on mobile. Section starts at `min-h-[80vh]` full viewport height, content vertically centered.

### Mobile Problem:
When header is sticky, content might be too close to header on scroll or small screens.

### Solution Approach:
Add top padding/margin specifically for mobile:
```tsx
<div className="relative z-10 container text-center pt-16 md:pt-0">
  // Or
  className="max-w-4xl mx-auto space-y-8 mt-20 md:mt-0"
```

**Complexity**: LOW
**Time**: 10 minutes

---

## Issue #7: Stats Boxes Not Compact on Mobile ⚠️ MEDIUM

### Client Report:
> "Also the 3 boxes 15 years experience, certified etc in the nav must be on one line on phone, bit more compact!"

### Investigation Result:
**File**: `src/components/sections/Hero.tsx` (lines 35-45)

**Current Code**:
```tsx
<div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
  <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
    ✓ 15+ års erfaring
  </div>
  <div...>✓ Sertifiserte håndverkere</div>
  <div...>✓ Lokal tilstedeværelse</div>
</div>
```

### Issue:
`flex-wrap` allows boxes to wrap to multiple lines on small screens.
Client wants all 3 on ONE line.

### Solution Approach:
```tsx
// OPTION A: Grid (more control)
className="grid grid-cols-3 gap-2 text-xs md:text-sm"

// OPTION B: Flex no-wrap + smaller
className="flex justify-center gap-2 text-xs md:text-base"
className="px-2 py-1 md:px-4 md:py-2"  // Smaller padding mobile
```

**Complexity**: LOW
**Time**: 15 minutes

---

## Summary Matrix

| Issue | File(s) | Priority | Complexity | Time | Risk |
|-------|---------|----------|------------|------|------|
| Blog CTAs | blog/[slug]/page.tsx | CRITICAL | LOW | 30m | LOW |
| Mobile CTA (gift icon) | New component | CRITICAL | MEDIUM | 90m | MEDIUM |
| Mobile menu white | Header.tsx | CRITICAL | LOW | 15m | LOW |
| Service icons | Header.tsx | MEDIUM | LOW-MED | 30m | LOW |
| Company name ø | 19 files | HIGH | LOW | 30m | LOW |
| Homepage spacing | Hero.tsx | HIGH | LOW | 10m | LOW |
| Stats boxes | Hero.tsx | MEDIUM | LOW | 15m | LOW |
| **TOTAL** | **~25 files** | - | **MIXED** | **~4h** | **LOW** |

---

## Files Requiring Changes

### Primary Files (7):
1. `src/components/layout/Header.tsx` - Mobile menu + service icons
2. `src/components/sections/Hero.tsx` - Spacing + stats + company name
3. `src/app/blog/[slug]/page.tsx` - Add CTAs
4. `src/components/ui/FloatingGiftCTA.tsx` - NEW FILE (mobile CTA)
5. `src/app/tjenester/[slug]/page.tsx` - Replace mobile CTA
6. Multiple metadata files - Company name

### Secondary Files (~18):
- All page metadata files with "Griffentreprenor"

---

## Recommended Implementation Order

### Phase 1: Quick Critical Fixes (55 minutes)
1. Mobile menu visibility (15m)
2. Homepage spacing (10m)
3. Blog CTAs (30m)

### Phase 2: Branding & Polish (60 minutes)
4. Company name ø replacement (30m)
5. Stats boxes layout (15m)
6. Service icons cleanup (15m)

### Phase 3: Complex New Feature (90 minutes)
7. Gift icon mobile CTA component (90m)

**Total**: ~3.5 hours actual work

---

## Next Steps

1. Review findings with client
2. Create detailed implementation plan
3. Get approval on gift icon CTA design
4. Execute fixes in priority order
5. Test on actual mobile device
6. Deploy and verify

---

**Investigation Status**: ✅ COMPLETE
**Findings Quality**: HIGH
**Ready for**: Implementation Plan Creation
