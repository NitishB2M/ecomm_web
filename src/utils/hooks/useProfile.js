import { useState } from 'react';
import ApiCall from '../APICalls';
import Constants from '../Constant';

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const fetchProfile = async (data) => {
    try {
      const payload = {
        user_id: data.id
      };
      const response = await ApiCall({ 
        url: Constants.API_ENDPOINTS.GET_USER_PROFILE,
        method: 'POST',
        body: payload
      });
      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.UPDATE_USER_PROFILE,
        method: 'PUT',
        body: data,
      });

      return response;
    } catch (error) {
      return { status: false, error: 'Failed to update profile' };
    }
  }

  const login = async (email, password, username) => {
    try {
      const payload = { email, password };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.LOGIN_USER,
        method: 'POST',
        body: payload,
      });

      if(response.status) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('USER', JSON.stringify(response.data.user));
        setUser(response.data.user);
      }

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const signup = async (data) => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.REGISTER_USER,
        method: 'POST',
        body: data,
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const switchRole = async (username) => {
    try {
      const payload = { username };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.SWITCH_USER_ROLE,
        method: 'POST',
        body: payload,
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      const payload = { email };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.PASSWORD_RESET_REQUEST,
        method: 'POST',
        body: payload,
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const resetPassword = async (password, token) => {
    try {
      const payload = { 
        new_password: password
      };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.PASSWORD_RESET + `?token=${token}`,
        method: 'POST',
        body: payload,
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const sendVerificationEmail = async (email) => {
    try {
      const payload = { email };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.SEND_VERIFICATION_EMAIL,
        method: 'POST',
        body: payload,
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const deactivateAccount = async (data) => {
    try {
      if (!data) {
        return { status: false, error: 'provide user details to deactivate account' };
      }
      const param = data.user.id;
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.DEACTIVATE_ACCOUNT + `${param}`,
        method: 'POST',
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    fetchProfile,
    updateProfile,
    login,
    signup,
    requestPasswordReset,
    sendVerificationEmail,
    deactivateAccount,
    logout,
    switchRole,
    resetPassword
  };
};
