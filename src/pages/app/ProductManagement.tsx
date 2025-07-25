import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Download,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import ProductModal from "../../components/admin/ProductModal";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/stores/product-store";
import { exportToCSV } from "@/utils/exportUtils";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ProductManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

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

  const handleEditProduct = (product) => {
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

  const handleSaveProduct = (product) => {
    if (currentProduct) {
      // Update existing product
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      // Add new product
      setProducts([...products, product]);
    }
  };

  const handleExportProducts = (tab: string) => {
    const dataToExport = filteredProducts(tab);
    
    if (dataToExport.length === 0) {
      toast({
        title: "No products to export",
        description: "There are no products matching your current filters.",
        variant: "destructive",
      });
      return;
    }
    
    const formattedData = dataToExport.map(product => ({
      ID: product.id,
      Name: product.name,
      Category: product.category,
      Vendor: product.vendor,
      Price: `$${product.price.toFixed(2)}`,
      Stock: product.stock,
      Status: product.status,
      Images: product.images?.length || 0
    }));
    
    exportToCSV(formattedData, `products-${tab}-${new Date().toISOString().split('T')[0]}`);
    
    toast({
      title: "Export Successful",
      description: `${dataToExport.length} products have been exported to CSV.`,
    });
  };

  const getFeaturedImage = (product) => {
    if (!product.images || product.images.length === 0) return null;
    
    // Find featured image or use the first one
    const featuredImage = product.images.find(img => img.isFeatured) || product.images[0];
    return featuredImage.url;
  };

  const renderProductsTable = (tabValue: string) => {
    const filtered = filteredProducts(tabValue);

    return (
      <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-3 text-left">Product</th>
                <th className="py-3 text-left">Category</th>
                <th className="py-3 text-left">Vendor</th>
                <th className="py-3 text-right">Price</th>
                <th className="py-3 text-right">Stock</th>
                <th className="py-3 text-center">Variants</th>
                <th className="py-3 text-center">Status</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500 dark:text-gray-400">
                    No products found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((product, index) => (
                  <motion.tr 
                    key={product.id} 
                    className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        {getFeaturedImage(product) ? (
                          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border">
                            <AspectRatio ratio={1/1}>
                              <img 
                                src={getFeaturedImage(product)}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </AspectRatio>
                          </div>
                        ) : (
                          <div className="bg-vsphere-light/50 dark:bg-vsphere-dark/20 p-1.5 rounded w-10 h-10 flex items-center justify-center">
                            <Package className="h-4 w-4 text-vsphere-primary" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span>{product.name}</span>
                          {product.images?.length > 0 && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <ImageIcon className="h-3 w-3" />
                              {product.images.length} image{product.images.length !== 1 && 's'}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{product.category}</td>
                    <td className="py-3">{product.vendor}</td>
                    <td className="py-3 text-right">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-3 text-right">{product.stock}</td>
                    <td className="py-3 text-center">
                      {product.variants && product.variants.length > 0 ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-center">
                                <Badge variant="outline" className="cursor-help">
                                  <Layers className="h-3 w-3 mr-1" />
                                  {product.variants.length}
                                </Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <div className="space-y-1.5">
                                <p className="font-semibold text-sm">Product Variants:</p>
                                <ul className="text-xs space-y-1">
                                  {product.variants.map((variant, i) => (
                                    <li key={variant.id} className="border-t pt-1 first:border-0 first:pt-0">
                                      <div className="flex flex-wrap gap-1">
                                        {Object.entries(variant.attributes).map(([key, value]) => (
                                          <span key={key} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                                            {key}: {value}
                                          </span>
                                        ))}
                                      </div>
                                      {variant.price && (
                                        <span className="text-xs block mt-0.5">
                                          Price: ${variant.price.toFixed(2)} 
                                          {variant.stock !== undefined && ` | Stock: ${variant.stock}`}
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className="text-gray-400 text-xs">None</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      <Badge
                        className={`
                        ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : ""
                        }
                        ${
                          product.status === "Low stock"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : ""
                        }
                        ${
                          product.status === "Out of stock"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
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
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleExportProducts("all")}
          >
            <Download className="h-4 w-4" /> Export to CSV
          </Button>
          <Button
            className="bg-vsphere-primary text-white hover:bg-vsphere-primary/90"
            onClick={handleAddProduct}
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Product
          </Button>
        </div>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleExportProducts(tab)}
                  >
                    <Download className="h-3.5 w-3.5" /> 
                    Export
                  </Button>
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
    </motion.div>
  );
};

export default ProductManagement;
