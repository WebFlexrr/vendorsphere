
import React from 'react';
import { Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

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

const Settings = () => {
  const { toast } = useToast();
  
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

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        
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
