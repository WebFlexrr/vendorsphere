
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useVendorStore } from '@/stores/vendor-store';
import { Search, User, Users, Star, Phone, Mail, Calendar, Download } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const VendorManagement = () => {
  const {
    pendingVendors,
    activeVendors,
    searchQuery,
    setSearchQuery,
    setFilterCategory,
    getFilteredPendingVendors,
    getFilteredActiveVendors,
    approveVendor,
    rejectVendor,
    updateVendorRating,
    selectedVendor,
    setSelectedVendor,
  } = useVendorStore();

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('pending');

  const handleViewVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  const handleCloseDetails = () => {
    setSelectedVendor(null);
  };

  const handleApproveVendor = (vendorId: number) => {
    approveVendor(vendorId);
    toast({
      title: 'Vendor Approved',
      description: 'Vendor has been approved and moved to active vendors.',
    });
  };

  const handleRejectVendor = (vendorId: number) => {
    rejectVendor(vendorId);
    toast({
      title: 'Vendor Rejected',
      description: 'Vendor application has been rejected.',
      variant: 'destructive',
    });
  };

  const handleRatingChange = (vendorId: number, rating: number) => {
    updateVendorRating(vendorId, rating);
  };

  const handleExportVendors = (vendorType: 'pending' | 'active') => {
    const vendors = vendorType === 'pending' ? getFilteredPendingVendors() : getFilteredActiveVendors();
    
    if (vendors.length === 0) {
      toast({
        title: 'No vendors to export',
        description: 'There are no vendors matching your current filters.',
        variant: 'destructive',
      });
      return;
    }
    
    const formattedData = vendors.map(vendor => ({
      ID: vendor.id,
      Name: vendor.name,
      Category: vendor.category,
      Status: vendor.status,
      Email: vendor.email || 'N/A',
      Phone: vendor.phone || 'N/A',
      Address: vendor.address || 'N/A',
      Description: vendor.description || 'N/A',
      'Applied Date': vendor.appliedDate || 'N/A',
      'Joined Date': vendor.joinedDate || 'N/A',
      Rating: vendor.rating || 'N/A'
    }));
    
    exportToCSV(formattedData, `${vendorType}-vendors-${new Date().toISOString().split('T')[0]}`);
    
    toast({
      title: 'Export Successful',
      description: `${vendors.length} vendors have been exported to CSV.`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-7 w-7" />
          Vendor Management
        </h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => handleExportVendors(activeTab as 'pending' | 'active')}
        >
          <Download className="h-4 w-4" /> 
          Export to CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search vendors by name or category..."
          className="pl-10 w-full sm:max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="pending" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending Applications ({getFilteredPendingVendors().length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active Vendors ({getFilteredActiveVendors().length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Pending Vendor Applications</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleExportVendors('pending')}
                >
                  <Download className="h-3.5 w-3.5" /> 
                  Export Pending
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getFilteredPendingVendors().length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No pending vendor applications found</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {getFilteredPendingVendors().map((vendor, index) => (
                    <motion.div 
                      key={vendor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden">
                        <div className={`p-4 bg-vsphere-primary/10 border-b flex justify-between items-start`}>
                          <div>
                            <h3 className="font-bold">{vendor.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{vendor.category}</p>
                          </div>
                          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-medium px-2 py-1 rounded-full">
                            Pending
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{vendor.email}</span>
                          </div>
                          {vendor.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span>{vendor.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>Applied: {vendor.appliedDate}</span>
                          </div>
                          <div className="pt-2 flex gap-2">
                            <Button 
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveVendor(vendor.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:border-red-900 dark:hover:border-red-800"
                              onClick={() => handleRejectVendor(vendor.id)}
                            >
                              Reject
                            </Button>
                          </div>
                          <Button variant="link" className="w-full" onClick={() => handleViewVendor(vendor)}>
                            View Details
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Active Vendors</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleExportVendors('active')}
                >
                  <Download className="h-3.5 w-3.5" /> 
                  Export Active
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getFilteredActiveVendors().length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No active vendors found</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {getFilteredActiveVendors().map((vendor, index) => (
                    <motion.div 
                      key={vendor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden">
                        <div className={`p-4 bg-vsphere-primary/10 border-b flex justify-between items-start`}>
                          <div>
                            <h3 className="font-bold">{vendor.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{vendor.category}</p>
                          </div>
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">
                            Active
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{vendor.email}</span>
                          </div>
                          {vendor.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span>{vendor.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>Joined: {vendor.joinedDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">{vendor.rating}</span>
                            <div className="flex gap-1 ml-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  className={`h-5 w-5 rounded-full ${
                                    star <= (vendor.rating || 0) 
                                      ? 'bg-amber-500' 
                                      : 'bg-gray-200 dark:bg-gray-700'
                                  }`}
                                  onClick={() => handleRatingChange(vendor.id, star)}
                                />
                              ))}
                            </div>
                          </div>
                          <Button variant="link" className="w-full" onClick={() => handleViewVendor(vendor)}>
                            View Details
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedVendor && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedVendor.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{selectedVendor.category}</p>
              </div>
              <div className={`${
                selectedVendor.status === 'pending' 
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200' 
                  : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
              } px-3 py-1 rounded-full text-sm font-medium`}>
                {selectedVendor.status === 'pending' ? 'Pending' : 'Active'}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{selectedVendor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{selectedVendor.email}</span>
                  </div>
                  {selectedVendor.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{selectedVendor.phone}</span>
                    </div>
                  )}
                  {selectedVendor.address && (
                    <div className="flex items-start gap-2">
                      <div className="mt-1">📍</div>
                      <span>{selectedVendor.address}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Vendor Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span>{selectedVendor.category}</span>
                  </div>
                  {selectedVendor.appliedDate && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Applied:</span>
                      <span>{selectedVendor.appliedDate}</span>
                    </div>
                  )}
                  {selectedVendor.joinedDate && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Joined:</span>
                      <span>{selectedVendor.joinedDate}</span>
                    </div>
                  )}
                  {selectedVendor.rating !== undefined && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                      <div className="flex items-center">
                        <span className="mr-2">{selectedVendor.rating}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${
                                star <= selectedVendor.rating! 
                                  ? 'text-amber-500 fill-amber-500' 
                                  : 'text-gray-300 dark:text-gray-600'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {selectedVendor.description && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  {selectedVendor.description}
                </p>
              </div>
            )}
            
            <div className="mt-8 flex gap-3 justify-end">
              {selectedVendor.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:border-red-300"
                    onClick={() => {
                      handleRejectVendor(selectedVendor.id);
                      handleCloseDetails();
                    }}
                  >
                    Reject
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleApproveVendor(selectedVendor.id);
                      handleCloseDetails();
                    }}
                  >
                    Approve Vendor
                  </Button>
                </>
              )}
              <Button onClick={handleCloseDetails}>Close</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default VendorManagement;
