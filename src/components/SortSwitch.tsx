import { memo } from 'react';
import SwitchButton from './common/SwitchButton';

interface Props {
  onClick: () => void;
}

/**
 * 排序切換按鈕
 * The sort switch button
 */
function SortSwitch({ onClick }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-x-2">
      <span className="text-sm text-indigo-400">Move down things to end?</span>
      <SwitchButton checked={false} onClick={onClick} />
    </div>
  );
}
export default memo(SortSwitch);
