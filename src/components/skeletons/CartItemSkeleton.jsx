import React from 'react';

const CartItemSkeleton = () => {
  return (
    <div className="animate-pulse flex gap-4 p-4 border-b border-gray-200">
      {/* Product image */}
      <div className="w-24 h-24 bg-gray-200 rounded-lg" />

      {/* Product details */}
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        
        {/* Actions */}
        <div className="flex gap-4">
          <div className="h-8 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded w-24" />
        </div>
      </div>

      {/* Price */}
      <div className="w-24">
        <div className="h-6 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
};

export default CartItemSkeleton;
