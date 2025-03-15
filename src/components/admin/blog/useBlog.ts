
import { useState } from 'react';
import { BlogPost, initialBlogPosts } from './types';
import { useToast } from '@/hooks/use-toast';
import { exportToCSV } from '@/utils/exportUtils';

export function useBlog() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get filtered blog posts
  const getFilteredPosts = () => {
    return posts
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(post => categoryFilter === 'all' || post.category === categoryFilter)
      .filter(post => statusFilter === 'all' || post.status === statusFilter);
  };

  // Get published posts sorted by views
  const getTopPerformingPosts = () => {
    return [...posts]
      .filter(post => post.status === 'Published')
      .sort((a, b) => b.views - a.views);
  };

  // CRUD Operations
  const createPost = (postData: Omit<BlogPost, 'id' | 'views' | 'shares' | 'comments' | 'avgReadTime' | 'date'>) => {
    const newPost: BlogPost = {
      id: Math.max(0, ...posts.map(p => p.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      shares: 0, 
      comments: 0,
      avgReadTime: '0:00',
      ...postData
    };
    
    setPosts([newPost, ...posts]);
    
    toast({
      title: "Blog Post Created",
      description: "Your new blog post has been created successfully."
    });
    
    return newPost;
  };

  const updatePost = (id: number, postData: Partial<BlogPost>) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, ...postData } : post
    );
    
    setPosts(updatedPosts);
    
    toast({
      title: "Blog Post Updated",
      description: "Your blog post has been updated successfully."
    });
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    
    toast({
      title: "Blog Post Deleted",
      description: "The blog post has been deleted successfully."
    });
  };

  // Export blog posts to CSV
  const exportPosts = () => {
    toast({
      title: "Export Started",
      description: "Blog data is being prepared for download.",
    });
    
    try {
      // Format data for export if needed
      const dataToExport = posts.map(post => ({
        ID: post.id,
        Title: post.title,
        Excerpt: post.excerpt,
        Category: post.category,
        Status: post.status,
        Date: post.date,
        'SEO Score': post.seoScore,
        Views: post.views,
        Shares: post.shares,
        Comments: post.comments,
        'Avg. Read Time': post.avgReadTime
      }));
      
      // Export data as CSV
      exportToCSV(dataToExport, 'blog_posts_export');
      
      toast({
        title: "Export Complete",
        description: "Blog data has been exported successfully.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the blog data.",
        variant: "destructive"
      });
    }
  };

  // Get aggregated metrics
  const getAggregatedMetrics = () => {
    const publishedPosts = posts.filter(post => post.status === 'Published');
    
    return {
      totalViews: publishedPosts.reduce((sum, post) => sum + post.views, 0),
      totalShares: publishedPosts.reduce((sum, post) => sum + post.shares, 0),
      avgSeoScore: publishedPosts.length 
        ? Math.round(publishedPosts.reduce((sum, post) => sum + post.seoScore, 0) / publishedPosts.length) 
        : 0,
      totalComments: publishedPosts.reduce((sum, post) => sum + post.comments, 0)
    };
  };

  const filteredPosts = getFilteredPosts();
  const topPerformingPosts = getTopPerformingPosts();
  const metrics = getAggregatedMetrics();
  const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));

  return {
    posts,
    filteredPosts,
    topPerformingPosts,
    metrics,
    uniqueCategories,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    createPost,
    updatePost,
    deletePost,
    exportPosts
  };
}
