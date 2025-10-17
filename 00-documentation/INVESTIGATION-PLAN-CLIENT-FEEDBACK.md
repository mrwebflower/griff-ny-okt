# Investigation Plan: Client Feedback Implementation

## Date: 2025-10-17

## Objective
Understand and implement client feedback regarding image issues, visibility problems, and content placement across the Griff Entreprenor website.

## Investigation Phases

### Phase 1: Client Feedback Analysis
**Objective**: Break down and categorize all feedback points

#### Categories Identified:
1. **Homepage Issues**
   - Logo/main image size and appropriateness

2. **Om Oss (About Us) Issues**
   - Duplicate images
   - Images not matching company description
   - "Vår Reise Gjennom Årene" (Our Journey Through Years) placement/ordering

3. **Tjenester (Services) Issues**
   - Text visibility: "få gratis tilbud" and phone number
   - Image appropriateness for each service:
     - Nybygg
     - Tilbygg
     - Rehabilitering
     - Isolering
     - Garasje
     - Bad og våtrom
     - Utvendig maling
     - Malearbeid
     - Flislegging
     - Snekkerarbeid
   - Image rotation issues

4. **Blogg (Blog) Issues**
   - Image appropriateness for articles:
     - Flislegging
     - Fukt
     - Garasje (3 articles)
     - Hvorfor velge en snekker over DIY
     - Feng shui og snekring
     - Profesjonell fasademaling
     - Ekspertisolering
     - Malearbeid i Trondheim
   - Image rotation issues

### Phase 2: Old Site Investigation (griffentreprenor.no)
**Objective**: Understand what worked well on the old site

**Investigation Points**:
- Homepage layout and logo presentation
- About Us section structure
- Timeline/history presentation
- Service pages layout (especially CTA visibility)
- Image selection patterns
- Image sizes and formats used
- Blog article image presentation

### Phase 3: New Site Investigation (griff-seo-okt.netlify.app)
**Objective**: Identify current implementation and issues

**Investigation Points**:
- Current homepage layout
- About Us section structure
- Timeline component structure
- Service pages layout (identify CTA visibility issues)
- Current image implementation
- Image rotation issues (reference recent rotation fix commits)
- Blog article structure

### Phase 4: Project Code Analysis
**Objective**: Understand technical implementation

**Investigation Points**:
- Image handling code (compress-images.js, convert-to-webp.js)
- Recent rotation fixes (commits: a98ec87, 9b26955)
- Component structure for services
- Component structure for blog articles
- CTA components and visibility
- Image path structure in public/images/optimized/
- Data files that reference images

### Phase 5: Root Cause Analysis
**Objective**: Identify why issues occurred

**Key Questions**:
1. Why are CTAs ("få gratis tilbud" + phone) not visible on service pages?
2. Why were inappropriate images selected?
3. Why are some images rotated incorrectly?
4. Why are duplicate images appearing?
5. How is the timeline component currently structured?

### Phase 6: Solution Design
**Objective**: Design minimal effective solutions

**Approach**:
- Identify exact code locations requiring changes
- Design image selection criteria
- Plan CTA visibility fixes
- Plan timeline restructuring
- Ensure rotation fix is applied to all affected images

## Investigation Execution Order

1. Fetch and analyze old site structure
2. Fetch and analyze new site structure
3. Review project code structure
4. Review recent rotation fix commits
5. Map all image references in code
6. Identify CTA implementation issues
7. Document all findings
8. Create implementation plan

## Success Criteria

Investigation complete when:
- [ ] All feedback points are categorized
- [ ] Old site structure is documented
- [ ] New site structure is documented
- [ ] Code structure is mapped
- [ ] Root causes identified
- [ ] Solutions designed for each issue
- [ ] Findings documented in INVESTIGATION-FINDINGS.md
