import { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import AppContainer from './components/AppContainer';
import Divider from './components/common/Divider';
import ProgressBar from './components/common/ProgressBar';
import Header from './components/Header';
import SortSwitch from './components/SortSwitch';
import TextInput from './components/TextInput';
import TodoList from './components/Todo';
import { TodoActionType, useTodoDispatch } from './context/todo';

function App() {
  // 用來取得 TodoList 所暴露的 scrollBottom 方法
  // Used to get the scrollBottom method exposed by TodoList
  const listMethodRef = useRef<{ scrollBottom: () => void }>(null);
  const dispatch = useTodoDispatch();

  // 當按下 + 號或是按下 Enter 鍵會新增事項，並且滾動到最底部
  // When the + sign is pressed or the Enter key is pressed, an todo item will be added and scroll to the bottom
  const onSubmit = useCallback(
    (title: string) => {
      flushSync(() =>
        dispatch({ type: TodoActionType.ADD_TODO, payload: title })
      );
      listMethodRef.current?.scrollBottom();
    },
    [dispatch]
  );

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-bg-blue to-bg-purple font-noto-sans dark:from-slate-800 dark:to-slate-900">
      <AppContainer>
        <Header title="Todo List" subtitle="Add things to do" />
        <Divider />
        <ProgressBar />
        <TodoList ref={listMethodRef} />
        <Divider />
        <SortSwitch />
        <TextInput onSubmit={onSubmit} />
      </AppContainer>
    </div>
  );
}

export default App;
