
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  seoScore: number;
  views: number;
  shares: number;
  comments: number;
  avgReadTime: string;
  category: string;
  metaDescription: string;
  keywords: string;
}

export const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Vendor Partnerships',
    excerpt: 'Learn how to build successful partnerships with vendors on our platform.',
    content: 'This is a comprehensive guide on building successful partnerships with vendors...',
    date: '2023-08-15',
    status: 'Published',
    seoScore: 92,
    views: 1250,
    shares: 48,
    comments: 17,
    avgReadTime: '3:42',
    category: 'vendors',
    metaDescription: 'Discover the best practices for building vendor partnerships on our marketplace platform.',
    keywords: 'vendors, partnerships, marketplace, success'
  },
  {
    id: 2,
    title: 'Top 10 Products for Summer 2023',
    excerpt: 'Discover the hottest products that customers are loving this summer.',
    content: 'Summer is in full swing, and customers are flocking to these top products...',
    date: '2023-07-22',
    status: 'Published',
    seoScore: 85,
    views: 2430,
    shares: 124,
    comments: 32,
    avgReadTime: '5:17',
    category: 'products',
    metaDescription: 'Check out the 10 most popular products for summer 2023 in our marketplace.',
    keywords: 'summer products, trending, marketplace, 2023'
  },
  {
    id: 3,
    title: 'Improving Your Product Listings',
    excerpt: 'Tips and tricks to optimize your product listings for better conversions.',
    content: 'Your product listings are the digital equivalent of a storefront display...',
    date: '2023-06-30',
    status: 'Draft',
    seoScore: 78,
    views: 0,
    shares: 0,
    comments: 0,
    avgReadTime: '4:05',
    category: 'tips',
    metaDescription: 'Learn how to optimize your product listings to increase conversions and sales.',
    keywords: 'product listings, optimization, conversion, tips'
  }
];
