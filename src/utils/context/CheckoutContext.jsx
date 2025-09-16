import React, { createContext, useContext } from 'react';
import {useCheckout} from '../hooks/useCheckout';

// Create the CheckoutContext
const CheckoutContext = createContext();

// CheckoutProvider component to provide Checkout data to children
export const CheckoutProvider = ({ children }) => {
  const {
    checkout,
    setCheckout,
    checkoutLoading,
    setCheckoutLoading,
    checkoutError,
    checkoutMessage,
    orderCreatedData,
    checkoutData
  } = useCheckout();

  const contextValue = {
    checkout,
    setCheckout,
    checkoutLoading,
    setCheckoutLoading,
    checkoutError,
    checkoutMessage,
    orderCreatedData,
    checkoutData
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to access the Checkout context
export const useCheckoutContext = () => {
    const context = useContext(CheckoutContext);
    if (!context) {
      throw new Error('useCheckoutContext must be used within a CheckoutProvider');
    }
    return context;
  };

export default CheckoutContext;