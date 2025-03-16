
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProductManagement from '@/components/admin/ProductManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import Analytics from '@/components/admin/Analytics';
import VendorManagement from '@/components/admin/VendorManagement';
import Marketing from '@/components/admin/Marketing';
import Settings from '@/components/admin/Settings';
import BlogManagement from '@/components/admin/BlogManagement';
import EmployeeManagement from '@/components/admin/EmployeeManagement';
import InventoryManagement from '@/components/admin/InventoryManagement';
import UserManagement from '@/components/admin/UserManagement';
import CMSManagement from '@/components/admin/CMSManagement';
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
