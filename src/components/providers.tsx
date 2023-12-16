import { type ReactNode } from 'react'

import SortByProvider from '@/stores/sort-by'
import ThemeProvider from '@/stores/theme'
import TodoProvider from '@/stores/todo'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <SortByProvider>{children}</SortByProvider>
      </TodoProvider>
    </ThemeProvider>
  )
}
