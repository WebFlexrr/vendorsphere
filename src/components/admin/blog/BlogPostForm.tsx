import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BlogPost } from './types';

interface SeoScoreItem {
  title: string;
  score: number;
  feedback: string;
}

const SeoScoreItem = ({ title, score, feedback }: SeoScoreItem) => {
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

interface BlogPostFormProps {
  initialPost?: BlogPost | null;
  onSave: (postData: Partial<BlogPost>) => void;
  onCancel: () => void;
}

const BlogPostForm = ({ initialPost, onSave, onCancel }: BlogPostFormProps) => {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [metaDescription, setMetaDescription] = useState(initialPost?.metaDescription || '');
  const [keywords, setKeywords] = useState(initialPost?.keywords || '');
  const [status, setStatus] = useState<'Draft' | 'Published' | 'Scheduled'>(
    initialPost?.status || 'Draft'
  );
  const [category, setCategory] = useState(initialPost?.category || '');
  const [seoScoreFeedback, setSeoScoreFeedback] = useState({
    title: { score: 0, feedback: '' },
    description: { score: 0, feedback: '' },
    keywords: { score: 0, feedback: '' },
    content: { score: 0, feedback: '' },
  });

  useEffect(() => {
    updateSeoScores();
  }, [title, metaDescription, keywords, content]);

  const updateSeoScores = () => {
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

  const calculateOverallSeoScore = () => {
    const { title, description, keywords, content } = seoScoreFeedback;
    return Math.round((title.score + description.score + keywords.score + content.score) / 4);
  };

  const handleSave = () => {
    onSave({
      title,
      excerpt,
      content,
      metaDescription,
      keywords,
      status,
      category,
      seoScore: calculateOverallSeoScore()
    });
  };

  const handleStatusChange = (value: string) => {
    if (value === 'Draft' || value === 'Published' || value === 'Scheduled') {
      setStatus(value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Post Title</Label>
          <Input 
            id="title" 
            placeholder="Enter blog post title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Post Excerpt</Label>
          <Textarea 
            id="excerpt" 
            rows={2} 
            placeholder="Brief summary of the post (shown in listings)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
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
            <Select value={status} onValueChange={handleStatusChange}>
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
            onChange={(e) => setContent(e.target.value)}
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
                onChange={(e) => setMetaDescription(e.target.value)}
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
                onChange={(e) => setKeywords(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separate keywords with commas
              </p>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label>SEO Score Analysis: {calculateOverallSeoScore()}%</Label>
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
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Post</Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;
