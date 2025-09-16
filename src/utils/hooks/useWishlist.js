import { useState, useCallback, useEffect } from 'react';

const WISHLIST_API = 'http://localhost:8081/user/wishlist';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(WISHLIST_API, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (response.ok) {
        setWishlistItems(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setError('Error fetching wishlist');
    }
    setLoading(false);
  }, []);

  const addToWishlist = useCallback(async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${WISHLIST_API}/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId })
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess('Added to wishlist');
        await fetchWishlist();
        return { success: true };
      } else {
        setError(result.error || 'Failed to add to wishlist');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setError('Error adding to wishlist');
      return { success: false, error: 'Error adding to wishlist' };
    } finally {
      setLoading(false);
    }
  }, [fetchWishlist]);

  const removeFromWishlist = useCallback(async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${WISHLIST_API}/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess('Removed from wishlist');
        await fetchWishlist();
        return { success: true };
      } else {
        setError(result.error || 'Failed to remove from wishlist');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setError('Error removing from wishlist');
      return { success: false, error: 'Error removing from wishlist' };
    } finally {
      setLoading(false);
    }
  }, [fetchWishlist]);

  const clearMessages = useCallback((delay = 0) => {
    if (delay > 0) {
      setTimeout(() => {
        setError('');
        setSuccess('');
      }, delay * 1000);
    } else {
      setError('');
      setSuccess('');
    }
  }, []);

  // useEffect(() => {
  //   fetchWishlist();
  // }, [fetchWishlist]);

  return {
    wishlistItems,
    loading,
    error,
    success,
    addToWishlist,
    removeFromWishlist,
    clearMessages,
    fetchWishlist
  };
};
