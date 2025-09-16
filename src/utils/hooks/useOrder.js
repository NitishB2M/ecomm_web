import { useCallback, useState } from "react";

const ORDER_API = 'http://localhost:8083/user/orders';

export const useOrders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [orderCreatedData, setOrderCreatedData] = useState({});
  const [checkoutData, setCheckoutData] = useState({});

  const fetchOrderItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setOrderItems([]);
        setLoading(false);
        return;
      }
      const response = await fetch(`${ORDER_API}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (response.ok && result.data) {
        setOrderItems(result.data);
      } else {
        setOrderItems([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order items:', error);
      setOrderItems([]);
      setLoading(false);
    }
  };

  const checkoutSelectedItems = useCallback(async (dataToSend) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ORDER_API}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          dataToSend
        })
      });

      const result = await response.json();
      if (response.ok) {
        setCheckoutMessage('Checkout successful');
        setOrderCreatedData({})
      } else {
        setCheckoutError(result.error || 'Checkout failed')
        setCheckoutError(result.error || 'Checkout failed')
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setCheckoutError('Error during checkout');
    }
    setLoading(false);
  }, []);

  const clearCheckoutError = useCallback((v) => {
    if (v) {
      setTimeout(() => {
        setCheckoutError('');
      }, v * 1000);
    } else {
      setCheckoutError('');
    }
  }, []);
  const clearCheckoutMessage = useCallback((v) => {
    if (v) {
      setTimeout(() => {
        setCheckoutMessage('');
      }, v * 1000);
    } else {
      setCheckoutMessage('');
    }
  }, []);

  return {
    loading,
    checkoutError,
    checkoutMessage,
    orderItems,
    checkoutData,
    setCheckoutData,
    orderCreatedData,
    fetchOrderItems,
    checkoutSelectedItems,
    clearCheckoutError,
    clearCheckoutMessage
  };
}