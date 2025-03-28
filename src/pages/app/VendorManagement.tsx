import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Users, CheckCircle2, XCircle, Building2, ShieldCheck, Edit, Star, Search, Plus, Download, FilePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVendorStore } from '@/stores/vendor-store';


const VendorManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null);

  const initialNewVendor = {
    id: 0,
    name: '',
    category: '',
    status: 'pending',
    appliedDate: new Date().toISOString().split('T')[0],
    email: '',
    phone: '',
    address: '',
    description: ''
  };

  const [newVendor, setNewVendor] = useState<Vendor>(initialNewVendor);


  const pendingVendors = useVendorStore(state=>state.pendingVendors)
  const activeVendors = useVendorStore(state => state.activeVendors);
  const approveVendor =useVendorStore(state=>state.approveVendor)
  const rejectVendor =useVendorStore(state=>state.rejectVendor)
  const deleteVendor = useVendorStore(state=>state.deleteVendor)
  const selectedVendor = useVendorStore(state=>state.selectedVendor)
  const setSelectedVendor = useVendorStore(state=>state.setSelectedVendor)

  const filteredPendingVendors = searchQuery
    ? pendingVendors.filter(vendor =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : pendingVendors;

  const filteredActiveVendors = searchQuery
    ? activeVendors.filter(vendor =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : activeVendors;

  const handleApprove = async(vendorId: number) => {
    // const vendorToApprove = pendingVendors.find(v => v.id === vendorId);
    // if (!vendorToApprove) return;

    // const updatedVendor = {
    //   ...vendorToApprove,
    //   status: 'active',
    //   joinedDate: new Date().toISOString().split('T')[0],
    //   rating: 0
    // };

    // setPendingVendors(pendingVendors.filter(v => v.id !== vendorId));
    // setActiveVendors([...activeVendors, updatedVendor]);
    approveVendor(vendorId)

    toast({
      title: "Vendor Approved",
      description: `${vendorId} has been approved successfully.`,
    });
  };

  const handleReject = (vendorId: number) => {
    // const vendorToReject = pendingVendors.find(v => v.id === vendorId);
    // if (!vendorToReject) return;

    // setPendingVendors(pendingVendors.filter(v => v.id !== vendorId));

    rejectVendor(vendorId)

    toast({
      title: "Vendor Rejected",
      description: `${vendorId}'s application has been rejected.`,
      variant: "destructive",
    });
  };

  const handleViewVendor = (vendor: Vendor) => {
    // setCurrentVendor(vendor);
    setSelectedVendor(vendor)
    setIsViewModalOpen(true);
  };

  const handleEditVendor = (vendor: Vendor) => {
    // setCurrentVendor(vendor);
    setSelectedVendor(vendor);
    setIsEditModalOpen(true);
  };

  const handleSaveVendor = (updatedVendor: Vendor) => {
    if (updatedVendor.status === 'active') {
      setActiveVendors(activeVendors.map(v =>
        v.id === updatedVendor.id ? updatedVendor : v
      ));
    } else {
      setPendingVendors(pendingVendors.map(v =>
        v.id === updatedVendor.id ? updatedVendor : v
      ));
    }

    toast({
      title: "Vendor Updated",
      description: `${updatedVendor.name}'s information has been updated.`,
    });

    setIsEditModalOpen(false);
  };

  const handleCreateVendor = () => {
    const newId = Math.max(...[...pendingVendors, ...activeVendors].map(v => v.id), 0) + 1;
    const vendorToAdd = { ...newVendor, id: newId };

    setPendingVendors([...pendingVendors, vendorToAdd]);
    setIsCreateModalOpen(false);
    setNewVendor(initialNewVendor);

    toast({
      title: "Vendor Created",
      description: `${vendorToAdd.name} has been added to pending vendors.`,
    });
  };

  const handleExportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Vendor data is being exported as an Excel file.",
    });

    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Vendor data has been exported successfully.",
      });
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Vendor
  ) => {
    setNewVendor({
      ...newVendor,
      [field]: e.target.value
    });
  };

  const handleSelectChange = (value: string, field: keyof Vendor) => {
    setNewVendor({
      ...newVendor,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vendor Management</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportToExcel}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
          <Badge variant="outline" className="bg-vsphere-light">
            {activeVendors.length} Active Vendors
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Vendor
        </Button>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search vendors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
                Pending Applications ({filteredPendingVendors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPendingVendors.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No pending vendor applications found.</p>
                ) : (
                  filteredPendingVendors.map((vendor) => (
                    <Card key={vendor.id} className="flex shadow-none items-center justify-between p-4 border rounded-lg bg-card">
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
                          onClick={() => handleViewVendor(vendor)}
                          variant="ghost"
                          size="sm"
                        >
                          View Details
                        </Button>
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
                    </Card>
                  ))
                )}
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
                {filteredActiveVendors.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No active vendors found.</p>
                ) : (
                  filteredActiveVendors.map((vendor) => (
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
                            <span className="flex items-center">
                              Rating: {vendor.rating}
                              <Star className="h-3 w-3 text-yellow-500 ml-0.5" fill="currentColor" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleViewVendor(vendor)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleEditVendor(vendor)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isViewModalOpen && selectedVendor && (
        <Dialog open={isViewModalOpen} onOpenChange={() => setIsViewModalOpen(false)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Vendor Details
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b">
                <div className="h-16 w-16 rounded-full bg-vsphere-light/50 flex items-center justify-center">
                  <span className="text-2xl font-medium text-vsphere-primary">
                    {selectedVendor.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedVendor.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline">{selectedVendor.category}</Badge>
                    <Badge className={selectedVendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {selectedVendor.status === 'active' ? 'Active' : 'Pending'}
                    </Badge>
                    {selectedVendor.rating && (
                      <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
                        {selectedVendor.rating} <Star className="h-3 w-3" fill="currentColor" />
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p>{selectedVendor.email || 'N/A'}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p>{selectedVendor.phone || 'N/A'}</p>
                </div>

                {selectedVendor.address && (
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Address</Label>
                    <p>{selectedVendor.address}</p>
                  </div>
                )}

                <div>
                  <Label className="text-muted-foreground">
                    {selectedVendor.status === 'active' ? 'Joined Date' : 'Applied Date'}
                  </Label>
                  <p>{selectedVendor.joinedDate || selectedVendor.appliedDate}</p>
                </div>
              </div>

              {selectedVendor.description && (
                <div className="mt-2">
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="mt-1">{selectedVendor.description}</p>
                </div>
              )}
            </div>

            <DialogFooter className="flex justify-between">
              {selectedVendor.status === 'pending' ? (
                <>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      handleReject(selectedVendor.id);
                      setIsViewModalOpen(false);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    className="bg-vsphere-primary hover:bg-vsphere-primary/90"
                    onClick={() => {
                      handleApprove(selectedVendor.id);
                      setIsViewModalOpen(false);
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsViewModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      handleEditVendor(selectedVendor);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Vendor
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isEditModalOpen && selectedVendor && (
        <Dialog open={isEditModalOpen} onOpenChange={() => setIsEditModalOpen(false)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Vendor
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={(e) => {
              e.preventDefault();

              const formData = new FormData(e.currentTarget);
              const updatedVendor = {
                ...selectedVendor,
                name: formData.get('name') as string,
                category: formData.get('category') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                address: formData.get('address') as string,
                description: formData.get('description') as string,
              };

              handleSaveVendor(updatedVendor);
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={selectedVendor.name}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={selectedVendor.category}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={selectedVendor.email}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={selectedVendor.phone}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={selectedVendor.address}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={selectedVendor.description}
                    className="col-span-3"
                    rows={3}
                  />
                </div>

                {selectedVendor.status === 'active' && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rating" className="text-right">Rating</Label>
                    <div className="flex items-center col-span-3">
                      <Input
                        id="rating"
                        name="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        defaultValue={selectedVendor.rating}
                        className="w-24"
                      />
                      <Star className="h-4 w-4 text-yellow-500 ml-2" fill="currentColor" />
                      <span className="text-sm text-muted-foreground ml-2">(0-5)</span>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-vsphere-primary hover:bg-vsphere-primary/90">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FilePlus className="h-5 w-5" />
              Create New Vendor
            </DialogTitle>
            <DialogDescription>
              Create a new vendor profile. The vendor will start as pending until approved.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleCreateVendor();
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-name" className="text-right">Name</Label>
                <Input
                  id="new-name"
                  value={newVendor.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-category" className="text-right">Category</Label>
                <Input
                  id="new-category"
                  value={newVendor.category}
                  onChange={(e) => handleInputChange(e, 'category')}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-email" className="text-right">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newVendor.email || ''}
                  onChange={(e) => handleInputChange(e, 'email')}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-phone" className="text-right">Phone</Label>
                <Input
                  id="new-phone"
                  value={newVendor.phone || ''}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-address" className="text-right">Address</Label>
                <Input
                  id="new-address"
                  value={newVendor.address || ''}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="new-description" className="text-right pt-2">Description</Label>
                <Textarea
                  id="new-description"
                  value={newVendor.description || ''}
                  onChange={(e) => handleInputChange(e, 'description')}
                  className="col-span-3"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-status" className="text-right">Status</Label>
                <Select
                  value={newVendor.status}
                  onValueChange={(value) => handleSelectChange(value, 'status')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Vendor
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorManagement;
