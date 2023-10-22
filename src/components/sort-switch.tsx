import {memo} from 'react';

import {useSort} from '@/hooks/use-sort';
import Switch from '@/components/ui/switch';

/**
 * 排序切換按鈕
 * The sort switch button
 */
const SortSwitch = memo(function SortSwitch() {
  const {sortBy, setSortBy} = useSort();

  const toggleSortBy = () => {
    if (sortBy === 'time') setSortBy('completed');
    else setSortBy('time');
  };

  return (
    <div className={'flex flex-wrap items-center justify-end gap-x-2'}>
      <span className={'text-sm text-indigo-400'}>
        {'Move down things to end?'}
      </span>
      <Switch checked={sortBy === 'completed'} onClick={toggleSortBy} />
    </div>
  );
});

export default SortSwitch;
