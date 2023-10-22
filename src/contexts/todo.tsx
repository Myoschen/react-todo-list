import {type Todo, TodoActionKind} from '@/types';
import {
  createContext,
  type Dispatch,
  type ReactNode,
  useEffect,
  useReducer,
} from 'react';

type TodoAction =
  | {type: TodoActionKind.ADD_TODO; payload: Todo}
  | {type: TodoActionKind.REMOVE_TODO; payload: string}
  | {type: TodoActionKind.CHECK_TODO; payload: string};

type TodoState = Todo[];

// 建立 todo reducer
// create a todo reducer
const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionKind.ADD_TODO: {
      return [...state, action.payload];
    }
    case TodoActionKind.REMOVE_TODO: {
      return state.filter((todo) => todo.id !== action.payload);
    }
    case TodoActionKind.CHECK_TODO: {
      return state.map((todo) =>
        todo.id === action.payload
          ? {...todo, completed: !todo.completed}
          : todo,
      );
    }
    default: {
      throw new Error('unknown action.');
    }
  }
};

// 先至 localStorage 檢查是否有資料，如果沒有的話使用預設的資料
// First go to localStorage to check whether there is data, if not, use the default data
const initializer = () => {
  const data = localStorage.getItem('todo-list');
  const defaultValue: Todo[] = [
    {
      id: 'YXa8ijpitGFyii_RoYkCR',
      title: 'Learn React.js',
      completed: true,
      timestamp: 1680771412607,
    },
    {
      id: 'lOXBrFfWN7eDD4DmCtqDG',
      title: 'Learn Golang',
      completed: false,
      timestamp: 1680771412607,
    },
    {
      id: 'JAWj0zgDXNNma6kbNTR7J',
      title: 'Learn Docker',
      completed: true,
      timestamp: 1680771412607,
    },
    {
      id: 'LaLpCGRllg8fLeimGVqfQ',
      title: 'Learn something else',
      completed: false,
      timestamp: 1680771412607,
    },
  ];
  return data ? JSON.parse(data) : defaultValue;
};

/**
 * 建立 todo context
 * Create todo context
 */
export const TodoContext = createContext<Todo[] | undefined>(undefined);
export const TodoDispatchContext = createContext<
  Dispatch<TodoAction> | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

/**
 * 建立 todo provider
 * Create todo provider
 */
export function TodoProvider({children}: ProviderProps) {
  const [todoList, dispatch] = useReducer(todoReducer, [], initializer);

  // 當 todoList 資料變動時，將資料更新到 localStorage
  // When the todoList data changes, update the data to localStorage
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoContext.Provider value={todoList}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}
