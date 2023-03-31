import { ReactNode } from 'react';
import { TodoProvider } from '../contexts/todo';
import { ThemeProvider } from '../contexts/theme';
import { SortProvider } from '../contexts/sort';

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
