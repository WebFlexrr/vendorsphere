
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Smartphone, MessageCircle, ExternalLink, Key, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConnectChannelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: string | null;
  onConnect: (channelId: string) => void;
}

const ConnectChannelDialog: React.FC<ConnectChannelDialogProps> = ({
  open,
  onOpenChange,
  channelId,
  onConnect
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: '',
    webhookUrl: '',
    businessNumber: '',
    appId: '',
    bundleId: ''
  });

  const handleConnect = async () => {
    if (!channelId) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onConnect(channelId);
      toast({
        title: "Channel Connected",
        description: `Successfully connected ${getChannelName(channelId)}`,
      });
      setIsLoading(false);
      setFormData({
        apiKey: '',
        webhookUrl: '',
        businessNumber: '',
        appId: '',
        bundleId: ''
      });
    }, 2000);
  };

  const getChannelName = (id: string) => {
    switch (id) {
      case 'website': return 'Website';
      case 'mobile': return 'Mobile App';
      case 'whatsapp': return 'WhatsApp Business';
      default: return 'Channel';
    }
  };

  const getChannelIcon = (id: string) => {
    switch (id) {
      case 'website': return Globe;
      case 'mobile': return Smartphone;
      case 'whatsapp': return MessageCircle;
      default: return Globe;
    }
  };

  if (!channelId) return null;

  const IconComponent = getChannelIcon(channelId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className="h-5 w-5" />
            Connect {getChannelName(channelId)}
          </DialogTitle>
          <DialogDescription>
            Configure your {getChannelName(channelId)} integration to start selling through this channel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {channelId === 'website' && (
            <Tabs defaultValue="domain" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="domain">Domain Setup</TabsTrigger>
                <TabsTrigger value="tracking">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="domain" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Website Configuration</CardTitle>
                    <CardDescription>Set up your website domain and basic settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain">Website Domain</Label>
                      <Input 
                        id="domain" 
                        placeholder="https://yourstore.com"
                        value={formData.webhookUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input 
                        id="api-key" 
                        type="password"
                        placeholder="Enter your API key"
                        value={formData.apiKey}
                        onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tracking" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Analytics Integration</CardTitle>
                    <CardDescription>Connect Google Analytics and other tracking tools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded">
                          <BarChart className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Google Analytics</p>
                          <p className="text-sm text-muted-foreground">Track website performance</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {channelId === 'mobile' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mobile App Configuration</CardTitle>
                <CardDescription>Set up your mobile app integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-id">App ID</Label>
                  <Input 
                    id="app-id" 
                    placeholder="com.yourcompany.app"
                    value={formData.appId}
                    onChange={(e) => setFormData(prev => ({ ...prev, appId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bundle-id">Bundle ID (iOS)</Label>
                  <Input 
                    id="bundle-id" 
                    placeholder="com.yourcompany.app"
                    value={formData.bundleId}
                    onChange={(e) => setFormData(prev => ({ ...prev, bundleId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile-api">Mobile API Key</Label>
                  <Input 
                    id="mobile-api" 
                    type="password"
                    placeholder="Enter your mobile API key"
                    value={formData.apiKey}
                    onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {channelId === 'whatsapp' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">WhatsApp Business API</CardTitle>
                <CardDescription>Connect your WhatsApp Business account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-number">Business Phone Number</Label>
                  <Input 
                    id="business-number" 
                    placeholder="+1234567890"
                    value={formData.businessNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessNumber: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-token">Access Token</Label>
                  <Input 
                    id="whatsapp-token" 
                    type="password"
                    placeholder="Enter your WhatsApp Business API token"
                    value={formData.apiKey}
                    onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook">Webhook URL</Label>
                  <Input 
                    id="webhook" 
                    placeholder="https://yourapp.com/webhook/whatsapp"
                    value={formData.webhookUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Key className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Setup Instructions</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        You'll need to register your app with WhatsApp Business API and get approval before you can start sending messages.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-blue-600">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Learn more about WhatsApp Business API
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Connect Channel
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectChannelDialog;
