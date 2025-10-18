# Investigation Plan - Mobile UX & CTA Issues

**Investigation Date**: 2025-10-17
**Reporter**: Client (mobile testing feedback)
**Priority**: HIGH - Multiple UX issues affecting mobile experience
**Scope**: Mobile menu, CTAs, spacing, branding

---

## Issues Reported by Client

### ✅ Working Correctly:
- Service pages: nybygg, garasje, bad-og-vatrom, flislegging showing correct images
- Blog article (garasje) showing correct images, no old paths

### ❌ Issues to Investigate:

#### Issue #1: Desktop Sticky Widget NOT on Blog Posts
**Report**: "This is not floating in the blog posts: Desktop (on laptop) - Bottom-right floating widget with contact buttons"
**Expected**: Floating widget should appear on blog posts like it does on service pages
**Current**: Widget only appears on service pages (/tjenester/[slug])
**Impact**: HIGH - Desktop users on blog posts don't see prominent CTAs

#### Issue #2: Mobile Menu Totally White
**Report**: "The menu in nav on mobile is totally white, that does not work"
**Expected**: Mobile menu should have visible text/links
**Current**: Menu appears but is white/invisible
**Impact**: CRITICAL - Mobile navigation broken
**Screenshot**: Provided by client

#### Issue #3: Service Icons in Mobile Menu
**Report**: "the services have many icons each see image here"
**Expected**: Clean service links without duplicate icons
**Current**: Multiple icons showing per service in mobile menu
**Impact**: MEDIUM - Looks cluttered/unprofessional
**Screenshot**: Provided by client

#### Issue #4: Missing Mobile CTA - Gift Icon
**Report**: "On phone it should be a floating small icon bottom right corner with gift symbol, when clicked that free offer and put your phone number in!"
**Expected**: Small floating gift icon → click → simple form with phone input
**Current**: Bottom bar with 2 buttons (not what client wants)
**Impact**: HIGH - Client wants different mobile CTA approach
**Design Reference**: "Should look like the old website one just better! Maybe just input mobile phone!"

#### Issue #5: Spacing on Mobile Homepage
**Report**: "Also on phone we need some space between Velkommen til Griffentreprenor and the header!"
**Expected**: More vertical spacing/padding
**Current**: Text too close to header
**Impact**: LOW - Visual/spacing issue

#### Issue #6: Company Name Spelling
**Report**: "Also it is 'Griff Entreprenør'!"
**Expected**: "Griff Entreprenør" (with ø character)
**Current**: "Griffentreprenor" (without ø)
**Impact**: MEDIUM - Branding accuracy
**Scope**: Find all instances across the site

#### Issue #7: Stats Boxes Layout on Mobile
**Report**: "Also the 3 boxes 15 years experience, certified etc in the nav must be on one line on phone, bit more compact!"
**Expected**: 3 stats boxes horizontal on mobile (compact)
**Current**: Likely stacked vertically or taking too much space
**Impact**: MEDIUM - Mobile layout optimization

---

## Investigation Phases

### Phase 1: Code Structure Analysis (30 minutes)

#### 1.1 Sticky CTA Components Location
- [ ] Find where sticky CTAs are implemented
- [ ] Check if they're in service page layout only
- [ ] Determine why not showing on blog posts
- [ ] Identify blog post layout structure

**Files to Check**:
- `src/app/tjenester/[slug]/page.tsx` (has CTAs)
- `src/app/blog/[slug]/page.tsx` (missing CTAs?)
- `src/components/layout/Header.tsx`
- Any shared layout components

#### 1.2 Mobile Menu Investigation
- [ ] Find mobile menu component
- [ ] Check styling/classes
- [ ] Identify why text is white
- [ ] Check dark/light mode issues
- [ ] Examine service submenu structure

**Files to Check**:
- `src/components/layout/Header.tsx`
- Navigation components
- Mobile menu CSS/Tailwind classes

#### 1.3 Mobile Homepage Spacing
- [ ] Locate "Velkommen til Griffentreprenor" text
- [ ] Check current spacing values
- [ ] Identify header component
- [ ] Measure current gap

**Files to Check**:
- `src/components/sections/Hero.tsx`
- Homepage layout
- Header component

#### 1.4 Stats Boxes Component
- [ ] Find stats/achievements component
- [ ] Check current mobile layout (flex direction)
- [ ] Measure current sizing
- [ ] Identify responsive breakpoints

**Files to Check**:
- Homepage components
- Stats/features sections

---

### Phase 2: Old Website Reference Analysis (20 minutes)

#### 2.1 Old Site CTA Pattern
**Objective**: Understand what client means by "like the old website"

- [ ] Visit old site (if accessible): griffentreprenor.no
- [ ] Document mobile CTA design:
  - Position (bottom-right corner)
  - Icon type (gift/present icon)
  - Click behavior (form popup?)
  - Form fields (phone number input)
  - Visual style (size, color, animation?)
- [ ] Take screenshots for reference
- [ ] Note differences from current implementation

