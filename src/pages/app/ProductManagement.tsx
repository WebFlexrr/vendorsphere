import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import ProductModal, { Product } from "../../components/admin/ProductModal";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/stores/product-store";

const ProductManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  // Filter products based on search query and tab
  const filteredProducts = (tab: string) => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply tab filter
    if (tab !== "all") {
      const statusMap: Record<string, string> = {
        active: "Active",
        low: "Low stock",
        out: "Out of stock",
      };
      filtered = filtered.filter(
        (product) => product.status === statusMap[tab]
      );
    }

    return filtered;
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    const productToDelete = products.find((p) => p.id === productId);
    if (!productToDelete) return;

    setProducts(products.filter((p) => p.id !== productId));

    toast({
      title: "Product Deleted",
      description: `${productToDelete.name} has been successfully removed.`,
      variant: "destructive",
    });
  };

  const handleSaveProduct = (product: Product) => {
    if (currentProduct) {
      // Update existing product
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      // Add new product
      setProducts([...products, product]);
    }
  };

  const renderProductsTable = (tabValue: string) => {
    const filtered = filteredProducts(tabValue);

    return (
      <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Product</th>
                <th className="py-3 text-left">Category</th>
                <th className="py-3 text-left">Vendor</th>
                <th className="py-3 text-right">Price</th>
                <th className="py-3 text-right">Stock</th>
                <th className="py-3 text-center">Status</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No products found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 flex items-center gap-2">
                      <div className="bg-vsphere-light/50 p-1.5 rounded">
                        <Package className="h-4 w-4 text-vsphere-primary" />
                      </div>
                      <span>{product.name}</span>
                    </td>
                    <td className="py-3">{product.category}</td>
                    <td className="py-3">{product.vendor}</td>
                    <td className="py-3 text-right">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-3 text-right">{product.stock}</td>
                    <td className="py-3 text-center">
                      <Badge
                        className={`
                        ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                        ${
                          product.status === "Low stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : ""
                        }
                        ${
                          product.status === "Out of stock"
                            ? "bg-red-100 text-red-700"
                            : ""
                        }
                      `}
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-3 flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button
          className="bg-vsphere-primary text-white hover:bg-vsphere-primary/90"
          onClick={handleAddProduct}
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-4 sm:grid-cols-4">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="low">Low Stock</TabsTrigger>
            <TabsTrigger value="out">Out of Stock</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
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
                <span>All Products ({filteredProducts("all").length})</span>
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
            <CardContent>{renderProductsTable("all")}</CardContent>
          </Card>
        </TabsContent>

        {["active", "low", "out"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>
                    {tab === "active"
                      ? "Active"
                      : tab === "low"
                      ? "Low Stock"
                      : "Out of Stock"}
                    Products ({filteredProducts(tab).length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>{renderProductsTable(tab)}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={currentProduct}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default ProductManagement;
