import cn from 'classnames';
import {motion, type Variants} from 'framer-motion';
import {TodoActionType, useTodoDispatch} from '../../contexts/todo';

const item = {
  hidden: {opacity: 0, x: -10},
  visible: {opacity: 1, x: 0},
} satisfies Variants;

interface Props {
  todo: Todo;
}

function TodoItem({todo}: Props) {
  // 透過 useTodoContext hook 取得 removeTodo、checkTodo 方法
  // Get the removeTodo and checkTodo methods through the useTodoContext hook
  const dispatch = useTodoDispatch();

  // 當勾選起事項時
  // When ticking the todo item
  const onCheck = () => {
    dispatch({type: TodoActionType.CHECK_TODO, payload: todo.id});
  };

  // 當移除事項時
  // When removing the todo item
  const onRemove = () => {
    dispatch({type: TodoActionType.REMOVE_TODO, payload: todo.id});
  };

  return (
    <motion.li
      className="flex items-center justify-between rounded border-l-4 border-indigo-500 bg-white p-3 shadow-sm dark:bg-indigo-700"
      exit={{opacity: 0}}
      variants={item}
      layout="position"
    >
      <div className="flex items-center gap-x-2">
        <input
          id={todo.id}
          className="h-4 w-4 rounded border border-gray-300 checked:bg-indigo-500 checked:hover:bg-indigo-500 focus:outline-none focus:ring-0 focus:ring-transparent checked:focus:bg-indigo-500 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent dark:focus:ring-offset-0"
          type="checkbox"
          defaultChecked={todo.completed}
          onClick={onCheck}
        />
        <label
          htmlFor={todo.id}
          className={cn('relative text-indigo-400 select-none', {
            'after:content[""] after:absolute after:left-0 after:top-1/2  after:w-[110%] after:h-[1px] after:bg-indigo-500 ':
              todo.completed,
          })}
        >
          {todo.title}
        </label>
      </div>
      <button className="text-indigo-200" type="button" onClick={onRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M18 6l-12 12"></path>
          <path d="M6 6l12 12"></path>
        </svg>
      </button>
    </motion.li>
  );
}
export default TodoItem;
