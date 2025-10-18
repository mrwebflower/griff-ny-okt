# Remaining TODO List

**Updated**: 2025-10-17
**Status**: Awaiting client approval to proceed
**Total Estimated Time**: 3.5-4 hours

---

## Priority 1: CRITICAL Fixes (55 minutes)

### ❌ 1. Mobile Menu Text Visibility
**Status**: Not started
**File**: `src/components/layout/Header.tsx`
**Time**: 15 minutes
**Changes**: Replace `text-griffen-text` with `text-slate-900` for better visibility

### ❌ 2. Homepage Hero Spacing
**Status**: Not started
**File**: `src/components/sections/Hero.tsx`
**Time**: 10 minutes
**Changes**: Add `pt-20 sm:pt-0` to create space between text and header on mobile

### ❌ 3. Desktop CTAs on Blog Posts
**Status**: Not started
**File**: `src/app/blog/[slug]/page.tsx`
**Time**: 30 minutes
**Changes**: Add floating desktop CTA widget (same as service pages)

---

## Priority 2: Branding & Polish (60 minutes)

### ❌ 4. Company Name Fix (Griff Entreprenør)
**Status**: Not started
**Files**: ~19 files across src/
**Time**: 30 minutes
**Changes**: Replace "Griffentreprenor" → "Griff Entreprenør" (with ø)

### ❌ 5. Stats Boxes Compact Layout
**Status**: Not started
**File**: `src/components/sections/Hero.tsx`
**Time**: 15 minutes
**Changes**: Use `grid grid-cols-3` to force 3 boxes on one line on mobile

### ❌ 6. Service Menu Icons Cleanup
**Status**: Not started
**File**: `src/components/layout/Header.tsx`
**Time**: 15 minutes
**Changes**: Remove individual service icons, keep clean text-only links

---

## Priority 3: New Feature (90 minutes)

### ❌ 7. Gift Icon Mobile CTA
**Status**: Not started
**Files**:
- NEW: `src/components/ui/FloatingGiftCTA.tsx`
- UPDATE: `src/app/tjenester/[slug]/page.tsx`
- UPDATE: `src/app/blog/[slug]/page.tsx`
**Time**: 90 minutes
**Changes**:
- Create floating gift icon component
- Add phone input form modal
- Replace mobile bottom bar with gift icon
- Add to all service and blog pages

**Dependencies**:
- May need to install shadcn components: `npx shadcn@latest add dialog input label`

---

## Testing Tasks (30 minutes)

### ❌ 8. Phase 1 Testing
**After**: Critical fixes complete
**Tests**:
- Mobile menu visible
- Homepage spacing looks good
- Blog CTAs present on desktop

### ❌ 9. Phase 2 Testing
**After**: Branding/polish complete
**Tests**:
- Company name correct everywhere
- Stats boxes fit on one line mobile
- Service menu clean

### ❌ 10. Phase 3 Testing
**After**: Gift CTA complete
**Tests**:
- Gift icon appears on mobile
- Form opens and validates
- Success message works
- Desktop widgets unaffected

### ❌ 11. Final Build & Deploy
**After**: All fixes complete
**Tasks**:
- Run `npm run build` - verify no errors
- Test on actual iPhone
- Test on actual Android phone
- Commit all changes
- Push to GitHub
- Verify Netlify deployment

---

## Optional Enhancements (Future)

### ⏸️ Backend Integration for Gift Form
**Time**: 2-3 hours
**Description**: Connect gift icon form to email service or CRM
**Priority**: LOW (can use placeholder console.log for now)

### ⏸️ Analytics Tracking
**Time**: 1 hour
**Description**: Add Google Analytics events for gift icon clicks/submissions
**Priority**: LOW

### ⏸️ A/B Testing
**Time**: 3-4 hours
**Description**: Test gift icon vs bottom bar conversion rates
**Priority**: LOW

---

## Completion Checklist

### Phase 1 Complete:
- [ ] Mobile menu text fixed
- [ ] Homepage spacing added
- [ ] Blog CTAs added
- [ ] Build succeeds
- [ ] Tested on mobile

### Phase 2 Complete:
- [ ] Company name updated (19+ files)
- [ ] Stats boxes compact
- [ ] Service icons cleaned
- [ ] Build succeeds
- [ ] No visual regressions

### Phase 3 Complete:
- [ ] FloatingGiftCTA component created
- [ ] Gift icon on service pages
- [ ] Gift icon on blog pages
- [ ] Old mobile bar removed
- [ ] Form validates correctly
- [ ] Build succeeds
- [ ] Tested on real devices

### Final Deployment:
- [ ] All changes committed
- [ ] Changes pushed to GitHub
- [ ] Netlify deployed successfully
- [ ] Live site verified
- [ ] Client approved

---

## Progress Tracking

**Not Started**: 7 tasks
**In Progress**: 0 tasks
**Completed**: 0 tasks

**Overall Progress**: 0%

---

**Last Updated**: 2025-10-17
**Next Review**: After client approval
**Blocked By**: Client decision on gift icon CTA design
