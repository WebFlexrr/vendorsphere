
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  count?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon: Icon,
  color,
  bgColor,
  count,
}) => {
  return (
    <a 
      href="#" 
      className="flex flex-col items-center p-4 rounded-lg transition-all hover:shadow-md"
    >
      <div 
        className="category-icon"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <h3 className="font-medium text-center mt-2">{name}</h3>
      {count !== undefined && (
        <span className="text-xs text-gray-500 mt-1">{count} products</span>
      )}
    </a>
  );
};

export default CategoryCard;
