import { memo, useCallback } from 'react';
import { useThemeContext } from '../contexts/theme';
import Switch from './ui/switch';

interface Props {
  title: string;
  subtitle: string;
}

/**
 * 頂部標題、副標題以及切換暗黑模式按鈕
 * Title, subtitle and toggle dark mode button
 */
function Header({ title, subtitle }: Props) {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  }, [theme, setTheme]);

  return (
    <header className="flex flex-wrap items-center justify-between">
      <div className="font-light">
        <h1 className="text-3xl font-normal text-indigo-500">{title}</h1>
        <p className="pl-1 text-xs text-indigo-400">{subtitle}</p>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 text-indigo-200"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z"
            strokeWidth="0"
            fill="currentColor"
          ></path>
        </svg>
        <Switch checked={theme === 'dark'} onClick={toggleTheme} />
      </div>
    </header>
  );
}

export default memo(Header);
