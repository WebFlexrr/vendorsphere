
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

const ProductFrequencyTab = () => {
  // Mock data for product frequency
  const frequentlyPurchasedProducts = [
    { id: 1, name: 'Wireless Earbuds Pro', category: 'Electronics', frequency: 4.2, trend: 'up', change: '+0.3' },
    { id: 2, name: 'Organic Coffee Beans', category: 'Food & Beverage', frequency: 3.8, trend: 'up', change: '+0.5' },
    { id: 3, name: 'Leather Wallet', category: 'Fashion', frequency: 2.7, trend: 'down', change: '-0.2' },
    { id: 4, name: 'Smart Watch', category: 'Electronics', frequency: 2.5, trend: 'up', change: '+0.1' },
    { id: 5, name: 'Yoga Mat', category: 'Sports', frequency: 2.3, trend: 'up', change: '+0.4' },
    { id: 6, name: 'Hand Cream', category: 'Beauty', frequency: 2.1, trend: 'down', change: '-0.1' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Product Purchase Frequency</CardTitle>
            <Badge variant="outline" className="bg-vsphere-light/50">
              Average purchases per customer
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
              <div className="flex flex-col items-center text-gray-400">
                <ShoppingBag className="h-12 w-12 mb-2" />
                <p>Product frequency chart visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequency Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-vsphere-primary/10 p-4 rounded-md">
                <div className="font-medium text-vsphere-primary mb-1">Top reorder rate</div>
                <div className="text-2xl font-bold">4.2x</div>
                <div className="text-sm text-gray-500">Average purchase frequency for top product</div>
              </div>
              
              <div className="bg-vsphere-secondary/10 p-4 rounded-md">
                <div className="font-medium text-vsphere-secondary mb-1">Average frequency</div>
                <div className="text-2xl font-bold">2.8x</div>
                <div className="text-sm text-gray-500">Across all products</div>
              </div>
              
              <div className="bg-vsphere-accent/10 p-4 rounded-md">
                <div className="font-medium text-vsphere-dark mb-1">Repurchase window</div>
                <div className="text-2xl font-bold">31 days</div>
                <div className="text-sm text-gray-500">Average time between purchases</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most Frequently Purchased Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2">Product</th>
                  <th className="text-left font-medium p-2">Category</th>
                  <th className="text-right font-medium p-2">Frequency</th>
                  <th className="text-right font-medium p-2">Change</th>
                </tr>
              </thead>
              <tbody>
                {frequentlyPurchasedProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-2">{product.name}</td>
                    <td className="p-2 text-gray-500">{product.category}</td>
                    <td className="p-2 text-right font-medium">{product.frequency}x</td>
                    <td className="p-2 text-right">
                      <span className={`inline-flex items-center ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {product.change}
                        {product.trend === 'up' && <ArrowUpRight className="h-3 w-3 ml-1" />}
                        {product.trend !== 'up' && <span className="rotate-90 inline-block ml-1">↓</span>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFrequencyTab;
