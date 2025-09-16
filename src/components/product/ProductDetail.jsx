import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ProductDetailsSkeleton from '../skeletons/ProductDetailsSkeleton';
import { useCart } from '@/utils/hooks/useCart';
import { Heart, Minus, Plus, ShoppingBag, ShoppingCart, Trash } from 'phosphor-react';
import { TbTruckReturn } from 'react-icons/tb';
import ApiCall from '@/utils/APICalls';
import Constants from '@/utils/Constant';

const ProductDetail = () => {
  const { addToCart, updateCartItemQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('white');
  const [error, setError] = useState(null);
  
  const navigate = useRouter();
  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.GET_PRODUCT_BY_ID.replace(':id', id),
        method: 'GET',
      })

      if(response.status){
        if(!response.data.in_stock){
          toast.warn('Product is out of stock', {
            duration: 3000,
            position: 'bottom-right',
          })
        }
        setProduct(response.data);
        setSelectedColor(response.data.colors[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleQuantityChange = async (qty) => {
    if (quantity >= 1) {
      setQuantity((prevQuantity) => prevQuantity + qty);
    } else {
      setQuantity(1);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.ADD_TO_WISHLIST,
        method: 'POST',
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.status) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };

  const handleAddToCart = async () => {
    const response = await addToCart(product.id, quantity);
    if (response.status) {
      toast.success(response.message);
      setTimeout(() => {
        navigate.push('/cart');
      }, 2000);
    } else {
      toast.error(response.error);
      if (response.error.includes('out of stock')) {
        await fetchProduct();
      }
    }
  };

  const calculateTotal = () => {
    return product.price * quantity;
  };

  const acutualPrice = () => {
    return product.price;
  };

  const calculateDiscount = (discount) => {
    return acutualPrice() * quantity * (discount / 100);
  };

  const calculateSubtotal = () => {
    return calculateTotal();
  }

  const calculateTax = (tax) => {
    return calculateSubtotal() * (tax / 100);
  };

  const calculateGrandTotal = (tax, discount) => {
    return calculateSubtotal() + calculateTax(tax) - calculateDiscount(discount);
  };

  const handleImageSelect = (imageId) => {
    setSelectedImage(imageId);
  };

  const handleStyleFromOptions = (options) => {
    const style = {};
    try {
      const decodedOptions = JSON.parse(options);
      for (const [key, value] of Object.entries(decodedOptions)) {
        style[key] = value;
      }
      return style;
    } catch (error) {
      console.error("Invalid JSON string:", error);
      return null;
    }
  };

  useEffect(() => {
    if (product) {
      const updatedImages = product.images?.map(image => ({
        ...image,
        is_main: image.id === selectedImage
      }));
      
      setProduct(prev => ({
        ...prev,
        images: updatedImages
      }));
    }
  }, [selectedImage]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  return (
    <div className="m_container min_h_screen mx-auto px-4 py-8">
      <div className='grid grid-cols-12 gap-4'>
        {/* Product Images */}
        <div className='col-span-12 md:col-span-6'>
          <div className="flex gap-4">
            <div className="w-24 space-y-4">
              {product?.images && product.images.length > 0 ? product.images.map((image, index) => (
                <div
                  key={image.id}
                  className={`border-2 rounded cursor-pointer text-sm ${image.is_main ? 'border-info' : 'border-gray-200'}`}
                  onClick={() => handleImageSelect(image.id)}
                >
                  <img
                    src={image.url}
                    alt={`${product.id} view ${index + 1}`}
                    className="w-full h-24 object-contain p-2"
                  />
                </div>
              )) : (
                <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded p-4 flex items-center justify-center">
                  No images available
                </div>
              )}
            </div>
            {product?.images && product?.images.length > 0 ? (
              <div className="flex-1">
                {product?.images?.map((image, index) => {
                  // Display the selected or main image in large view
                  if (selectedImage === image.id || image?.is_main) {
                    return (
                      <img
                        key={image.id}
                        src={image.url || `https://picsum.photos/200/200?random=${product?.id + index}`}
                        alt={product?.name}
                        className="w-full h-[500px] object-contain border-2 border-gray-200 dark:border-dark-border rounded p-4"
                      />
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded p-4 flex items-center justify-center">
                {/* via.placeholder */}
                {/* <img src={`https://placehold.co/800x500/?text=No+Image+Available&font=poppins`} alt="No Image Available" /> */}
                <img className='rounded-md' src={`https://placehold.co/600x400/1E293B/FFFFFF/png`} alt="No Image Available" />
              </div>
            )}
          </div>
          {product?.attributes?.length > 0 && (
            <div className="flex flex-col gap-2 !mt-8 p-8 rounded-lg shadow-sm dark:bg-d-boxBg border border-l-border dark:border-d-border">
              <div className="!mb-2">
                Specification:
              </div>
              <div className="">
                {product?.attributes?.length > 0 && product.attributes.map((attribute, index) => (
                  <>
                    <div key={index} className="p-2 flex gap-2 justify-between">
                      <span className="font-semibold text-gray-600">{attribute.name}</span>
                      <span className="font-semibold text-gray-600"> {attribute.value}</span>
                    </div>
                    <div className='my-2 dark:border-gray-600' />
                  </>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className='col-span-12 md:col-span-6'>
          <div className="mb-2 text-2xl font-bold">
            {product.name}
          </div>
          <div className="mb-6 text-md font-medium text-secondary">
            {product.description}
          </div>
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex flex-row items-center gap-3">
              <div className="text-xl font-bold">
                ₹{product.discount
                  ? (product.price * (1 - product.discount / 100)).toFixed(2)
                  : product.price}
              </div>
              {product.discount > 0 && (
                <div className="text-md font-semibold line-through">
                  ₹{product.price}
                </div>
              )}
              <div className="text-md font-semibold text-green">
                (₹{product.discount} off)
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div value={product.rating} className="!m-0 !p-0" onChange={(newValue) => console.log(newValue)} />
              <div className="ml-2">({product?.reviews} Reviews)</div>
            </div>
          </div>

          {/* Variants */}
          {product?.variants?.length > 0 && (
            <div className="mb-6 mt-4">
              <div className="!mb-2">
                Variants:
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-2">
                  {product?.variants?.map((variant, index) => {
                    if (Object.keys(variant.options).length === 0 || !variant?.options) return null;
                    const options = JSON.parse(variant?.options);
                    const variantColor = options?.color;

                    return (
                      <div
                        key={variant?.id}
                        className="w-6 h-6 rounded-full"
                        style={{
                          backgroundColor: variantColor,
                          cursor: 'pointer',
                        }}
                        title={variant?.sku}
                        onClick={() => handleColorChange(variantColor)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Size */}
          {product?.sizes?.length > 0 && (
            <div className="mb-6">
              <div className="mb-2">
                Size:
              </div>
              <div className="flex gap-2">
                {product?.sizes?.map((size) => (
                  <div
                    key={size}
                    variant={selectedSize === size ? 'contained' : 'outlined'}
                    className={selectedSize === size ? 'bg-primary' : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-6 mb-6 mt-4">
            <div className="flex items-center border rounded px-4 py-2">
              <button type="button" className='button !bg-transparent !p-0' onClick={() => handleQuantityChange(-1)} disabled={quantity === 1}>
                {quantity === 1 ? 
                  <Trash size={22} className="text-red-600 dark:text-red-400" /> : 
                  <Minus size={22} className="text-red-600 dark:text-red-400" />
                }
              </button>
              <div className="w-12 text-center text-lg font-bold">
                {quantity}
              </div>
              <button type="button" className='button !bg-transparent !p-0' onClick={() => handleQuantityChange(1)} disabled={!product.in_stock || quantity === 0}>
                <Plus size={22} className="text-green-500" />
              </button>
            </div>

            <button
              type='button'
              className="button"
              onClick={handleAddToCart}
              disabled={!product.in_stock || quantity === 0}
            >
              <ShoppingCart size={28} title="Add to Cart" className="title" />
              Add to Cart
            </button>

            <button type='button' className="button !bg-red-700" onClick={() => handleWishlist(product)}>
              <Heart size={28} title="Wishlist" className="title" /> Add to Wishlist
            </button>
          </div>

          {error && (
            <div className="mb-4">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-4 lg:col-span-1 dark:text-d-primary">
            <div className={`p-6 rounded-lg shadow-sm dark:bg-d-boxBg border border-l-border dark:border-d-border`}>
              {/* Cost Breakdown */}
              <div className="space-y-3 my-2">
                <div className="flex justify-between">
                  <div>Price * Quantity ({quantity})</div>
                  <div>₹{product.price} * {quantity}</div>
                </div>
                <div className="flex justify-between">
                  <div>Subtotal</div>
                  <div>₹{calculateSubtotal().toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Shipping cost</div>
                  <div>TBD</div>
                </div>
                <div className="flex justify-between">
                  <div>Discount</div>
                  <div>- ₹{calculateDiscount(product.discount).toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Tax ({product?.tax}%)</div>
                  <div>+ ₹{calculateTax(product.tax).toFixed(2)}</div>
                </div>
                <div className="my-4 dark:border-d-secondary" />
                <div className="flex justify-between font-bold">
                  <div className=''>Total</div>
                  <div className=''>₹{calculateGrandTotal(product.tax, product.discount).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Delivery Info */}
          <div className="border rounded-lg p-4 space-y-4 mt-4">
            <div className="flex items-center gap-4">
              <ShoppingBag size={28} className="text-info dark:text-dark-info" />
              <div className='flex flex-col'>
                <div className='text-muted dark:text-dark-muted'>
                  Free Delivery
                </div>
                <div className='text-muted dark:text-dark-muted'>
                  Enter your postal code for delivery availability
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <TbTruckReturn size={28} className="text-info dark:text-dark-info" />
              <div>
                <div className='text-muted dark:text-dark-muted'>
                  Return Delivery
                </div>
                <div className='text-muted dark:text-dark-muted' >
                  Free 30 Days Delivery Returns. Details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
