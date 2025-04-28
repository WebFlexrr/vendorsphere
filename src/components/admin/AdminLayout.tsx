
import React, { useState } from 'react';
import Header from '@/components/admin/layout/Header';
import Sidebar from '@/components/admin/layout/Sidebar';
import { motion } from 'framer-motion';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} />
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 p-4 md:p-6 md:pt-4 overflow-y-auto h-[calc(100vh-4rem)] transition-all duration-300 relative`}
          style={{ marginLeft: sidebarOpen ? '16rem' : '4rem' }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
