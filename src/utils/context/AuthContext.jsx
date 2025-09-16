import { createContext, useContext, useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const child = useProfile();

  return (
    <AuthContext.Provider value={child}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
