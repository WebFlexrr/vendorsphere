
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, 
  Settings, LogOut, BarChart, Megaphone, 
  FileText, UserCircle, LayoutTemplate, User, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const location = useLocation();

  return (
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
            active={location.pathname === '/'} 
            href="/" 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Package} 
            label="Products" 
            href="/products" 
            active={location.pathname === '/products'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Users} 
            label="Vendors" 
            href="/vendors" 
            active={location.pathname === '/vendors'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={ShoppingCart} 
            label="Orders" 
            href="/orders" 
            active={location.pathname === '/orders'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Package} 
            label="Inventory" 
            href="/inventory" 
            active={location.pathname === '/inventory'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={UserCircle} 
            label="Employees" 
            href="/employees" 
            active={location.pathname === '/employees'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={User} 
            label="Users" 
            href="/users" 
            active={location.pathname === '/users'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={BarChart} 
            label="Analytics" 
            href="/analytics" 
            active={location.pathname === '/analytics'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Megaphone} 
            label="Marketing" 
            href="/marketing" 
            active={location.pathname === '/marketing'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={FileText} 
            label="Blog" 
            href="/blog" 
            active={location.pathname === '/blog'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={LayoutTemplate} 
            label="CMS" 
            href="/cms" 
            active={location.pathname === '/cms'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Bell} 
            label="Notifications" 
            href="/notifications" 
            active={location.pathname === '/notifications'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            active={location.pathname === '/settings'} 
            collapsed={!sidebarOpen} 
          />
        </nav>

        <Separator className="my-3 md:my-4" />
        
        <SidebarItem icon={LogOut} label="Logout" href="/" collapsed={!sidebarOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
