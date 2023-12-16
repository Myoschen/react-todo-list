import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

import Header from '@/components/header'
import SortByToggle from '@/components/sort-by-toggle'
import ThemeToggle from '@/components/theme-toggle'
import TodoItem from '@/components/todo-item'
import Divider from '@/components/ui/divider'
import ProgressBar from '@/components/ui/progress-bar'
import { usePrevious } from '@/hooks/use-previous'
import { SortByContext } from '@/stores/sort-by'
import { TodoContext } from '@/stores/todo'
import { type Todo, TodoActionKind } from '@/types'
import { genTodo } from '@/utils/generator'

export default function App() {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLLIElement>(null)
  const { todos, dispatch } = useContext(TodoContext)
  const { sortBy } = useContext(SortByContext)
  const prevLength = usePrevious(todos.length)

  const sorted = useMemo(() => {
    if (sortBy === 'completed') {
      return [...todos].reduce(
        (acc, curr) => (curr.completed ? [...acc, curr] : [curr, ...acc]),
        [] as Todo[],
      )
    }
    else {
      return [...todos].sort((a, b) => a.createdAt - b.createdAt)
    }
  }, [todos, sortBy])

  const completeness = useMemo(() => {
    const total = todos.length
    const numOfCompleted = todos.reduce((sum, todo) => {
      return todo.completed ? sum + 1 : sum
    }, 0)
    return Math.round((numOfCompleted / total) * 100)
  }, [todos])

  const handleSubmit = () => {
    const title = input.trim()
    if (title.length !== 0) {
      dispatch({ type: TodoActionKind.ADD_TODO, payload: genTodo({ title }) })
      setInput('')
    }
  }

  useEffect(() => {
    if (todos.length > prevLength) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [prevLength, todos.length])

  return (
    <div
      className={'flex h-screen items-center justify-center transition-colors'}
    >
      <div className={'mx-auto min-h-[500px] w-full max-w-sm p-4'}>
        <Header title={'Todo List'} description={'Add things to do'}>
          <ThemeToggle />
        </Header>
        <Divider />
        <ProgressBar value={completeness} />

        <ul
          className={
          'my-2 h-80 space-y-2 overflow-y-auto overflow-x-hidden py-2'
          }
        >
          <AnimatePresence>
            {sorted.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
          <li ref={bottomRef} />
        </ul>

        <Divider />
        <SortByToggle />

        <div className={'mt-4 space-y-1'}>
          <label htmlFor={'new-todo'}>{'Add to list'}</label>
          <div className={'flex gap-x-2'}>
            <input
              id={'new-todo'}
              className={
              'flex-1 rounded border-none bg-primary/20 px-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background'
              }
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              className={
              'inline-flex h-10 w-10 items-center justify-center rounded bg-primary shadow-sm transition-colors ease-out hover:bg-primary/50'
              }
              onClick={handleSubmit}
            >
              <ChevronRight className={'text-background'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
