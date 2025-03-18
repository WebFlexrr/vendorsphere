
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import ChatPanel from '@/components/admin/ChatPanel';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin header - fixed at top */}
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex pt-[3.5rem] md:pt-[4rem]">
        {/* Sidebar - fixed position */}
        <Sidebar sidebarOpen={sidebarOpen} />

        {/* Main content - scrollable */}
        <div className="relative flex-1 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)]">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/20 z-0 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          
          <main className="p-4 md:p-6 overflow-auto h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>

      {/* Add ChatPanel Component */}
      <ChatPanel />
    </div>
  );
};

export default AdminLayout;
