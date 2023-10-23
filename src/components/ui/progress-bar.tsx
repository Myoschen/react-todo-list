import {memo} from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar = memo(function ProgressBar({value}: ProgressBarProps) {
  const percentage = isNaN(value) ? 0 : value;

  return (
    <div className={'flex items-center gap-x-2'}>
      <span className={'basis-10 text-sm'}>{`${percentage}%`}</span>
      <div
        className={
          'h-3 w-full overflow-hidden rounded-full bg-primary/20 shadow-sm'
        }
      >
        <div
          className={
            'h-3 w-full rounded-lg bg-primary transition-transform duration-300'
          }
          style={{transform: `translateX(-${100 - percentage}%)`}}
        />
      </div>
    </div>
  );
});

export default ProgressBar;
