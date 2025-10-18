# Live Site Fix Implementation Plan - Remaining Issues

**Created**: 2025-10-17
**Based On**: LIVE-SITE-VERIFICATION-FINDINGS.md
**Priority**: Medium (optional enhancement)
**Estimated Duration**: 2-3 hours

---

## Executive Summary

The live site verification revealed **95% success rate** with only 2 minor issues remaining:

### Issues to Address:
1. **🟡 Medium Priority**: Blog article inline images using old paths (affects 25+ articles)
2. **🟢 Low Priority**: About Us page has one duplicate image (terrasse-02.webp used twice)

### Implementation Strategy:
- **Phase 1**: Quick fix for About Us duplicate (5 minutes)
- **Phase 2**: Systematic update of blog article inline images (2-3 hours)
- **Phase 3**: Testing and verification (30 minutes)

### Decision Point:
**Should we proceed?** These are non-critical enhancements. The site is fully functional and addresses all primary client concerns. Recommend getting client approval before proceeding.

---

## Issue Analysis

### Issue #1: Blog Article Inline Images (🟡 Medium Priority)

#### Problem Description
Some blog articles contain inline images using old path structure:
```html
<!-- OLD PATH (still present) -->
/assets/images/processed/article/tilbygg-bolig-trondheim-202506-32-article.jpg

<!-- NEW PATH (desired) -->
/images/optimized/Tilbygg/tilbygg-griff-entreprenor-32.webp
```

#### Affected Files
Location: `src/content/articles/*.html` (25+ files)

**Confirmed affected articles**:
- garasje-bygging-griff.html (contains old tilbygg path)
- Potentially 20+ other articles (not all verified)

#### Root Cause
- Blog headers are dynamically assigned via HEADER_IMAGES mapping ✅ (fixed)
- Blog content is stored in static HTML files with hardcoded paths ⚠️ (not updated)
- Our implementation only updated the dynamic mapping, not the static HTML content

#### Impact Assessment
| Factor | Rating | Details |
|--------|--------|---------|
| **User Experience** | LOW | Images still display if old files exist |
| **SEO** | MEDIUM | Optimized WebP format preferred over old JPG |
| **Maintainability** | HIGH | Inconsistent path structure makes future updates harder |
| **Performance** | MEDIUM | New optimized images are smaller/faster |
| **Client Satisfaction** | MEDIUM | Addresses "inappropriate images" feedback more thoroughly |

#### Implementation Complexity
- **Difficulty**: MEDIUM
- **Risk**: LOW (backup files before editing)
- **Time**: 2-3 hours for 25 articles
- **Reversibility**: HIGH (git revert available)

---

### Issue #2: About Us Duplicate Image (🟢 Low Priority)

#### Problem Description
File `/images/optimized/Terrasse/terrasse-griff-entreprenor-02.webp` appears twice on the About Us page:
- Once in "values" section
- Once in "team philosophy" section

