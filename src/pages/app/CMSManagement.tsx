
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { Download, FileText, LayoutTemplate, Pencil, Plus, Search, TrendingUp } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';

interface Page {
  id: number;
  title: string;
  slug: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  lastModified: string;
  author: string;
  template: string;
  seoData: {
    title: string;
    description: string;
    keywords: string;
    score: number;
  };
}

// Sample data for demonstration
const PAGES_DATA: Page[] = [
  {
    id: 1,
    title: 'Homepage',
    slug: '/',
    status: 'Published',
    lastModified: '2023-06-15',
    author: 'Admin',
    template: 'Home Template',
    seoData: {
      title: 'VendorSphere - Marketplace for Vendors',
      description: 'VendorSphere is the leading marketplace connecting vendors with customers worldwide.',
      keywords: 'marketplace, vendors, products, online shopping',
      score: 92
    }
  },
  {
    id: 2,
    title: 'About Us',
    slug: '/about',
    status: 'Published',
    lastModified: '2023-05-20',
    author: 'Admin',
    template: 'Content Template',
    seoData: {
      title: 'About VendorSphere - Our Story and Mission',
      description: 'Learn about VendorSphere, our mission, and the team behind the marketplace.',
      keywords: 'about, company, mission, team',
      score: 85
    }
  },
  {
    id: 3,
    title: 'Contact Us',
    slug: '/contact',
    status: 'Published',
    lastModified: '2023-05-22',
    author: 'Admin',
    template: 'Contact Template',
    seoData: {
      title: 'Contact VendorSphere - Get in Touch',
      description: 'Contact our team for support, partnership inquiries, or vendor applications.',
      keywords: 'contact, support, inquiries',
      score: 80
    }
  },
  {
    id: 4,
    title: 'Summer Sale Campaign',
    slug: '/campaigns/summer-sale',
    status: 'Scheduled',
    lastModified: '2023-06-18',
    author: 'Marketing Team',
    template: 'Campaign Template',
    seoData: {
      title: 'Summer Sale - Up to 70% Off on All Products',
      description: 'Huge summer discounts on all products. Limited time offer.',
      keywords: 'sale, discount, summer, offer',
      score: 95
    }
  },
  {
    id: 5,
    title: 'Vendor Application',
    slug: '/become-vendor',
    status: 'Draft',
    lastModified: '2023-06-10',
    author: 'Admin',
    template: 'Form Template',
    seoData: {
      title: 'Become a Vendor on VendorSphere - Apply Now',
      description: 'Apply to become a vendor on VendorSphere and reach millions of customers.',
      keywords: 'vendor, application, sell, marketplace',
      score: 75
    }
  }
];

interface SeoScoreItemProps {
  title: string;
  score: number;
  feedback: string;
}