**Expected Findings**:
- Small floating button (not full-width bar)
- Gift/present icon (lucide-react has Gift icon)
- Simple form with minimal fields
- Bottom-right corner positioning

#### 2.2 Old Site Mobile Menu
- [ ] Check old site mobile menu
- [ ] Document text color, background
- [ ] Note service organization
- [ ] Identify icon usage patterns

---

### Phase 3: Component Location Audit (20 minutes)

#### 3.1 Find All "Griffentreprenor" References
**Objective**: Locate all instances needing "ø" character fix

```bash
# Search entire codebase
grep -r "Griffentreprenor" src/
grep -r "griffentreprenor" src/
grep -r "Griff Entreprenor" src/
```

**Expected Locations**:
- Page titles
- Meta descriptions
- Header/footer
- About us page
- Contact information
- Alt text
- URLs (likely keep as-is for consistency)

#### 3.2 Map Current vs Desired State

| Component | Current | Desired |
|-----------|---------|---------|
| Desktop blog CTAs | None | Floating widget (same as services) |
| Mobile CTAs | Bottom bar 2 buttons | Small gift icon bottom-right |
| Mobile menu | White text | Visible text |
| Service icons | Multiple per item | Clean single icon |
| Company name | "Griffentreprenor" | "Griff Entreprenør" |
| Homepage spacing | Tight | More space |
| Stats boxes mobile | TBD | Horizontal 3-column |

---

### Phase 4: Technical Investigation (30 minutes)

#### 4.1 Blog Post Layout Analysis

**Read**: `src/app/blog/[slug]/page.tsx`
- [ ] Check if CTAs are included in layout
- [ ] Identify why different from service pages
- [ ] Determine easiest fix approach

**Options**:
A. Add CTAs directly to blog page layout
B. Create shared CTA component
C. Move CTAs to root layout

#### 4.2 Mobile Menu Styling Investigation

**Read**: Mobile menu component
- [ ] Check text color classes
- [ ] Identify background color
- [ ] Look for contrast issues
- [ ] Check if dark mode enabled incorrectly

**Common Issues**:
- `text-white` on `bg-white` background
- Missing `text-slate-900` class
- Incorrect z-index hiding content
- Transparent background

#### 4.3 Gift Icon CTA Design Requirements

**Design Specifications**:
- [ ] Size: Small floating button (50-60px circle?)
- [ ] Position: Fixed bottom-right (8-16px from edges)
- [ ] Icon: Gift from lucide-react
- [ ] Color: Primary brand color
- [ ] Interaction: Click → modal/popup
- [ ] Form fields: Phone number input + submit
- [ ] Z-index: Above content but below header?

**Technical Approach**:
- Create new `FloatingGiftCTA.tsx` component
- Use dialog/modal for form (shadcn/ui Dialog)
- Mobile-only display (hidden on desktop)
- Form submission: POST to /kontakt or email endpoint

#### 4.4 Stats Boxes Layout Fix

**Current Investigation**:
- [ ] Find stats component code
- [ ] Check current flex classes
- [ ] Identify mobile breakpoint behavior

**Likely Fix**:
```tsx
// CURRENT (probably):
<div className="flex flex-col gap-4">

// DESIRED:
<div className="grid grid-cols-3 gap-2 text-sm">
```

---

### Phase 5: Design & UX Considerations (15 minutes)

#### 5.1 Mobile CTA Strategy

**Client Wants**: Simple gift icon → phone input form

**Questions to Consider**:
- Should we keep the bottom bar AND add gift icon?
- Or replace bottom bar with gift icon only?
- Where should submitted phone numbers go?
- Success message after submission?

**Recommended Approach** (pending investigation):
- Remove current bottom bar with 2 buttons
- Add small gift icon bottom-right corner
- Click opens modal with:
  - Heading: "Få gratis tilbud"
  - Phone input field
  - Submit button
  - Maybe name field too?

#### 5.2 Mobile Menu Color Contrast

**Standard Pattern**:
- Light menu: Dark text on white background
- Dark menu: Light text on dark background

**Expected Fix**:
- Mobile menu background: `bg-white`
- Mobile menu text: `text-slate-900`
- Hover states: `hover:text-primary`

#### 5.3 Service Icons Cleanup

**Issue**: Multiple icons showing per service

**Possible Causes**:
- Icon in both parent link AND children
- Duplicate icon components
- Submenu showing icons unnecessarily

**Investigation Needed**:
- View mobile menu code structure
- Count icon instances per service
- Determine which icons to keep/remove

---

### Phase 6: Scope & Priority Assessment (10 minutes)

#### Complexity Ratings:

| Issue | Complexity | Risk | Priority |
|-------|-----------|------|----------|
| Blog CTAs | LOW | LOW | HIGH |
| Mobile menu white | LOW | LOW | CRITICAL |
| Service icons | MEDIUM | LOW | MEDIUM |
| Gift icon CTA | MEDIUM | MEDIUM | HIGH |
| Homepage spacing | LOW | LOW | LOW |
| Company name ø | LOW | LOW | MEDIUM |
| Stats boxes layout | LOW | LOW | MEDIUM |

