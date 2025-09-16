import React, { useState, useEffect } from "react";

export const useThemeHook = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      let isDarkMd = savedTheme === "dark" ? true : false;
      setIsDarkMode(isDarkMd);
    }
  }, []);

  const toggleTheme = (value) => {
    localStorage.setItem("theme", value ? "dark" : "light");
    setIsDarkMode(value);
  };

  return { isDarkMode, setIsDarkMode, toggleTheme };
}

