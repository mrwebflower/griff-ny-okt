export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  isImported?: boolean;
}

export interface BlogCategory {
  name: string;
  count: number;
  active: boolean;
}
