import {useCallback, useRef} from 'react';
import {flushSync} from 'react-dom';
import {nanoid} from 'nanoid';

import {TodoActionKind, type Todo} from '@/types';
import {useTodoDispatch} from '@/hooks/use-todo';
import Header from '@/components/header';
import NewTodo from '@/components/new-todo';
import SortSwitch from '@/components/sort-switch';
import TodoList from '@/components/todo/todo-list';
import TodoWrapper from '@/components/todo-wrapper';
import Divider from '@/components/ui/divider';
import ProgressBar from '@/components/ui/progress-bar';

function App() {
  // 用來取得 TodoList 所暴露的 scrollBottom 方法
  // Used to get the scrollBottom method exposed by TodoList
  const listMethodRef = useRef<{scrollBottom: () => void}>(null);
  const dispatch = useTodoDispatch();

  // 當按下 + 號或是按下 Enter 鍵會新增事項，並且滾動到最底部
  // When the + sign is pressed or the Enter key is pressed, an todo item will be added and scroll to the bottom
  const onSubmit = useCallback(
    (title: string) => {
      const newTodo: Todo = {
        id: nanoid(),
        title,
        completed: false,
        timestamp: new Date().getTime(),
      };
      flushSync(() =>
        dispatch({type: TodoActionKind.ADD_TODO, payload: newTodo}),
      );
      listMethodRef.current?.scrollBottom();
    },
    [dispatch],
  );

  return (
    <div
      className={
        'flex h-screen items-center justify-center bg-gradient-to-b from-bg-blue to-bg-purple dark:from-slate-800 dark:to-slate-900'
      }
    >
      <TodoWrapper>
        <Header title={'Todo List'} subtitle={'Add things to do'} />
        <Divider />
        <ProgressBar />
        <TodoList ref={listMethodRef} />
        <Divider />
        <SortSwitch />
        <NewTodo onSubmit={onSubmit} />
      </TodoWrapper>
    </div>
  );
}

export default App;
