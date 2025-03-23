import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/app/AdminDashboard";
import ProductManagement from "./pages/app/ProductManagement";
import OrderManagement from "./pages/app/OrderManagement";
import Analytics from "./pages/app/Analytics";
import VendorManagement from "./pages/app/VendorManagement";
import Marketing from "./pages/app/Marketing";
import Settings from "./pages/app/Settings";
import BlogManagement from "./pages/app/BlogManagement";
import EmployeeManagement from "./pages/app/EmployeeManagement";
import InventoryManagement from "./pages/app/InventoryManagement";
import UserManagement from "./pages/app/UserManagement";
import CMSManagement from "./pages/app/CMSManagement";
import Notifications from "./components/admin/Notifications";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Unauthorized from "./pages/Unauthorized";
import UserProfile from "./pages/auth/UserProfile";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Customer-facing routes */}
            <Route path="/landingpage" element={<Index />} />

            {/* Protected admin routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ProductManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendors"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <VendorManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <OrderManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <InventoryManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout>
                    <EmployeeManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["admin", "employee"]}>
                  <AdminLayout>
                    <UserManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout>
                    <Analytics />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketing"
              element={
                <ProtectedRoute allowedRoles={["admin", "employee"]}>
                  <AdminLayout>
                    <Marketing />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
              <Route
                path="/blog"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <BlogManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cms"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <CMSManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <UserProfile />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Settings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Notifications />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
