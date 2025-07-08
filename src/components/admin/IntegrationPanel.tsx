
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useIntegrations } from './integrations/useIntegrations';
import { categories } from './integrations/integrationData';
import IntegrationCard from './integrations/IntegrationCard';

const IntegrationPanel = () => {
  const {
    integrations,
    selectedIntegration,
    setSelectedIntegration,
    isConnecting,
    connectionData,
    setConnectionData,
    handleConnect,
    handleDisconnect
  } = useIntegrations();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  const connectedCount = integrations.filter(int => int.status === 'connected').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your favorite apps and services to extend functionality
          </p>
        </div>
        <Card className="w-fit">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {connectedCount}
              </Badge>
              <span className="text-sm text-muted-foreground">Connected</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  connectionData={connectionData}
                  setConnectionData={setConnectionData}
                  selectedIntegration={selectedIntegration}
                  setSelectedIntegration={setSelectedIntegration}
                  isConnecting={isConnecting}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>No integrations found</CardTitle>
                  <CardDescription>
                    There are no integrations available in this category yet.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default IntegrationPanel;
