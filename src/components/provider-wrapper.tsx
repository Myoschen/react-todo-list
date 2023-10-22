import {type ReactNode} from 'react';
import {SortProvider} from '../stores/sort';
import {ThemeProvider} from '../stores/theme';
import {TodoProvider} from '../stores/todo';

interface Props {
  children: ReactNode;
}

function ProviderWrapper({children}: Props) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <SortProvider>{children}</SortProvider>
      </TodoProvider>
    </ThemeProvider>
  );
}
export default ProviderWrapper;
