import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Unauthorized from "./pages/Unauthorized";
import UserProfile from "./pages/UserProfile";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "./providers/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
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
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/products" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vendors" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/marketing" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'employee']}>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blog" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employees" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/inventory" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'employee']}>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cms" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
