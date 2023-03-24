import { useCallback, useMemo, useRef } from 'react';
import { flushSync } from 'react-dom';
import AppContainer from './components/AppContainer';
import Divider from './components/common/Divider';
import ProgressBar from './components/common/ProgressBar';
import Header from './components/Header';
import SortSwitch from './components/SortSwitch';
import TextInput from './components/TextInput';
import TodoList from './components/Todo';
import { useTodoContext } from './context/todo';
import useToggle from './hooks/use-toggle';

function App() {
  // 用來取得 TodoList 所暴露的 scrollBottom 方法
  // Used to get the scrollBottom method exposed by TodoList
  const listMethodRef = useRef<{ scrollBottom: () => void }>(null);
  const { value: isSortByCompleted, toggle } = useToggle();
  const { todoList, addTodo } = useTodoContext();

  // 計算代辦事項完成度
  // Calculate the completion of the todoList
  const completeness = useMemo(() => {
    // 代辦事項總長度
    // Total length of the todoList
    const total = todoList.length;

    // 所有已完成事項的數量
    // Count of all completed items
    const numOfCompleted = todoList.reduce((sum, todo) => {
      return todo.completed ? sum + 1 : sum;
    }, 0);

    // 透過 Math.round() 去除小數
    // Remove decimals by Math.round()
    return Math.round((numOfCompleted / total) * 100);
  }, [todoList]);

  // 當排序按鈕 ( SortSwitch ) 觸發時，會將已完成的事項移至最下方
  // When the sort button ( SortSwitch ) is triggered, the completed todo items will be moved to the bottom
  // 反之，則是依照事項加入的時間排序
  // Otherwise, it is sorted according to the time when the todo items were added
  const sortedTodoList = useMemo(() => {
    if (isSortByCompleted) {
      return [
        ...todoList.filter((todo) => !todo.completed),
        ...todoList.filter((todo) => todo.completed),
      ];
    } else {
      return [...todoList].sort((a, b) => a.timestamp - b.timestamp);
    }
  }, [todoList, isSortByCompleted]);

  // 當按下 + 號或是按下 Enter 鍵會新增事項，並且滾動到最底部
  // When the + sign is pressed or the Enter key is pressed, an todo item will be added and scroll to the bottom
  const onSubmit = useCallback(
    (text: string) => {
      flushSync(() => addTodo(text));
      listMethodRef.current?.scrollBottom();
    },
    [addTodo]
  );

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-bg-blue to-bg-purple font-noto-sans dark:from-slate-800 dark:to-slate-900">
      <AppContainer>
        <Header title="Todo List" subtitle="Add things to do" />
        <Divider />
        <ProgressBar value={isNaN(completeness) ? 0 : completeness} />
        <TodoList list={sortedTodoList} ref={listMethodRef} />
        <Divider />
        <SortSwitch onClick={toggle} />
        <TextInput onSubmit={onSubmit} />
      </AppContainer>
    </div>
  );
}

export default App;
