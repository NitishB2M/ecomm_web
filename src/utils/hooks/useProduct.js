import ApiCall from '../APICalls';
import Constants from '../Constant';

const PRODUCT_API = 'http://localhost:8081/product';
const PRODUCTS_API = 'http://localhost:8081/products';

export const useProduct = () => {

  const fetchProductCategories = async () => {
    try {
      const response = await ApiCall({ url: Constants.API_ENDPOINTS.GET_PRODUCT_CATEGORIES });
      return response;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await ApiCall({ url: Constants.API_ENDPOINTS.GET_ALL_PRODUCTS });
      return response;
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  const fetchProductsForSeller = async () => {
    try {
      const result = await ApiCall({ url: Constants.API_ENDPOINTS.GET_SELLER_PRODUCTS });
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchProductOffers = async () => {
    try {
      const response = await ApiCall({ url: Constants.API_ENDPOINTS.GET_PRODUCT_OFFERS });
      return response;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await ApiCall({ url: Constants.API_ENDPOINTS.GET_FEATURED_PRODUCTS });
      return response;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchFilteredProducts = async (filteredParams) => {
    try {
      const response = await ApiCall({ url: Constants.API_ENDPOINTS.GET_FILTERED_PRODUCTS + `?${filteredParams}` });
      return response;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.ADD_PRODUCT,
        method: 'POST',
        body: product,
      })
      return response;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateProduct = async (product, productId) => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.UPDATE_PRODUCT + `/${productId}`,
        method: 'PUT',
        body: product,
      })
      return response;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await ApiCall({ 
        url: Constants.API_ENDPOINTS.DELETE_PRODUCT + `/${productId}`, 
        method: 'POST',
        body: { id: productId } 
      });
      return response;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    fetchProducts,
    fetchProductOffers,
    fetchFeaturedProducts,
    fetchFilteredProducts,
    fetchProductCategories,
    addProduct,
    updateProduct,
    fetchProductsForSeller,
    deleteProduct
  };
}