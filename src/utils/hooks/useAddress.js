import ApiCall from '../APICalls';
import Constants from '../Constant';

export const useAddress = () => {

  const fetchAddress = async() => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.GET_USER_ADDRESSES,
        method: 'POST',
      });
      
      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const addAddress = async(data) => {
    try {
      const payload = { ...data };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.ADD_USER_ADDRESS,
        method: 'POST',
        body: payload,
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const updateAddress = async(addressId, addressData) => {
    try {
      const payload = { addressData };
      const response = await ApiCall({
        url: `${Constants.API_ENDPOINTS.UPDATE_USER_ADDRESS}/${addressId}`,
        method: 'PUT',
        body: payload,
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const deleteAddress = async(data) => {
    try {
      const adr_id = data.address_id;
      const response = await ApiCall({
        url: `${Constants.API_ENDPOINTS.DELETE_USER_ADDRESS}/${adr_id}`,
        method: 'DELETE',
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const setDefaultAddress = async(addressId) => {
    try {
      const response = await ApiCall({
        url: `${Constants.API_ENDPOINTS.SET_PRIMARY_ADDRESS}/${addressId}`,
        method: 'PUT',
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  return {
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    fetchAddress
  };
};
