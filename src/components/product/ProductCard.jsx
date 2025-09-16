import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CustomProductTypography } from '@/utils/common/customTypography';
import { useCart } from '@/utils/hooks/useCart';
import { useWishlist } from '@/utils/hooks/useWishlist';
import { Formik } from "formik";
import * as Yup from "yup";
import { Eye, Heart } from 'phosphor-react';

const ProductCard = ({ product, isFlashSale = false, callback = null }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, wishlistItems } = useWishlist();

  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);
  const handleAddToCart = async (e) => {
    try {
      const result = await addToCart(product.id, 1);
      if (callback) {
        if (result.success) {
          callback(1,result.message);
        } else {
          callback(0, result.error);
        }
      } else {
        if (result.success) {
          console.log(result.message);
        } else {
          console.error(result.error);
        }
      }
      if (result.success) {
        toast.success(result.message, {
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          position: 'bottom-right',
        });
      } else {
        toast.error(result.error, {
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          position: 'bottom-right',
        });
      }
    } catch (error) {
      if (callback) {
        callback(0, error.message);
      } else {
        console.error(error.message);
      }
      toast.error(error.message, {
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        position: 'bottom-right',
      });
    }
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    try {
      await addToWishlist(product.id);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div 
      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg bg-surface dark:bg-primary border border-primary dark:border-border transition-all duration-1000 ease-in-out font-poppins"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <span className="absolute top-4 right-4 text-white bg-red-500 border border-red-500 text-sm px-2 py-1 z-10 font-semibold rounded-md">
          -{product.discount}% off
        </span>
      )}
      
      {/* Quick Action Buttons */}
      <div className={`absolute ${ product.discount > 0 ? 'top-16' : 'top-4' } right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}>
        <div 
          className={`flex items-center w-8`}
          onClick={handleAddToWishlist}
        >
          <Heart className={`text-3xl text-red-600 w-full rounded-md ${isInWishlist ? "bg-red-600 !text-white" : "bg-red-100" }`} />
        </div>
        <div 
          className="w-8"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/product/${product.id}`);
          }}
        >
          <Eye className={`text-3xl text-cyan-600 w-full rounded-md bg-cyan-100 `} />
        </div>
      </div>

      <div className="relative pt-[100%] dark:bg-d-boxBg">
        <img
          // src={`http://via.placeholder.com/200x200?text=${product.name}`}
          src={`https://picsum.photos/200/200?random=${product.id}`}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 scale-105 group-hover:scale-110"
        />
      </div>

      <div className="p-4 pt-2 font-poppins">
        <div className="font-medium dark:text-dark-primary">
          {product.name}
        </div>

        <div className="mt-2 flex justify-between items-center dark:text-secondary dark:hover:text-secondary">
          <div className="flex items-center gap-2">
            <div className="text-l-primary font-semibold dark:text-d-secondary">
              ₹{discountedPrice.toFixed(2)}
            </div>
            {product.discount > 0 && (
              <div className="text-gray-500 line-through" >
                ₹{product.price.toFixed(2)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div value={product.rating || 0} readOnly size="small" className="text-yellow-400" />
            <CustomProductTypography variant="body2" color="textSecondary" hoverColor="textSecondary">
              ({product.reviews || 0})
            </CustomProductTypography>
          </div>
        </div>

        {/* Stock Progress Bar for Flash Sale */}
        {isFlashSale && product.stock_percentage !== undefined && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-ctaBg h-2 rounded-full transition-all duration-300" 
                style={{ width: `${product.stock_percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <div className='flex gap-2'>
          <button
            type='button'
            className={`w-full mt-4 py-2 bg-dark-info text-white dark:text-dark-background dark:hover:bg-dark-cta transition-colors duration-500 text-sm font-medium rounded-md`}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            View Product
          </button>
          <button
            type='button'
            className={`w-full mt-4 py-2 bg-primary text-white dark:bg-dark-background/70 dark:text-dark-primary dark:hover:bg-dark-background transition-colors duration-500 text-sm font-medium rounded-md ${product.in_stock ? '' : '!text-danger dark:text-danger opacity-50 cursor-not-allowed'}`}
            onClick={handleAddToCart}
            disabled={!product.in_stock}
          >
            {product.in_stock? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;