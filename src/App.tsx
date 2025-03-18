import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProductManagement from "./components/admin/ProductManagement";
import OrderManagement from "./components/admin/OrderManagement";
import Analytics from "./components/admin/Analytics";
import VendorManagement from "./components/admin/VendorManagement";
import Marketing from "./components/admin/Marketing";
import Settings from "./components/admin/Settings";
import BlogManagement from "./components/admin/BlogManagement";
import EmployeeManagement from "./components/admin/EmployeeManagement";
import InventoryManagement from "./components/admin/InventoryManagement";
import UserManagement from "./components/admin/UserManagement";
import CMSManagement from "./components/admin/CMSManagement";
import Notifications from "./components/admin/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/landingpage" element={<Index />} />

            {/* <Route path="/*" element={<Admin />} /> */}
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/vendors" element={<VendorManagement />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/blog" element={<BlogManagement />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/cms" element={<CMSManagement />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
