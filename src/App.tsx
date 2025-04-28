
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { Loader } from 'lucide-react';
import { AuthProvider } from '@/hooks/useAuth';

// Lazy load pages to improve performance
const Index = React.lazy(() => import('./pages/Index'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const SignUp = React.lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const UserProfile = React.lazy(() => import('./pages/auth/UserProfile'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Unauthorized = React.lazy(() => import('./pages/Unauthorized'));
const ProtectedRoute = React.lazy(() => import('./pages/auth/ProtectedRoute'));

// Loading component for suspense fallback
const Loading = () => (
  <div className="h-screen w-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
      <Loader className="animate-spin h-10 w-10 text-vsphere-primary mb-4" />
      <p className="text-lg font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route
                path="/admin/*"
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
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
