
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Globe, Smartphone, MessageCircle, TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Eye, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

interface ChannelMetrics {
  id: string;
  name: string;
  type: 'website' | 'mobile' | 'whatsapp';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  icon: React.ComponentType<any>;
  seoMetrics: {
    visitors: number;
    orders: number;
    profit: number;
    conversionRate: number;
    bounceRate: number;
    avgSessionDuration: string;
    organicTraffic: number;
    paidTraffic: number;
    socialTraffic: number;
    directTraffic: number;
  };
  issues: Array<{
    type: 'warning' | 'error';
    message: string;
  }>;
}

interface DashboardPanelProps {
  channels: ChannelMetrics[];
  onOpenSettings: (channelId: string) => void;
}

const DashboardPanel: React.FC<DashboardPanelProps> = ({ channels, onOpenSettings }) => {
  const connectedChannels = channels.filter(channel => channel.status === 'connected');
  
  const totalMetrics = connectedChannels.reduce((acc, channel) => ({
    visitors: acc.visitors + channel.seoMetrics.visitors,
    orders: acc.orders + channel.seoMetrics.orders,
    profit: acc.profit + channel.seoMetrics.profit,
  }), { visitors: 0, orders: 0, profit: 0 });

  const trafficSourceData = connectedChannels.length > 0 ? [
    { name: 'Organic', value: connectedChannels[0].seoMetrics.organicTraffic, color: '#0088FE' },
    { name: 'Paid', value: connectedChannels[0].seoMetrics.paidTraffic, color: '#00C49F' },
    { name: 'Social', value: connectedChannels[0].seoMetrics.socialTraffic, color: '#FFBB28' },
    { name: 'Direct', value: connectedChannels[0].seoMetrics.directTraffic, color: '#FF8042' },
  ] : [];

  const visitorTrendData = [
    { name: 'Mon', visitors: 1200, orders: 45 },
    { name: 'Tue', visitors: 1900, orders: 67 },
    { name: 'Wed', visitors: 2300, orders: 89 },
    { name: 'Thu', visitors: 1750, orders: 52 },
    { name: 'Fri', visitors: 2100, orders: 78 },
    { name: 'Sat', visitors: 2800, orders: 98 },
    { name: 'Sun', visitors: 2200, orders: 71 },
  ];

  if (connectedChannels.length === 0) {
    return (
      <div className="text-center py-12">
        <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Connected Channels</h3>
        <p className="text-muted-foreground">
          Connect a sales channel to view SEO analytics and performance metrics
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.visitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.orders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMetrics.profit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +15% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Channel Status & Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Channel Status</CardTitle>
            <CardDescription>Monitor your connected sales channels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {channels.map((channel) => {
              const IconComponent = channel.icon;
              const hasIssues = channel.issues.length > 0;
              
              return (
                <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{channel.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={channel.status === 'connected' ? 'default' : 'secondary'}
                          className={
                            channel.status === 'connected' 
                              ? 'bg-green-100 text-green-700' 
                              : channel.status === 'error'
                              ? 'bg-red-100 text-red-700'
                              : channel.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }
                        >
                          {channel.status}
                        </Badge>
                        {hasIssues && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {channel.status === 'connected' && (
                      <div className="text-sm text-muted-foreground">
                        {channel.seoMetrics.visitors.toLocaleString()} visitors
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onOpenSettings(channel.id)}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {trafficSourceData.map((source, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm">{source.name}: {source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor & Order Trends</CardTitle>
          <CardDescription>Daily performance over the last week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Visitors"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel Performance Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {connectedChannels.map((channel) => {
          const IconComponent = channel.icon;
          
          return (
            <Card key={channel.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5" />
                  {channel.name} Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">{channel.seoMetrics.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">{channel.seoMetrics.bounceRate}%</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Avg. Session Duration</p>
                  <p className="text-lg font-semibold">{channel.seoMetrics.avgSessionDuration}</p>
                </div>

                {channel.issues.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-yellow-600">Issues Found:</p>
                    {channel.issues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <p className="text-sm text-yellow-700">{issue.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPanel;
