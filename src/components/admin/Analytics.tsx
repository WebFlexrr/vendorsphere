
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart4, 
  LineChart, 
  PieChart, 
  Download, 
  FileText, 
  Share, 
  Printer, 
  Calendar 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { exportToCSV } from '@/utils/exportUtils';

// Import components
import MetricsOverview from './analytics/MetricsOverview';
import OverviewCharts from './analytics/OverviewCharts';
import PageViewsTab from './analytics/PageViewsTab';
import ProductFrequencyTab from './analytics/ProductFrequencyTab';
import RetentionTab from './analytics/RetentionTab';

// Sample data for export
const analyticsData = [
  { date: '2023-06-01', pageViews: 5432, visitors: 1247, bounceRate: '36%', avgTimeOnPage: '2:34' },
  { date: '2023-06-02', pageViews: 6543, visitors: 1532, bounceRate: '32%', avgTimeOnPage: '2:56' },
  { date: '2023-06-03', pageViews: 7654, visitors: 1876, bounceRate: '28%', avgTimeOnPage: '3:12' },
  { date: '2023-06-04', pageViews: 5421, visitors: 1345, bounceRate: '33%', avgTimeOnPage: '2:45' },
  { date: '2023-06-05', pageViews: 4356, visitors: 1123, bounceRate: '35%', avgTimeOnPage: '2:21' },
  { date: '2023-06-06', pageViews: 6789, visitors: 1654, bounceRate: '29%', avgTimeOnPage: '3:05' },
  { date: '2023-06-07', pageViews: 7890, visitors: 1897, bounceRate: '27%', avgTimeOnPage: '3:18' },
];

const Analytics = () => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportTimeframe, setReportTimeframe] = useState('last-30-days');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDemographics, setIncludeDemographics] = useState(true);
  
  const generateReport = () => {
    // In a real application, this would generate a PDF report or similar
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      
      // Show a success message
      alert('Analytics report has been generated and is ready for download');
      
      // In a real app, we would provide a download link or open the PDF
    }, 2000);
  };
  
  const downloadCSV = () => {
    exportToCSV(analyticsData, 'analytics-data');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button onClick={downloadCSV} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button onClick={() => generateReport()} disabled={isGeneratingReport} className="flex items-center gap-2">
            {isGeneratingReport ? (
              <>Generating...</>
            ) : (
              <>
                <FileText className="h-4 w-4" /> Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="page-views">Page Views</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6 pt-4">
          <MetricsOverview />
          <OverviewCharts />
        </TabsContent>
        <TabsContent value="page-views">
          <PageViewsTab />
        </TabsContent>
        <TabsContent value="products">
          <ProductFrequencyTab />
        </TabsContent>
        <TabsContent value="retention">
          <RetentionTab />
        </TabsContent>
      </Tabs>
      
      {/* Report Generation Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-vsphere-primary" />
            Analytics Report Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Report Timeframe</Label>
              <Select value={reportTimeframe} onValueChange={setReportTimeframe}>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Report Options</Label>
              <div className="flex flex-col space-y-3 pt-1">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="include-charts" 
                    checked={includeCharts}
                    onCheckedChange={setIncludeCharts}
                  />
                  <Label htmlFor="include-charts">Include charts and graphs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="include-demographics" 
                    checked={includeDemographics}
                    onCheckedChange={setIncludeDemographics}
                  />
                  <Label htmlFor="include-demographics">Include demographic data</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Report Format</Label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" className="justify-start">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
                <Button variant="outline" className="justify-start">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex justify-end gap-3">
            <Button variant="outline">Schedule Report</Button>
            <Button onClick={generateReport} disabled={isGeneratingReport}>
              {isGeneratingReport ? 'Generating...' : 'Generate Report Now'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
