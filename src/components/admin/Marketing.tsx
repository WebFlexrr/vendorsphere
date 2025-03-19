
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Search, 
  Target, 
  Globe, 
  Link, 
  Share, 
  Download,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Marketing = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Marketing Analytics</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="seo">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="seo">SEO Metrics</TabsTrigger>
          <TabsTrigger value="google">Google Ads</TabsTrigger>
          <TabsTrigger value="meta">Meta Ads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="seo" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard 
              title="Organic Traffic" 
              value="15,420" 
              change="+12.5%" 
              trend="up" 
              icon={Globe} 
            />
            <MetricCard 
              title="Search Position" 
              value="#3.2" 
              change="-0.5" 
              trend="down" 
              icon={Search} 
            />
            <MetricCard 
              title="Backlinks" 
              value="842" 
              change="+56" 
              trend="up" 
              icon={Link} 
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Organic Search Traffic</CardTitle>
              <CardDescription>Last 30 days compared to previous period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
                <div className="flex flex-col items-center text-gray-400">
                  <TrendingUp className="h-12 w-12 mb-2" />
                  <p>Organic traffic trend chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{keyword.term}</p>
                        <p className="text-sm text-gray-500">Position: {keyword.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{keyword.traffic.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">monthly visits</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full flex items-center gap-2 mt-2">
                    View all keywords <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Landing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLandingPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{page.title}</p>
                        <p className="text-sm text-gray-500">{page.path}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{page.visitors.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">visitors</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full flex items-center gap-2 mt-2">
                    View all pages <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="google" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard 
              title="Ad Spend" 
              value="$4,850" 
              change="+$320" 
              trend="up" 
              icon={Target} 
            />
            <MetricCard 
              title="Impressions" 
              value="125.4K" 
              change="+15.2%" 
              trend="up" 
              icon={Globe} 
            />
            <MetricCard 
              title="Conv. Rate" 
              value="3.2%" 
              change="+0.4%" 
              trend="up" 
              icon={Share} 
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Google Ads Performance</CardTitle>
              <CardDescription>Click-through rate and conversion data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
                <div className="flex flex-col items-center text-gray-400">
                  <TrendingUp className="h-12 w-12 mb-2" />
                  <p>Google Ads performance chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-2">Campaign</th>
                      <th className="text-right font-medium p-2">Spend</th>
                      <th className="text-right font-medium p-2">Clicks</th>
                      <th className="text-right font-medium p-2">Conv.</th>
                      <th className="text-right font-medium p-2">CPC</th>
                      <th className="text-right font-medium p-2">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {googleCampaigns.map((campaign, index) => (
                      <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-2 font-medium">{campaign.name}</td>
                        <td className="p-2 text-right">${campaign.spend}</td>
                        <td className="p-2 text-right">{campaign.clicks}</td>
                        <td className="p-2 text-right">{campaign.conversions}</td>
                        <td className="p-2 text-right">${campaign.cpc}</td>
                        <td className="p-2 text-right">{campaign.roas}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="meta" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard 
              title="Ad Spend" 
              value="$3,250" 
              change="-$150" 
              trend="down" 
              icon={Target} 
            />
            <MetricCard 
              title="Reach" 
              value="98.7K" 
              change="+8.4%" 
              trend="up" 
              icon={Globe} 
            />
            <MetricCard 
              title="CTR" 
              value="2.8%" 
              change="+0.3%" 
              trend="up" 
              icon={Share} 
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Meta Ads Performance</CardTitle>
              <CardDescription>Campaign performance across Facebook and Instagram</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
                <div className="flex flex-col items-center text-gray-400">
                  <TrendingUp className="h-12 w-12 mb-2" />
                  <p>Meta Ads performance chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ad Set Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-2">Ad Set</th>
                      <th className="text-right font-medium p-2">Spend</th>
                      <th className="text-right font-medium p-2">Impr.</th>
                      <th className="text-right font-medium p-2">Clicks</th>
                      <th className="text-right font-medium p-2">CPC</th>
                      <th className="text-right font-medium p-2">Conv.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metaAdSets.map((adSet, index) => (
                      <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-2 font-medium">{adSet.name}</td>
                        <td className="p-2 text-right">${adSet.spend}</td>
                        <td className="p-2 text-right">{adSet.impressions}</td>
                        <td className="p-2 text-right">{adSet.clicks}</td>
                        <td className="p-2 text-right">${adSet.cpc}</td>
                        <td className="p-2 text-right">{adSet.conversions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
                <div className="flex flex-col items-center text-gray-400">
                  <Target className="h-12 w-12 mb-2" />
                  <p>Audience demographics chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Sample data for the Marketing component
const topKeywords = [
  { term: 'wireless earbuds', position: 2, traffic: 3250 },
  { term: 'smart watch deals', position: 1, traffic: 2840 },
  { term: 'organic skincare products', position: 3, traffic: 1950 },
  { term: 'home office furniture', position: 4, traffic: 1780 },
  { term: 'fitness equipment', position: 2, traffic: 1650 },
];

const topLandingPages = [
  { title: 'Wireless Earbuds Pro', path: '/products/wireless-earbuds', visitors: 2840 },
  { title: 'Smart Watch Collection', path: '/category/smart-watches', visitors: 2350 },
  { title: 'Home Office Essentials', path: '/collections/home-office', visitors: 1820 },
  { title: 'Vendor: Tech Innovations', path: '/vendors/tech-innovations', visitors: 1540 },
  { title: 'Summer Sale', path: '/promotions/summer-sale', visitors: 1420 },
];

const googleCampaigns = [
  { name: 'Electronics - Search', spend: 1850, clicks: 3240, conversions: 98, cpc: 0.57, roas: 3.2 },
  { name: 'Home Goods - Display', spend: 1200, clicks: 2850, conversions: 62, cpc: 0.42, roas: 2.8 },
  { name: 'Fashion - Search', spend: 950, clicks: 1920, conversions: 45, cpc: 0.49, roas: 2.5 },
  { name: 'Beauty - Display', spend: 850, clicks: 2100, conversions: 38, cpc: 0.40, roas: 2.1 },
];

const metaAdSets = [
  { name: 'Electronics - Carousel', spend: 1250, impressions: '45.2K', clicks: 1450, cpc: 0.86, conversions: 72 },
  { name: 'Home Goods - Image', spend: 850, impressions: '32.8K', clicks: 980, cpc: 0.87, conversions: 45 },
  { name: 'Summer Sale - Video', spend: 750, impressions: '28.5K', clicks: 1120, cpc: 0.67, conversions: 52 },
  { name: 'New Arrivals - Stories', spend: 400, impressions: '18.9K', clicks: 520, cpc: 0.77, conversions: 28 },
];

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
              {trend === 'up' ? 
                <ArrowUpRight className="h-3 w-3 text-green-600 ml-1" /> : 
                <ArrowDownRight className="h-3 w-3 text-red-600 ml-1" />
              }
              <span className="text-xs text-gray-500 ml-1">vs previous period</span>
            </div>
          </div>
          <div className={`bg-vsphere-${trend === 'up' ? 'primary' : 'secondary'}/10 p-2 rounded-md`}>
            <Icon className={`h-5 w-5 text-vsphere-${trend === 'up' ? 'primary' : 'secondary'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Marketing;
