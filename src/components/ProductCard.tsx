
import React from 'react';
import StarRating from './StarRating';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  averageRating: number;
  totalReviews: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onViewReviews: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewReviews }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-white rounded-full px-2 py-1 shadow-md">
            <span className="text-sm font-semibold text-gray-800">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StarRating rating={product.averageRating} size={18} />
            <span className="text-sm font-medium text-gray-700">
              {product.averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.totalReviews} reviews)
          </span>
        </div>
        
        <button
          onClick={() => onViewReviews(product.id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          View Reviews
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
