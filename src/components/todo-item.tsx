import { motion, type Variants } from 'framer-motion'
import { X } from 'lucide-react'

import { useTodos } from '@/hooks/use-todos'
import { type Todo, TodoActionKind } from '@/types'
import { cn } from '@/utils/cn'

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { dispatch } = useTodos()

  const handleCheck = () =>
    dispatch({ type: TodoActionKind.CHECK_TODO, payload: todo.id })

  const handleRemove = () =>
    dispatch({ type: TodoActionKind.REMOVE_TODO, payload: todo.id })

  return (
    <motion.li
      className={'group relative rounded-md bg-primary/20 p-3 shadow-sm'}
      initial={'hidden'}
      animate={'visible'}
      exit={'hidden'}
      variants={variants}
      layout={'position'}
    >
      <div
        className={cn(
          'absolute left-1 top-1/2 h-10 w-1 -translate-y-1/2  rounded-md transition-colors duration-300',
          todo.completed ? 'bg-success' : 'bg-error',
        )}
      />
      <label
        className={'flex cursor-pointer items-center justify-between'}
        htmlFor={todo.id}
      >
        <input
          id={todo.id}
          className={'sr-only'}
          type={'checkbox'}
          defaultChecked={todo.completed}
          onClick={handleCheck}
        />
        <span
          className={cn('ml-2', {
            'text-foreground/50 line-through': todo.completed,
          })}
        >
          {todo.title}
        </span>
        <button
          className={'opacity-0 transition-opacity group-hover:opacity-100'}
          type={'button'}
          onClick={handleRemove}
        >
          <X className={'h-5 w-5'} />
        </button>
      </label>
    </motion.li>
  )
}
