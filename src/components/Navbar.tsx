
import React from 'react';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top notification bar */}
      <div className="bg-vsphere-primary text-white py-2 px-4 text-center text-sm font-medium">
        🎉 Grand Opening Sale! 15% off with code: WELCOME15
      </div>
      
      {/* Main navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and mobile menu */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-6 w-6" />
            </Button>
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-vsphere-primary">Vendor<span className="text-vsphere-dark">Sphere</span></span>
            </a>
          </div>
          
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="Search products, vendors..." 
                className="w-full pr-10 rounded-full border-vsphere-primary/20"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Navigation icons */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-vsphere-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button className="hidden md:flex bg-vsphere-primary hover:bg-vsphere-primary/90 text-white">
              Become a Vendor
            </Button>
          </div>
        </div>
      </div>
      
      {/* Categories navigation */}
      <nav className="border-t border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8 py-3 overflow-x-auto">
            <li><a href="#" className="text-sm font-medium hover:text-vsphere-primary transition-colors">All Categories</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-vsphere-primary transition-colors">Fashion</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-vsphere-primary transition-colors">Electronics</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-vsphere-primary transition-colors">Home & Garden</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-vsphere-primary transition-colors">Beauty</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-vsphere-primary transition-colors">Toys & Games</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-vsphere-primary transition-colors">Sports</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-vsphere-primary transition-colors">Books</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
