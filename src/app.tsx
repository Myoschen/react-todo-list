import {useEffect, useMemo, useRef, useState} from 'react';
import {AnimatePresence} from 'framer-motion';

import {TodoActionKind} from '@/types';
import Divider from '@/components/ui/divider';
import ProgressBar from '@/components/ui/progress-bar';
import Header from '@/components/header';
import TodoItem from '@/components/todo-item';
import ThemeToggle from '@/components/theme-toggle';
import SortByToggle from '@/components/sort-by-toggle';
import {useTodos} from '@/hooks/use-todos';
import {useSortBy} from '@/hooks/use-sort';
import {usePrevious} from '@/hooks/use-previous';
import {genTodo} from '@/utils/generator';

function App() {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLLIElement>(null);
  const {todos, dispatch} = useTodos();
  const {sortBy} = useSortBy();
  const prevLength = usePrevious(todos.length);

  const sorted = useMemo(() => {
    if (sortBy === 'completed') {
      return [
        ...todos.filter((todo) => !todo.completed),
        ...todos.filter((todo) => todo.completed),
      ];
    } else {
      return [...todos].sort((a, b) => a.createdAt - b.createdAt);
    }
  }, [todos, sortBy]);

  const completeness = useMemo(() => {
    const total = todos.length;
    const numOfCompleted = todos.reduce((sum, todo) => {
      return todo.completed ? sum + 1 : sum;
    }, 0);
    return Math.round((numOfCompleted / total) * 100);
  }, [todos]);

  const handleSubmit = () => {
    const title = input.trim();
    if (title.length !== 0) {
      dispatch({type: TodoActionKind.ADD_TODO, payload: genTodo({title})});
      setInput('');
    }
  };

  useEffect(() => {
    if (todos.length > prevLength) {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [prevLength, todos.length]);

  return (
    <div
      className={
        'flex h-screen items-center justify-center bg-gradient-to-b from-bg-blue to-bg-purple dark:from-slate-800 dark:to-slate-900'
      }
    >
      <div className={'mx-auto min-h-[500px] w-full max-w-sm p-4'}>
        <Header title={'Todo List'} description={'Add things to do'}>
          <ThemeToggle />
        </Header>
        <Divider />
        <ProgressBar value={completeness} />

        <ul
          className={
            'my-2 h-60 space-y-2 overflow-y-auto overflow-x-hidden py-2'
          }
        >
          <AnimatePresence>
            {sorted.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
          <li ref={bottomRef} />
        </ul>

        <Divider />
        <SortByToggle />

        <div className={'mt-16 space-y-1'}>
          <span className={'text-indigo-500'}>{'Add to list'}</span>
          <div className={'flex w-full flex-wrap items-center gap-2'}>
            <input
              className={
                'flex-1 rounded border-none p-2 text-indigo-500 shadow-sm transition-shadow focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-indigo-700 dark:text-white'
              }
              type={'text'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className={
                'rounded bg-indigo-500 px-3 py-2 text-white shadow-sm transition-colors duration-300 ease-out hover:bg-indigo-600 active:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:active:bg-indigo-900'
              }
              type={'button'}
              onClick={handleSubmit}
            >
              <svg
                xmlns={'http://www.w3.org/2000/svg'}
                width={'24'}
                height={'24'}
                viewBox={'0 0 24 24'}
                strokeWidth={'2'}
                stroke={'currentColor'}
                fill={'none'}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
              >
                <path stroke={'none'} d={'M0 0h24v24H0z'} fill={'none'}></path>
                <path d={'M12 5l0 14'}></path>
                <path d={'M5 12l14 0'}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
