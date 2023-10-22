import {motion, type Variants} from 'framer-motion';

import {TodoActionKind, type Todo} from '@/types';
import {useTodos} from '@/hooks/use-todos';

const variants: Variants = {
  hidden: {opacity: 0},
  visible: {opacity: 1},
};

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({todo}: TodoItemProps) {
  const {dispatch} = useTodos();

  const handleCheck = () =>
    dispatch({type: TodoActionKind.CHECK_TODO, payload: todo.id});

  const handleRemove = () =>
    dispatch({type: TodoActionKind.REMOVE_TODO, payload: todo.id});

  return (
    <motion.li
      className={
        'flex items-center justify-between rounded border-l-4 border-indigo-500 bg-white p-3 shadow-sm dark:bg-indigo-700'
      }
      initial={'hidden'}
      animate={'visible'}
      exit={'hidden'}
      variants={variants}
      layout={'position'}
    >
      <div className={'flex items-center gap-x-2'}>
        <input
          id={todo.id}
          className={
            'h-4 w-4 rounded border border-gray-300 checked:bg-indigo-500 checked:hover:bg-indigo-500 focus:outline-none focus:ring-0 focus:ring-transparent checked:focus:bg-indigo-500 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent dark:focus:ring-offset-0'
          }
          type={'checkbox'}
          defaultChecked={todo.completed}
          onClick={handleCheck}
        />
        <label
          htmlFor={todo.id}
          className={'relative select-none text-indigo-400'}
        >
          {todo.title}
        </label>
      </div>
      <button
        className={'text-indigo-200'}
        type={'button'}
        onClick={handleRemove}
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
          <path d={'M18 6l-12 12'}></path>
          <path d={'M6 6l12 12'}></path>
        </svg>
      </button>
    </motion.li>
  );
}
