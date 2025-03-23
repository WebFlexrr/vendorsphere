
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardMetrics from '../../components/admin/dashboard/DashboardMetrics';
import OverviewTab from '../../components/admin/dashboard/OverviewTab';
import AnalyticsTab from '../../components/admin/dashboard/AnalyticsTab';
import RecentActivityTab from '../../components/admin/dashboard/RecentActivityTab';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-vsphere-light text-vsphere-dark">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>

      {/* Dashboard Metrics */}
      <DashboardMetrics />

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab />
        </TabsContent>
        
        <TabsContent value="recent" className="mt-6">
          <RecentActivityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
