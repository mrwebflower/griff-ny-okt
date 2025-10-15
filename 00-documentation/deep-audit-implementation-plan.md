# Deep Content Audit Implementation Plan
**Date:** October 15, 2025
**Objective:** Systematic quality audit of all Norwegian blog content
**Approach:** #ULTRATHINK - Parallel processing with 10 specialized audit tasks

---

## Executive Summary

This plan implements a comprehensive, multi-layered content quality audit across all Norwegian blog articles to detect:
- English content (words, phrases, sentences)
- Polish content (any Slavic language traces)
- Mixed language artifacts
- Inconsistent terminology
- Grammar/spelling issues
- Placeholder text
- Broken links
- Missing translations

**Strategy:** Deploy 10 parallel grep-based searches + 2 sequential chunk-by-chunk manual reviews

---

## Phase 1: Parallel Automated Detection (10 Tasks)

### Task 1: English Word Detection - Common Verbs
**Search Pattern:** `\b(have|has|had|is|are|was|were|be|been|do|does|did|will|would|should|could|can|may|might|must)\b`
**Case:** Insensitive
**Target:** All `.html` files in `src/content/articles/`
**Purpose:** Detect English auxiliary/modal verbs

### Task 2: English Word Detection - Articles & Prepositions
**Search Pattern:** `\b(the|a|an|in|on|at|to|for|of|with|by|from|as|this|that|these|those)\b`
**Case:** Insensitive
**Target:** All `.html` files
**Purpose:** Detect English articles and common prepositions

### Task 3: English Word Detection - Common Nouns
**Search Pattern:** `\b(bathroom|renovation|tile|tiling|floor|wall|project|service|quality|experience|work|customer|cost|price|time|material|installation)\b`
**Case:** Insensitive
**Target:** All `.html` files
**Purpose:** Detect industry-specific English terms

### Task 4: English Phrases - Construction Industry
**Search Pattern:** `(wet room|high quality|custom solution|professional service|certified expert|transparent quote|hidden cost|extensive experience|documented competence)`
**Case:** Insensitive
**Target:** All `.html` files
**Purpose:** Detect multi-word English phrases

### Task 5: Polish Language Detection
**Search Pattern:** `(ą|ć|ę|ł|ń|ó|ś|ź|ż|czy|jest|są|na|do|że|się|jak|ale|lub|oraz|który|która)`
**Case:** Any
**Target:** All `.html` files
**Purpose:** Detect Polish diacritics and common Polish words

### Task 6: Other Language Artifacts
**Search Pattern:** `(á|é|í|ó|ú|ñ|ü|ö|ä|ß|ø|å|æ)` (exclude Norwegian: å, æ, ø)
**Case:** Any
**Target:** All `.html` files
**Purpose:** Detect Spanish/German/other European language characters

### Task 7: English Sentence Patterns
**Search Pattern:** `<p>"[A-Z][^"]*\b(the|and|or|with|for|from)\b[^"]*"</p>`
**Case:** Any
**Target:** All `.html` files
**Purpose:** Detect quoted English sentences in paragraph tags

### Task 8: List Items in English
**Search Pattern:** `<li>[^<]*\b(with|for|the|and|or|based on|designed for|focused on)\b`
**Case:** Insensitive
**Target:** All `.html` files
**Purpose:** Detect English bullet points

### Task 9: Heading Tags in English
**Search Pattern:** `<h[1-6]>[^<]*\b(the|and|for|with|about|why|how|what|when)\b[^<]*</h[1-6]>`
**Case:** Insensitive
**Target:** All `.html` files
**Purpose:** Detect English headings

### Task 10: Placeholder & Lorem Ipsum
**Search Pattern:** `(TODO|FIXME|XXX|lorem ipsum|placeholder|INSERT|REPLACE|TBD|coming soon)`
**Case:** Insensitive
**Target:** All `.html` files
**Purpose:** Detect unfinished content markers

---

## Phase 2: Manual Chunk-by-Chunk Review

### Article 1: Flislegging (flislegging-trondheim-tips.html)

**Total Lines:** ~450
**Chunk Strategy:** 9 chunks of ~50 lines each

| Chunk | Lines | Content Focus | Checks |
|-------|-------|---------------|--------|
| 1 | 1-50 | Header, intro, key points table | English in headings, titles, table cells |
| 2 | 51-100 | Service features grid, tile types | English in icon labels, descriptions |
| 3 | 101-150 | Tile types continued, work process | English in process steps, lists |
| 4 | 151-200 | Work process details, techniques | English in technique descriptions |
| 5 | 201-250 | Techniques continued, surfaces | English in technical terms |
| 6 | 251-300 | Surfaces, maintenance section | **CRITICAL** - Previously had English |
| 7 | 301-350 | FAQ table | English in questions/answers |
| 8 | 351-400 | FAQ continued, why choose section | English in bullet points |
| 9 | 401-450 | Why choose, contact CTA | English in CTAs, links |

