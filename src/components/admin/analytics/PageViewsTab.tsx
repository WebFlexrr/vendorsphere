
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock, Share2, MousePointer } from 'lucide-react';

const PageViewsTab = () => {
  // Mock data for page views
  const topPages = [
    { path: '/', title: 'Homepage', views: 24580, avgTime: '2:15', bounceRate: '32%' },
    { path: '/products/wireless-earbuds', title: 'Wireless Earbuds Pro', views: 15420, avgTime: '3:45', bounceRate: '22%' },
    { path: '/category/electronics', title: 'Electronics Category', views: 12840, avgTime: '2:30', bounceRate: '28%' },
    { path: '/products/smart-watch', title: 'Smart Watch', views: 9650, avgTime: '3:10', bounceRate: '25%' },
    { path: '/vendors/tech-innovations', title: 'Tech Innovations Vendor', views: 7830, avgTime: '2:55', bounceRate: '30%' },
    { path: '/category/fashion', title: 'Fashion Category', views: 6920, avgTime: '2:05', bounceRate: '35%' },
    { path: '/cart', title: 'Shopping Cart', views: 5240, avgTime: '4:20', bounceRate: '18%' },
    { path: '/checkout', title: 'Checkout Page', views: 3780, avgTime: '5:40', bounceRate: '12%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Total Page Views</div>
              <div className="bg-vsphere-primary/10 p-2 rounded-md">
                <Eye className="h-5 w-5 text-vsphere-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold">124,856</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              +12.4% <span className="ml-1">↑</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Avg. Time on Page</div>
              <div className="bg-vsphere-secondary/10 p-2 rounded-md">
                <Clock className="h-5 w-5 text-vsphere-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold">2:45</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              +0:15 <span className="ml-1">↑</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Bounce Rate</div>
              <div className="bg-vsphere-accent/10 p-2 rounded-md">
                <Share2 className="h-5 w-5 text-vsphere-dark" />
              </div>
            </div>
            <div className="text-3xl font-bold">28.5%</div>
            <div className="text-sm text-red-600 mt-1 flex items-center">
              +1.2% <span className="ml-1">↑</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Click-through Rate</div>
              <div className="bg-vsphere-mint/10 p-2 rounded-md">
                <MousePointer className="h-5 w-5 text-vsphere-dark" />
              </div>
            </div>
            <div className="text-3xl font-bold">6.8%</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              +0.5% <span className="ml-1">↑</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Page Views Trend</CardTitle>
          <Badge variant="outline" className="bg-vsphere-light/50">
            Last 30 days
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
            <div className="flex flex-col items-center text-gray-400">
              <Eye className="h-12 w-12 mb-2" />
              <p>Page views trend chart</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most Viewed Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2">Page</th>
                  <th className="text-right font-medium p-2">Views</th>
                  <th className="text-right font-medium p-2">Avg. Time</th>
                  <th className="text-right font-medium p-2">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-2">
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-gray-500">{page.path}</div>
                    </td>
                    <td className="p-2 text-right font-medium">{page.views.toLocaleString()}</td>
                    <td className="p-2 text-right">{page.avgTime}</td>
                    <td className="p-2 text-right">{page.bounceRate}</td>
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

export default PageViewsTab;
