
import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const vendors = [
  {
    id: '1',
    name: 'ElectroTech',
    logo: 'https://img.freepik.com/free-vector/gradient-laptop-logo-template_23-2149001683.jpg',
    rating: 4.8,
    verified: true,
    products: 120,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'FashionHub',
    logo: 'https://img.freepik.com/free-vector/fashion-logo-template-design_23-2149497606.jpg',
    rating: 4.6,
    verified: true,
    products: 350,
    category: 'Fashion'
  },
  {
    id: '3',
    name: 'HomeDecor',
    logo: 'https://img.freepik.com/free-vector/furniture-logo-concept_23-2148627402.jpg',
    rating: 4.7,
    verified: true,
    products: 275,
    category: 'Home & Garden'
  },
  {
    id: '4',
    name: 'BeautyEssentials',
    logo: 'https://img.freepik.com/free-vector/hand-drawn-cosmetic-products-logo_23-2149759572.jpg',
    rating: 4.9,
    verified: true,
    products: 180,
    category: 'Beauty'
  },
  {
    id: '5',
    name: 'GourmetMarket',
    logo: 'https://img.freepik.com/free-vector/restaurant-logo-template-design_23-2149494067.jpg',
    rating: 4.7,
    verified: true,
    products: 95,
    category: 'Food & Beverages'
  },
  {
    id: '6',
    name: 'SportLife',
    logo: 'https://img.freepik.com/free-vector/gradient-running-logo-design_23-2149474347.jpg',
    rating: 4.5,
    verified: true,
    products: 210,
    category: 'Sports & Outdoors'
  },
];

const VendorShowcase = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Vendors</h2>
          <Button variant="outline" className="border-vsphere-primary text-vsphere-primary hover:bg-vsphere-primary/10">
            View All Vendors
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={vendor.logo} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium mb-1">{vendor.name}</h3>
              <div className="flex items-center justify-center text-sm mb-2">
                {vendor.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className="text-gray-500">{vendor.category}</span>
              </div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={i < Math.floor(vendor.rating) ? "fill-vsphere-accent text-vsphere-accent" : "text-gray-300"} 
                  />
                ))}
                <span className="text-xs ml-1 text-gray-500">{vendor.rating}</span>
              </div>
              <p className="text-xs text-gray-500">{vendor.products} products</p>
              <Button 
                variant="link" 
                className="text-xs text-vsphere-primary p-0 h-auto mt-2 hover:underline"
              >
                Visit Store
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorShowcase;
