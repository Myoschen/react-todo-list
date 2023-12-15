import { nanoid } from 'nanoid'

import type { Todo } from '@/types'

interface GenTodoParams {
  title: string
  completed?: boolean
  createdAt?: number
}

export const genTodo = ({
  title,
  completed = false,
  createdAt = new Date().getTime(),
}: GenTodoParams) => {
  const id = nanoid()
  const newTodo: Todo = {
    id,
    title,
    completed,
    createdAt,
  }

  return newTodo
}
