import { nanoid } from 'nanoid';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type TodoContextType = {
  todoList: Todo[];
  addTodo: (todo: string) => void;
  removeTodo: (id: string) => void;
  checkTodo: (id: string) => void;
};

/**
 * 建立 todo context
 * Create todo context
 */
const TodoContext = createContext<TodoContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

/**
 * 建立 todo provider
 * Create todo provider
 */
function TodoProvider({ children }: ProviderProps) {
  // 初始化會先至 localStorage 查看是否有資料
  // Initialization will first go to localStorage to check if there is any data
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const data = localStorage.getItem('todo-list');
    return data ? JSON.parse(data) : [];
  });

  // 新增 Todo
  // Add a new todo
  const addTodo = useCallback((title: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      title,
      completed: false,
      timestamp: new Date().getTime(),
    };
    setTodoList((list) => [...list, newTodo]);
  }, []);

  // 刪除 todo
  // Remove a todo
  const removeTodo = useCallback((id: string) => {
    setTodoList((list) => list.filter((item) => item.id !== id));
  }, []);

  // 勾選 todo
  // check a todo
  const checkTodo = useCallback((id: string) => {
    setTodoList((list) =>
      list.map((item) => {
        return item.id === id ? { ...item, completed: !item.completed } : item;
      })
    );
  }, []);

  // 當 todoList 資料變動時，將資料更新到 localStorage
  // When the todoList data changes, update the data to localStorage
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoContext.Provider value={{ todoList, addTodo, removeTodo, checkTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

/**
 * 建立 useTodoContext custom hook，透過 useContext 取得 TodoContext 內容並回傳
 * Create a useTodoContext custom hook, get TodoContext content through useContext and return it
 */
function useTodoContext() {
  const context = useContext(TodoContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (!context) {
    throw new Error('useTodoContext has to be used within <TodoProvider>');
  }
  return context;
}

export { TodoProvider, useTodoContext };
