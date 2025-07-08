import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Smartphone, MessageCircle, Plus, Settings, BarChart3, Users, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import ChannelDashboard from '@/components/admin/sales-channels/ChannelDashboard';
import ConnectChannelDialog from '@/components/admin/sales-channels/ConnectChannelDialog';
import DashboardPanel from '@/components/admin/sales-channels/DashboardPanel';
import SettingsPanel from '@/components/admin/sales-channels/SettingsPanel';

interface SalesChannel {
  id: string;
  name: string;
  type: 'website' | 'mobile' | 'whatsapp';
  status: 'connected' | 'disconnected' | 'pending' | 'error';
  icon: React.ComponentType<any>;
  description: string;
  metrics: {
    orders: number;
    revenue: number;
    customers: number;
    conversionRate: number;
  };
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

const SalesChannels = () => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [settingsChannel, setSettingsChannel] = useState<string | null>(null);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [channelToConnect, setChannelToConnect] = useState<string | null>(null);

  const [channels, setChannels] = useState<SalesChannel[]>([
    {
      id: 'website',
      name: 'Website',
      type: 'website',
      status: 'connected',
      icon: Globe,
      description: 'Your main e-commerce website',
      metrics: {
        orders: 142,
        revenue: 15420,
        customers: 89,
        conversionRate: 3.2
      },
      seoMetrics: {
        visitors: 5420,
        orders: 142,
        profit: 8750,
        conversionRate: 2.6,
        bounceRate: 45,
        avgSessionDuration: '2m 34s',
        organicTraffic: 65,
        paidTraffic: 20,
        socialTraffic: 10,
        directTraffic: 5
      },
      issues: [
        { type: 'warning', message: 'Page load time is above 3 seconds' },
        { type: 'warning', message: 'Missing meta descriptions on 12 pages' }
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile App',
      type: 'mobile',
      status: 'disconnected',
      icon: Smartphone,
      description: 'Native mobile application',
      metrics: {
        orders: 0,
        revenue: 0,
        customers: 0,
        conversionRate: 0
      },
      seoMetrics: {
        visitors: 0,
        orders: 0,
        profit: 0,
        conversionRate: 0,
        bounceRate: 0,
        avgSessionDuration: '0s',
        organicTraffic: 0,
        paidTraffic: 0,
        socialTraffic: 0,
        directTraffic: 0
      },
      issues: []
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      type: 'whatsapp',
      status: 'connected',
      icon: MessageCircle,
      description: 'WhatsApp Business API integration',
      metrics: {
        orders: 23,
        revenue: 2340,
        customers: 18,
        conversionRate: 12.5
      },
      seoMetrics: {
        visitors: 890,
        orders: 23,
        profit: 1450,
        conversionRate: 2.6,
        bounceRate: 25,
        avgSessionDuration: '4m 12s',
        organicTraffic: 80,
        paidTraffic: 5,
        socialTraffic: 15,
        directTraffic: 0
      },
      issues: [
        { type: 'error', message: 'Message delivery rate below 85%' }
      ]
    }
  ]);

  const handleConnectChannel = (channelId: string) => {
    setChannelToConnect(channelId);
    setShowConnectDialog(true);
  };

  const handleChannelConnected = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, status: 'connected' as const }
        : channel
    ));
    setShowConnectDialog(false);
    setChannelToConnect(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Show settings panel if a channel is selected for settings
  if (settingsChannel) {
    return (
      <SettingsPanel 
        channelId={settingsChannel}
        onBack={() => setSettingsChannel(null)}
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sales Channels</h1>
          <p className="text-muted-foreground">
            Connect and manage your sales channels with SEO analytics
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="analytics">Channel Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel) => {
              const IconComponent = channel.icon;
              return (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="relative h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{channel.name}</CardTitle>
                            <CardDescription className="text-sm">
                              {channel.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(channel.status)}>
                          {channel.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {channel.status === 'connected' ? (
                        <>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                              <p className="text-muted-foreground">Visitors</p>
                              <p className="font-semibold">{channel.seoMetrics.visitors.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">Orders</p>
                              <p className="font-semibold">{channel.metrics.orders}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">Revenue</p>
                              <p className="font-semibold">${channel.metrics.revenue.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">Conv. Rate</p>
                              <p className="font-semibold">{channel.metrics.conversionRate}%</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => setSelectedChannel(channel.id)}
                            >
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Analytics
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSettingsChannel(channel.id)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground text-sm mb-4">
                            Connect this channel to start selling
                          </p>
                          <Button 
                            onClick={() => handleConnectChannel(channel.id)}
                            size="sm"
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Connect Channel
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="dashboard">
          <DashboardPanel 
            channels={channels}
            onOpenSettings={setSettingsChannel}
          />
        </TabsContent>

        <TabsContent value="analytics">
          {selectedChannel ? (
            <ChannelDashboard 
              channel={channels.find(c => c.id === selectedChannel)!}
              onBack={() => setSelectedChannel(null)}
            />
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Channel</h3>
              <p className="text-muted-foreground">
                Choose a connected sales channel to view its detailed analytics
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ConnectChannelDialog
        open={showConnectDialog}
        onOpenChange={setShowConnectDialog}
        channelId={channelToConnect}
        onConnect={handleChannelConnected}
      />
    </motion.div>
  );
};

export default SalesChannels;
