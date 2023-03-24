import { memo } from 'react';

interface Props {
  value: number;
}

/**
 * 進度條
 * Progress Bar
 */
function ProgressBar({ value }: Props) {
  return (
    <div className="flex items-center gap-x-2">
      <span className="text-sm text-indigo-500">{value}%</span>
      <div className="h-3 w-full rounded-lg bg-white dark:bg-slate-500">
        <div
          className="h-3 rounded-lg bg-progress"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
export default memo(ProgressBar);