#### Estimated Implementation Time:

| Issue | Investigation | Implementation | Testing | Total |
|-------|---------------|----------------|---------|-------|
| Blog CTAs | 10 min | 15 min | 5 min | 30 min |
| Mobile menu | 15 min | 10 min | 5 min | 30 min |
| Service icons | 20 min | 15 min | 5 min | 40 min |
| Gift icon CTA | 30 min | 45 min | 15 min | 90 min |
| Homepage spacing | 5 min | 5 min | 2 min | 12 min |
| Company name | 15 min | 10 min | 5 min | 30 min |
| Stats boxes | 10 min | 10 min | 5 min | 25 min |
| **TOTAL** | **105 min** | **110 min** | **42 min** | **~4.5 hours** |

---

## Investigation Execution Order

### Quick Wins First (30 minutes):
1. **Mobile menu white text** (CRITICAL - 30 min)
2. **Homepage spacing** (LOW complexity - 12 min)
3. **Blog CTAs** (HIGH impact - 30 min)

### Medium Tasks (90 minutes):
4. **Company name ø** (Brand accuracy - 30 min)
5. **Stats boxes layout** (UX improvement - 25 min)
6. **Service icons cleanup** (UX polish - 40 min)

### Complex Task (90 minutes):
7. **Gift icon CTA** (New component - 90 min)

---

## Investigation Deliverables

### Documentation to Create:

1. **NEW-ISSUES-INVESTIGATION-FINDINGS.md**
   - Detailed findings for each issue
   - Root cause analysis
   - Code locations identified
   - Screenshots/comparisons
   - Recommended solutions

2. **NEW-ISSUES-IMPLEMENTATION-PLAN.md**
   - Step-by-step implementation guide
   - Code changes with before/after
   - Component hierarchy
   - Testing checklist
   - Rollback strategy

3. **REMAINING-TODO-LIST.md**
   - All pending tasks
   - Priority order
   - Estimated times
   - Dependencies

4. **NEXT-TASKS.md**
   - Future enhancements
   - Nice-to-have features
   - Performance optimizations
   - SEO improvements

---

## Investigation Tools & Methods

### Code Analysis:
```bash
# Find mobile menu component
grep -r "mobile.*menu" src/components/
grep -r "sheet" src/components/  # shadcn/ui Sheet component

# Find stats/achievement boxes
grep -r "15.*år" src/
grep -r "sertifi" src/

# Find company name instances
grep -ri "griffentreprenor" src/ | grep -v node_modules
```

### Component Tree Analysis:
- Read Header.tsx for navigation structure
- Check layout.tsx files for global components
- Identify shared vs page-specific components

### Visual Comparison:
- Screenshot current mobile menu (white issue)
- Screenshot current mobile CTAs (bottom bar)
- Compare with client expectations
- Note all visual discrepancies

---

## Success Criteria for Investigation

### Must Identify:
- ✅ Exact code location of mobile menu white text issue
- ✅ Reason blog posts don't have desktop CTAs
- ✅ Current vs desired mobile CTA implementation
- ✅ All instances of "Griffentreprenor" to fix
- ✅ Stats boxes current layout code
- ✅ Service icons duplication source

### Must Document:
- ✅ Root cause for each issue
- ✅ Recommended fix approach
- ✅ Code file locations
- ✅ Estimated implementation time
- ✅ Risk assessment

### Must Deliver:
- ✅ Comprehensive findings document
- ✅ Detailed implementation plan
- ✅ Executive summary for approval
- ✅ Clear next steps

---

## Investigation Checklist

### Phase 1: Code Structure ✅
- [ ] Located sticky CTA implementation
- [ ] Found blog post layout
- [ ] Identified mobile menu component
- [ ] Found homepage spacing code
- [ ] Located stats boxes component

### Phase 2: Reference Analysis ✅
- [ ] Analyzed old site mobile CTA
- [ ] Documented gift icon pattern
- [ ] Noted form design
- [ ] Captured mobile menu style

### Phase 3: Component Audit ✅
- [ ] Listed all "Griffentreprenor" instances
- [ ] Mapped current vs desired states
- [ ] Identified file change scope

### Phase 4: Technical Deep Dive ✅
- [ ] Analyzed blog layout structure
- [ ] Investigated menu styling issue
- [ ] Designed gift icon CTA approach
- [ ] Reviewed stats layout options

### Phase 5: Design Review ✅
- [ ] Assessed mobile UX strategy
- [ ] Evaluated color contrast
- [ ] Reviewed icon patterns

### Phase 6: Scoping ✅
- [ ] Rated complexity for each issue
- [ ] Estimated implementation time
- [ ] Prioritized fixes
- [ ] Identified dependencies

---

**Investigation Status**: 📋 PLAN READY
**Next Step**: Execute investigation
**Expected Duration**: 2 hours
**Deliverable**: Findings document + Implementation plan