const SeoScoreItem = ({ title, score, feedback }: SeoScoreItemProps) => {
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

const CMSManagement = () => {
  const [pages, setPages] = useState<Page[]>(PAGES_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isSeoSheetOpen, setIsSeoSheetOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setPages(PAGES_DATA);
      return;
    }

    const filtered = PAGES_DATA.filter(page => 
      page.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
      page.slug.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPages(filtered);
  };

  const exportPages = () => {
    const data = pages.map(page => ({
      ID: page.id,
      Title: page.title,
      Slug: page.slug,
      Status: page.status,
      'Last Modified': page.lastModified,
      Author: page.author,
      Template: page.template,
      'SEO Score': page.seoData.score
    }));
    
    exportToCSV(data, 'cms-pages');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LayoutTemplate className="h-7 w-7" />
          CMS Management
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={exportPages}>
            <Download className="h-4 w-4" />
            Export to CSV
          </Button>
          <Button className="gap-2 bg-vsphere-primary hover:bg-vsphere-primary/90">
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        </div>
      </div>
      
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search pages..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pages ({pages.length})</CardTitle>
          <CardDescription>Manage website pages and content</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>SEO Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map(page => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>{page.slug}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        page.status === 'Published' ? 'bg-green-100 text-green-800' : 
                        page.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {page.status}
                    </span>
                  </TableCell>
                  <TableCell>{page.lastModified}</TableCell>
                  <TableCell>{page.template}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        page.seoData.score >= 90 ? 'bg-green-100 text-green-800' : 
                        page.seoData.score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {page.seoData.score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => {
                          setSelectedPage(page);
                          setEditMode(true);
                        }}
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => {
                          setSelectedPage(page);
                          setIsSeoSheetOpen(true);
                        }}
                      >
                        <TrendingUp className="h-3 w-3" />
                        SEO
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {editMode && selectedPage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Edit Page: {selectedPage.title}
            </CardTitle>
            <CardDescription>
              Last modified: {selectedPage.lastModified} by {selectedPage.author}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Page Title</label>
                  <Input defaultValue={selectedPage.title} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea 
                    rows={10}
                    placeholder="Enter page content here..."
                    defaultValue="This is a sample content for the page. In a real implementation, this would be a rich text editor or a page builder component."
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input defaultValue={selectedPage.slug} />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="draft" selected={selectedPage.status === 'Draft'}>Draft</option>
                      <option value="published" selected={selectedPage.status === 'Published'}>Published</option>
                      <option value="scheduled" selected={selectedPage.status === 'Scheduled'}>Scheduled</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Template</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="home" selected={selectedPage.template === 'Home Template'}>Home Template</option>
                      <option value="content" selected={selectedPage.template === 'Content Template'}>Content Template</option>
                      <option value="contact" selected={selectedPage.template === 'Contact Template'}>Contact Template</option>
                      <option value="campaign" selected={selectedPage.template === 'Campaign Template'}>Campaign Template</option>
                      <option value="form" selected={selectedPage.template === 'Form Template'}>Form Template</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Author</label>
                    <Input defaultValue={selectedPage.author} readOnly />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                  <Button>Save Settings</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SEO Title</label>
                    <Input defaultValue={selectedPage.seoData.title} />
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 50-60 characters | Current: {selectedPage.seoData.title.length} characters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Description</label>
                    <Textarea defaultValue={selectedPage.seoData.description} />
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 150-160 characters | Current: {selectedPage.seoData.description.length} characters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Keywords</label>
                    <Input defaultValue={selectedPage.seoData.keywords} />
                    <p className="text-xs text-muted-foreground">
                      Separate keywords with commas
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">SEO Score: {selectedPage.seoData.score}%</p>
                    <div className="space-y-2 mt-2">
                      <SeoScoreItem
                        title="Title"
                        score={95}
                        feedback="Great length and includes target keywords"
                      />
                      <SeoScoreItem
                        title="Meta Description"
                        score={85}
                        feedback="Good description but could include more keywords"
                      />
                      <SeoScoreItem
                        title="Keywords"
                        score={90}
                        feedback="Good keyword density and relevance"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                  <Button>Save SEO Settings</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
      
      <Sheet open={isSeoSheetOpen} onOpenChange={setIsSeoSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              SEO Analysis
            </SheetTitle>
            <SheetDescription>
              {selectedPage?.title} ({selectedPage?.slug})
            </SheetDescription>
          </SheetHeader>
          
          {selectedPage && (
            <div className="py-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">SEO Score: {selectedPage.seoData.score}%</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      selectedPage.seoData.score >= 90 ? 'bg-green-600' : 
                      selectedPage.seoData.score >= 70 ? 'bg-yellow-500' : 
                      'bg-red-600'
                    }`} 
                    style={{ width: `${selectedPage.seoData.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">SEO Title</h4>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    {selectedPage.seoData.title}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Length: {selectedPage.seoData.title.length} characters</span>
                    <span className={selectedPage.seoData.title.length > 60 ? "text-red-500" : "text-green-600"}>
                      Recommended: 50-60 characters
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Meta Description</h4>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    {selectedPage.seoData.description}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Length: {selectedPage.seoData.description.length} characters</span>
                    <span className={selectedPage.seoData.description.length > 160 ? "text-red-500" : "text-green-600"}>
                      Recommended: 150-160 characters
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedPage.seoData.keywords.split(',').map((keyword, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {keyword.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Detailed Analysis</h4>
                <div className="space-y-3">
                  <SeoScoreItem
                    title="Title Tag"
                    score={95}
                    feedback="Great length and includes target keywords"
                  />
                  <SeoScoreItem
                    title="Meta Description"
                    score={85}
                    feedback="Good description but could include more keywords"
                  />
                  <SeoScoreItem
                    title="Keywords"
                    score={90}
                    feedback="Good keyword density and relevance"
                  />
                  <SeoScoreItem
                    title="URL Structure"
                    score={100}
                    feedback="Clean URL with relevant keywords"
                  />
                  <SeoScoreItem
                    title="Content Quality"
                    score={80}
                    feedback="Content could be more comprehensive"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    setIsSeoSheetOpen(false);
                    setSelectedPage(selectedPage);
                    setEditMode(true);
                  }}
                  className="w-full"
                >
                  Edit SEO Settings
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CMSManagement;
