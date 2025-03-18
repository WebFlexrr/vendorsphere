import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package, Search, Plus, Filter, Eye, Edit, Trash, Download } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ProductModal from './ProductModal';
import DownloadCSVButton from './DownloadCSVButton';

// Sample product data
const products = [
  {
    id: 'PROD-001',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    vendor: 'TechAudio Inc.',
    price: 79.99,
    stock: 156,
    status: 'Active',
  },
  {
    id: 'PROD-002',
    name: 'Smart Watch Pro',
    category: 'Electronics',
    vendor: 'TimeTech',
    price: 199.99,
    stock: 42,
    status: 'Active',
  },
  {
    id: 'PROD-003',
    name: 'Organic Shampoo',
    category: 'Beauty',
    vendor: 'Natural Essentials',
    price: 12.99,
    stock: 230,
    status: 'Active',
  },
  {
    id: 'PROD-004',
    name: 'Cotton T-Shirt',
    category: 'Apparel',
    vendor: 'Fashion Basics',
    price: 24.99,
    stock: 189,
    status: 'Active',
  },
  {
    id: 'PROD-005',
    name: 'Fitness Tracker',
    category: 'Electronics',
    vendor: 'FitTech',
    price: 49.99,
    stock: 78,
    status: 'Active',
  },
  {
    id: 'PROD-006',
    name: 'Coffee Maker',
    category: 'Home',
    vendor: 'Kitchen Essentials',
    price: 89.99,
    stock: 32,
    status: 'Active',
  },
  {
    id: 'PROD-007',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    vendor: 'SoundWave',
    price: 59.99,
    stock: 65,
    status: 'Active',
  },
  {
    id: 'PROD-008',
    name: 'Yoga Mat',
    category: 'Fitness',
    vendor: 'Wellness Co.',
    price: 29.99,
    stock: 110,
    status: 'Active',
  },
  {
    id: 'PROD-009',
    name: 'Leather Wallet',
    category: 'Accessories',
    vendor: 'LeatherCraft',
    price: 39.99,
    stock: 85,
    status: 'Active',
  },
  {
    id: 'PROD-010',
    name: 'Smart Bulb',
    category: 'Home',
    vendor: 'SmartLiving',
    price: 19.99,
    stock: 0,
    status: 'Out of Stock',
  },
];

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex items-center gap-2">
          <DownloadCSVButton 
            data={products} 
            filename="product-inventory" 
            label="Export Products"
          />
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
        <ToggleGroup type="single" defaultValue="all">
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="active">Active</ToggleGroupItem>
          <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
          <ToggleGroupItem value="archived">Archived</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Tabs defaultValue="all-products">
        <TabsList>
          <TabsTrigger value="all-products">All Products</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
        </TabsList>
        <TabsContent value="all-products">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5" />
                All Products
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.vendor}</TableCell>
                        <TableCell className="text-right">
                          ${product.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="out-of-stock">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5" />
                Out of Stock Products
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((product) => product.status === 'Out of Stock')
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.vendor}</TableCell>
                          <TableCell className="text-right">
                            ${product.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">{product.stock}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{product.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="low-stock">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5" />
                Low Stock Products
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((product) => product.stock < 50 && product.status !== 'Out of Stock')
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.vendor}</TableCell>
                          <TableCell className="text-right">
                            ${product.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">{product.stock}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProductModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default ProductManagement;
