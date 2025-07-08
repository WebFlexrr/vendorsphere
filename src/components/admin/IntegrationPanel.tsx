
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ShoppingBag, 
  Webhook, 
  MessageCircle, 
  BarChart3, 
  Mail, 
  Facebook, 
  Twitter, 
  Zap,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Settings,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'ecommerce' | 'analytics' | 'communication' | 'marketing' | 'automation';
  status: 'connected' | 'disconnected' | 'error';
  url?: string;
  lastSync?: string;
}

const IntegrationPanel = () => {
  const { toast } = useToast();
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionData, setConnectionData] = useState({
    apiKey: '',
    shopUrl: '',
    webhookUrl: '',
    phoneNumber: '',
    accessToken: '',
  });

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store to sync products and orders',
      icon: ShoppingBag,
      category: 'ecommerce',
      status: 'disconnected',
      url: 'https://shopify.com'
    },
    {
      id: 'webhook',
      name: 'Custom Webhook',
      description: 'Send data to external systems via webhooks',
      icon: Webhook,
      category: 'automation',
      status: 'connected',
      lastSync: '2024-01-08 10:30 AM'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Connect WhatsApp Business API for customer communication',
      icon: MessageCircle,
      category: 'communication',
      status: 'connected',
      lastSync: '2024-01-08 11:15 AM'
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: BarChart3,
      category: 'analytics',
      status: 'connected',
      lastSync: '2024-01-08 12:00 PM'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing and automation platform',
      icon: Mail,
      category: 'marketing',
      status: 'disconnected'
    },
    {
      id: 'facebook',
      name: 'Facebook Pixel',
      description: 'Track conversions and optimize Facebook ads',
      icon: Facebook,
      category: 'marketing',
      status: 'error',
      lastSync: '2024-01-07 3:45 PM'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automate workflows between different apps',
      icon: Zap,
      category: 'automation',
      status: 'disconnected'
    }
  ]);

  const handleConnect = async (integration: Integration) => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIntegrations(prev => prev.map(int => 
        int.id === integration.id 
          ? { ...int, status: 'connected' as const, lastSync: new Date().toLocaleString() }
          : int
      ));
      
      toast({
        title: "Integration Connected",
        description: `Successfully connected ${integration.name}`,
      });
      
      setIsConnecting(false);
      setSelectedIntegration(null);
      setConnectionData({
        apiKey: '',
        shopUrl: '',
        webhookUrl: '',
        phoneNumber: '',
        accessToken: '',
      });
    }, 2000);
  };

  const handleDisconnect = (integration: Integration) => {
    setIntegrations(prev => prev.map(int => 
      int.id === integration.id 
        ? { ...int, status: 'disconnected' as const, lastSync: undefined }
        : int
    ));
    
    toast({
      title: "Integration Disconnected",
      description: `${integration.name} has been disconnected`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700"><AlertCircle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Disconnected</Badge>;
    }
  };

  const categories = [
    { id: 'all', name: 'All Integrations' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'communication', name: 'Communication' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'automation', name: 'Automation' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const filteredIntegrations = activeCategory === 'all' 
    ? integrations 
    : integrations.filter(int => int.category === activeCategory);

  const renderConnectionForm = (integration: Integration) => {
    switch (integration.id) {
      case 'shopify':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shop-url">Shop URL</Label>
              <Input
                id="shop-url"
                placeholder="your-shop.myshopify.com"
                value={connectionData.shopUrl}
                onChange={(e) => setConnectionData(prev => ({ ...prev, shopUrl: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Shopify API key"
                value={connectionData.apiKey}
                onChange={(e) => setConnectionData(prev => ({ ...prev, apiKey: e.target.value }))}
              />
            </div>
          </div>
        );
      case 'webhook':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-app.com/webhook"
                value={connectionData.webhookUrl}
                onChange={(e) => setConnectionData(prev => ({ ...prev, webhookUrl: e.target.value }))}
              />
            </div>
          </div>
        );
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Business Phone Number</Label>
              <Input
                id="phone-number"
                placeholder="+1234567890"
                value={connectionData.phoneNumber}
                onChange={(e) => setConnectionData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-token">Access Token</Label>
              <Input
                id="access-token"
                type="password"
                placeholder="Enter WhatsApp Business API token"
                value={connectionData.accessToken}
                onChange={(e) => setConnectionData(prev => ({ ...prev, accessToken: e.target.value }))}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={connectionData.apiKey}
                onChange={(e) => setConnectionData(prev => ({ ...prev, apiKey: e.target.value }))}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect external apps and services to enhance your platform
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id} className="relative">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                        </div>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {integration.lastSync && (
                      <p className="text-sm text-muted-foreground">
                        Last sync: {integration.lastSync}
                      </p>
                    )}
                    
                    <div className="flex gap-2">
                      {integration.status === 'connected' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleDisconnect(integration)}
                          >
                            Disconnect
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => setSelectedIntegration(integration)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Connect
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <IconComponent className="h-5 w-5" />
                                Connect {integration.name}
                              </DialogTitle>
                              <DialogDescription>
                                {integration.description}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedIntegration && renderConnectionForm(selectedIntegration)}
                            
                            <DialogFooter>
                              <Button 
                                onClick={() => selectedIntegration && handleConnect(selectedIntegration)}
                                disabled={isConnecting}
                              >
                                {isConnecting ? 'Connecting...' : 'Connect'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    
                    {integration.url && (
                      <a 
                        href={integration.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        Learn more <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationPanel;
