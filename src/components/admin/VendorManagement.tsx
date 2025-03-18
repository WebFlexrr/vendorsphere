import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, Search, Plus, Filter, Eye, Edit, 
  Trash, CheckCircle, XCircle, Clock, Star 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DownloadCSVButton from './DownloadCSVButton';

// Sample vendor data
const vendors = [
  {
    id: 1,
    name: 'TechAudio Inc.',
    contact: 'John Smith',
    email: 'john@techaudio.com',
    phone: '(555) 123-4567',
    products: 24,
    status: 'Active',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Natural Essentials',
    contact: 'Emily Johnson',
    email: 'emily@naturalessentials.com',
    phone: '(555) 234-5678',
    products: 42,
    status: 'Active',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Fashion Basics',
    contact: 'Michael Lee',
    email: 'michael@fashionbasics.com',
    phone: '(555) 345-6789',
    products: 86,
    status: 'Active',
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Kitchen Essentials',
    contact: 'Sarah Williams',
    email: 'sarah@kitchenessentials.com',
    phone: '(555) 456-7890',
    products: 31,
    status: 'Pending',
    rating: 0,
  },
  {
    id: 5,
    name: 'SoundWave',
    contact: 'David Brown',
    email: 'david@soundwave.com',
    phone: '(555) 567-8901',
    products: 18,
    status: 'Active',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Wellness Co.',
    contact: 'Jessica Miller',
    email: 'jessica@wellnessco.com',
    phone: '(555) 678-9012',
    products: 29,
    status: 'Active',
    rating: 4.9,
  },
  {
    id: 7,
    name: 'LeatherCraft',
    contact: 'Robert Davis',
    email: 'robert@leathercraft.com',
    phone: '(555) 789-0123',
    products: 14,
    status: 'Inactive',
    rating: 4.0,
  },
  {
    id: 8,
    name: 'SmartLiving',
    contact: 'Jennifer Wilson',
    email: 'jennifer@smartliving.com',
    phone: '(555) 890-1234',
    products: 37,
    status: 'Active',
    rating: 4.7,
  },
  {
    id: 9,
    name: 'GreenGarden',
    contact: 'Thomas Moore',
    email: 'thomas@greengarden.com',
    phone: '(555) 901-2345',
    products: 22,
    status: 'Pending',
    rating: 0,
  },
  {
    id: 10,
    name: 'TimeTech',
    contact: 'Lisa Taylor',
    email: 'lisa@timetech.com',
    phone: '(555) 012-3456',
    products: 7,
    status: 'Inactive',
    rating: 3.5,
  },
];

const VendorManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Vendor Management</h1>
        <div className="flex items-center gap-2">
          <DownloadCSVButton 
            data={vendors} 
            filename="vendors-list" 
            label="Export Vendors"
          />
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Vendor
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search vendors..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all-vendors">
        <TabsList>
          <TabsTrigger value="all-vendors">All Vendors</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all-vendors">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                All Vendors
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">
                          {vendor.name}
                        </TableCell>
                        <TableCell>{vendor.contact}</TableCell>
                        <TableCell>{vendor.email}</TableCell>
                        <TableCell className="text-right">{vendor.products}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              vendor.status === 'Active' 
                                ? 'default' 
                                : vendor.status === 'Pending' 
                                  ? 'outline' 
                                  : 'secondary'
                            }
                            className="flex w-fit items-center gap-1"
                          >
                            {vendor.status === 'Active' ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : vendor.status === 'Pending' ? (
                              <Clock className="h-3 w-3" />
                            ) : (
                              <XCircle className="h-3 w-3" />
                            )}
                            {vendor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {vendor.rating > 0 ? (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-vsphere-accent text-vsphere-accent mr-1" />
                              <span>{vendor.rating.toFixed(1)}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                Active Vendors
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors
                      .filter((vendor) => vendor.status === 'Active')
                      .map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">
                            {vendor.name}
                          </TableCell>
                          <TableCell>{vendor.contact}</TableCell>
                          <TableCell>{vendor.email}</TableCell>
                          <TableCell className="text-right">{vendor.products}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                vendor.status === 'Active'
                                  ? 'default'
                                  : vendor.status === 'Pending'
                                    ? 'outline'
                                    : 'secondary'
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {vendor.status === 'Active' ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : vendor.status === 'Pending' ? (
                                <Clock className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}
                              {vendor.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {vendor.rating > 0 ? (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-vsphere-accent text-vsphere-accent mr-1" />
                                <span>{vendor.rating.toFixed(1)}</span>
                              </div>
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                Pending Vendors
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors
                      .filter((vendor) => vendor.status === 'Pending')
                      .map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">
                            {vendor.name}
                          </TableCell>
                          <TableCell>{vendor.contact}</TableCell>
                          <TableCell>{vendor.email}</TableCell>
                          <TableCell className="text-right">{vendor.products}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                vendor.status === 'Active'
                                  ? 'default'
                                  : vendor.status === 'Pending'
                                    ? 'outline'
                                    : 'secondary'
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {vendor.status === 'Active' ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : vendor.status === 'Pending' ? (
                                <Clock className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}
                              {vendor.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {vendor.rating > 0 ? (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-vsphere-accent text-vsphere-accent mr-1" />
                                <span>{vendor.rating.toFixed(1)}</span>
                              </div>
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                Inactive Vendors
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors
                      .filter((vendor) => vendor.status === 'Inactive')
                      .map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">
                            {vendor.name}
                          </TableCell>
                          <TableCell>{vendor.contact}</TableCell>
                          <TableCell>{vendor.email}</TableCell>
                          <TableCell className="text-right">{vendor.products}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                vendor.status === 'Active'
                                  ? 'default'
                                  : vendor.status === 'Pending'
                                    ? 'outline'
                                    : 'secondary'
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {vendor.status === 'Active' ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : vendor.status === 'Pending' ? (
                                <Clock className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}
                              {vendor.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {vendor.rating > 0 ? (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-vsphere-accent text-vsphere-accent mr-1" />
                                <span>{vendor.rating.toFixed(1)}</span>
                              </div>
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorManagement;
