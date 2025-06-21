# Imported Articles Directory

## Usage
Place your HTML article files in this directory. The system will automatically:

1. **Auto-detect and style** your HTML content with the site's design system
2. **Extract metadata** from HTML comments and content
3. **Generate SEO-optimized pages** with proper meta tags
4. **Create table of contents** from H2 and H3 headings
5. **Add responsive design** and mobile optimization

## File Naming
- Use kebab-case for file names: `article-title-here.html`
- Files should have `.html` extension
- File name becomes the URL slug: `/blog/article-title-here`

## HTML Format Expected
Your HTML files should follow this structure:

```html
<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article Title</title>
</head>
<body>
<!-- Article ID: unique-id -->
<!-- Article Name: Full Article Title -->
<!-- Services: Category, Tags, Keywords -->

<h1>Main Article Title</h1>

<div class="intro">
    <p><strong>Introduction paragraph with key points...</strong></p>
</div>

<h2 id="section-1">First Section</h2>
<p>Content here...</p>

<h3 id="subsection-1">Subsection</h3>
<p>More content...</p>

<img src="image-url" alt="Description" class="article-image">

<blockquote>
    <p>Important quote or callout</p>
</blockquote>

</body>
</html>
```

## Automatic Features Applied
- **Headers** get professional typography and spacing
- **Paragraphs** get proper line height and color
- **Lists** get consistent spacing and styling
- **Images** become responsive with rounded corners
- **Links** get brand colors and hover effects
- **Blockquotes** get styled callout boxes
- **Table of Contents** auto-generated from headings with IDs
- **SEO metadata** extracted from content and comments
- **Category detection** based on Services comment
- **Read time estimation** based on word count

## Categories Auto-Detected
- **Våtrom**: For bathroom/wet room content
- **Byggetillatelser**: For building permits/garage content
- **Renovering**: For renovation/rehabilitation content
- **Byggetips**: Default for general construction tips

The system automatically styles everything to match the site's design!
