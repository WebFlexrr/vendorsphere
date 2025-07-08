
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Settings, Plus } from 'lucide-react';
import { Integration, ConnectionData } from './types';
import StatusBadge from './StatusBadge';
import ConnectionForm from './ConnectionForm';

interface IntegrationCardProps {
  integration: Integration;
  connectionData: ConnectionData;
  setConnectionData: React.Dispatch<React.SetStateAction<ConnectionData>>;
  selectedIntegration: Integration | null;
  setSelectedIntegration: React.Dispatch<React.SetStateAction<Integration | null>>;
  isConnecting: boolean;
  onConnect: (integration: Integration) => void;
  onDisconnect: (integration: Integration) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  connectionData,
  setConnectionData,
  selectedIntegration,
  setSelectedIntegration,
  isConnecting,
  onConnect,
  onDisconnect
}) => {
  const IconComponent = integration.icon;

  return (
    <Card className="relative">
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
          <StatusBadge status={integration.status} />
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
                onClick={() => onDisconnect(integration)}
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
                
                {selectedIntegration && (
                  <ConnectionForm 
                    integration={selectedIntegration}
                    connectionData={connectionData}
                    setConnectionData={setConnectionData}
                  />
                )}
                
                <DialogFooter>
                  <Button 
                    onClick={() => selectedIntegration && onConnect(selectedIntegration)}
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
};

export default IntegrationCard;
