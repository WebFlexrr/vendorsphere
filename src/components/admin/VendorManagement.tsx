
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Users, CheckCircle2, XCircle, Building2, ShieldCheck } from 'lucide-react';

const VendorManagement = () => {
  const { toast } = useToast();

  // Mock vendor data
  const pendingVendors = [
    { id: 1, name: 'Craft Delights', category: 'Artisan Crafts', status: 'pending', appliedDate: '2024-02-15' },
    { id: 2, name: 'Tech Innovations', category: 'Electronics', status: 'pending', appliedDate: '2024-02-14' },
    { id: 3, name: 'Green Living', category: 'Home & Garden', status: 'pending', appliedDate: '2024-02-13' },
  ];

  const activeVendors = [
    { id: 4, name: 'Artisan Crafts', category: 'Home Decor', status: 'active', joinedDate: '2024-01-15', rating: 4.8 },
    { id: 5, name: 'Tech Universe', category: 'Electronics', status: 'active', joinedDate: '2024-01-10', rating: 4.5 },
    { id: 6, name: 'Fashion Forward', category: 'Fashion', status: 'active', joinedDate: '2024-01-01', rating: 4.9 },
  ];

  const handleApprove = (vendorId: number) => {
    toast({
      title: "Vendor Approved",
      description: "The vendor application has been approved successfully.",
    });
  };

  const handleReject = (vendorId: number) => {
    toast({
      title: "Vendor Rejected",
      description: "The vendor application has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vendor Management</h1>
        <Badge variant="outline" className="bg-vsphere-light">
          {activeVendors.length} Active Vendors
        </Badge>
      </div>

      <Tabs defaultValue="applications">
        <TabsList>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Active Vendors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Pending Applications ({pendingVendors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div>
                      <h3 className="font-medium">{vendor.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        <span>Category: {vendor.category}</span>
                        <span className="mx-2">•</span>
                        <span>Applied: {vendor.appliedDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(vendor.id)}
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(vendor.id)}
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {activeVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-vsphere-light/50 flex items-center justify-center">
                        <span className="text-lg font-medium text-vsphere-primary">
                          {vendor.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{vendor.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          <span>Category: {vendor.category}</span>
                          <span className="mx-2">•</span>
                          <span>Joined: {vendor.joinedDate}</span>
                          <span className="mx-2">•</span>
                          <span>Rating: {vendor.rating}★</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorManagement;
