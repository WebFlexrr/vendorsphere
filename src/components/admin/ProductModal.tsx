
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Package, Save, X, FileText, Tag, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { productSchema } from '@/schemas/product';

export type Product = {
  id: number;
  name: string;
  category: string;
  vendor: string;
  price: number;
  stock: number;
  status: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoScore?: number;
};

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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

const ProductModal = ({ isOpen, onClose, product, onSave }: ProductModalProps) => {



  const { toast } = useToast();
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Date.now(),
      name: '',
      category: '',
      vendor: '',
      price: 0,
      stock: 0,
      status: 'Active',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      seoScore: 0,
    }
  );



  const [seoScoreFeedback, setSeoScoreFeedback] = useState({
    title: { score: 0, feedback: '' },
    description: { score: 0, feedback: '' },
    keywords: { score: 0, feedback: '' },
  });

  useEffect(() => {
    updateSeoScores();
  }, [formData.seoTitle, formData.seoDescription, formData.seoKeywords]);

  const updateSeoScores = () => {
    const titleScore = formData.seoTitle && formData.seoTitle.length > 10 && formData.seoTitle.length < 70 ? 100 : 50;
    const descScore = formData.seoDescription && formData.seoDescription.length > 120 && formData.seoDescription.length < 160 ? 100 : 60;
    const keywordsScore = formData.seoKeywords && formData.seoKeywords.split(',').length >= 3 ? 90 : 70;

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
      }
    });
  };

  const calculateOverallSeoScore = () => {
    const { title, description, keywords } = seoScoreFeedback;
    return Math.round((title.score + description.score + keywords.score) / 3);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validate form
  //   if (!formData.name || !formData.category || !formData.vendor) {
  //     toast({
  //       title: "Validation Error",
  //       description: "Please fill in all required fields.",
  //       variant: "destructive"
  //     });
  //     return;
  //   }

  //   // Update status based on stock
  //   const status = formData.stock === 0 ? 'Out of stock' : formData.stock < 10 ? 'Low stock' : 'Active';

  //   // Calculate SEO score
  //   const seoScore = calculateOverallSeoScore();

  //   // Save the product with updated status and SEO score
  //   onSave({ ...formData, status, seoScore });

  //   toast({
  //     title: product ? "Product Updated" : "Product Created",
  //     description: `${formData.name} has been successfully ${product ? 'updated' : 'added'}.`,
  //   });

  //   onClose();
  // };

  // 1. Define your form.
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),

  })

  const { watch } = form

  const seoTitleCount = watch("seoTitle")
  const seoDescriptionCount = watch("seoDescription")


  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)


    // Validate form
    if (!formData.name || !formData.category || !formData.vendor) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Update status based on stock
    const status = formData.stock === 0 ? 'Out of stock' : formData.stock < 10 ? 'Low stock' : 'Active';

    // Calculate SEO score
    const seoScore = calculateOverallSeoScore();

    // Save the product with updated status and SEO score
    onSave({ ...formData, status, seoScore });

    toast({
      title: product ? "Product Updated" : "Product Created",
      description: `${formData.name} has been successfully ${product ? 'updated' : 'added'}.`,
    });

    onClose();



  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">

                        <FormLabel className="text-right">Name</FormLabel>
                        <FormControl className="col-span-3">
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>

                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">

                        <FormLabel className="text-right">Category</FormLabel>
                        <FormControl className="col-span-3">
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>

                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">

                        <FormLabel className="text-right">Vendor</FormLabel>
                        <FormControl className="col-span-3">
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>

                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">

                        <FormLabel className="text-right">Price</FormLabel>
                        <FormControl className="col-span-3">
                          <Input type="number" placeholder="shadcn" {...field} />
                        </FormControl>

                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">

                        <FormLabel className="text-right">Stock</FormLabel>
                        <FormControl className="col-span-3">
                          <Input type="number" placeholder="shadcn" {...field} />
                        </FormControl>

                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      SEO Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">

                      <FormField
                        control={form.control}
                        name="seoTitle"
                        render={({ field }) => (
                          <FormItem>


                            <FormLabel className=" flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="seoTitle">SEO Title</Label></FormLabel>
                            <FormControl>
                              <Input placeholder="Optimized title for search engines" {...field} />
                            </FormControl>


                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>Recommended: 10-70 characters</span>
                        {/* <span className={(formData.seoTitle?.length || 0) > 70 ? "text-red-500" : ""}>
                        {formData.seoTitle?.length || 0}/70
                      </span> */}
                        <span className={(seoTitleCount?.length || 0) > 70 ? "text-red-500" : ""}>
                          {seoTitleCount?.length || 0}/70
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">

                      <FormField
                        control={form.control}
                        name="seoDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className=" flex items-center gap-2"> <FileText className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="seoDescription">Meta Description</Label></FormLabel>
                            <FormControl>
                              <Textarea placeholder="Brief description for search results" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>Recommended: 120-160 characters</span>
                        <span className={(seoDescriptionCount?.length || 0) > 160 ? "text-red-500" : ""}>
                          {seoDescriptionCount?.length || 0}/160
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">

                      <FormField
                        control={form.control}
                        name="seoKeywords"
                        render={({ field }) => (
                          <FormItem>


                            <FormLabel className=" flex items-center gap-2"><Tag className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="seoKeywords">Focus Keywords</Label></FormLabel>
                            <FormControl>
                              <Input placeholder="Optimized title for search engines" {...field} />
                            </FormControl>


                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate keywords with commas
                      </p>
                    </div>

                    {(formData.seoTitle || formData.seoDescription || formData.seoKeywords) && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">SEO Score: {calculateOverallSeoScore()}%</p>
                        <div className="space-y-2">
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
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

            </div>


            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} className="gap-1">
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button type="submit" className="gap-1 bg-vsphere-primary hover:bg-vsphere-primary/90">
                <Save className="h-4 w-4" /> Save Product
              </Button>
            </DialogFooter>
          </form>
        </Form>

        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vendor" className="text-right">Vendor</Label>
                <Input
                  id="vendor"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    SEO Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="seoTitle">SEO Title</Label>
                    </div>
                    <Input
                      id="seoTitle"
                      name="seoTitle"
                      placeholder="Optimized title for search engines"
                      value={formData.seoTitle || ''}
                      onChange={handleChange}
                    />
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>Recommended: 10-70 characters</span>
                      <span className={(formData.seoTitle?.length || 0) > 70 ? "text-red-500" : ""}>
                        {formData.seoTitle?.length || 0}/70
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="seoDescription">Meta Description</Label>
                    </div>
                    <Textarea
                      id="seoDescription"
                      name="seoDescription"
                      rows={3}
                      placeholder="Brief description for search results"
                      value={formData.seoDescription || ''}
                      onChange={handleChange}
                    />
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>Recommended: 120-160 characters</span>
                      <span className={(formData.seoDescription?.length || 0) > 160 ? "text-red-500" : ""}>
                        {formData.seoDescription?.length || 0}/160
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="seoKeywords">Focus Keywords</Label>
                    </div>
                    <Input
                      id="seoKeywords"
                      name="seoKeywords"
                      placeholder="keyword1, keyword2, keyword3"
                      value={formData.seoKeywords || ''}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate keywords with commas
                    </p>
                  </div>
                  
                  {(formData.seoTitle || formData.seoDescription || formData.seoKeywords) && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium">SEO Score: {calculateOverallSeoScore()}%</p>
                      <div className="space-y-2">
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
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="gap-1">
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button type="submit" className="gap-1 bg-vsphere-primary hover:bg-vsphere-primary/90">
              <Save className="h-4 w-4" /> Save Product
            </Button>
          </DialogFooter>
        </form> */}
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
