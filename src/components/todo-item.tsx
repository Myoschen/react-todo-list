import {motion, type Variants} from 'framer-motion';

import {TodoActionKind, type Todo} from '@/types';
import {useTodos} from '@/hooks/use-todos';
import {X} from 'lucide-react';

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
      className={`group rounded border-l-4 ${
        todo.completed ? 'border-success' : 'border-error'
      } bg-primary/20 shadow-sm transition-colors`}
      initial={'hidden'}
      animate={'visible'}
      exit={'hidden'}
      variants={variants}
      layout={'position'}
    >
        className={'flex cursor-pointer items-center justify-between p-3'}
        htmlFor={todo.id}
      >
        <div className={'flex items-center gap-x-2'}>
          <input
            id={todo.id}
            className={'sr-only'}
            type={'checkbox'}
            defaultChecked={todo.completed}
            onClick={handleCheck}
          />
          <span
            className={`${
              todo.completed ? 'text-foreground/50 line-through' : ''
            }`}
          >
            {todo.title}
          </span>
        </div>
        <button
          className={'opacity-0 transition-opacity group-hover:opacity-100'}
          type={'button'}
          onClick={handleRemove}
        >
          <X className={'h-5 w-5'} />
        </button>
      </label>
    </motion.li>
  );
}
