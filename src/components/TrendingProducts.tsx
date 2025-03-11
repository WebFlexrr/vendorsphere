
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample product data
const trendingProducts = [
  {
    id: '5',
    name: 'Smart Home Security Camera',
    price: 79.99,
    image: 'https://img.freepik.com/free-photo/security-camera-system_23-2149262853.jpg',
    rating: 4.6,
    vendorName: 'SecurityPlus',
    isNew: true,
    category: 'Electronics'
  },
  {
    id: '6',
    name: 'Organic Skincare Gift Set',
    price: 49.99,
    image: 'https://img.freepik.com/free-photo/arrangement-black-friday-shopping-cart-with-copy-space_23-2148667046.jpg',
    rating: 4.8,
    vendorName: 'NaturalBeauty',
    isNew: true,
    category: 'Beauty'
  },
  {
    id: '7',
    name: 'Fitness Resistance Bands Set',
    price: 24.99,
    image: 'https://img.freepik.com/free-photo/balance-equipment-gym_23-2148256022.jpg',
    rating: 4.4,
    vendorName: 'FitLife',
    isFeatured: true,
    category: 'Sports'
  },
  {
    id: '8',
    name: 'Wireless Charging Station',
    price: 39.99,
    image: 'https://img.freepik.com/free-photo/professional-protective-equipment-desk_23-2148917792.jpg',
    rating: 4.3,
    vendorName: 'TechGadgets',
    category: 'Electronics'
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

const TrendingProducts = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Trending Products</h2>
          <Button variant="outline" className="border-vsphere-primary text-vsphere-primary hover:bg-vsphere-primary/10">
            View All
          </Button>
        </div>
        
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="px-4 py-2">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(category === 'All' 
                  ? trendingProducts 
                  : trendingProducts.filter(p => p.category === category)
                ).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    vendorName={product.vendorName}
                    isNew={product.isNew}
                    isFeatured={product.isFeatured}
                    category={product.category}
                  />
                ))}
                
                {/* If no products in the selected category, show a message */}
                {category !== 'All' && 
                 !trendingProducts.some(p => p.category === category) && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No products found in this category yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default TrendingProducts;
