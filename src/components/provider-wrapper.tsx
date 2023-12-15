import { type ReactNode } from 'react'

import { SortByProvider } from '@/stores/sort-by'
import { ThemeProvider } from '@/stores/theme'
import { TodoProvider } from '@/stores/todo'

interface Props {
  children: ReactNode
}

function ProviderWrapper({ children }: Props) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <SortByProvider>{children}</SortByProvider>
      </TodoProvider>
    </ThemeProvider>
  )
}
export default ProviderWrapper
