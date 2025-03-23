
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText, TrendingUp, BarChart, Download, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BlogPost } from '../../components/admin/blog/types';
import { useBlog } from '../../components/admin/blog/useBlog';
import BlogPostForm from '../../components/admin/blog/BlogPostForm';
import PerformanceMetrics from '../../components/admin/blog/PerformanceMetrics';
import PostDetailsDialog from '../../components/admin/blog/PostDetailsDialog';

const BlogManagement = () => {
  const { 
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
  } = useBlog();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const handleCreatePost = (postData: Partial<BlogPost>) => {
    createPost(postData as Omit<BlogPost, 'id' | 'views' | 'shares' | 'comments' | 'avgReadTime' | 'date'>);
    setIsCreateDialogOpen(false);
  };

  const handleUpdatePost = (postData: Partial<BlogPost>) => {
    if (currentPost) {
      updatePost(currentPost.id, postData);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteClick = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentPost) {
      deletePost(currentPost.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleViewDetails = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDetailsDialogOpen(true);
  };

  const handleEditClick = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditDialogOpen(true);
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
          <Button variant="outline" onClick={exportPosts}>
            <Download className="mr-2 h-4 w-4" /> Export to CSV
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
              <BlogPostForm 
                onSave={handleCreatePost} 
                onCancel={() => setIsCreateDialogOpen(false)} 
              />
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
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
                          post.status === 'Published' ? 'bg-green-100 text-green-800' : 
                          post.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
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
                        onClick={() => handleViewDetails(post)}
                      >
                        <BarChart className="mr-2 h-4 w-4" />
                        Performance
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:w-full"
                        onClick={() => handleEditClick(post)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:w-full text-red-500 hover:text-red-500"
                        onClick={() => handleDeleteClick(post)}
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
          <PerformanceMetrics metrics={metrics} />
          
          <h2 className="text-xl font-semibold mt-8">Top Performing Posts</h2>
          <div className="grid grid-cols-1 gap-4">
            {topPerformingPosts.map(post => (
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
      
      {/* Performance Details Modal */}
      <PostDetailsDialog 
        post={currentPost} 
        open={isDetailsDialogOpen} 
        onOpenChange={setIsDetailsDialogOpen} 
      />
      
      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update your blog post details and content.
            </DialogDescription>
          </DialogHeader>
          <BlogPostForm 
            initialPost={currentPost} 
            onSave={handleUpdatePost} 
            onCancel={() => setIsEditDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              "{currentPost?.title}" and remove it from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogManagement;
