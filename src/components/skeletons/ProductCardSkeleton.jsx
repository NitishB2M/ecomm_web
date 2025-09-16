import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg overflow-hidden shadow-sm min-h-[400px] max-w-[350px] min-w-[350px]">
      {/* Image placeholder */}
      <div className="w-full pt-[100%] bg-gray-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        
        {/* Price */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Rating */}
        <div className="flex gap-2">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded w-full mt-4" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
