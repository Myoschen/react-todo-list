import {memo} from 'react';
import {motion} from 'framer-motion';

interface ProgressBarProps {
  value: number;
}

const ProgressBar = memo(function ProgressBar({value}: ProgressBarProps) {
  const percentage = isNaN(value) ? 0 : value;

  return (
    <div className={'flex items-center gap-x-2'}>
      <span className={'text-sm text-indigo-500'}>{`${percentage}%`}</span>
      <div
        className={'h-3 w-full rounded-lg bg-white shadow-sm dark:bg-slate-500'}
      >
        <motion.div
          className={'h-3 rounded-lg bg-progress'}
          style={{width: `${percentage}%`}}
          layout={'size'}
        ></motion.div>
      </div>
    </div>
  );
});

export default ProgressBar;
