
import React from 'react';
import { Button } from '@/components/ui/button';

const PromoSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First promo card */}
          <div className="rounded-lg overflow-hidden relative">
            <img 
              src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg" 
              alt="New Arrivals" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-vsphere-dark/70 to-transparent flex flex-col justify-center p-8">
              <h3 className="text-white text-2xl font-bold mb-2">New Arrivals</h3>
              <p className="text-white/80 mb-4 max-w-xs">Discover the latest products from our top vendors</p>
              <Button className="bg-white text-vsphere-primary hover:bg-gray-100 w-fit">
                Shop Now
              </Button>
            </div>
          </div>
          
          {/* Second promo card */}
          <div className="rounded-lg overflow-hidden relative">
            <img 
              src="https://img.freepik.com/free-photo/close-up-hand-holding-smartphone-with-black-friday-shopping-cart_23-2148307651.jpg" 
              alt="Season Sale" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-vsphere-primary/70 to-transparent flex flex-col justify-center p-8">
              <h3 className="text-white text-2xl font-bold mb-2">Season Sale</h3>
              <p className="text-white/80 mb-4 max-w-xs">Up to 50% off on selected items. Limited time offer!</p>
              <Button className="bg-white text-vsphere-primary hover:bg-gray-100 w-fit">
                View Offers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
