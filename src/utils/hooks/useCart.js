import ApiCall from '../APICalls';
import Constants from '../Constant';

export const useCart = () => {
  const fetchCart = async() => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.GET_USER_CART,
      });
      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const addToCart = async(product_id, quantity) => {
    try {
      const payload = {
        product_id: product_id,
        quantity: quantity,
      };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.ADD_TO_CART.replace(':pid', product_id),
        method: 'POST',
        body: payload,
      });
      
      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  }

  const clearCart = async() => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.CLEAR_CART,
        method: 'DELETE',
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  }

  const updateProductQuantity = async(productId, quantity, method) => {
    try {
      const payload = {
        product_id: productId,
        quantity: quantity,
        method: method
      }
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.UPDATE_PRODUCT_QUANTITY,
        method: 'POST',
        body: payload
      })

      return response;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateCartItemQuantity = async(productId, cartId, quantity, isIncrease) => {
    try {
      const payload = {
        method: isIncrease ?  "add" : "subtract",
        quantity: Math.abs(quantity)
      }
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.UPDATE_PRODUCT_QUANTITY.replace(':pid', cartId),
        method: 'POST',
        body: payload
      })

      return response;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  const removeFromCart = async(cartId) => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.DELETE_CART_ITEM.replace(':id', cartId),
        method: 'DELETE',
      })

      return response;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  return {
    fetchCart,
    addToCart,
    removeFromCart,
    updateProductQuantity,
    updateCartItemQuantity,
    clearCart,
  };
};
