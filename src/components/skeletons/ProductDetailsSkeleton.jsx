import React from 'react';
const ProductDetailsSkeleton = () => {
  return (
    <div maxWidth="xl" className="py-8">
      <div container spacing={6}>
        {/* Product Image div */}
        <div item xs={12} md={6}>
          <div className="bg-light-card-background dark:bg-dark-card-background rounded-lg p-4">
            <div
              variant="rectangular"
              width="100%"
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Product Info div */}
        <div item xs={12} md={6}>
          <div className="space-y-6">
            {/* Title */}
            <div variant="text" width="80%" height={40} />

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div variant="text" width={120} height={24} />
              <div variant="text" width={100} height={24} />
            </div>

            {/* Price */}
            <div variant="text" width={150} height={40} />

            {/* Description */}
            <div className="space-y-2">
              <div variant="text" width="100%" />
              <div variant="text" width="100%" />
              <div variant="text" width="80%" />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <div variant="text" width={80} height={40} />
              <div className="flex items-center space-x-2">
                <div variant="circular" width={40} height={40} />
                <div variant="text" width={40} height={40} />
                <div variant="circular" width={40} height={40} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <div variant="rectangular" width="70%" height={48} className="rounded-md" />
              <div variant="circular" width={48} height={48} />
              <div variant="circular" width={48} height={48} />
            </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-light-card-background dark:bg-dark-card-background rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div variant="circular" width={24} height={24} />
                <div variant="text" width={120} height={24} />
              </div>
              <div variant="text" width="90%" height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
