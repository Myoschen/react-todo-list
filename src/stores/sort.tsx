import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

import type {SortBy} from '@/types';

type SortContextType = {
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
};

/**
 * 建立 sort context
 * Create sort context
 */
export const SortContext = createContext<SortContextType | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
}

/**
 * 建立 sort provider
 * Create sort provider
 */
export function SortProvider({children}: ProviderProps) {
  // 初始化會先至 localStorage 查看是否有資料
  // Initialization will first go to localStorage to check if there is any data
  const [sortBy, setSortBy] = useState<SortBy>(() => {
    const data = localStorage.getItem('sort-by');
    return data ? JSON.parse(data) : 'time';
  });

  // 當 theme 變動時，將資料更新到 localStorage
  // When the theme changes, update the data to localStorage
  useEffect(() => {
    localStorage.setItem('sort-by', JSON.stringify(sortBy));
  }, [sortBy]);

  return (
    <SortContext.Provider value={{sortBy, setSortBy}}>
      {children}
    </SortContext.Provider>
  );
}
