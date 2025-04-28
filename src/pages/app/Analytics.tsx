
import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ProductFrequencyTab from '../../components/admin/analytics/ProductFrequencyTab';
import RetentionTab from '../../components/admin/analytics/RetentionTab';
import PageViewsTab from '../../components/admin/analytics/PageViewsTab';
import MetricsOverview from '../../components/admin/analytics/MetricsOverview';
import OverviewCharts from '../../components/admin/analytics/OverviewCharts';
import PDFPreview from '../../components/admin/PDFPreview';
import { AnalyticsReport } from '../../utils/pdfUtils';
import { exportToCSV } from '../../utils/exportUtils';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

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

  const exportAnalyticsData = () => {
    const data = [
      ...topProducts.map(product => ({
        type: 'Product',
        name: product.name,
        category: product.category,
        sales: product.sales,
        revenue: product.revenue
      })),
      ...trafficSources.map(source => ({
        type: 'Traffic Source',
        name: source.source,
        visitors: source.visitors,
        percentage: source.percentage + '%'
      }))
    ];
    
    exportToCSV(data, 'analytics-data');
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case '7days': return 'Last 7 Days';
      case '30days': return 'Last 30 Days';
      case 'quarter': return 'Last Quarter';
      case 'year': return 'Last Year';
      default: return 'Last 30 Days';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 md:space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs md:text-sm" onClick={exportAnalyticsData}>
            <Download className="h-3 w-3 md:h-4 md:w-4" /> 
            <span className="hidden xs:inline">Export CSV</span>
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-2 text-xs md:text-sm bg-vsphere-primary hover:bg-vsphere-primary/90"
            onClick={() => setReportOpen(true)}
          >
            <FileText className="h-3 w-3 md:h-4 md:w-4" /> 
            <span className="hidden xs:inline">Generate Report</span>
          </Button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex justify-between items-center">
        <Tabs defaultValue={selectedPeriod} className="w-full" onValueChange={setSelectedPeriod}>
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

      {reportOpen && (
        <PDFPreview
          document={
            <AnalyticsReport
              title="Analytics Report"
              subtitle="Performance Overview"
              dateRange={getPeriodLabel()}
              metrics={periodMetrics}
              topProducts={topProducts}
              trafficSources={trafficSources}
            />
          }
          title="Analytics Report"
          open={reportOpen}
          onClose={() => setReportOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default Analytics;
