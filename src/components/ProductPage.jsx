import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { StarRating } from './StarRating';

export function ProductPage({ product, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-purple-900">{product.title}</h1>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
            <p className="text-3xl font-bold text-purple-900">${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
            <div className="space-y-4">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}