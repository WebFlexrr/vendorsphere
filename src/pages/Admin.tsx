
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProductManagement from '@/components/admin/ProductManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import Analytics from '@/components/admin/Analytics';
import VendorManagement from '@/components/admin/VendorManagement';

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/vendors" element={<VendorManagement />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
