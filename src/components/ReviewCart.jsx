import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "keep-react";
import { ShoppingCart } from "phosphor-react";
import { useCheckout } from "@utils/hooks/useCheckout";
const ReviewCart = () => {
  const navigate = useNavigate();
  const { checkout } = useCheckout();

  const shortString = (str) => {
    if (str.length > 150) {
      return str.substring(0, 150) + "...";
    }
    return str;
  };

  const calculateTotal = () => {
    return checkout.cart_items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return checkout.cart_items.reduce((total, item) => total + (item.price * item.quantity * (item.product.discount / 100)), 0);
  };

  const calculateSubtotal = () => {
    return calculateTotal() - calculateDiscount();
  }

  const calculateGrandTotal = () => {
    return checkout.cart_items.reduce((total, item) => total + (item.price * item.quantity * (1 - item.product.discount / 100)), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  if (!checkout || checkout.cart_items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div variant="h4" className="mb-4 dark:text-d-secondary">
          Your cart is empty
        </div>
        <div variant="body1" className="mb-8 dark:text-d-secondary">
          Add items to your cart to continue shopping
        </div>
        <Button
          className="mt-2 bg-l-primary dark:bg-d-primary dark:hover:bg-d-primary hover:bg-l-primary text-l-ctaText dark:text-d-border border py-2 px-4 rounded"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 dark:bg-d-boxBg/30 bg-l-boxBg/30 rounded-lg py-8 px-8">
      <div className="flex justify-between">
        <div variant="h6" className="mb-4 dark:text-d-secondary">Cart Items</div>
        {checkout && (
          <div variant="h6" className="mb-4 dark:text-d-secondary">
            Total Items: {checkout.cart_items.length}
          </div>
        )}
      </div>
      <div className="dark:border-d-border border-l-border dark:border-d-secondary !my-2" />
      <div className="flex flex-col gap-4 justify-between">
        {/* Cart Items with Scroll */}
        <div className="flex flex-row flex-wrap gap-4 overflow-y-auto max-h-[calc(100vh-150px)] w-full lg:w-auto overflow-x-hidden">
          {checkout && checkout.cart_items.map((item) => (
            <div
              key={item.cart_id}
              className={`flex flex-col justify-between p-4 rounded-lg border text-l-primary bg-l-boxBg dark:bg-d-boxBg  min-w-[49%] max-w-[49%] max-h-[400px] dark:border-d-border/80 overflow-hidden`}
            >
              {/* Product Image */}
              <div className="flex gap-4">
                <div className="w-32 h-32">
                  <img
                    src={`http://via.placeholder.com/200x200?text=${item.product.name}`}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-lg border dark:border-d-border"
                  />
                </div>
                <div className="flex flex-col flex-wrap items-start dark:text-d-primary">
                  <span className="font-medium">
                    {item.product.name}
                  </span>
                  <span className="font-normal text-sm dark:text-d-secondary">
                    {shortString(item.product.short_desc)}
                  </span>
                  {item.size && (
                    <span className="font-medium dark:text-d-secondary">
                      Size: {item.size}
                    </span>
                  )}
                  {item.color && (
                    <span className="font-medium dark:text-d-secondary">
                      Color: {item.color}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col w-full mt-1 dark:text-d-secondary">
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-sm">Price:</span>
                  <span className="font-normal text-sm">₹{item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-sm">Quantity:</span>
                  <span className="font-normal text-sm">{item.quantity}</span>
                </div>
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-sm">Subtotal:</span>
                  <span className={`${item.product.discount > 0 ? 'line-through' : ''} font-normal text-sm`}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="my-2 border dark:border-d-secondary" />
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-sm">Discount:</span>
                  {item.product.discount > 0 ? (
                    <span className="font-semibold text-c-success text-sm">-{item.product.discount}%</span>
                  ) : (
                    <span className="font-semibold text-sm">0%</span>
                  )}
                </div>
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-sm">Total:</span>
                  <span className="font-normal text-sm">
                    ₹{(item.price * item.quantity * (1 - item.product.discount / 100)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary - Fixed on the Right */}
        <div className="flex flex-col gap-4 lg:col-span-1 dark:text-d-primary">
          <div className={`p-6 rounded-lg shadow-sm bg-l-boxBg dark:bg-d-boxBg dark:border`}>
            <div variant="h6" className="mb-4">
              Order Summary
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <div variant="subtitle2" className="mb-2">
                Applied Promo Code
              </div>
              <div className="flex gap-2"></div>
            </div>

            <div className="my-4 dark:border-d-secondary" />

            {/* Cost Breakdown */}
            <div className="space-y-3 my-2">
              <div className="flex justify-between">
                <div>Shipping cost</div>
                <div>TBD</div>
              </div>
              <div className="flex justify-between">
                <div>Discount</div>
                <div>- ₹{calculateDiscount().toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax (18%)</div>
                <div>+ ₹{calculateTax().toFixed(2)}</div>
              </div>
              <div className="my-4 dark:border-d-secondary" />
              <div className="flex justify-between font-bold">
                <div variant="body1">Total</div>
                <div variant="body1">₹{calculateGrandTotal().toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReviewCart;