
import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, Search, Filter, ArrowUpDown, Plus, Download, 
  Edit, Trash2, AlertTriangle, CheckCircle, History
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';

// Sample data types
type InventoryItem = {
  id: number;
  productId: number;
  productName: string;
  sku: string;
  category: string;
  inStock: number;
  reorderPoint: number;
  onOrder: number;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstocked';
  vendorName: string;
  location: string;
  costPrice: number;
  retailPrice: number;
};

type StockMovement = {
  id: number;
  productId: number;
  productName: string;
  date: string;
  type: 'Received' | 'Sold' | 'Returned' | 'Adjusted' | 'Transferred';
  quantity: number;
  reference: string;
  notes?: string;
  updatedBy: string;
};

// Sample data
const initialInventory: InventoryItem[] = [
  {
    id: 1,
    productId: 101,
    productName: "Wireless Earbuds Pro",
    sku: "WEP-101",
    category: "Electronics",
    inStock: 45,
    reorderPoint: 15,
    onOrder: 0,
    lastUpdated: "2024-06-08",
    status: "In Stock",
    vendorName: "TechGadgets Inc.",
    location: "Warehouse A",
    costPrice: 28.50,
    retailPrice: 59.99
  },
  {
    id: 2,
    productId: 102,
    productName: "Fitness Smart Watch",
    sku: "FSW-102",
    category: "Electronics",
    inStock: 12,
    reorderPoint: 10,
    onOrder: 25,
    lastUpdated: "2024-06-09",
    status: "Low Stock",
    vendorName: "TechGadgets Inc.",
    location: "Warehouse A",
    costPrice: 35.75,
    retailPrice: 79.99
  },
  {
    id: 3,
    productId: 103,
    productName: "Bluetooth Speaker Mini",
    sku: "BSM-103",
    category: "Electronics",
    inStock: 0,
    reorderPoint: 8,
    onOrder: 20,
    lastUpdated: "2024-06-07",
    status: "Out of Stock",
    vendorName: "AudioTech Solutions",
    location: "Warehouse B",
    costPrice: 18.25,
    retailPrice: 39.99
  },
  {
    id: 4,
    productId: 104,
    productName: "Organic Cotton T-Shirt",
    sku: "OCT-104",
    category: "Clothing",
    inStock: 87,
    reorderPoint: 25,
    onOrder: 0,
    lastUpdated: "2024-06-10",
    status: "Overstocked",
    vendorName: "EcoFashion Co.",
    location: "Warehouse C",
    costPrice: 12.50,
    retailPrice: 24.99
  },
  {
    id: 5,
    productId: 105,
    productName: "Premium Coffee Beans",
    sku: "PCB-105",
    category: "Food",
    inStock: 23,
    reorderPoint: 15,
    onOrder: 0,
    lastUpdated: "2024-06-09",
    status: "In Stock",
    vendorName: "Global Coffee Imports",
    location: "Warehouse D",
    costPrice: 8.75,
    retailPrice: 16.99
  }
];

const initialStockMovements: StockMovement[] = [
  {
    id: 1,
    productId: 101,
    productName: "Wireless Earbuds Pro",
    date: "2024-06-08 14:30",
    type: "Received",
    quantity: 50,
    reference: "PO-2024-112",
    notes: "Regular inventory restock",
    updatedBy: "Sarah Johnson"
  },
  {
    id: 2,
    productId: 101,
    productName: "Wireless Earbuds Pro",
    date: "2024-06-08 16:45",
    type: "Sold",
    quantity: 5,
    reference: "ORD-8842",
    updatedBy: "System"
  },
  {
    id: 3,
    productId: 102,
    productName: "Fitness Smart Watch",
    date: "2024-06-09 09:15",
    type: "Sold",
    quantity: 3,
    reference: "ORD-8846",
    updatedBy: "System"
  },
  {
    id: 4,
    productId: 103,
    productName: "Bluetooth Speaker Mini",
    date: "2024-06-07 11:20",
    type: "Sold",
    quantity: 5,
    reference: "ORD-8831",
    updatedBy: "System"
  },
  {
    id: 5,
    productId: 103,
    productName: "Bluetooth Speaker Mini",
    date: "2024-06-07 14:30",
    type: "Adjusted",
    quantity: -2,
    reference: "ADJ-667",
    notes: "Damaged inventory write-off",
    updatedBy: "Michael Chen"
  }
];

