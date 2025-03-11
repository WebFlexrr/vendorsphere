
import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  vendorName: string;
  isFeatured?: boolean;
  isNew?: boolean;
  discount?: number;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  vendorName,
  isFeatured = false,
  isNew = false,
  discount,
  category
}) => {
  return (
    <div className="product-card group">
      {/* Product image and badges */}
      <div className="relative">
        <img src={image} alt={name} className="product-card-image" />
        
        {/* Action buttons that appear on hover */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" className="rounded-full bg-white shadow-md">
            <Heart className="h-4 w-4 text-vsphere-primary" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white shadow-md">
            <ShoppingCart className="h-4 w-4 text-vsphere-primary" />
          </Button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-vsphere-primary text-white">New</Badge>
          )}
          {discount && (
            <Badge className="bg-vsphere-accent text-vsphere-dark">-{discount}%</Badge>
          )}
          {isFeatured && (
            <Badge className="bg-vsphere-secondary text-white">Featured</Badge>
          )}
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        {category && (
          <div className="text-xs text-gray-500 mb-1">{category}</div>
        )}
        <h3 className="font-medium text-lg line-clamp-2 mb-1 group-hover:text-vsphere-primary transition-colors">{name}</h3>
        <div className="text-sm text-gray-500 mb-2">by {vendorName}</div>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < Math.floor(rating) ? "fill-vsphere-accent text-vsphere-accent" : "text-gray-300"} 
            />
          ))}
          <span className="text-xs ml-1 text-gray-500">({rating.toFixed(1)})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline">
          <span className="text-lg font-bold text-vsphere-primary">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        {/* Add to cart button */}
        <Button className="w-full mt-3 bg-white border border-vsphere-primary text-vsphere-primary hover:bg-vsphere-primary hover:text-white transition-all">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
