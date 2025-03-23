
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/app/AdminDashboard';
import ProductManagement from '@/pages/app/ProductManagement';
import OrderManagement from '@/pages/app/OrderManagement';
import Analytics from '@/pages/app/Analytics';
import VendorManagement from '@/pages/app/VendorManagement';
import Marketing from '@/pages/app/Marketing';
import Settings from '@/pages/app/Settings';
import BlogManagement from '@/pages/app/BlogManagement';
import EmployeeManagement from '@/pages/app/EmployeeManagement';
import InventoryManagement from '@/pages/app/InventoryManagement';
import UserManagement from '@/pages/app/UserManagement';
import CMSManagement from '@/pages/app/CMSManagement';
import Notifications from '@/components/admin/Notifications';

const Admin = () => {
  return (
    <div className="w-full">
      <AdminLayout>
        <Routes>
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
        </Routes>
      </AdminLayout>
    </div>
  );
};

export default Admin;