const InventoryManagement: React.FC = () => {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(initialStockMovements);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof InventoryItem>('productName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Dialogs state
  const [isAdjustStockOpen, setIsAdjustStockOpen] = useState(false);
  const [isMovementHistoryOpen, setIsMovementHistoryOpen] = useState(false);
  const [isLowStockOpen, setIsLowStockOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  
  // Stock adjustment form state
  const [stockAdjustment, setStockAdjustment] = useState({
    quantity: 0,
    type: 'Received',
    reference: '',
    notes: ''
  });

  // Filtering and sorting functions
  const getFilteredInventory = () => {
    return inventory
      .filter(item => 
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item => categoryFilter === 'all' || item.category === categoryFilter)
      .filter(item => statusFilter === 'all' || item.status === statusFilter)
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === 'asc'
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
        }
      });
  };

  const getLowStockItems = () => {
    return inventory.filter(item => item.inStock <= item.reorderPoint);
  };

  const getProductMovements = (productId: number) => {
    return stockMovements.filter(movement => movement.productId === productId);
  };

  // Action handlers
  const handleSort = (field: keyof InventoryItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAdjustStock = () => {
    if (!currentItem) return;
    
    // Process stock adjustment
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;
    
    // Create new stock movement record
    const newMovement: StockMovement = {
      id: Math.max(0, ...stockMovements.map(m => m.id)) + 1,
      productId: currentItem.productId,
      productName: currentItem.productName,
      date: formattedDate,
      type: stockAdjustment.type as any,
      quantity: stockAdjustment.quantity,
      reference: stockAdjustment.reference,
      notes: stockAdjustment.notes,
      updatedBy: "Admin User" // In a real app, this would be the logged-in user
    };
    
    setStockMovements([newMovement, ...stockMovements]);
    
    // Update inventory
    const updatedInventory = inventory.map(item => {
      if (item.id === currentItem.id) {
        let newStock = item.inStock;
        
        switch (stockAdjustment.type) {
          case 'Received':
            newStock += stockAdjustment.quantity;
            break;
          case 'Sold':
          case 'Adjusted':
            newStock -= stockAdjustment.quantity;
            break;
          case 'Returned':
            newStock += stockAdjustment.quantity;
            break;
          case 'Transferred':
            newStock -= stockAdjustment.quantity;
            break;
        }
        
        // Determine status based on new stock level
        let status: InventoryItem['status'] = 'In Stock';
        if (newStock <= 0) {
          status = 'Out of Stock';
        } else if (newStock <= item.reorderPoint) {
          status = 'Low Stock';
        } else if (newStock > item.reorderPoint * 3) {
          status = 'Overstocked';
        }
        
        return {
          ...item,
          inStock: newStock,
          lastUpdated: now.toISOString().split('T')[0],
          status
        };
      }
      return item;
    });
    
    setInventory(updatedInventory);
    setIsAdjustStockOpen(false);
    
    // Reset form
    setStockAdjustment({
      quantity: 0,
      type: 'Received',
      reference: '',
      notes: ''
    });
    
    toast({
      title: "Stock Adjusted",
      description: `${currentItem.productName} stock has been updated successfully.`,
    });
  };

  const handleExportInventory = () => {
    toast({
      title: "Export Started",
      description: "Inventory data is being exported as an Excel file.",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Inventory data has been exported successfully.",
      });
    }, 1500);
  };

  const uniqueCategories = Array.from(new Set(inventory.map(item => item.category)));
  const filteredInventory = getFilteredInventory();
  const lowStockItems = getLowStockItems();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage your product inventory
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleExportInventory} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
          <Button
            onClick={() => setIsLowStockOpen(true)}
            variant={lowStockItems.length > 0 ? "destructive" : "outline"}
            className="flex items-center gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            Low Stock Items ({lowStockItems.length})
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Current Inventory
          </TabsTrigger>
          <TabsTrigger value="movements" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Stock Movements
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Product Inventory</CardTitle>
              
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products, SKUs, vendors..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Category</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {uniqueCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Status</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Overstocked">Overstocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer whitespace-nowrap"
                        onClick={() => handleSort('productName')}
                      >
                        <div className="flex items-center gap-1">
                          Product
                          {sortField === 'productName' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort('sku')}
                      >
                        <div className="flex items-center gap-1">
                          SKU
                          {sortField === 'sku' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer text-right"
                        onClick={() => handleSort('inStock')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          In Stock
                          {sortField === 'inStock' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead 
                        className="cursor-pointer text-right"
                        onClick={() => handleSort('retailPrice')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          Price
                          {sortField === 'retailPrice' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                          No inventory items found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredInventory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.productName}
                            <div className="text-xs text-muted-foreground">
                              {item.category}
                            </div>
                          </TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell className="text-right">
                            {item.inStock}
                            <div className="text-xs text-muted-foreground">
                              Reorder at: {item.reorderPoint}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                item.status === 'In Stock' 
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : item.status === 'Low Stock'
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : item.status === 'Out of Stock'
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.vendorName}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell className="text-right">
                            ${item.retailPrice.toFixed(2)}
                            <div className="text-xs text-muted-foreground">
                              Cost: ${item.costPrice.toFixed(2)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setCurrentItem(item);
                                  setIsAdjustStockOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Adjust</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setCurrentItem(item);
                                  setIsMovementHistoryOpen(true);
                                }}
                              >
                                <History className="h-4 w-4" />
                                <span className="sr-only">History</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movement History</CardTitle>
              <div className="relative flex-1 max-w-sm mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search movements..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Updated By</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements
                      .filter(movement => 
                        movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        movement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        movement.type.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell className="whitespace-nowrap">{movement.date}</TableCell>
                          <TableCell>{movement.productName}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                movement.type === 'Received' || movement.type === 'Returned'
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : movement.type === 'Sold' || movement.type === 'Transferred'
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {movement.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {movement.type === 'Sold' || movement.type === 'Adjusted' && movement.quantity < 0 ? '-' : ''}
                            {Math.abs(movement.quantity)}
                          </TableCell>
                          <TableCell>{movement.reference}</TableCell>
                          <TableCell>{movement.updatedBy}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {movement.notes || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Adjust Stock Dialog */}
      {currentItem && (
        <Dialog open={isAdjustStockOpen} onOpenChange={setIsAdjustStockOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adjust Stock: {currentItem.productName}</DialogTitle>
              <DialogDescription>
                Update inventory levels for this product.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current-stock" className="text-right">
                  Current Stock
                </Label>
                <div className="col-span-3">
                  <Input
                    id="current-stock"
                    value={currentItem.inStock}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="adjustment-type" className="text-right">
                  Adjustment Type
                </Label>
                <Select
                  value={stockAdjustment.type}
                  onValueChange={(value) => setStockAdjustment({...stockAdjustment, type: value})}
                >
                  <SelectTrigger id="adjustment-type" className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Received">Received (Add Stock)</SelectItem>
                    <SelectItem value="Sold">Sold (Remove Stock)</SelectItem>
                    <SelectItem value="Returned">Returned (Add Stock)</SelectItem>
                    <SelectItem value="Adjusted">Inventory Adjustment</SelectItem>
                    <SelectItem value="Transferred">Transferred Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <div className="col-span-3">
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    value={stockAdjustment.quantity}
                    onChange={(e) => setStockAdjustment({
                      ...stockAdjustment, 
                      quantity: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reference" className="text-right">
                  Reference #
                </Label>
                <div className="col-span-3">
                  <Input
                    id="reference"
                    placeholder="e.g. PO-2024-123, ORD-9876"
                    value={stockAdjustment.reference}
                    onChange={(e) => setStockAdjustment({
                      ...stockAdjustment, 
                      reference: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">
                  Notes
                </Label>
                <div className="col-span-3">
                  <textarea
                    id="notes"
                    rows={3}
                    className="w-full border rounded-md p-2"
                    placeholder="Optional notes about this adjustment"
                    value={stockAdjustment.notes}
                    onChange={(e) => setStockAdjustment({
                      ...stockAdjustment, 
                      notes: e.target.value
                    })}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdjustStockOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAdjustStock}
                disabled={stockAdjustment.quantity <= 0 || !stockAdjustment.reference}
              >
                Update Stock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Movement History Dialog */}
      {currentItem && (
        <Dialog open={isMovementHistoryOpen} onOpenChange={setIsMovementHistoryOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Movement History: {currentItem.productName}</DialogTitle>
              <DialogDescription>
                Recent stock movements for this product.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getProductMovements(currentItem.productId).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                          No movements found for this product.
                        </TableCell>
                      </TableRow>
                    ) : (
                      getProductMovements(currentItem.productId).map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell className="whitespace-nowrap">{movement.date}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                movement.type === 'Received' || movement.type === 'Returned'
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : movement.type === 'Sold' || movement.type === 'Transferred'
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {movement.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {movement.type === 'Sold' || movement.type === 'Adjusted' && movement.quantity < 0 ? '-' : ''}
                            {Math.abs(movement.quantity)}
                          </TableCell>
                          <TableCell>{movement.reference}</TableCell>
                          <TableCell>{movement.notes || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={() => {
                  setIsMovementHistoryOpen(false);
                  setIsAdjustStockOpen(true);
                }}
              >
                Adjust Stock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Low Stock Alert Dialog */}
      <Dialog open={isLowStockOpen} onOpenChange={setIsLowStockOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Low Stock Alert
            </DialogTitle>
            <DialogDescription>
              The following products are at or below their reorder point.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {lowStockItems.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-medium">All stocked up!</p>
                <p className="text-muted-foreground">
                  No products are currently below their reorder points.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{item.productName}</h4>
                      <div className="text-sm text-muted-foreground">
                        SKU: {item.sku} | Current: {item.inStock} | Reorder at: {item.reorderPoint}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsLowStockOpen(false);
                        setIsAdjustStockOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Restock
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setIsLowStockOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
