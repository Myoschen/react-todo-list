import { ReactNode } from 'react';
import { SortProvider } from '../contexts/sort';
import { ThemeProvider } from '../contexts/theme';
import { TodoProvider } from '../contexts/todo';

interface Props {
  children: ReactNode;
}

function ProviderWrapper({ children }: Props) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <SortProvider>{children}</SortProvider>
      </TodoProvider>
    </ThemeProvider>
  );
}
export default ProviderWrapper;
