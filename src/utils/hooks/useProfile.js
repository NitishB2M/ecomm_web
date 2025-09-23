import { useState } from 'react';
import ApiCall from '../APICalls';
import Constants from '../Constant';
import { useRouter } from 'next/navigation';

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const fetchProfile = async (data) => {
    try {
      const payload = {
        id: data.id
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
        const roles = response.data.user.roles;
        const loggedInRole = roles.find(role => role.is_current === true);
        localStorage.setItem('LOGIN_ROLE', loggedInRole.role_name);
        setUser(response.data.user);
      }

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const register = async (data) => {
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password
      }
      console.log(payload);
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.REGISTER_USER,
        method: 'POST',
        body: payload,
      });

      return response;
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const switchRole = async (data) => {
    try {
      const payload = { 
        role_id: data.role_id,
        user_id: data.user_id
      };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.SWITCH_USER_ROLE,
        method: 'POST',
        body: payload,
      });

      if(response.status) {
        localStorage.setItem('USER', JSON.stringify(response.data));
        const roles = response.data.roles;
        const loggedInRole = roles.find(role => role.is_current === true);
        localStorage.setItem('LOGIN_ROLE', loggedInRole.role_name);
        setUser(response.data);
      }

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

  const verifyEmail = async (token) => {
    try {
      const payload = { token: token };
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.VERIFY_EMAIL,
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
    localStorage.removeItem('USER');
    localStorage.removeItem('LOGIN_ROLE');
    setUser(null);
    return { status: true };
  };

  return {
    user,
    fetchProfile,
    updateProfile,
    login,
    register,
    deactivateAccount,
    logout,
    switchRole,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
    sendVerificationEmail,
  };
};
