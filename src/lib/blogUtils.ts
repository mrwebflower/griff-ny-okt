import fs from "node:fs";
import path from "node:path";
import type { BlogPost, BlogCategory } from "./blogTypes";

// Function to find matching image for an article
function findMatchingImage(fileName: string): string {
  const imageDir = path.join(process.cwd(), 'public/assets/images/processed/article');

  // Use a high-quality neutral construction image as default
  const defaultImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&crop=center&auto=format&q=75";

  if (!fs.existsSync(imageDir)) {
    return defaultImage;
  }

  const availableImages = fs.readdirSync(imageDir);

  // Create mapping patterns for different article types with better images
  const patterns = [
    { keywords: ['isolering', 'energisparing'], imagePrefix: 'isolering-energisparing-trondheim', fallback: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['rehabilitering', 'renovering'], imagePrefix: 'rehabilitering-trondheim', fallback: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['terrasse', 'bygging'], imagePrefix: 'terrasse-bygging-trondheim', fallback: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['tilbygg', 'bolig'], imagePrefix: 'tilbygg-bolig-trondheim', fallback: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['vinduer', 'utskifting', 'vindu'], imagePrefix: 'vinduer-utskifting-trondheim', fallback: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['bad', 'vatrom', 'våtrom'], imagePrefix: 'rehabilitering-trondheim', fallback: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['garasje'], imagePrefix: 'tilbygg-bolig-trondheim', fallback: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['nybygg', 'investere'], imagePrefix: 'tilbygg-bolig-trondheim', fallback: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['malearbeid', 'maling'], imagePrefix: 'rehabilitering-trondheim', fallback: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
    { keywords: ['snekkerarbeid'], imagePrefix: 'rehabilitering-trondheim', fallback: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop&crop=center&auto=format&q=75" },
  ];

  // Try to find a matching pattern
  for (const pattern of patterns) {
    const hasKeyword = pattern.keywords.some(keyword =>
      fileName.toLowerCase().includes(keyword.toLowerCase())
    );

    if (hasKeyword) {
      // Find the first available image with this prefix
      const matchingImage = availableImages.find(img =>
        img.startsWith(pattern.imagePrefix) && img.endsWith('.jpg')
      );

      if (matchingImage) {
        return `/assets/images/processed/article/${matchingImage}`;
      }

      // Use category-specific fallback if no local image found
      return pattern.fallback;
    }
  }

  // If no specific match found, try to use any rehabilitation image as fallback
  const fallbackImage = availableImages.find(img =>
    img.startsWith('rehabilitering-trondheim') && img.endsWith('.jpg')
  );

  if (fallbackImage) {
    return `/assets/images/processed/article/${fallbackImage}`;
  }

  return defaultImage;
}

// Function to clean and improve titles
function cleanTitle(title: string): string {
  // Remove HTML tags
  let cleanedTitle = title.replace(/<[^>]+>/g, '');

  // Remove common prefixes that might make titles boring
  cleanedTitle = cleanedTitle.replace(/^(artikkel|blogg|post):\s*/i, '');

  // Capitalize first letter
  cleanedTitle = cleanedTitle.charAt(0).toUpperCase() + cleanedTitle.slice(1);

  // Ensure it doesn't end with trailing punctuation
  cleanedTitle = cleanedTitle.replace(/[.!?]+$/, '');

  return cleanedTitle.trim();
}

// Get all blog posts (imported HTML articles only)
export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  // Check for imported HTML articles
  const articlesDir = path.join(process.cwd(), 'src/content/articles');

  if (fs.existsSync(articlesDir)) {
    const htmlFiles = fs.readdirSync(articlesDir)
      .filter(file => file.endsWith('.html'))
      .map(file => file.replace('.html', ''));

    for (const fileName of htmlFiles) {
      const filePath = path.join(articlesDir, `${fileName}.html`);
      const htmlContent = fs.readFileSync(filePath, 'utf8');

      // Extract metadata from HTML
      const metadata = extractMetadataFromHtml(htmlContent, fileName);

      posts.push({
        id: fileName,
        title: metadata.title,
        excerpt: metadata.excerpt,
        date: metadata.date,
        readTime: metadata.readTime,
        category: metadata.category,
        image: metadata.image,
        featured: false,
        isImported: true
      });
    }
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Extract metadata from HTML content
function extractMetadataFromHtml(html: string, fileName: string) {
  // Try to extract title from different sources
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const metaTitleMatch = html.match(/<!-- Article Name: ([^>]+) -->/i);
  const htmlTitleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const metaServicesMatch = html.match(/<!-- Services: ([^>]+) -->/i);

  // Extract title with priority: HTML title > Article Name comment > H1 > fileName
  let rawTitle = "";
  if (htmlTitleMatch?.[1] && !htmlTitleMatch[1].includes("Artikkel")) {
    rawTitle = htmlTitleMatch[1];
  } else if (metaTitleMatch?.[1]) {
    rawTitle = metaTitleMatch[1];
  } else if (titleMatch?.[1]) {
    rawTitle = titleMatch[1];
  } else {
    rawTitle = fileName.replace(/-/g, ' ');
  }

  const title = cleanTitle(rawTitle);

  // Extract description from first paragraph or intro div with better logic
  let excerpt = "";
  const introMatch = html.match(/<div[^>]*class="intro"[^>]*>[\s\S]*?<p[^>]*>([^<]+)<\/p>/i);
  const firstPMatch = html.match(/<p[^>]*>([^<]+)<\/p>/i);
  const strongFirstMatch = html.match(/<p[^>]*><strong[^>]*>([^<]+)<\/strong>[^<]*<\/p>/i);

  if (strongFirstMatch) {
    excerpt = `${strongFirstMatch[1].replace(/<[^>]+>/g, '').substring(0, 160)}...`;
  } else if (introMatch) {
    excerpt = `${introMatch[1].replace(/<[^>]+>/g, '').substring(0, 160)}...`;
  } else if (firstPMatch) {
    excerpt = `${firstPMatch[1].replace(/<[^>]+>/g, '').substring(0, 160)}...`;
  } else {
    excerpt = "Profesjonell veiledning og ekspertråd fra Griffentreprenor";
  }

  // Determine category from services or content with better mapping
  const services = metaServicesMatch?.[1] || "";
  const contentLower = html.toLowerCase();
  let category = "Byggetips";

  if (services.toLowerCase().includes("bad") || services.toLowerCase().includes("våtrom") || contentLower.includes("våtrom") || contentLower.includes("baderom")) {
    category = "Våtrom";
  } else if (services.toLowerCase().includes("garasje") || title.toLowerCase().includes("byggetillatelse") || contentLower.includes("byggetillatelse") || contentLower.includes("søknad")) {
    category = "Byggetillatelser";
  } else if (services.toLowerCase().includes("renovering") || services.toLowerCase().includes("rehabilitering") || contentLower.includes("renovering") || contentLower.includes("rehabilitering")) {
    category = "Renovering";
  } else if (contentLower.includes("snekker") || services.toLowerCase().includes("snekker")) {
    category = "Snekkerarbeid";
  } else if (contentLower.includes("maling") || services.toLowerCase().includes("maling")) {
    category = "Malearbeid";
  } else if (contentLower.includes("isolering") || services.toLowerCase().includes("isolering")) {
    category = "Isolering";
  }

  // Estimate read time based on word count
  const wordCount = html.replace(/<[^>]+>/g, '').split(/\s+/).filter(word => word.length > 0).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min`;

  // Use current date for imported articles (could be improved to extract actual dates)
  const date = new Date().toISOString().split('T')[0];

  return {
    title,
    excerpt,
    category,
    readTime,
    date,
    image: findMatchingImage(fileName)
  };
}

// Get categories with counts
export function getBlogCategories(): BlogCategory[] {
  const posts = getAllBlogPosts();
  const categoryMap = new Map<string, number>();

  // Count all posts
  categoryMap.set("Alle artikler", posts.length);

  // Count by category
  for (const post of posts) {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  }

  const categories = [
    { name: "Alle artikler", count: categoryMap.get("Alle artikler") || 0, active: true }
  ];

  // Add other categories
  for (const [name, count] of categoryMap.entries()) {
    if (name !== "Alle artikler") {
      categories.push({ name, count, active: false });
    }
  }

  return categories;
}
