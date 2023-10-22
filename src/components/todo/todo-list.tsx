import {
  forwardRef,
  type Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {AnimatePresence, motion, type Variants} from 'framer-motion';

import {useSort} from '@/hooks/use-sort';
import {useTodoList} from '@/hooks/use-todo';
import TodoItem from '@/components/todo/todo-item';

const container = {
  hidden: {opacity: 0},
  visible: {opacity: 1, transition: {staggerChildren: 0.15}},
} satisfies Variants;

const TodoList = forwardRef(function TodoList(
  _: unknown,
  ref: Ref<{scrollBottom: () => void}>,
) {
  // 取得最底部的 li 元素
  // Get the bottommost li element
  const bottomRef = useRef<HTMLLIElement>(null);
  const todoList = useTodoList();
  const {sortBy} = useSort();

  // 當排序按鈕 ( SortSwitch ) 觸發時，會將已完成的事項移至最下方
  // When the sort button ( SortSwitch ) is triggered, the completed todo items will be moved to the bottom
  // 反之，則是依照事項加入的時間排序
  // Otherwise, it is sorted according to the time when the todo items were added
  const sortedTodoList = useMemo(() => {
    if (sortBy === 'completed') {
      return [
        ...todoList.filter((todo) => !todo.completed),
        ...todoList.filter((todo) => todo.completed),
      ];
    } else {
      return [...todoList].sort((a, b) => a.timestamp - b.timestamp);
    }
  }, [todoList, sortBy]);

  // 將 scrollBottom 方法綁定在父層的 ref 上
  // Bind the scrollBottom method to the ref of the parent layer
  useImperativeHandle(ref, () => ({
    scrollBottom: () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({behavior: 'smooth'});
      }
    },
  }));

  return (
    <motion.ul
      className="my-2 h-60 space-y-2 overflow-x-hidden overflow-y-scroll py-2"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <AnimatePresence>
        {sortedTodoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
      <li ref={bottomRef} />
    </motion.ul>
  );
});

export default TodoList;
