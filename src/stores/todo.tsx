import { createContext, type Dispatch, type ReactNode, useEffect, useReducer } from 'react'
import { nanoid } from 'nanoid'

import { type Todo, TodoActionKind } from '@/lib/types'

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
      throw new Error('Unknown')
    }
  }
}

const defaultValues: Todo[] = [
  { id: nanoid(), title: 'Learn React', completed: true, createdAt: new Date('2023/11/05').getTime() },
  { id: nanoid(), title: 'Learn Next.js', completed: false, createdAt: new Date('2023/12/09').getTime() },
  { id: nanoid(), title: 'Learn TypeScript', completed: false, createdAt: new Date('2023/12/12').getTime() },
  { id: nanoid(), title: 'Learn Tailwind CSS', completed: true, createdAt: new Date('2023/12/05').getTime() },
]

function initializer() {
  const data = localStorage.getItem('todos')
  return data ? JSON.parse(data) : defaultValues
}

type TodoState = {
  todos: Todo[]
  dispatch: Dispatch<TodoAction>
}

export const TodoContext = createContext<TodoState>({
  todos: [],
  dispatch: () => {},
})

interface TodoProviderProps {
  children: ReactNode
}

export default function TodoProvider({ children }: TodoProviderProps) {
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
