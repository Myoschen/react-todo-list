import {memo} from 'react';

import Switch from '@/components/ui/switch';
import {useSortBy} from '@/hooks/use-sort';

const SortByToggle = memo(function SortSwitch() {
  const {sortBy, setSortBy} = useSortBy();

  const toggleSortBy = () =>
    setSortBy((prev) => (prev === 'time' ? 'completed' : 'time'));

  return (
    <div className={'flex flex-wrap items-center justify-end gap-x-2'}>
      <span className={'text-sm text-indigo-400'}>
        {'Move down things to end?'}
      </span>
      <Switch checked={sortBy === 'completed'} onClick={toggleSortBy} />
    </div>
  );
});

export default SortByToggle;
