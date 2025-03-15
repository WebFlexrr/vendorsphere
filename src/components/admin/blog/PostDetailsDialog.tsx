
import React from 'react';
import { Eye, Share2, TrendingUp, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from './types';

interface PostDetailsDialogProps {
  post: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostDetailsDialog = ({ post, open, onOpenChange }: PostDetailsDialogProps) => {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Post Performance</DialogTitle>
          <DialogDescription>
            Performance metrics for "{post.title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Eye className="h-6 w-6 mx-auto text-blue-600 mb-2" />
              <h3 className="text-2xl font-bold">{post.views}</h3>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Share2 className="h-6 w-6 mx-auto text-violet-600 mb-2" />
              <h3 className="text-2xl font-bold">{post.shares}</h3>
              <p className="text-sm text-muted-foreground">Social Shares</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="h-6 w-6 mx-auto text-orange-600 mb-2" />
              <h3 className="text-2xl font-bold">{post.seoScore}</h3>
              <p className="text-sm text-muted-foreground">SEO Score</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <MessageSquare className="h-6 w-6 mx-auto text-green-600 mb-2" />
              <h3 className="text-2xl font-bold">{post.comments}</h3>
              <p className="text-sm text-muted-foreground">Comments</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Reading Statistics</h3>
          <div className="flex items-center justify-between bg-muted p-3 rounded-md">
            <span>Average read time:</span>
            <span className="font-medium">{post.avgReadTime}</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsDialog;
