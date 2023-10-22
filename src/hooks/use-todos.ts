import {useContext} from 'react';

import {TodoContext} from '@/stores/todo';

export function useTodos() {
  const context = useContext(TodoContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (context === undefined) {
    throw new Error('useTodos must be used within TodoProvider.');
  }
  return context;
}
