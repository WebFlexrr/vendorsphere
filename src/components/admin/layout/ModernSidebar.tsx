import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Search, Home, Bell, CheckSquare, Settings, 
  FileText, UserPlus, Inbox, HelpCircle, 
  Zap, ChevronDown, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ModernSidebarProps {
  collapsed?: boolean;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ collapsed = false }) => {
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/admin' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: CheckSquare, label: 'Tasks', path: '/admin/tasks' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const otherItems = [
    { icon: FileText, label: 'Documentation', path: '/admin/docs' },
    { icon: UserPlus, label: 'Refer a Friend', path: '/admin/referral' },
    { icon: Inbox, label: 'Inbox', path: '/admin/inbox' },
    { icon: HelpCircle, label: 'Support', path: '/admin/support' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  if (collapsed) {
    return (
      <div className="w-16 bg-gray-900 text-white h-full flex flex-col">
        <div className="p-4 flex justify-center">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-gray-900 font-bold text-sm">W</span>
          </div>
        </div>
        <nav className="flex-1 px-2">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center justify-center p-3 rounded-lg transition-colors",
                  isActive(item.path)
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-gray-900 font-bold text-sm">W</span>
          </div>
          <span className="font-semibold text-lg">Workly</span>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">⌘ F</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                isActive(item.path)
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <Separator className="my-4 bg-gray-700" />

        {/* Other Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-3">
            OTHER
          </h3>
          <div className="space-y-1">
            {otherItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-4 bg-gray-700" />

        {/* Boost with AI Section */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">Boost with AI</span>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            AI-powered insights, task highlights, and tools that make work magic.
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
            Upgrade to Pro
          </Button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Dema S.</p>
            <p className="text-xs text-gray-400 truncate">dema@designly.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ModernSidebar;
