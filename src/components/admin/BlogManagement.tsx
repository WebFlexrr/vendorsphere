
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Sample blog post data
const samplePosts = [
  {
    id: 1,
    title: 'Getting Started with Vendor Partnerships',
    excerpt: 'Learn how to build successful partnerships with vendors on our platform.',
    date: '2023-08-15',
    status: 'Published',
    seoScore: 92
  },
  {
    id: 2,
    title: 'Top 10 Products for Summer 2023',
    excerpt: 'Discover the hottest products that customers are loving this summer.',
    date: '2023-07-22',
    status: 'Published',
    seoScore: 85
  },
  {
    id: 3,
    title: 'Improving Your Product Listings',
    excerpt: 'Tips and tricks to optimize your product listings for better conversions.',
    date: '2023-06-30',
    status: 'Draft',
    seoScore: 78
  }
];

const BlogPostForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [seoScoreFeedback, setSeoScoreFeedback] = useState({
    title: { score: 0, feedback: '' },
    description: { score: 0, feedback: '' },
    keywords: { score: 0, feedback: '' },
    content: { score: 0, feedback: '' },
  });
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');

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
      title: "Blog post saved",
      description: "Your blog post has been saved successfully."
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

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Create and manage blog posts with SEO optimization.
          </p>
        </div>
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
                  <div className="mt-4 flex items-center text-sm text-muted-foreground gap-4">
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      SEO Score: {post.seoScore}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex md:flex-col md:items-center gap-2">
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
    </div>
  );
};

export default BlogManagement;
