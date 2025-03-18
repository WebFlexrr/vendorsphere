import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, Eye, Package, TruckIcon, Printer } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DownloadCSVButton from './DownloadCSVButton';

// Sample orders data
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-06-05",
    items: 3,
    total: 149.97,
    status: "Delivered",
    payment: "Paid",
    address: "123 Main St, New York, NY 10001"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-06-05",
    items: 2,
    total: 74.98,
    status: "Processing",
    payment: "Paid",
    address: "456 Park Ave, Los Angeles, CA 90001"
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-06-04",
    items: 5,
    total: 236.95,
    status: "Shipped",
    payment: "Paid",
    address: "789 Oak St, Chicago, IL 60007"
  },
  {
    id: "ORD-004",
    customer: "Sarah Williams",
    date: "2023-06-04",
    items: 1,
    total: 49.99,
    status: "Delivered",
    payment: "Paid",
    address: "101 Pine St, Miami, FL 33101"
  },
  {
    id: "ORD-005",
    customer: "Michael Brown",
    date: "2023-06-03",
    items: 4,
    total: 157.96,
    status: "Delivered",
    payment: "Paid",
    address: "202 Maple Ave, Seattle, WA 98101"
  },
  {
    id: "ORD-006",
    customer: "Emily Davis",
    date: "2023-06-03",
    items: 2,
    total: 89.98,
    status: "Processing",
    payment: "Pending",
    address: "303 Cedar Rd, Dallas, TX 75001"
  },
  {
    id: "ORD-007",
    customer: "David Wilson",
    date: "2023-06-02",
    items: 6,
    total: 312.94,
    status: "Shipped",
    payment: "Paid",
    address: "404 Birch Ln, Boston, MA 02101"
  },
  {
    id: "ORD-008",
    customer: "Lisa Martinez",
    date: "2023-06-02",
    items: 3,
    total: 144.97,
    status: "Cancelled",
    payment: "Refunded",
    address: "505 Elm St, Denver, CO 80201"
  },
  {
    id: "ORD-009",
    customer: "James Taylor",
    date: "2023-06-01",
    items: 1,
    total: 29.99,
    status: "Delivered",
    payment: "Paid",
    address: "606 Walnut Ave, Phoenix, AZ 85001"
  },
  {
    id: "ORD-010",
    customer: "Patricia Anderson",
    date: "2023-06-01",
    items: 4,
    total: 199.96,
    status: "Shipped",
    payment: "Paid",
    address: "707 Spruce Blvd, Philadelphia, PA 19019"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-500 dark:bg-green-700';
    case 'Shipped':
      return 'bg-blue-500 dark:bg-blue-700';
    case 'Processing':
      return 'bg-orange-500 dark:bg-orange-700';
    case 'Cancelled':
      return 'bg-red-500 dark:bg-red-700';
    default:
      return 'bg-gray-500 dark:bg-gray-700';
  }
};

const OrderManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex items-center gap-2">
          <DownloadCSVButton 
            data={orders} 
            filename="orders-list" 
            label="Export Orders"
          />
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Orders
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all-orders">
        <TabsList>
          <TabsTrigger value="all-orders">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all-orders">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5" />
                All Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="text-right">{order.items}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></div>
                            <span>{order.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              order.payment === 'Paid' 
                                ? 'default' 
                                : order.payment === 'Pending' 
                                  ? 'outline' 
                                  : 'secondary'
                            }
                          >
                            {order.payment}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <TruckIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
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
        <TabsContent value="processing">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5" />
                Processing Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter((order) => order.status === "Processing")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-right">{order.items}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></div>
                              <span>{order.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.payment === "Paid"
                                  ? "default"
                                  : order.payment === "Pending"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {order.payment}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <TruckIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Printer className="h-4 w-4" />
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
        <TabsContent value="shipped">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5" />
                Shipped Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter((order) => order.status === "Shipped")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-right">{order.items}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></div>
                              <span>{order.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.payment === "Paid"
                                  ? "default"
                                  : order.payment === "Pending"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {order.payment}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <TruckIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Printer className="h-4 w-4" />
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
        <TabsContent value="delivered">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5" />
                Delivered Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter((order) => order.status === "Delivered")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-right">{order.items}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></div>
                              <span>{order.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.payment === "Paid"
                                  ? "default"
                                  : order.payment === "Pending"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {order.payment}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <TruckIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Printer className="h-4 w-4" />
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
        <TabsContent value="cancelled">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5" />
                Cancelled Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter((order) => order.status === "Cancelled")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-right">{order.items}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></div>
                              <span>{order.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.payment === "Paid"
                                  ? "default"
                                  : order.payment === "Pending"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {order.payment}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <TruckIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Printer className="h-4 w-4" />
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

export default OrderManagement;
