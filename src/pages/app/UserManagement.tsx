
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Search, User } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';
import { useCustomerStore } from '@/stores/customer-store';


const UserManagement = () => {
  // const [users, setUsers] = useState<UserData[]>(USERS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedUser, setSelectedUser] = useState<UserData | null>(null);



  const customers = useCustomerStore(state=>state.customer);
  const setCustomer = useCustomerStore(state=>state.setCustomer)
  const selectedCustomer = useCustomerStore(state=>state.selectedCustomer)
  const setSelectedCustomer = useCustomerStore(state=>state.setSelectedCustomer)
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setUsers(USERS_DATA);
      return;
    }

    const filtered = USERS_DATA.filter(user => 
      user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.mobile.includes(e.target.value)
    );
    setUsers(filtered);
  };

  const handleUserSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const exportUsers = () => {
    const data = customers.map(user => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Mobile: user.mobile,
      'Signup Date': user.signupDate,
      'Last Active': user.lastActive,
      Status: user.status,
      'Purchase Count': user.purchases.length,
      'Total Spent': user.purchases.reduce((sum, purchase) => sum + purchase.amount, 0).toFixed(2)
    }));
    
    exportToCSV(data, 'users-data');
  };

  const exportUserPurchases = (customer: Customer) => {
    const data = customer.purchases.map(purchase => ({
      ID: purchase.id,
      Product: purchase.productName,
      Date: purchase.date,
      Amount: purchase.amount.toFixed(2),
      Status: purchase.status
    }));
    
    exportToCSV(data, `${customer.name.replace(/\s+/g, '-').toLowerCase()}-purchases`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User className="h-7 w-7" />
          User Management
        </h1>
        <Button onClick={exportUsers} className="gap-2">
          <Download className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer ({customers.length})</CardTitle>
          <CardDescription>View and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Signup Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader><TableBody>
              {customers.map(customer => (
          
                  <TableRow key={customer.id} className="cursor-pointer" onClick={() => handleUserSelect(user)}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.mobile}</TableCell>
                  <TableCell>{customer.signupDate}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        customer.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        // e.stopPropagation();
                        handleUserSelect(customer);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedCustomer && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>User Profile: {selectedCustomer.name}</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => exportUserPurchases(selectedCustomer)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export Purchases
              </Button>
            </div>
            <CardDescription>
              Last active: {selectedCustomer.lastActive} | Status: {selectedCustomer.status}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">User Details</TabsTrigger>
                <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p>{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                    <p>{selectedCustomer.mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Signup Date</p>
                    <p>{selectedCustomer.signupDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Active</p>
                    <p>{selectedCustomer.lastActive}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p>{selectedCustomer.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                    <p>${selectedCustomer.purchases.reduce((sum, purchase) => sum + purchase.amount, 0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Purchases</p>
                    <p>{selectedCustomer.purchases.length}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="purchases" className="pt-4">
                {selectedCustomer.purchases.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedCustomer.purchases.map(purchase => (
                        <TableRow key={purchase.id}>
                          <TableCell>{purchase.id}</TableCell>
                          <TableCell>{purchase.productName}</TableCell>
                          <TableCell>{purchase.date}</TableCell>
                          <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                purchase.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                purchase.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {purchase.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No purchase history available</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;
