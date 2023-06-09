import { memo } from 'react';
import { useSortContext } from '../contexts/sort';
import Switch from './ui/switch';

/**
 * 排序切換按鈕
 * The sort switch button
 */
function SortSwitch() {
  const { sortBy, setSortBy } = useSortContext();

  const toggleSortBy = () => {
    if (sortBy === 'time') setSortBy('completed');
    else setSortBy('time');
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-2">
      <span className="text-sm text-indigo-400">Move down things to end?</span>
      <Switch checked={sortBy === 'completed'} onClick={toggleSortBy} />
    </div>
  );
}
export default memo(SortSwitch);
