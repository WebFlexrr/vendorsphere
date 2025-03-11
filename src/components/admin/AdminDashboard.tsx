
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart,
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-vsphere-light text-vsphere-dark">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Revenue" 
          value="$24,345" 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
          color="bg-vsphere-primary/10"
          iconColor="text-vsphere-primary"
        />
        <MetricCard 
          title="Orders" 
          value="342" 
          change="+8.2%" 
          trend="up" 
          icon={ShoppingCart} 
          color="bg-vsphere-secondary/10"
          iconColor="text-vsphere-secondary"
        />
        <MetricCard 
          title="Vendors" 
          value="45" 
          change="+3.1%" 
          trend="up" 
          icon={Users} 
          color="bg-vsphere-mint/20"
          iconColor="text-vsphere-dark"
        />
        <MetricCard 
          title="Products" 
          value="1,298" 
          change="-2.5%" 
          trend="down" 
          icon={Package} 
          color="bg-vsphere-accent/10"
          iconColor="text-vsphere-dark"
        />
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Sales Overview</span>
                  <Badge variant="outline" className="bg-vsphere-light/50">
                    Last 30 days
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="flex flex-col items-center text-gray-400">
                    <BarChart className="h-12 w-12 mb-2" />
                    <p>Sales chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Artisan Crafts', 'Tech Universe', 'Fashion Forward', 'Home Elegance', 'Beauty Essentials'].map((vendor, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getVendorColor(i)}`}>
                          {vendor.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{vendor}</span>
                      </div>
                      <span className="text-sm text-gray-600">${(5000 - i * 800).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Detailed analytics content would appear here, including conversion rates,
                traffic sources, and user behavior metrics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New vendor registration', user: 'Coastal Crafts', time: '5 minutes ago' },
                  { action: 'Product approved', user: 'Tech Universe', time: '22 minutes ago' },
                  { action: 'New order placed', user: 'Customer #3845', time: '1 hour ago' },
                  { action: 'Refund processed', user: 'Order #45921', time: '3 hours ago' },
                  { action: 'New product added', user: 'Home Elegance', time: '5 hours ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="bg-vsphere-light h-8 w-8 rounded-full flex items-center justify-center text-vsphere-primary">
                      {activity.action.includes('vendor') ? <Users className="h-4 w-4" /> :
                       activity.action.includes('Product') ? <Package className="h-4 w-4" /> :
                       activity.action.includes('order') ? <ShoppingCart className="h-4 w-4" /> :
                       activity.action.includes('Refund') ? <DollarSign className="h-4 w-4" /> :
                       <TrendingUp className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{activity.user}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
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

// Helper function to get vendor background colors
const getVendorColor = (index: number): string => {
  const colors = [
    'bg-vsphere-primary/10 text-vsphere-primary',
    'bg-vsphere-secondary/10 text-vsphere-secondary',
    'bg-vsphere-accent/10 text-vsphere-dark',
    'bg-vsphere-mint/10 text-vsphere-dark',
    'bg-vsphere-skyblue/10 text-vsphere-dark',
  ];
  return colors[index % colors.length];
};

export default AdminDashboard;
