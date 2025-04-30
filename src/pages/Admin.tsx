
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
import AppLauncher from '@/pages/app/AppLauncher';

// Animation configurations for page transitions
const pageVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

const Admin = () => {
  const location = useLocation();
  
  return (
    <div className="w-full">
      <AdminLayout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <AdminDashboard />
              </motion.div>
            } />
            <Route path="/products" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ProductManagement />
              </motion.div>
            } />
            <Route path="/orders" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <OrderManagement />
              </motion.div>
            } />
            <Route path="/analytics" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Analytics />
              </motion.div>
            } />
            <Route path="/vendors" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <VendorManagement />
              </motion.div>
            } />
            <Route path="/marketing" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Marketing />
              </motion.div>
            } />
            <Route path="/settings" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Settings />
              </motion.div>
            } />
            <Route path="/blog" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <BlogManagement />
              </motion.div>
            } />
            <Route path="/employees" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <EmployeeManagement />
              </motion.div>
            } />
            <Route path="/inventory" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <InventoryManagement />
              </motion.div>
            } />
            <Route path="/users" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <UserManagement />
              </motion.div>
            } />
            <Route path="/cms" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <CMSManagement />
              </motion.div>
            } />
            <Route path="/notifications" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Notifications />
              </motion.div>
            } />
            <Route path="/app-launcher" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <AppLauncher />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </AdminLayout>
    </div>
  );
};

export default Admin;
