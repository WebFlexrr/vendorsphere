
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Eye,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ProductFrequencyTab from './analytics/ProductFrequencyTab';
import RetentionTab from './analytics/RetentionTab';
import PageViewsTab from './analytics/PageViewsTab';

const Analytics = () => {
  // Mock analytics data
  const periodMetrics = [
    { title: 'Total Revenue', value: '$24,345', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-vsphere-primary/10', iconColor: 'text-vsphere-primary' },
    { title: 'Orders', value: '342', change: '+8.2%', trend: 'up', icon: ShoppingCart, color: 'bg-vsphere-secondary/10', iconColor: 'text-vsphere-secondary' },
    { title: 'Customers', value: '2,451', change: '+15.3%', trend: 'up', icon: Users, color: 'bg-vsphere-mint/20', iconColor: 'text-vsphere-dark' },
    { title: 'Conversion Rate', value: '3.6%', change: '-0.8%', trend: 'down', icon: TrendingUp, color: 'bg-vsphere-accent/10', iconColor: 'text-vsphere-dark' },
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex justify-between items-center">
        <Tabs defaultValue="30days" className="w-full">
          <TabsList className="grid w-full sm:w-[400px] grid-cols-4">
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {periodMetrics.map((metric, index) => (
          <MetricCard 
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend as 'up' | 'down'}
            icon={metric.icon}
            color={metric.color}
            iconColor={metric.iconColor}
          />
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="w-full max-w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="productFrequency">Product Frequency</TabsTrigger>
          <TabsTrigger value="retention">Customer Retention</TabsTrigger>
          <TabsTrigger value="pageViews">Page Views</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Revenue Trends</span>
                  <Badge variant="outline" className="bg-vsphere-light/50">
                    Last 30 days
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="flex flex-col items-center text-gray-400">
                    <LineChart className="h-12 w-12 mb-2" />
                    <p>Revenue trend chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Sales by Category</span>
                  <Badge variant="outline" className="bg-vsphere-light/50">
                    Last 30 days
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="flex flex-col items-center text-gray-400">
                    <PieChart className="h-12 w-12 mb-2" />
                    <p>Category distribution chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Analysis Sections */}
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-vsphere-${index % 2 === 0 ? 'primary' : 'secondary'}/10 text-vsphere-${index % 2 === 0 ? 'primary' : 'secondary'}`}>
                          <Package className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{product.sales} units</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{source.source}</span>
                        <span className="font-medium">{source.visitors.toLocaleString()} visitors</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            index === 0 ? 'bg-vsphere-primary' :
                            index === 1 ? 'bg-vsphere-secondary' :
                            index === 2 ? 'bg-vsphere-accent' :
                            index === 3 ? 'bg-vsphere-mint' : 'bg-vsphere-skyblue'
                          }`}
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="productFrequency" className="mt-6">
          <ProductFrequencyTab />
        </TabsContent>
        
        <TabsContent value="retention" className="mt-6">
          <RetentionTab />
        </TabsContent>
        
        <TabsContent value="pageViews" className="mt-6">
          <PageViewsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  iconColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  color,
  iconColor
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
              {trend === 'up' ? 
                <ArrowUpRight className="h-3 w-3 text-green-600 ml-1" /> : 
                <ArrowDownRight className="h-3 w-3 text-red-600 ml-1" />
              }
              <span className="text-xs text-gray-500 ml-1">vs previous period</span>
            </div>
          </div>
          <div className={`${color} p-2 rounded-md`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Analytics;
