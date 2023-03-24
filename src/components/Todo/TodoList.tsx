import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import TodoItem from './TodoItem';

interface Props {
  list: Todo[];
}

function TodoList({ list }: Props, ref: Ref<{ scrollBottom: () => void }>) {
  // 取得最底部的 li 元素
  // Get the bottommost li element
  const bottomRef = useRef<HTMLLIElement>(null);

  // 將 scrollBottom 方法綁定在父層的 ref 上
  // Bind the scrollBottom method to the ref of the parent layer
  useImperativeHandle(ref, () => ({
    scrollBottom: () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
  }));

  return (
    <ul className="my-2 h-60 space-y-2 overflow-y-scroll py-2">
      {list.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <li ref={bottomRef} />
    </ul>
  );
}

export default forwardRef(TodoList);
