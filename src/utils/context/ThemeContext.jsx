import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromLocalStorage } from '../Helpers';
import { useThemeHook } from '../hooks/useTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { isDarkMode, setIsDarkMode, toggleTheme } = useThemeHook();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
