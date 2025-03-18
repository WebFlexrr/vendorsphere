
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default SidebarItem;
