
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ChannelDashboardProps {
  channel: {
    id: string;
    name: string;
    type: 'website' | 'mobile' | 'whatsapp';
    status: string;
    icon: React.ComponentType<any>;
    description: string;
    metrics: {
      orders: number;
      revenue: number;
      customers: number;
      conversionRate: number;
    };
  };
  onBack: () => void;
}

const ChannelDashboard: React.FC<ChannelDashboardProps> = ({ channel, onBack }) => {
  const IconComponent = channel.icon;

  // Sample data for charts
  const salesData = [
    { name: 'Mon', sales: 120, orders: 8 },
    { name: 'Tue', sales: 190, orders: 12 },
    { name: 'Wed', sales: 300, orders: 18 },
    { name: 'Thu', sales: 250, orders: 15 },
    { name: 'Fri', sales: 420, orders: 25 },
    { name: 'Sat', sales: 380, orders: 22 },
    { name: 'Sun', sales: 290, orders: 17 }
  ];

  const customerData = [
    { name: 'New', value: 65 },
    { name: 'Returning', value: 35 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{channel.name} Dashboard</h1>
            <p className="text-muted-foreground">{channel.description}</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-700 ml-auto">
          {channel.status}
        </Badge>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${channel.metrics.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channel.metrics.orders}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channel.metrics.customers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channel.metrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +0.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily sales for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Volume</CardTitle>
            <CardDescription>Daily orders for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Channel-specific features */}
      {channel.type === 'website' && (
        <Card>
          <CardHeader>
            <CardTitle>Website Analytics</CardTitle>
            <CardDescription>Website-specific metrics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-sm text-muted-foreground">Page Views</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2.5</div>
                <p className="text-sm text-muted-foreground">Avg. Session Duration</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">68%</div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {channel.type === 'whatsapp' && (
        <Card>
          <CardHeader>
            <CardTitle>WhatsApp Business Metrics</CardTitle>
            <CardDescription>WhatsApp-specific engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">456</div>
                <p className="text-sm text-muted-foreground">Messages Sent</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">89%</div>
                <p className="text-sm text-muted-foreground">Message Open Rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Active Conversations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {channel.type === 'mobile' && (
        <Card>
          <CardHeader>
            <CardTitle>Mobile App Analytics</CardTitle>
            <CardDescription>Mobile app usage and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-sm text-muted-foreground">App Sessions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.2</div>
                <p className="text-sm text-muted-foreground">App Rating</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">78%</div>
                <p className="text-sm text-muted-foreground">Retention Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChannelDashboard;
