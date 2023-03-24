import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

/**
 * 建立 todo context
 * Create todo context
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

/**
 * 建立 theme provider
 * Create theme provider
 */
function ThemeProvider({ children }: ProviderProps) {
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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 建立 useThemeContext custom hook，透過 useContext 取得 ThemeContext 內容並回傳
 * Create a useThemeContext custom hook, get ThemeContext content through useContext and return it
 */
function useThemeContext() {
  const context = useContext(ThemeContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (context === undefined) {
    throw new Error('useThemeContext must be used within ThemeProvider.');
  }
  return context;
}

export { ThemeProvider, useThemeContext };
