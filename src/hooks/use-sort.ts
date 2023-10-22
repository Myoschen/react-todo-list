import {SortContext} from '@/stores/sort';
import {useContext} from 'react';

/**
 * 建立 useSortContext custom hook，透過 useContext 取得 SortContext 內容並回傳
 * Create a useSortContext custom hook, get SortContext content through useContext and return it
 */
export function useSort() {
  const context = useContext(SortContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (context === undefined) {
    throw new Error('useSortContext must be used within SortProvider.');
  }
  return context;
}
