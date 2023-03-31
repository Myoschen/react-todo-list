import { memo, useMemo } from 'react';
import { useTodoList } from '../../contexts/todo';

/**
 * 進度條
 * Progress Bar
 */
function ProgressBar() {
  const todoList = useTodoList();

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

  return (
    <div className="flex items-center gap-x-2">
      <span className="text-sm text-indigo-500">
        {isNaN(completeness) ? 0 : completeness}%
      </span>
      <div className="h-3 w-full rounded-lg bg-white shadow-sm dark:bg-slate-500">
        <div
          className="h-3 rounded-lg bg-progress"
          style={{ width: `${isNaN(completeness) ? 0 : completeness}%` }}
        ></div>
      </div>
    </div>
  );
}
export default memo(ProgressBar);
