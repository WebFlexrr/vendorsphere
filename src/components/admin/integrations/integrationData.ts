
import { 
  ShoppingBag, 
  Webhook, 
  MessageCircle, 
  BarChart3, 
  Mail, 
  Facebook, 
  Zap
} from 'lucide-react';
import { Integration, Category } from './types';

export const integrations: Integration[] = [
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
];

export const categories: Category[] = [
  { id: 'all', name: 'All Integrations' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'analytics', name: 'Analytics' },
  { id: 'communication', name: 'Communication' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'automation', name: 'Automation' }
];
