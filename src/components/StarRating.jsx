import React from 'react';
import { Star } from 'lucide-react';

export function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${i < rating ? 'fill-purple-500 text-purple-500' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}