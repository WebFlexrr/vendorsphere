import React, { useState } from 'react';
import { Save, Store, Key, Copy, Eye, EyeOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

// Animation variants for section transitions
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

// Timezone options for the store settings
const timezoneOptions = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (US & Canada)" },
  { value: "America/Chicago", label: "Central Time (US & Canada)" },
  { value: "America/Denver", label: "Mountain Time (US & Canada)" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Australia/Sydney", label: "Sydney" }
];

// Money format options
const moneyFormatOptions = [
  { value: "${{amount}}", label: "$ - USD ($10.00)" },
  { value: "€{{amount}}", label: "€ - EUR (€10.00)" },
  { value: "£{{amount}}", label: "£ - GBP (£10.00)" },
  { value: "¥{{amount}}", label: "¥ - JPY (¥1000)" },
  { value: "{{amount}} kr", label: "kr - SEK (10.00 kr)" }
];

// Country options
const countryOptions = [
  { value: "US", label: "United States", code: "+1" },
  { value: "CA", label: "Canada", code: "+1" },
  { value: "GB", label: "United Kingdom", code: "+44" },
  { value: "AU", label: "Australia", code: "+61" },
  { value: "DE", label: "Germany", code: "+49" },
  { value: "FR", label: "France", code: "+33" },
  { value: "JP", label: "Japan", code: "+81" },
  { value: "IN", label: "India", code: "+91" }
];

const Settings = () => {
  const { toast } = useToast();
  const [storeData, setStoreData] = useState({
    name: "VendorSphere Store",
    description: "A multi-vendor marketplace platform for selling products online.",
    country: "US",
    address1: "123 Main Street",
    address2: "Suite 101",
    zip: "94103",
    city: "San Francisco",
    phone: "5551234567",
    country_code: "+1",
    timezone: "America/New_York",
    money_format: "${{amount}}",
    domain: "store.vendorsphere.com",
    is_active: true
  });

  const [apiKeys, setApiKeys] = useState({
    store_id: "store_12345",
    api_key: "vs_sk_12345...",
    webhook_secret: "whsec_12345...",
    public_key: "vs_pk_12345...",
    stripe_publishable: "pk_test_12345...",
    stripe_secret: "sk_test_12345...",
    paypal_client_id: "",
    google_analytics_id: "",
    facebook_pixel_id: "",
    mailchimp_api_key: "",
    twilio_account_sid: "",
    twilio_auth_token: ""
  });

  const [showSecrets, setShowSecrets] = useState({
    api_key: false,
    webhook_secret: false,
    stripe_secret: false,
    twilio_auth_token: false,
    mailchimp_api_key: false
  });
  
  const handleStoreChange = (field: string, value: string | boolean) => {
    setStoreData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApiKeyChange = (field: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCountryChange = (value: string) => {
    const country = countryOptions.find(c => c.value === value);
    setStoreData(prev => ({
      ...prev,
      country: value,
      country_code: country?.code || prev.country_code
    }));
  };

  const toggleSecretVisibility = (field: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard.`
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard.",
        variant: "destructive"
      });
    }
  };
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully."
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and integrations.
        </p>
      </motion.div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        
        {/* Store Tab */}
        <TabsContent value="store" className="space-y-4">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Store Settings
                </CardTitle>
                <CardDescription>
                  Configure your store information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input 
                      id="store-name" 
                      value={storeData.name} 
                      onChange={(e) => handleStoreChange('name', e.target.value)}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="store-description">Store Description</Label>
                    <Textarea 
                      id="store-description" 
                      rows={3}
                      value={storeData.description}
                      onChange={(e) => handleStoreChange('description', e.target.value)}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="store-domain">Store Domain</Label>
                    <Input 
                      id="store-domain" 
                      value={storeData.domain}
                      onChange={(e) => handleStoreChange('domain', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your store's custom domain or subdomain.
                    </p>
                  </motion.div>
                </div>
                
                {/* Location & Contact */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-medium">Location & Contact</h3>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="store-country">Country</Label>
                    <Select 
                      value={storeData.country} 
                      onValueChange={handleCountryChange}
                    >
                      <SelectTrigger id="store-country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryOptions.map(country => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="address1">Address Line 1</Label>
                      <Input 
                        id="address1" 
                        value={storeData.address1}
                        onChange={(e) => handleStoreChange('address1', e.target.value)}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="address2">Address Line 2</Label>
                      <Input 
                        id="address2" 
                        value={storeData.address2}
                        onChange={(e) => handleStoreChange('address2', e.target.value)}
                      />
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={storeData.city}
                        onChange={(e) => handleStoreChange('city', e.target.value)}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input 
                        id="zip" 
                        value={storeData.zip}
                        onChange={(e) => handleStoreChange('zip', e.target.value)}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <Select 
                        value={storeData.country_code} 
                        onValueChange={(value) => handleStoreChange('country_code', value)}
                      >
                        <SelectTrigger className="w-[80px] flex-shrink-0">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map(country => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input 
                        id="phone"
                        className="flex-1 ml-2"
                        value={storeData.phone}
                        onChange={(e) => handleStoreChange('phone', e.target.value)}
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Regional Settings */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={storeData.timezone} 
                      onValueChange={(value) => handleStoreChange('timezone', value)}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {timezoneOptions.map(timezone => (
                          <SelectItem key={timezone.value} value={timezone.value}>
                            {timezone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="money-format">Currency Format</Label>
                    <Select 
                      value={storeData.money_format} 
                      onValueChange={(value) => handleStoreChange('money_format', value)}
                    >
                      <SelectTrigger id="money-format">
                        <SelectValue placeholder="Select a currency format" />
                      </SelectTrigger>
                      <SelectContent>
                        {moneyFormatOptions.map(format => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-center space-x-2">
                    <Switch 
                      id="store-status"
                      checked={storeData.is_active}
                      onCheckedChange={(checked) => handleStoreChange('is_active', checked)}
                    />
                    <Label htmlFor="store-status">Store is active</Label>
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Store Settings
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-4">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Keys & Credentials
                </CardTitle>
                <CardDescription>
                  Manage your API keys, store credentials, and third-party integrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Store Credentials */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Store Credentials</h3>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="store-id">Store ID</Label>
                    <div className="flex">
                      <Input 
                        id="store-id" 
                        value={apiKeys.store_id}
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => copyToClipboard(apiKeys.store_id, "Store ID")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your unique store identifier. This is read-only.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="public-key">Public Key</Label>
                    <div className="flex">
                      <Input 
                        id="public-key" 
                        value={apiKeys.public_key}
                        onChange={(e) => handleApiKeyChange('public_key', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => copyToClipboard(apiKeys.public_key, "Public Key")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your public API key for client-side integrations.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="api-key">Secret API Key</Label>
                    <div className="flex">
                      <Input 
                        id="api-key" 
                        type={showSecrets.api_key ? "text" : "password"}
                        value={apiKeys.api_key}
                        onChange={(e) => handleApiKeyChange('api_key', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => toggleSecretVisibility('api_key')}
                      >
                        {showSecrets.api_key ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => copyToClipboard(apiKeys.api_key, "API Key")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Keep this secret! Used for server-side API calls.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <div className="flex">
                      <Input 
                        id="webhook-secret" 
                        type={showSecrets.webhook_secret ? "text" : "password"}
                        value={apiKeys.webhook_secret}
                        onChange={(e) => handleApiKeyChange('webhook_secret', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => toggleSecretVisibility('webhook_secret')}
                      >
                        {showSecrets.webhook_secret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => copyToClipboard(apiKeys.webhook_secret, "Webhook Secret")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Used to verify webhook authenticity.
                    </p>
                  </motion.div>
                </div>

                {/* Payment Gateways */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-medium">Payment Gateways</h3>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="stripe-publishable">Stripe Publishable Key</Label>
                    <Input 
                      id="stripe-publishable" 
                      value={apiKeys.stripe_publishable}
                      onChange={(e) => handleApiKeyChange('stripe_publishable', e.target.value)}
                      placeholder="pk_test_..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                    <div className="flex">
                      <Input 
                        id="stripe-secret" 
                        type={showSecrets.stripe_secret ? "text" : "password"}
                        value={apiKeys.stripe_secret}
                        onChange={(e) => handleApiKeyChange('stripe_secret', e.target.value)}
                        placeholder="sk_test_..."
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => toggleSecretVisibility('stripe_secret')}
                      >
                        {showSecrets.stripe_secret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="paypal-client-id">PayPal Client ID</Label>
                    <Input 
                      id="paypal-client-id" 
                      value={apiKeys.paypal_client_id}
                      onChange={(e) => handleApiKeyChange('paypal_client_id', e.target.value)}
                      placeholder="AX..."
                    />
                  </motion.div>
                </div>

                {/* Third-party Services */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-medium">Third-party Services</h3>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="mailchimp-api">Mailchimp API Key</Label>
                    <div className="flex">
                      <Input 
                        id="mailchimp-api" 
                        type={showSecrets.mailchimp_api_key ? "text" : "password"}
                        value={apiKeys.mailchimp_api_key}
                        onChange={(e) => handleApiKeyChange('mailchimp_api_key', e.target.value)}
                        placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => toggleSecretVisibility('mailchimp_api_key')}
                      >
                        {showSecrets.mailchimp_api_key ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="twilio-sid">Twilio Account SID</Label>
                    <Input 
                      id="twilio-sid" 
                      value={apiKeys.twilio_account_sid}
                      onChange={(e) => handleApiKeyChange('twilio_account_sid', e.target.value)}
                      placeholder="AC..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="twilio-token">Twilio Auth Token</Label>
                    <div className="flex">
                      <Input 
                        id="twilio-token" 
                        type={showSecrets.twilio_auth_token ? "text" : "password"}
                        value={apiKeys.twilio_auth_token}
                        onChange={(e) => handleApiKeyChange('twilio_auth_token', e.target.value)}
                        placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => toggleSecretVisibility('twilio_auth_token')}
                      >
                        {showSecrets.twilio_auth_token ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save API Keys
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle>Google Analytics</CardTitle>
                <CardDescription>
                  Connect your Google Analytics account to track website traffic and user behavior.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="ga-id">Measurement ID</Label>
                  <Input id="ga-id" placeholder="G-XXXXXXXXXX" />
                  <p className="text-xs text-muted-foreground">
                    Enter your Google Analytics 4 measurement ID (starts with G-).
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="ga-view">Property View ID</Label>
                  <Input id="ga-view" placeholder="123456789" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="ga-enhanced">
                    <input type="checkbox" id="ga-enhanced" className="rounded border-gray-300" />
                    <span>Enable enhanced measurement</span>
                  </Label>
                </motion.div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle>Facebook Meta Pixel</CardTitle>
                <CardDescription>
                  Connect your Facebook Meta Pixel to track conversions and optimize ads.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="fb-pixel">Pixel ID</Label>
                  <Input id="fb-pixel" placeholder="1234567890123456" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="fb-advanced">
                    <input type="checkbox" id="fb-advanced" className="rounded border-gray-300" />
                    <span>Enable advanced matching</span>
                  </Label>
                </motion.div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>
                  Manage general settings for your website.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="VendorSphere" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    rows={3}
                    defaultValue="A multi-vendor marketplace platform for selling products online."
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" placeholder="support@vendorsphere.com" />
                </motion.div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;
