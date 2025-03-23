
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Download,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ProductFrequencyTab from '../../components/admin/analytics/ProductFrequencyTab';
import RetentionTab from '../../components/admin/analytics/RetentionTab';
import PageViewsTab from '../../components/admin/analytics/PageViewsTab';
import MetricsOverview from '../../components/admin/analytics/MetricsOverview';
import OverviewCharts from '../../components/admin/analytics/OverviewCharts';

const Analytics = () => {
  // Mock analytics data - fixed the trend type to use the union type 'up' | 'down'
  const periodMetrics = [
    { title: 'Total Revenue', value: '$24,345', change: '+12.5%', trend: 'up' as const, icon: DollarSign, color: 'bg-vsphere-primary/10', iconColor: 'text-vsphere-primary' },
    { title: 'Orders', value: '342', change: '+8.2%', trend: 'up' as const, icon: ShoppingCart, color: 'bg-vsphere-secondary/10', iconColor: 'text-vsphere-secondary' },
    { title: 'Customers', value: '2,451', change: '+15.3%', trend: 'up' as const, icon: Users, color: 'bg-vsphere-mint/20', iconColor: 'text-vsphere-dark' },
    { title: 'Conversion Rate', value: '3.6%', change: '-0.8%', trend: 'down' as const, icon: TrendingUp, color: 'bg-vsphere-accent/10', iconColor: 'text-vsphere-dark' },
  ];

  // Mock top products
  const topProducts = [
    { name: 'Wireless Earbuds Pro', category: 'Electronics', sales: 156, revenue: 12480 },
    { name: 'Leather Wallet', category: 'Fashion', sales: 142, revenue: 7100 },
    { name: 'Artisan Coffee Mug', category: 'Home', sales: 135, revenue: 3375 },
    { name: 'Smart Watch', category: 'Electronics', sales: 98, revenue: 9800 },
    { name: 'Organic Face Cream', category: 'Beauty', sales: 87, revenue: 2610 },
  ];

  // Mock traffic sources
  const trafficSources = [
    { source: 'Direct', visitors: 4250, percentage: 35 },
    { source: 'Organic Search', visitors: 3120, percentage: 25 },
    { source: 'Social Media', visitors: 2480, percentage: 20 },
    { source: 'Email', visitors: 1240, percentage: 10 },
    { source: 'Referral', visitors: 1240, percentage: 10 },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs md:text-sm">
            <Download className="h-3 w-3 md:h-4 md:w-4" /> 
            <span className="hidden xs:inline">Export Report</span>
          </Button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex justify-between items-center">
        <Tabs defaultValue="30days" className="w-full">
          <TabsList className="grid w-full max-w-full sm:max-w-[400px] grid-cols-4">
            <TabsTrigger value="7days" className="text-xs md:text-sm">7 Days</TabsTrigger>
            <TabsTrigger value="30days" className="text-xs md:text-sm">30 Days</TabsTrigger>
            <TabsTrigger value="quarter" className="text-xs md:text-sm">Quarter</TabsTrigger>
            <TabsTrigger value="year" className="text-xs md:text-sm">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Metrics Overview Cards */}
      <MetricsOverview metrics={periodMetrics} />

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="mt-4 md:mt-6">
        <TabsList className="w-full max-w-full md:max-w-[600px] overflow-x-auto flex whitespace-nowrap">
          <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="productFrequency" className="text-xs md:text-sm">Product Frequency</TabsTrigger>
          <TabsTrigger value="retention" className="text-xs md:text-sm">Customer Retention</TabsTrigger>
          <TabsTrigger value="pageViews" className="text-xs md:text-sm">Page Views</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 md:mt-6">
          <OverviewCharts topProducts={topProducts} trafficSources={trafficSources} />
        </TabsContent>
        
        <TabsContent value="productFrequency" className="mt-4 md:mt-6">
          <ProductFrequencyTab />
        </TabsContent>
        
        <TabsContent value="retention" className="mt-4 md:mt-6">
          <RetentionTab />
        </TabsContent>
        
        <TabsContent value="pageViews" className="mt-4 md:mt-6">
          <PageViewsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
