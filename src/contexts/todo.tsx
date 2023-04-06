import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

enum TodoActionType {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  CHECK_TODO = 'CHECK_TODO',
}

type TodoAction =
  | { type: TodoActionType.ADD_TODO; payload: Todo }
  | { type: TodoActionType.REMOVE_TODO; payload: string }
  | { type: TodoActionType.CHECK_TODO; payload: string };

type TodoState = Todo[];

// 建立 todo reducer
// create a todo reducer
const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionType.ADD_TODO: {
      return [...state, action.payload];
    }
    case TodoActionType.REMOVE_TODO: {
      return state.filter((todo) => todo.id !== action.payload);
    }
    case TodoActionType.CHECK_TODO: {
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
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
const TodoContext = createContext<Todo[] | undefined>(undefined);
const TodoDispatchContext = createContext<Dispatch<TodoAction> | undefined>(
  undefined
);

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
    <TodoContext.Provider value={todoList}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}

/**
 * 建立 useTodoList custom hook，透過 useContext 取得 TodoContext 內容並回傳
 * Create a useTodoList custom hook, get TodoContext content through useContext and return it
 */
function useTodoList() {
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
function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (context === undefined) {
    throw new Error('useTodoDispatch must be used within TodoProvider.');
  }
  return context;
}

export { TodoProvider, useTodoList, useTodoDispatch, TodoActionType };
