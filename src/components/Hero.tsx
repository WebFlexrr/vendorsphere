
import React from 'react';
import { Button } from '@/components/ui/button';
import UserProfileDropdown from './UserProfileDropdown';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-vsphere-light">
      {/* Decorative elements */}
      <div className="absolute -left-10 top-10 w-24 h-24 leaf-decoration">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
          alt="Leaf decoration"
          className="w-full h-full opacity-20"
        />
      </div>
      <div className="absolute right-10 bottom-10 w-20 h-20 leaf-decoration" style={{ animationDelay: '2s' }}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
          alt="Leaf decoration"
          className="w-full h-full opacity-20"
        />
      </div>
      <div className="absolute right-1/4 top-1/4 w-16 h-16 gift-decoration" style={{ animationDelay: '1s' }}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/4213/4213958.png"
          alt="Gift decoration"
          className="w-full h-full opacity-10"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="absolute top-4 right-4 z-10">
          <UserProfileDropdown />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-vsphere-dark mb-4">
              Shop from hundreds of <span className="text-vsphere-primary">trusted vendors</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Find everything you need in one place. Quality products from verified sellers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-vsphere-primary hover:bg-vsphere-primary/90 text-white px-8 py-6 rounded-full text-lg">
                Shop Now
              </Button>
              <Button variant="outline" className="border-vsphere-primary text-vsphere-primary hover:bg-vsphere-primary/10 px-8 py-6 rounded-full text-lg">
                Become a Vendor
              </Button>
            </div>
            <div className="mt-6 flex justify-center md:justify-start gap-6">
              <div className="text-center">
                <p className="font-bold text-2xl text-vsphere-primary">500+</p>
                <p className="text-sm text-gray-500">Vendors</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-vsphere-primary">50k+</p>
                <p className="text-sm text-gray-500">Products</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-vsphere-primary">250k+</p>
                <p className="text-sm text-gray-500">Customers</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://img.freepik.com/free-photo/online-fashion-shopping-collage_23-2150535821.jpg"
              alt="VendorSphere Marketplace" 
              className="rounded-lg shadow-lg mx-auto"
              style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Trusted by Millions</p>
                  <p className="text-sm text-gray-500">Secure Shopping Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
