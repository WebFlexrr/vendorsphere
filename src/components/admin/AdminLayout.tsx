
import React, { useState } from 'react';
import Header from '@/components/admin/layout/Header';
import Sidebar from '@/components/admin/layout/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const mainVariants = {
    expanded: { marginLeft: '16rem' },
    collapsed: { marginLeft: '4rem' }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} />
        <AnimatePresence mode="wait">
          <motion.main 
            key={sidebarOpen ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0.8 }}
            animate={{ 
              opacity: 1,
              marginLeft: sidebarOpen ? '16rem' : '4rem'
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`flex-1 p-4 md:p-6 md:pt-4 overflow-y-auto h-[calc(100vh-4rem)] transition-all duration-300 relative`}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminLayout;
