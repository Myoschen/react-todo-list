import {
  createContext,
  type Dispatch,
  type ReactNode,
  useEffect,
  useReducer,
} from 'react'

import { type Todo, TodoActionKind } from '@/types'
import { getFakeTodos } from '@/utils/fake'

type TodoAction =
  | { type: TodoActionKind.ADD_TODO, payload: Todo }
  | { type: TodoActionKind.REMOVE_TODO, payload: string }
  | { type: TodoActionKind.CHECK_TODO, payload: string }

const todoReducer = (state: Todo[], action: TodoAction) => {
  switch (action.type) {
    case TodoActionKind.ADD_TODO: {
      return [...state, action.payload]
    }
    case TodoActionKind.REMOVE_TODO: {
      return state.filter(todo => todo.id !== action.payload)
    }
    case TodoActionKind.CHECK_TODO: {
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      )
    }
    default: {
      throw new Error('unknown action.')
    }
  }
}

const initializer = () => {
  const data = localStorage.getItem('todos')
  const defaultValue = getFakeTodos()
  return data ? JSON.parse(data) : defaultValue
}

type TodoState = {
  todos: Todo[]
  dispatch: Dispatch<TodoAction>
}

export const TodoContext = createContext<TodoState | undefined>(undefined)

interface TodoProviderProps {
  children: ReactNode
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(todoReducer, [], initializer)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}
