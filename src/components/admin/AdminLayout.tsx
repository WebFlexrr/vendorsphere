
import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Package, Users, ShoppingCart, Settings, LogOut, ChevronRight, BarChart, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin header */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-4"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <a href="/admin" className="flex items-center">
            <span className="text-xl font-bold text-vsphere-primary">Vendor<span className="text-vsphere-dark">Sphere</span> <span className="text-gray-600 font-normal ml-2">Admin</span></span>
          </a>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <img 
              src="https://ui-avatars.com/api/?name=Admin+User&background=FF6B6B&color=fff" 
              className="h-8 w-8 rounded-full" 
              alt="Admin" 
            />
            <span className="hidden md:inline">Admin User</span>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-white fixed md:static h-[calc(100vh-4rem)] shadow-md transition-all duration-300 z-10",
            sidebarOpen ? "w-64" : "w-0 md:w-20 overflow-hidden"
          )}
        >
          <div className="p-4">
            <nav className="space-y-1">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" active href="/admin" collapsed={!sidebarOpen} />
              <SidebarItem icon={Package} label="Products" href="/admin/products" collapsed={!sidebarOpen} />
              <SidebarItem icon={Users} label="Vendors" href="/admin/vendors" collapsed={!sidebarOpen} />
              <SidebarItem icon={ShoppingCart} label="Orders" href="/admin/orders" collapsed={!sidebarOpen} />
              <SidebarItem icon={BarChart} label="Analytics" href="/admin/analytics" collapsed={!sidebarOpen} />
              <SidebarItem icon={Megaphone} label="Marketing" href="/admin/marketing" collapsed={!sidebarOpen} />
              <SidebarItem icon={Settings} label="Settings" href="/admin/settings" collapsed={!sidebarOpen} />
            </nav>

            <Separator className="my-4" />
            
            <SidebarItem icon={LogOut} label="Logout" href="/" collapsed={!sidebarOpen} />
          </div>
        </aside>

        {/* Main content */}
        <main className={cn(
          "flex-1 p-6 transition-all duration-300", 
          sidebarOpen ? "md:ml-0" : "md:ml-0"
        )}>
          {children}
        </main>
      </div>
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
    <a 
      href={href} 
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-vsphere-primary/10 text-vsphere-primary" 
          : "text-gray-700 hover:bg-gray-100 hover:text-vsphere-primary"
      )}
    >
      <Icon className="h-5 w-5 mr-2" />
      {!collapsed && <span>{label}</span>}
      {active && !collapsed && <ChevronRight className="ml-auto h-4 w-4" />}
    </a>
  );
};

export default AdminLayout;
