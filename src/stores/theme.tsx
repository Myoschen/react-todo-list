import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

import type {Theme} from '@/types';

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

/**
 * 建立 theme context
 * Create theme context
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
}

/**
 * 建立 theme provider
 * Create theme provider
 */
export function ThemeProvider({children}: ProviderProps) {
  // 初始化會先至 localStorage 查看是否有資料
  // Initialization will first go to localStorage to check if there is any data
  const [theme, setTheme] = useState<Theme>(() => {
    const data = localStorage.getItem('theme');
    return data ? JSON.parse(data) : 'light';
  });

  // 當 theme 變動時，將資料更新到 localStorage
  // When the theme changes, update the data to localStorage
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  // 添加 dark 或 light 至 body classList
  // add dark or light class to body
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
