
import React from 'react';
import { Eye, Share2, TrendingUp, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PerformanceMetricsProps {
  metrics: {
    totalViews: number;
    totalShares: number;
    avgSeoScore: number;
    totalComments: number;
  }
}

const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-800 p-3 rounded-full mb-2">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">{metrics.totalViews.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Total Views</p>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-violet-100 text-violet-800 p-3 rounded-full mb-2">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">{metrics.totalShares.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Social Shares</p>
            <p className="text-xs text-green-600 mt-1">+8% from last month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 text-orange-800 p-3 rounded-full mb-2">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">{metrics.avgSeoScore}%</h3>
            <p className="text-sm text-muted-foreground">Avg. SEO Score</p>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 text-green-800 p-3 rounded-full mb-2">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">{metrics.totalComments.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Comments</p>
            <p className="text-xs text-green-600 mt-1">+15% from last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
