import {ThemeContext} from '@/contexts/theme';
import {useContext} from 'react';

/**
 * 建立 useThemeContext custom hook，透過 useContext 取得 ThemeContext 內容並回傳
 * Create a useThemeContext custom hook, get ThemeContext content through useContext and return it
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (context === undefined) {
    throw new Error('useThemeContext must be used within ThemeProvider.');
  }
  return context;
}
