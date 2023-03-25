import { nanoid } from 'nanoid';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

export enum TodoActionType {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  CHECK_TODO = 'CHECK_TODO',
}

type TodoAction =
  | { type: TodoActionType.ADD_TODO; payload: string }
  | { type: TodoActionType.REMOVE_TODO; payload: string }
  | { type: TodoActionType.CHECK_TODO; payload: string };

type TodoState = Todo[];

// 建立 todo reducer
// create a todo reducer
const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionType.ADD_TODO:
      const newTodo: Todo = {
        id: nanoid(),
        title: action.payload,
        completed: false,
        timestamp: new Date().getTime(),
      };
      return [...state, newTodo];
    case TodoActionType.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case TodoActionType.CHECK_TODO:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      throw new Error();
  }
};

// 先至 localStorage 檢查是否有資料，如果沒有的話使用預設的資料
// First go to localStorage to check whether there is data, if not, use the default data
const initializer = () => {
  const data = localStorage.getItem('todo-list');
  const defaultValue: Todo[] = [
    {
      id: nanoid(),
      title: 'Learn React.js',
      completed: true,
      timestamp: new Date().getTime(),
    },
    {
      id: nanoid(),
      title: 'Learn Golang',
      completed: false,
      timestamp: new Date().getTime(),
    },
    {
      id: nanoid(),
      title: 'Learn Docker',
      completed: true,
      timestamp: new Date().getTime(),
    },
    {
      id: nanoid(),
      title: 'Learn something else',
      completed: false,
      timestamp: new Date().getTime(),
    },
  ];
  return data ? JSON.parse(data) : defaultValue;
};

type TodoContextType = {
  todoList: Todo[];
  dispatch: Dispatch<TodoAction>;
};

/**
 * 建立 todo context
 * Create todo context
 */
const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

/**
 * 建立 todo provider
 * Create todo provider
 */
function TodoProvider({ children }: ProviderProps) {
  const [todoList, dispatch] = useReducer(todoReducer, [], initializer);

  // 當 todoList 資料變動時，將資料更新到 localStorage
  // When the todoList data changes, update the data to localStorage
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoContext.Provider value={{ todoList, dispatch }}>
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
  if (context === undefined) {
    throw new Error('useTodoContext must be used within TodoProvider.');
  }
  return context;
}

export { TodoProvider, useTodoContext };