### Article 2: Badoppussing (kostnadsberegning-baderomsrenovering-trondheim.html)

**Total Lines:** ~180
**Chunk Strategy:** 4 chunks of ~45 lines each

| Chunk | Lines | Content Focus | Checks |
|-------|-------|---------------|--------|
| 1 | 1-45 | Header, intro, key takeaways | **Check: Was "Key Takeaways"** - now fixed |
| 2 | 46-90 | Why choose professional help | English in value propositions |
| 3 | 91-135 | Specialties, technical details | English in technical descriptions |
| 4 | 136-180 | Process, timeline, contact | English in process steps, CTAs |

---

## Phase 3: Validation Checklist

For each chunk, verify:

- [ ] All paragraph text is Norwegian
- [ ] All headings (H1-H6) are Norwegian
- [ ] All bullet points are Norwegian
- [ ] All table cells are Norwegian
- [ ] All quotes are Norwegian
- [ ] All link text is Norwegian (except proper nouns)
- [ ] All image alt texts are Norwegian
- [ ] No English words (except: proper nouns, company names, place names)
- [ ] No Polish or other language traces
- [ ] No placeholder text
- [ ] No "TODO" or "FIXME" comments
- [ ] Consistent terminology usage
- [ ] Proper Norwegian grammar and spelling

---

## Execution Strategy

### Parallel Execution (Phase 1)
Run all 10 grep searches simultaneously using individual Grep tool calls in a single message.

**Expected Time:** 30-60 seconds total

### Sequential Execution (Phase 2)
1. Read each chunk using Read tool with offset/limit
2. Manually review every line for:
   - Language mixing
   - English artifacts
   - Polish content
   - Grammar issues
   - Inconsistencies
3. Document all findings in real-time
4. Flag any issues for immediate fix or defer to post-audit cleanup

**Expected Time:** 10-15 minutes per article

---

## Success Criteria

✅ **PASS:** No English content detected (except proper nouns)
✅ **PASS:** No Polish or other language content
✅ **PASS:** All headings, paragraphs, lists, and tables in Norwegian
✅ **PASS:** No placeholder or unfinished content
✅ **PASS:** Consistent terminology throughout

❌ **FAIL:** Any untranslated English sentences or paragraphs
❌ **FAIL:** Polish or other language text present
❌ **FAIL:** Placeholder text like "TODO" or "lorem ipsum"
❌ **FAIL:** Mixed language within single sentences

---

## Output Deliverables

1. **Automated Detection Report** (from Phase 1)
   - List of all files with detected issues
   - Line numbers and matched patterns
   - Priority ranking (critical/medium/low)

2. **Manual Review Report** (from Phase 2)
   - Chunk-by-chunk findings
   - Language quality assessment
   - Grammar/style notes
   - Recommendations

3. **Final Quality Report**
   - Overall content quality score
   - List of remaining issues (if any)
   - Recommendations for improvement
   - Sign-off for production readiness

---

## Timeline

| Phase | Tasks | Duration |
|-------|-------|----------|
| Phase 1 | 10 parallel grep searches | 1-2 minutes |
| Phase 2 | Manual chunk review (2 articles) | 20-30 minutes |
| Phase 3 | Generate reports and recommendations | 5-10 minutes |
| **TOTAL** | **Complete audit** | **~35-45 minutes** |

---

## Risk Mitigation

**Risk:** External file modifications during audit
**Mitigation:** Use grep for searches (read-only), document exact line numbers, re-verify before edits

**Risk:** False positives in automated detection
**Mitigation:** All grep matches require manual verification before flagging as issues

**Risk:** Missing Polish content if client used different characters
**Mitigation:** Broad pattern matching + manual review catches edge cases

---

## Next Steps

1. ✅ Mark "Create investigation plan" as completed
2. ➡️ Execute Phase 1: Run 10 parallel grep searches
3. ➡️ Execute Phase 2: Manual chunk-by-chunk review
4. ➡️ Execute Phase 3: Generate final quality report
5. ➡️ Present findings to user with recommendations

---

**Plan Status:** READY FOR EXECUTION
**Created:** October 15, 2025
**Last Updated:** October 15, 2025
