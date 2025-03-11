
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Search, Plus, Edit, Trash2, Filter, ArrowUpDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ProductManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock product data
  const products = [
    { id: 1, name: 'Artisan Coffee Mug', category: 'Home', vendor: 'Artisan Crafts', price: 24.99, stock: 45, status: 'Active' },
    { id: 2, name: 'Wireless Earbuds Pro', category: 'Electronics', vendor: 'Tech Universe', price: 79.99, stock: 12, status: 'Active' },
    { id: 3, name: 'Leather Wallet', category: 'Fashion', vendor: 'Fashion Forward', price: 49.99, stock: 28, status: 'Active' },
    { id: 4, name: 'Scented Candle Set', category: 'Home', vendor: 'Home Elegance', price: 34.99, stock: 0, status: 'Out of stock' },
    { id: 5, name: 'Facial Serum', category: 'Beauty', vendor: 'Beauty Essentials', price: 29.99, stock: 5, status: 'Low stock' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button className="bg-vsphere-primary text-white hover:bg-vsphere-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-4 sm:grid-cols-4">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="low">Low Stock</TabsTrigger>
            <TabsTrigger value="out">Out of Stock</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>All Products ({products.length})</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-3.5 w-3.5 mr-2" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-3.5 w-3.5 mr-2" /> Sort
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left">Product</th>
                      <th className="py-3 text-left">Category</th>
                      <th className="py-3 text-left">Vendor</th>
                      <th className="py-3 text-right">Price</th>
                      <th className="py-3 text-right">Stock</th>
                      <th className="py-3 text-center">Status</th>
                      <th className="py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 flex items-center gap-2">
                          <div className="bg-vsphere-light/50 p-1.5 rounded">
                            <Package className="h-4 w-4 text-vsphere-primary" />
                          </div>
                          <span>{product.name}</span>
                        </td>
                        <td className="py-3">{product.category}</td>
                        <td className="py-3">{product.vendor}</td>
                        <td className="py-3 text-right">${product.price}</td>
                        <td className="py-3 text-right">{product.stock}</td>
                        <td className="py-3 text-center">
                          <Badge className={`
                            ${product.status === 'Active' ? 'bg-green-100 text-green-700' : ''}
                            ${product.status === 'Low stock' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${product.status === 'Out of stock' ? 'bg-red-100 text-red-700' : ''}
                          `}>
                            {product.status}
                          </Badge>
                        </td>
                        <td className="py-3 flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardContent>
              <p className="py-4 text-gray-500">Active products would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="low">
          <Card>
            <CardContent>
              <p className="py-4 text-gray-500">Low stock products would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="out">
          <Card>
            <CardContent>
              <p className="py-4 text-gray-500">Out of stock products would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManagement;
