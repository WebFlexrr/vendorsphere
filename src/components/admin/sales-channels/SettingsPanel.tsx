
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Smartphone, MessageCircle, Key, Database, BarChart3, RefreshCw, CheckCircle, AlertCircle, Settings2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChannelSettingsProps {
  channelId: string;
  onBack: () => void;
}

const SettingsPanel: React.FC<ChannelSettingsProps> = ({ channelId, onBack }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    // Analytics Settings
    googleAnalyticsId: '',
    googleTagManagerId: '',
    facebookPixelId: '',
    
    // SEO Settings
    seoEnabled: true,
    metaTagsEnabled: true,
    sitemapEnabled: true,
    robotsTxtEnabled: true,
    
    // Data Collection
    dataCollectionEnabled: true,
    trackingEnabled: true,
    cookieConsentEnabled: true,
    
    // API Keys
    apiKey: '',
    secretKey: '',
    webhookUrl: '',
    
    // Refresh Intervals
    metricsRefreshInterval: '5',
    dataRetentionDays: '30',
  });

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Channel settings have been updated successfully.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    
    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: "Connection successful! Data is being collected properly.",
      });
      setIsLoading(false);
    }, 2000);
  };

  const getChannelInfo = (id: string) => {
    switch (id) {
      case 'website':
        return { name: 'Website', icon: Globe };
      case 'mobile':
        return { name: 'Mobile App', icon: Smartphone };
      case 'whatsapp':
        return { name: 'WhatsApp Business', icon: MessageCircle };
      default:
        return { name: 'Channel', icon: Globe };
    }
  };

  const channelInfo = getChannelInfo(channelId);
  const IconComponent = channelInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          ← Back to Dashboard
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{channelInfo.name} Settings</h1>
            <p className="text-muted-foreground">Configure data collection and analytics</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-700 ml-auto">
          <CheckCircle className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="data">Data Collection</TabsTrigger>
          <TabsTrigger value="api">API & Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics Integration
              </CardTitle>
              <CardDescription>
                Connect your analytics tools to track visitor behavior and conversions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ga-id">Google Analytics ID</Label>
                  <Input
                    id="ga-id"
                    placeholder="G-XXXXXXXXXX"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      googleAnalyticsId: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                  <Input
                    id="gtm-id"
                    placeholder="GTM-XXXXXXX"
                    value={settings.googleTagManagerId}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      googleTagManagerId: e.target.value
                    }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                <Input
                  id="fb-pixel"
                  placeholder="1234567890123456"
                  value={settings.facebookPixelId}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    facebookPixelId: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="refresh-interval">Metrics Refresh Interval (minutes)</Label>
                <Select
                  value={settings.metricsRefreshInterval}
                  onValueChange={(value) => setSettings(prev => ({
                    ...prev,
                    metricsRefreshInterval: value
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Configuration</CardTitle>
              <CardDescription>
                Configure SEO settings to improve search engine visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SEO Optimization</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic SEO optimizations
                  </p>
                </div>
                <Switch
                  checked={settings.seoEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    seoEnabled: checked
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Meta Tags</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate meta tags for pages
                  </p>
                </div>
                <Switch
                  checked={settings.metaTagsEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    metaTagsEnabled: checked
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">XML Sitemap</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate and maintain XML sitemap
                  </p>
                </div>
                <Switch
                  checked={settings.sitemapEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    sitemapEnabled: checked
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Robots.txt</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage robots.txt file automatically
                  </p>
                </div>
                <Switch
                  checked={settings.robotsTxtEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    robotsTxtEnabled: checked
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Collection Settings
              </CardTitle>
              <CardDescription>
                Configure how data is collected and stored from your channel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Data Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable data collection from this channel
                  </p>
                </div>
                <Switch
                  checked={settings.dataCollectionEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    dataCollectionEnabled: checked
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">User Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track user behavior and interactions
                  </p>
                </div>
                <Switch
                  checked={settings.trackingEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    trackingEnabled: checked
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Cookie Consent</Label>
                  <p className="text-sm text-muted-foreground">
                    Show cookie consent banner
                  </p>
                </div>
                <Switch
                  checked={settings.cookieConsentEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    cookieConsentEnabled: checked
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention">Data Retention (days)</Label>
                <Select
                  value={settings.dataRetentionDays}
                  onValueChange={(value) => setSettings(prev => ({
                    ...prev,
                    dataRetentionDays: value
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="0">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys & Integration
              </CardTitle>
              <CardDescription>
                Manage API keys and webhook URLs for data synchronization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={settings.apiKey}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    apiKey: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secret-key">Secret Key</Label>
                <Input
                  id="secret-key"
                  type="password"
                  placeholder="Enter your secret key"
                  value={settings.secretKey}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    secretKey: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-app.com/webhook"
                  value={settings.webhookUrl}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    webhookUrl: e.target.value
                  }))}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleTestConnection}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Settings2 className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
