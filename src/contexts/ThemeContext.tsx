import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('animora_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
    } catch {
      // ignore
    }
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = darkMode ? 'dark' : 'light';
    root.setAttribute('data-theme', theme);
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('animora_theme', theme);
    } catch {
      // ignore
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkModeState((prev) => !prev);
  const setDarkMode = (val: boolean) => setDarkModeState(val);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
