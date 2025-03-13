
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText, TrendingUp, BarChart, Download, Clock, Eye, Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample blog post data
const samplePosts = [
  {
    id: 1,
    title: 'Getting Started with Vendor Partnerships',
    excerpt: 'Learn how to build successful partnerships with vendors on our platform.',
    date: '2023-08-15',
    status: 'Published',
    seoScore: 92,
    views: 1250,
    shares: 48,
    comments: 17,
    avgReadTime: '3:42'
  },
  {
    id: 2,
    title: 'Top 10 Products for Summer 2023',
    excerpt: 'Discover the hottest products that customers are loving this summer.',
    date: '2023-07-22',
    status: 'Published',
    seoScore: 85,
    views: 2430,
    shares: 124,
    comments: 32,
    avgReadTime: '5:17'
  },
  {
    id: 3,
    title: 'Improving Your Product Listings',
    excerpt: 'Tips and tricks to optimize your product listings for better conversions.',
    date: '2023-06-30',
    status: 'Draft',
    seoScore: 78,
    views: 0,
    shares: 0,
    comments: 0,
    avgReadTime: '4:05'
  }
];

const BlogPostForm = ({ onClose, initialPost = null }: { onClose: () => void, initialPost?: any }) => {
  const { toast } = useToast();
  const [seoScoreFeedback, setSeoScoreFeedback] = useState({
    title: { score: 0, feedback: '' },
    description: { score: 0, feedback: '' },
    keywords: { score: 0, feedback: '' },
    content: { score: 0, feedback: '' },
  });
  
  const [title, setTitle] = useState(initialPost?.title || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [metaDescription, setMetaDescription] = useState(initialPost?.metaDescription || '');
  const [keywords, setKeywords] = useState(initialPost?.keywords || '');
  const [status, setStatus] = useState(initialPost?.status || 'Draft');
  const [category, setCategory] = useState(initialPost?.category || '');

  const updateSeoScores = () => {
    // Simple SEO scoring logic - this would be more sophisticated in a real implementation
    const titleScore = title.length > 10 && title.length < 70 ? 100 : 50;
    const descScore = metaDescription.length > 120 && metaDescription.length < 160 ? 100 : 60;
    const keywordsScore = keywords.split(',').length >= 3 ? 90 : 70;
    const contentScore = content.length > 300 ? 95 : 65;
    
    setSeoScoreFeedback({
      title: { 
        score: titleScore,
        feedback: titleScore < 100 ? 'Title should be between 10-70 characters for best SEO.' : 'Great title length!'
      },
      description: { 
        score: descScore,
        feedback: descScore < 100 ? 'Meta description should be 120-160 characters.' : 'Optimal meta description length!'
      },
      keywords: { 
        score: keywordsScore,
        feedback: keywordsScore < 90 ? 'Include at least 3 relevant keywords.' : 'Good keyword set!'
      },
      content: { 
        score: contentScore,
        feedback: contentScore < 95 ? 'Content should be at least 300 characters for better SEO.' : 'Content length is good for SEO!'
      }
    });
  };

  const handleSave = () => {
    toast({
      title: initialPost ? "Blog post updated" : "Blog post saved",
      description: initialPost 
        ? "Your blog post has been updated successfully." 
        : "Your blog post has been saved successfully."
    });
    onClose();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input 
              id="title" 
              placeholder="Enter blog post title" 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                updateSeoScores();
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guides">Guides</SelectItem>
                  <SelectItem value="products">Products</SelectItem>
                  <SelectItem value="vendors">Vendors</SelectItem>
                  <SelectItem value="tips">Tips & Tricks</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              rows={15} 
              placeholder="Write your blog post content here..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                updateSeoScores();
              }}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                SEO Settings
              </CardTitle>
              <CardDescription>
                Optimize your post for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  rows={3} 
                  placeholder="Brief description for search results"
                  value={metaDescription}
                  onChange={(e) => {
                    setMetaDescription(e.target.value);
                    updateSeoScores();
                  }}
                />
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>Recommended: 120-160 characters</span>
                  <span className={metaDescription.length > 160 ? "text-red-500" : ""}>
                    {metaDescription.length}/160
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Focus Keywords</Label>
                <Input 
                  id="keywords" 
                  placeholder="keyword1, keyword2, keyword3"
                  value={keywords}
                  onChange={(e) => {
                    setKeywords(e.target.value);
                    updateSeoScores();
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Separate keywords with commas
                </p>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label>SEO Score Analysis</Label>
                <div className="space-y-3">
                  <SeoScoreItem 
                    title="Title" 
                    score={seoScoreFeedback.title.score} 
                    feedback={seoScoreFeedback.title.feedback} 
                  />
                  <SeoScoreItem 
                    title="Meta Description" 
                    score={seoScoreFeedback.description.score} 
                    feedback={seoScoreFeedback.description.feedback} 
                  />
                  <SeoScoreItem 
                    title="Keywords" 
                    score={seoScoreFeedback.keywords.score} 
                    feedback={seoScoreFeedback.keywords.feedback} 
                  />
                  <SeoScoreItem 
                    title="Content" 
                    score={seoScoreFeedback.content.score} 
                    feedback={seoScoreFeedback.content.feedback} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Post</Button>
          </div>
        </div>
      </div>
    </>
  );
};

const SeoScoreItem = ({ 
  title, 
  score, 
  feedback 
}: { 
  title: string; 
  score: number; 
  feedback: string;
}) => {
  let colorClass = "bg-green-100 text-green-800";
  if (score < 70) colorClass = "bg-red-100 text-red-800";
  else if (score < 90) colorClass = "bg-yellow-100 text-yellow-800";

  return (
    <div className="flex items-start gap-2">
      <div className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
        {score}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{feedback}</p>
      </div>
    </div>
  );
};

const PerformanceMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-800 p-3 rounded-full mb-2">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">3,680</h3>
            <p className="text-sm text-muted-foreground">Total Views</p>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-violet-100 text-violet-800 p-3 rounded-full mb-2">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">172</h3>
            <p className="text-sm text-muted-foreground">Social Shares</p>
            <p className="text-xs text-green-600 mt-1">+8% from last month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 text-orange-800 p-3 rounded-full mb-2">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">85%</h3>
            <p className="text-sm text-muted-foreground">Avg. SEO Score</p>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 text-green-800 p-3 rounded-full mb-2">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">49</h3>
            <p className="text-sm text-muted-foreground">Comments</p>
            <p className="text-xs text-green-600 mt-1">+15% from last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewPerformanceOpen, setIsViewPerformanceOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    toast({
      title: "Blog post deleted",
      description: "The blog post has been deleted successfully."
    });
  };

  const filteredPosts = samplePosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Blog data is being exported as an Excel file.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Blog data has been exported successfully.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Create and manage blog posts with SEO optimization.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportToExcel}>
            <Download className="mr-2 h-4 w-4" /> Export to Excel
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>
                  Create a new blog post with SEO optimization.
                </DialogDescription>
              </DialogHeader>
              <BlogPostForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">All Posts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] divide-y md:divide-y-0 md:divide-x">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-semibold">{post.title}</h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            {post.excerpt}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center">
                          <FileText className="mr-1 h-4 w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          SEO Score: {post.seoScore}
                        </div>
                        {post.status === 'Published' && (
                          <>
                            <div className="flex items-center">
                              <Eye className="mr-1 h-4 w-4" />
                              {post.views} views
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {post.avgReadTime} read
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-6 flex md:flex-col md:items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:w-full"
                        onClick={() => {
                          setCurrentPost(post);
                          setIsViewPerformanceOpen(true);
                        }}
                      >
                        <BarChart className="mr-2 h-4 w-4" />
                        Performance
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 md:w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:w-full text-red-500 hover:text-red-500"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <PerformanceMetrics />
          
          <h2 className="text-xl font-semibold mt-8">Top Performing Posts</h2>
          <div className="grid grid-cols-1 gap-4">
            {samplePosts
              .filter(post => post.status === 'Published')
              .sort((a, b) => b.views - a.views)
              .map(post => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">{post.views}</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{post.shares}</p>
                          <p className="text-xs text-muted-foreground">Shares</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{post.comments}</p>
                          <p className="text-xs text-muted-foreground">Comments</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Performance Modal */}
      {currentPost && (
        <Dialog open={isViewPerformanceOpen} onOpenChange={setIsViewPerformanceOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Post Performance</DialogTitle>
              <DialogDescription>
                Performance metrics for "{currentPost.title}"
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Eye className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <h3 className="text-2xl font-bold">{currentPost.views}</h3>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Share2 className="h-6 w-6 mx-auto text-violet-600 mb-2" />
                  <h3 className="text-2xl font-bold">{currentPost.shares}</h3>
                  <p className="text-sm text-muted-foreground">Social Shares</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto text-orange-600 mb-2" />
                  <h3 className="text-2xl font-bold">{currentPost.seoScore}</h3>
                  <p className="text-sm text-muted-foreground">SEO Score</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <MessageSquare className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <h3 className="text-2xl font-bold">{currentPost.comments}</h3>
                  <p className="text-sm text-muted-foreground">Comments</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Reading Statistics</h3>
              <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                <span>Average read time:</span>
                <span className="font-medium">{currentPost.avgReadTime}</span>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setIsViewPerformanceOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BlogManagement;
