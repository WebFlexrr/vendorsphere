
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowUpDown, Eye, ShoppingCart, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status: string;
  payment: string;
  address?: string;
  email?: string;
  phone?: string;
  products?: { name: string; price: number; quantity: number }[];
};

const OrderManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  
  // Mock order data
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'ORD-7452', 
      customer: 'John Doe', 
      date: '2023-06-18', 
      total: 124.95, 
      items: 3, 
      status: 'Delivered', 
      payment: 'Paid',
      address: '123 Main St, Anytown, CA 94582',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      products: [
        { name: 'Artisan Coffee Mug', price: 24.99, quantity: 2 },
        { name: 'Leather Wallet', price: 74.97, quantity: 1 }
      ]
    },
    { id: 'ORD-7451', customer: 'Jane Smith', date: '2023-06-17', total: 89.99, items: 1, status: 'Shipped', payment: 'Paid' },
    { id: 'ORD-7450', customer: 'Bob Johnson', date: '2023-06-17', total: 54.25, items: 2, status: 'Processing', payment: 'Paid' },
    { id: 'ORD-7449', customer: 'Sarah Williams', date: '2023-06-16', total: 210.50, items: 4, status: 'Pending', payment: 'Awaiting' },
    { id: 'ORD-7448', customer: 'Mike Brown', date: '2023-06-15', total: 45.00, items: 1, status: 'Cancelled', payment: 'Refunded' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-gray-100 text-gray-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'Shipped': return <Truck className="h-4 w-4 mr-1" />;
      case 'Processing': return <ShoppingCart className="h-4 w-4 mr-1" />;
      case 'Pending': return <Clock className="h-4 w-4 mr-1" />;
      case 'Cancelled': return <XCircle className="h-4 w-4 mr-1" />;
      default: return null;
    }
  };

  // Filter orders based on search query and tab
  const filteredOrders = (tab: string) => {
    let filtered = orders;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (tab !== 'all') {
      const statusMap: Record<string, string> = {
        'pending': 'Pending',
        'processing': 'Processing',
        'shipped': 'Shipped',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
      };
      filtered = filtered.filter(order => order.status === statusMap[tab]);
    }
    
    return filtered;
  };

  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsViewModalOpen(true);
  };
  
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    });
    
    if (isViewModalOpen && currentOrder?.id === orderId) {
      setCurrentOrder({ ...currentOrder, status: newStatus });
    }
  };

  const renderOrdersTable = (tabValue: string) => {
    const filtered = filteredOrders(tabValue);
    
    return (
      <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Order ID</th>
                <th className="py-3 text-left">Customer</th>
                <th className="py-3 text-left">Date</th>
                <th className="py-3 text-right">Total</th>
                <th className="py-3 text-center">Items</th>
                <th className="py-3 text-center">Status</th>
                <th className="py-3 text-center">Payment</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3 text-right">${order.total.toFixed(2)}</td>
                    <td className="py-3 text-center">{order.items}</td>
                    <td className="py-3 text-center">
                      <Badge className={getStatusColor(order.status)}>
                        <span className="flex items-center">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </Badge>
                    </td>
                    <td className="py-3 text-center">
                      <Badge variant="outline" className={
                        order.payment === 'Paid' ? 'bg-green-50 text-green-700' : 
                        order.payment === 'Awaiting' ? 'bg-yellow-50 text-yellow-700' : 
                        'bg-red-50 text-red-700'
                      }>
                        {order.payment}
                      </Badge>
                    </td>
                    <td className="py-3 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-vsphere-light text-vsphere-dark">
            Today: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-5 sm:grid-cols-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>All Orders ({filteredOrders('all').length})</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-3.5 w-3.5 mr-2" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-3.5 w-3.5 mr-2" /> Sort
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderOrdersTable('all')}
            </CardContent>
          </Card>
        </TabsContent>
        
        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Orders ({filteredOrders(tab).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderOrdersTable(tab)}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Order Detail Modal */}
      {isViewModalOpen && currentOrder && (
        <Dialog open={isViewModalOpen} onOpenChange={() => setIsViewModalOpen(false)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Details
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Order ID:</span>
                <span>{currentOrder.id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Customer:</span>
                <span>{currentOrder.customer}</span>
              </div>
              
              {currentOrder.email && (
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{currentOrder.email}</span>
                </div>
              )}
              
              {currentOrder.phone && (
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{currentOrder.phone}</span>
                </div>
              )}
              
              {currentOrder.address && (
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>{currentOrder.address}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="font-medium">Order Date:</span>
                <span>{currentOrder.date}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Payment Status:</span>
                <Badge variant="outline" className={
                  currentOrder.payment === 'Paid' ? 'bg-green-50 text-green-700' : 
                  currentOrder.payment === 'Awaiting' ? 'bg-yellow-50 text-yellow-700' : 
                  'bg-red-50 text-red-700'
                }>
                  {currentOrder.payment}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Status:</span>
                <div className="flex items-center gap-2">
                  <Select 
                    defaultValue={currentOrder.status}
                    onValueChange={(value) => handleUpdateOrderStatus(currentOrder.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {currentOrder.products && (
                <>
                  <div className="font-medium mt-2">Products:</div>
                  <div className="border rounded-md">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="px-4 py-2 text-left">Product</th>
                          <th className="px-4 py-2 text-right">Price</th>
                          <th className="px-4 py-2 text-center">Quantity</th>
                          <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOrder.products.map((product, index) => (
                          <tr key={index} className={index !== currentOrder.products!.length - 1 ? "border-b" : ""}>
                            <td className="px-4 py-2">{product.name}</td>
                            <td className="px-4 py-2 text-right">${product.price.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{product.quantity}</td>
                            <td className="px-4 py-2 text-right">${(product.price * product.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="border-t">
                        <tr>
                          <td colSpan={3} className="px-4 py-2 text-right font-medium">Order Total:</td>
                          <td className="px-4 py-2 text-right font-medium">${currentOrder.total.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter className="flex justify-end">
              <Button 
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderManagement;
