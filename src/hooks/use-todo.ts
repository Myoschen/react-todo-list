import {TodoContext, TodoDispatchContext} from '@/stores/todo';
import {useContext} from 'react';

/**
 * 建立 useTodoList custom hook，透過 useContext 取得 TodoContext 內容並回傳
 * Create a useTodoList custom hook, get TodoContext content through useContext and return it
 */
export function useTodoList() {
  const context = useContext(TodoContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (context === undefined) {
    throw new Error('useTodoList must be used within TodoProvider.');
  }
  return context;
}

/**
 * 建立 useTodoDispatch custom hook，透過 useContext 取得 TodoDispatchContext 內容並回傳
 * Create a useTodoDispatch custom hook, get TodoDispatchContext content through useContext and return it
 */
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (context === undefined) {
    throw new Error('useTodoDispatch must be used within TodoProvider.');
  }
  return context;
}
