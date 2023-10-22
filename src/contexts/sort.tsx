import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type SortContextType = {
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
};

/**
 * 建立 sort context
 * Create sort context
 */
const SortContext = createContext<SortContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

/**
 * 建立 sort provider
 * Create sort provider
 */
function SortProvider({children}: ProviderProps) {
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

/**
 * 建立 useSortContext custom hook，透過 useContext 取得 SortContext 內容並回傳
 * Create a useSortContext custom hook, get SortContext content through useContext and return it
 */
function useSortContext() {
  const context = useContext(SortContext);
  // 確保該 hook 在 TodoProvider 中使用
  // Make sure this hook is used in TodoProvider
  if (context === undefined) {
    throw new Error('useSortContext must be used within SortProvider.');
  }
  return context;
}

export {SortProvider, useSortContext};
