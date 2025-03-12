
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, PieChart, Package } from 'lucide-react';

interface Product {
  name: string;
  category: string;
  sales: number;
  revenue: number;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

interface OverviewChartsProps {
  topProducts: Product[];
  trafficSources: TrafficSource[];
}

const OverviewCharts: React.FC<OverviewChartsProps> = ({ topProducts, trafficSources }) => {
  return (
    <>
      {/* Charts Section */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base md:text-lg">
              <span>Revenue Trends</span>
              <Badge variant="outline" className="text-xs self-start sm:self-auto bg-vsphere-light/50 whitespace-nowrap">
                Last 30 days
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
              <div className="flex flex-col items-center text-gray-400">
                <LineChart className="h-8 w-8 md:h-12 md:w-12 mb-2" />
                <p className="text-xs md:text-sm text-center">Revenue trend chart visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base md:text-lg">
              <span>Sales by Category</span>
              <Badge variant="outline" className="text-xs self-start sm:self-auto bg-vsphere-light/50 whitespace-nowrap">
                Last 30 days
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
              <div className="flex flex-col items-center text-gray-400">
                <PieChart className="h-8 w-8 md:h-12 md:w-12 mb-2" />
                <p className="text-xs md:text-sm text-center">Category distribution chart visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analysis Sections */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 mt-4 md:mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className={`h-7 w-7 md:h-8 md:w-8 rounded-full flex items-center justify-center bg-vsphere-${index % 2 === 0 ? 'primary' : 'secondary'}/10 text-vsphere-${index % 2 === 0 ? 'primary' : 'secondary'}`}>
                      <Package className="h-3 w-3 md:h-4 md:w-4" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-medium">{product.name}</p>
                      <p className="text-xs md:text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm md:text-base font-medium">${product.revenue.toLocaleString()}</p>
                    <p className="text-xs md:text-sm text-gray-500">{product.sales} units</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="space-y-1 md:space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span>{source.source}</span>
                    <span className="font-medium">{source.visitors.toLocaleString()} visitors</span>
                  </div>
                  <div className="w-full h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-vsphere-primary' :
                        index === 1 ? 'bg-vsphere-secondary' :
                        index === 2 ? 'bg-vsphere-accent' :
                        index === 3 ? 'bg-vsphere-mint' : 'bg-vsphere-skyblue'
                      }`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewCharts;
