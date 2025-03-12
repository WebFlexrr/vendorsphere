
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Users, Calendar } from 'lucide-react';

const RetentionTab = () => {
  // Mock data for retention cohorts
  const retentionCohorts = [
    { month: 'January', cohortSize: 285, retention: [100, 65, 48, 42, 38, 35] },
    { month: 'February', cohortSize: 352, retention: [100, 68, 51, 44, 40] },
    { month: 'March', cohortSize: 410, retention: [100, 72, 56, 48] },
    { month: 'April', cohortSize: 389, retention: [100, 70, 53] },
    { month: 'May', cohortSize: 425, retention: [100, 67] },
    { month: 'June', cohortSize: 476, retention: [100] },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Customer Retention Rate</div>
              <div className="bg-vsphere-primary/10 p-2 rounded-md">
                <RefreshCw className="h-5 w-5 text-vsphere-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold">42.5%</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              +2.8% <span className="ml-1">↑</span>
              <span className="text-gray-500 ml-1">vs last quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Returning Customers</div>
              <div className="bg-vsphere-secondary/10 p-2 rounded-md">
                <Users className="h-5 w-5 text-vsphere-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold">1,254</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              +156 <span className="ml-1">↑</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Avg. Customer Lifetime</div>
              <div className="bg-vsphere-accent/10 p-2 rounded-md">
                <Calendar className="h-5 w-5 text-vsphere-dark" />
              </div>
            </div>
            <div className="text-3xl font-bold">8.3 mo</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              +0.5 <span className="ml-1">↑</span>
              <span className="text-gray-500 ml-1">vs last quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Retention Cohort Analysis</CardTitle>
          <Badge variant="outline" className="bg-vsphere-light/50">
            Last 6 months
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
            <div className="flex flex-col items-center text-gray-400">
              <RefreshCw className="h-12 w-12 mb-2" />
              <p>Retention cohort visualization</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Cohort Retention (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2">Cohort</th>
                  <th className="text-left font-medium p-2">Size</th>
                  <th className="text-right font-medium p-2">Month 1</th>
                  <th className="text-right font-medium p-2">Month 2</th>
                  <th className="text-right font-medium p-2">Month 3</th>
                  <th className="text-right font-medium p-2">Month 4</th>
                  <th className="text-right font-medium p-2">Month 5</th>
                  <th className="text-right font-medium p-2">Month 6</th>
                </tr>
              </thead>
              <tbody>
                {retentionCohorts.map((cohort, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-2 font-medium">{cohort.month}</td>
                    <td className="p-2">{cohort.cohortSize}</td>
                    {[0, 1, 2, 3, 4, 5].map(month => (
                      <td key={month} className="p-2 text-right">
                        {cohort.retention[month] ? (
                          <span 
                            className={`${
                              cohort.retention[month] >= 60 ? 'text-green-600' :
                              cohort.retention[month] >= 40 ? 'text-amber-600' : 
                              'text-gray-600'
                            }`}
                          >
                            {cohort.retention[month]}%
                          </span>
                        ) : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionTab;
