import React, { useState, useEffect } from 'react';
import { 
  Menu, X, LayoutDashboard, Package, Users, ShoppingCart, 
  Settings, LogOut, ChevronRight, BarChart, Megaphone, 
  FileText, UserCircle, LayoutTemplate, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLocation, Link } from 'react-router-dom';
import UserProfileDropdown from '@/components/admin/UserProfileDropdown';
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
    <div className="min-h-screen bg-gray-100">
      {/* Admin header */}
      <header className="bg-white shadow-sm py-3 px-4 md:py-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2 md:mr-4"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <a href="/admin" className="flex items-center">
            <span className="text-lg md:text-xl font-bold text-vsphere-primary">Vendor<span className="text-vsphere-dark">Sphere</span> <span className="hidden sm:inline text-gray-600 font-normal ml-2">Admin</span></span>
          </a>
        </div>
        <div className="flex items-center">
          <UserProfileDropdown />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-white fixed md:static h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] shadow-md transition-all duration-300 z-10",
            sidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:translate-x-0 md:w-16 overflow-hidden"
          )}
        >
          <div className="p-3 md:p-4">
            <nav className="space-y-1">
              <SidebarItem 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={location.pathname === '/admin'} 
                href="/admin" 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={Package} 
                label="Products" 
                href="/admin/products" 
                active={location.pathname === '/admin/products'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={Users} 
                label="Vendors" 
                href="/admin/vendors" 
                active={location.pathname === '/admin/vendors'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={ShoppingCart} 
                label="Orders" 
                href="/admin/orders" 
                active={location.pathname === '/admin/orders'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={Package} 
                label="Inventory" 
                href="/admin/inventory" 
                active={location.pathname === '/admin/inventory'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={UserCircle} 
                label="Employees" 
                href="/admin/employees" 
                active={location.pathname === '/admin/employees'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={User} 
                label="Users" 
                href="/admin/users" 
                active={location.pathname === '/admin/users'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={BarChart} 
                label="Analytics" 
                href="/admin/analytics" 
                active={location.pathname === '/admin/analytics'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={Megaphone} 
                label="Marketing" 
                href="/admin/marketing" 
                active={location.pathname === '/admin/marketing'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={FileText} 
                label="Blog" 
                href="/admin/blog" 
                active={location.pathname === '/admin/blog'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={LayoutTemplate} 
                label="CMS" 
                href="/admin/cms" 
                active={location.pathname === '/admin/cms'} 
                collapsed={!sidebarOpen} 
              />
              <SidebarItem 
                icon={Settings} 
                label="Settings" 
                href="/admin/settings" 
                active={location.pathname === '/admin/settings'} 
                collapsed={!sidebarOpen} 
              />
            </nav>

            <Separator className="my-3 md:my-4" />
            
            <SidebarItem icon={LogOut} label="Logout" href="/" collapsed={!sidebarOpen} />
          </div>
        </aside>

        {/* Main content - add overlay for mobile */}
        <div className="relative flex-1">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/20 z-0 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          
          <main className="p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Add ChatPanel Component */}
      <ChatPanel />
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  href, 
  active = false,
  collapsed = false 
}) => {
  return (
    <Link 
      to={href} 
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-vsphere-primary/10 text-vsphere-primary" 
          : "text-gray-700 hover:bg-gray-100 hover:text-vsphere-primary"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span className="ml-2">{label}</span>}
      {active && !collapsed && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
  );
};

export default AdminLayout;
