
import React from 'react';
import CategoryCard from './CategoryCard';
import { ShoppingBag, Book, Laptop, Home, Shirt, Sparkles, Utensils, Baby } from 'lucide-react';

const categories = [
  { 
    name: 'Fashion', 
    icon: Shirt, 
    color: '#FF6B6B', 
    bgColor: '#FFECEC',
    count: 2500 
  },
  { 
    name: 'Electronics', 
    icon: Laptop, 
    color: '#4361EE', 
    bgColor: '#ECF0FF',
    count: 1800 
  },
  { 
    name: 'Home & Garden', 
    icon: Home, 
    color: '#4ECDC4', 
    bgColor: '#ECFAF9',
    count: 1500 
  },
  { 
    name: 'Beauty', 
    icon: Sparkles, 
    color: '#FF9F1C', 
    bgColor: '#FFF4E5',
    count: 1200 
  },
  { 
    name: 'Books', 
    icon: Book, 
    color: '#9B5DE5', 
    bgColor: '#F4ECFF',
    count: 2000 
  },
  { 
    name: 'Kitchen', 
    icon: Utensils, 
    color: '#F15BB5', 
    bgColor: '#FDECF5',
    count: 900 
  },
  { 
    name: 'Kids', 
    icon: Baby, 
    color: '#00BBF9', 
    bgColor: '#E5F8FF',
    count: 750 
  },
  { 
    name: 'All Categories', 
    icon: ShoppingBag, 
    color: '#333333', 
    bgColor: '#F0F0F0',
    count: 10000 
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              icon={category.icon}
              color={category.color}
              bgColor={category.bgColor}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
