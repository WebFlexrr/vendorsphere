
import React, { useState } from 'react';
import Header from '@/components/admin/layout/Header';
import Sidebar from '@/components/admin/layout/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const mainVariants = {
    expanded: {
      marginLeft: '16rem',
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30
      }
    },
    collapsed: {
      marginLeft: '4rem',
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} />
        <AnimatePresence mode="wait">
          <motion.main 
            key={sidebarOpen ? 'expanded' : 'collapsed'}
            variants={mainVariants}
            initial={false}
            animate={sidebarOpen ? 'expanded' : 'collapsed'}
            className={`flex-1 p-4 md:p-6 md:pt-4 overflow-y-auto h-[calc(100vh-4rem)] transition-all duration-300 relative`}
          >
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={contentVariants}
              className="w-full h-full"
            >
              {children}
            </motion.div>
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminLayout;
