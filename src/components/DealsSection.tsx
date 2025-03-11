
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

// Sample product data
const dealProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://img.freepik.com/free-photo/pink-headphones-wireless-digital-device_53876-96804.jpg',
    rating: 4.5,
    vendorName: 'AudioTech',
    discount: 30,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch Fitness Tracker',
    price: 59.99,
    originalPrice: 99.99,
    image: 'https://img.freepik.com/free-photo/new-smartwatch-balance_23-2149853504.jpg',
    rating: 4.2,
    vendorName: 'TechGear',
    discount: 40,
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Premium Leather Jacket',
    price: 149.99,
    originalPrice: 249.99,
    image: 'https://img.freepik.com/free-photo/leather-jacket-hanger-store_23-2149758207.jpg',
    rating: 4.7,
    vendorName: 'UrbanStyle',
    discount: 40,
    category: 'Fashion'
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    price: 45.99,
    originalPrice: 69.99,
    image: 'https://img.freepik.com/free-photo/close-up-modern-wireless-speaker_23-2150188528.jpg',
    rating: 4.3,
    vendorName: 'SoundMaster',
    discount: 35,
    category: 'Electronics'
  },
];

const DealsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Deals Of The Week</h2>
          <Button variant="outline" className="border-vsphere-primary text-vsphere-primary hover:bg-vsphere-primary/10">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              rating={product.rating}
              vendorName={product.vendorName}
              discount={product.discount}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
