import {useState, useCallback, useEffect} from 'react';

const CHECKOUT_API = 'http://localhost:8083/user/orders';

export const useCheckout = () => {
    const [checkout, setCheckout] = useState(() => {
            const saved = localStorage.getItem('checkout');
            return saved ? JSON.parse(saved) : {};
        }); // Initialize checkout state
    const [checkoutLoading, setCheckoutLoading] = useState(true); // Track loading state
    const [checkoutError, setCheckoutError] = useState(''); // Track errors
    const [checkoutMessage, setCheckoutMessage] = useState(''); // Track success messages
    const [orderCreatedData, setOrderCreatedData] = useState({}); // Track order creation data
    const [checkoutData, setCheckoutData] = useState({}); // Track checkout data

    useEffect(() => {
        localStorage.setItem('checkout', JSON.stringify(checkout));
    }, [checkout]);
    
    return { 
        checkout,
        setCheckout, 
        checkoutLoading, 
        setCheckoutLoading, 
        checkoutError, 
        checkoutMessage, 
        orderCreatedData, 
        checkoutData
    };
};