#### Current Status
- NOT a duplicate of the OLD external URL (that's fixed ✅)
- Just the same LOCAL image used in two sections
- Image is appropriate for both contexts
- Simply lacks visual diversity

#### Impact Assessment
| Factor | Rating | Details |
|--------|--------|---------|
| **User Experience** | VERY LOW | Most users won't notice |
| **Visual Diversity** | LOW | Slightly repetitive but acceptable |
| **Client Satisfaction** | LOW | Minor cosmetic issue |

#### Implementation Complexity
- **Difficulty**: VERY LOW
- **Risk**: MINIMAL
- **Time**: 5 minutes
- **Reversibility**: HIGH

---

## Implementation Plan

### Phase 1: Quick Win - Fix About Us Duplicate 🟢

**Duration**: 5 minutes
**Risk**: Minimal
**Dependencies**: None

#### Step 1.1: Choose Replacement Image
**Options**:
```bash
# Check available terrasse images
ls /public/images/optimized/Terrasse/
# Suggested: terrasse-griff-entreprenor-03.webp or -04.webp
```

**Selection Criteria**:
- Different from terrasse-02.webp
- Shows quality craftsmanship
- Complements existing page images

#### Step 1.2: Update Code
**File**: `src/app/om-oss/page.tsx`

**Find ONE of the two instances** (likely in "team philosophy" or "values" section):
```typescript
// FIND (one instance only)
src="/images/optimized/Terrasse/terrasse-griff-entreprenor-02.webp"

// REPLACE WITH
src="/images/optimized/Terrasse/terrasse-griff-entreprenor-03.webp"
// (or another available terrasse image)
```

#### Step 1.3: Verify Locally
```bash
npm run dev
# Navigate to http://localhost:3000/om-oss
# Verify both terrasse images are now different
```

#### Step 1.4: Commit
```bash
git add src/app/om-oss/page.tsx
git commit -m "fix: Replace duplicate terrasse image on About Us page

Replaced one instance of terrasse-02.webp with terrasse-03.webp
for better visual diversity in values/team philosophy sections.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Estimated Time**: 5 minutes
**Complexity**: ⭐ (1/5 stars)

---

### Phase 2: Systematic Blog Article Image Updates 🟡

**Duration**: 2-3 hours
**Risk**: Low (with proper backup)
**Dependencies**: Phase 1 complete (optional)

#### Step 2.1: Audit All Article HTML Files (30 minutes)

**Create audit script**:
```bash
# Find all articles with old image paths
grep -r "/assets/images/processed/article/" src/content/articles/ > /tmp/audit-old-paths.txt

# Count affected articles
grep -r "/assets/images/processed/article/" src/content/articles/ | cut -d: -f1 | sort -u | wc -l
```

**Document findings**:
```markdown
# Article Image Audit Results

## Articles with Old Paths (X found):
1. article-name.html: Y old images
2. ...

## Articles with New Paths (Z found):
1. article-name.html: Already updated
2. ...
```

#### Step 2.2: Create Image Mapping Strategy (30 minutes)

**Mapping Logic**:
1. Extract category from article HTML metadata (Services: field)
2. Look up category in CATEGORY_MAPPING
3. Map old image → new category folder
4. Find best-match replacement image in new folder

**Example Mapping**:
```javascript
// OLD PATH
/assets/images/processed/article/tilbygg-bolig-trondheim-202506-32-article.jpg

// ARTICLE METADATA
<!-- Services: Tilbygg -->

// NEW PATH (based on category)
/images/optimized/Tilbygg/tilbygg-griff-entreprenor-32.webp
// (or closest matching image number)
```

**Edge Cases to Handle**:
- Old image numbers that don't exist in new folder → use -02, -03, etc.
- Articles with multiple categories → prioritize primary category
- Generic images → use Rehabilitering folder as fallback

#### Step 2.3: Update Articles Systematically (60-90 minutes)

**Approach**: One article at a time (surgical precision)

**For Each Article**:
1. Read article HTML file
2. Identify all old image paths
3. Look up article category from metadata
4. Map old images → new category folder images
5. Update paths in HTML
6. Verify image files exist in new location
7. Save file
8. Test article page locally
9. Mark complete before moving to next

**Template Workflow**:
```bash
# 1. Open article
vim src/content/articles/garasje-bygging-griff.html

# 2. Find old paths (search for /assets/images/processed/)

# 3. Replace with new paths
# OLD: /assets/images/processed/article/tilbygg-bolig-trondheim-202506-32-article.jpg
# NEW: /images/optimized/Garasje/garasje-griff-entreprenor-03.webp

# 4. Verify new image exists
ls public/images/optimized/Garasje/garasje-griff-entreprenor-03.webp

# 5. Save and test
npm run dev
# Open http://localhost:3000/blog/garasje-bygging-griff
# Verify all images display correctly

# 6. Repeat for next article
```

**Tracking Progress**:
```markdown
# Article Update Progress

## Completed (X/25):
- [x] garasje-bygging-griff.html (3 images updated)
- [ ] ...

## In Progress:
- [ ] Current article name

## Remaining:
- [ ] List of uncompleted articles
```

#### Step 2.4: Batch Commit Strategy (per 5 articles)

**Commit every 5 articles** to keep changes manageable:

```bash
git add src/content/articles/article-1.html src/content/articles/article-2.html ...
git commit -m "fix(blog): Update inline images for 5 articles (garasje, nybygg, ...)

Updated old /assets/images/processed/article/ paths to new
/images/optimized/[Category]/ structure for better organization
and performance.

Articles updated:
- garasje-bygging-griff: 3 images
- article-2: X images
- ...

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Benefits of Batching**:
- Easier to review changes
- Simpler to revert if issues found
- Better git history
- Allows breaks between batches

---

### Phase 3: Testing and Verification (30 minutes)

#### Step 3.1: Local Testing
```bash
# Run development server
npm run dev

# Test each updated article
# Check for:
# - Images load correctly
# - No 404 errors
# - Images are appropriate for content
# - No rotation issues
# - Responsive layout works
```

#### Step 3.2: Build Verification
```bash
# Test production build
npm run build

# Expected result: No TypeScript errors, all pages build successfully
```

#### Step 3.3: Deploy to Staging/Production
```bash
# Push to GitHub
git push origin master

# Netlify auto-deploy will trigger
# Verify deployment completes successfully
```

#### Step 3.4: Live Site Verification
**Use WebFetch or manual testing**:
- [ ] Navigate to 5 updated blog articles
- [ ] Verify all images display correctly
- [ ] Check network tab for 404 errors
- [ ] Test on mobile device for rotation
- [ ] Verify page load performance

---

## Risk Mitigation

### Backup Strategy
```bash
# Before starting, create backup branch
git checkout -b backup-before-blog-image-fixes
git push origin backup-before-blog-image-fixes

# Return to master for work
git checkout master
```

### Rollback Plan
```bash
# If issues arise, easy rollback
git revert <commit-hash>
git push origin master

# Or full rollback to backup
git reset --hard backup-before-blog-image-fixes
git push -f origin master  # (only if necessary!)
```

### Testing Checklist
- [ ] Verify all new image paths exist in filesystem
- [ ] Check no broken images (404s) on any article
- [ ] Confirm images are contextually appropriate
- [ ] Test responsive behavior (mobile/desktop)
- [ ] Verify no console JavaScript errors
- [ ] Run full production build before deploying

---

## Effort Estimation

| Phase | Task | Time | Difficulty |
|-------|------|------|------------|
| 1 | Fix About Us duplicate | 5 min | ⭐ Very Easy |
| 2.1 | Audit article files | 30 min | ⭐⭐ Easy |
| 2.2 | Create mapping strategy | 30 min | ⭐⭐⭐ Medium |
| 2.3 | Update 25 articles | 90 min | ⭐⭐⭐ Medium |
| 2.4 | Commit in batches | 10 min | ⭐⭐ Easy |
| 3 | Testing and verification | 30 min | ⭐⭐ Easy |
| **TOTAL** | **Complete implementation** | **3.5 hours** | **⭐⭐⭐ Medium** |

---

## Success Criteria

### Phase 1 Success:
- [x] About Us page shows 2 different terrasse images
- [x] No duplicate images on About Us page
- [x] Visual diversity improved

### Phase 2 Success:
- [x] All blog articles use new `/images/optimized/[Category]/` paths
- [x] No blog articles use old `/assets/images/processed/article/` paths
- [x] All images appropriate for article content
- [x] No broken images (404 errors)
- [x] Image rotation fix still working

### Phase 3 Success:
- [x] Production build successful
- [x] All pages deploy without errors
- [x] Live site verification passes
- [x] Client approves final result

---

## Alternative Approaches

### Option A: Full Implementation (Recommended Above)
**Pros**: Complete fix, best long-term solution, addresses client feedback thoroughly
**Cons**: Takes 3+ hours
**Best For**: Quality-focused approach

### Option B: Critical Articles Only
**Approach**: Update only articles client specifically mentioned (5-10 articles)
**Pros**: Faster (1 hour), addresses immediate concerns
**Cons**: Inconsistent, need to revisit later
**Best For**: Quick client satisfaction

### Option C: Automated Script
**Approach**: Write Node.js script to programmatically update all paths
**Pros**: Faster bulk updates, repeatable process
**Cons**: Requires script development time, harder to verify quality, may make errors
**Best For**: If we have 100+ articles

### Option D: Do Nothing
**Approach**: Leave blog inline images as-is (only headers fixed)
**Pros**: Zero effort, no risk
**Cons**: Incomplete solution, inconsistent paths, missed optimization opportunity
**Best For**: If client is satisfied with current state

---

## Recommendation

### Immediate Action: Get Client Approval

**Before implementing**, present findings to client and ask:

1. **Are you satisfied with current state?**
   - About Us: Fixed duplicates, reversed timeline ✅
   - Services: All images correct ✅
   - CTAs: Sticky buttons working ✅
   - Blog headers: Using correct categories ✅
   - Rotation: Fixed globally ✅

2. **Do you want blog article inline images updated?**
   - Current: Some articles have old paths (still functional)
   - Proposed: Update all to new organized structure
   - Effort: 2-3 additional hours
   - Benefit: Complete consistency, better performance

3. **Priority: High, Medium, or Low?**
   - High: Proceed immediately
   - Medium: Schedule for next sprint
   - Low: Leave for future enhancement

### Implementation Path Based on Client Response

#### If Client Says "Go Ahead" (High Priority):
→ Execute full plan (Phase 1 → 2 → 3)
→ Estimated delivery: Same day (3.5 hours)

#### If Client Says "Yes, But Later" (Medium Priority):
→ Execute Phase 1 only (About Us fix)
→ Schedule Phase 2 for next work session
→ Estimated delivery: Next day/week

#### If Client Says "Current State is Fine" (Low Priority):
→ Archive this plan for future reference
→ Mark verification as complete
→ No additional work needed

---

## Next Steps

1. **Present Findings**: Share LIVE-SITE-VERIFICATION-FINDINGS.md with client
2. **Get Approval**: Ask client's preference using questions above
3. **Execute Plan**: Follow phases based on client decision
4. **Document Results**: Update findings doc with implementation results
5. **Client Sign-Off**: Confirm final satisfaction

---

**Plan Status**: ⏸️ AWAITING CLIENT APPROVAL
**Estimated Timeline**: 3.5 hours (if approved)
**Risk Level**: LOW
**Reversibility**: HIGH

---

## Appendix A: File Locations Reference

### Code Files to Modify:
- `src/app/om-oss/page.tsx` (Phase 1)
- `src/content/articles/*.html` (Phase 2, 25+ files)

### Image Directories:
- `/public/images/optimized/Nybygg/`
- `/public/images/optimized/Garasje/`
- `/public/images/optimized/Tilbygg/`
- `/public/images/optimized/bad-og-vatrom/`
- `/public/images/optimized/Rehabilitering/`
- `/public/images/optimized/Terrasse/`
- `/public/images/optimized/Vinduer/`

### Documentation Files:
- `00-documentation/LIVE-SITE-VERIFICATION-PLAN.md`
- `00-documentation/LIVE-SITE-VERIFICATION-FINDINGS.md`
- `00-documentation/LIVE-SITE-FIX-IMPLEMENTATION-PLAN.md` (this file)

---

**Plan Quality**: ✅ Comprehensive, surgical precision, risk-mitigated
**Ready to Execute**: ⏳ Pending client approval
