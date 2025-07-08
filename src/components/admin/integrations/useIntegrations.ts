
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Integration, ConnectionData } from './types';
import { integrations as initialIntegrations } from './integrationData';

export const useIntegrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionData, setConnectionData] = useState<ConnectionData>({
    apiKey: '',
    shopUrl: '',
    webhookUrl: '',
    phoneNumber: '',
    accessToken: '',
  });

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

  return {
    integrations,
    selectedIntegration,
    setSelectedIntegration,
    isConnecting,
    connectionData,
    setConnectionData,
    handleConnect,
    handleDisconnect
  };
};
