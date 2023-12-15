import { useContext } from 'react'

import { SortByContext } from '@/stores/sort-by'

export function useSortBy() {
  const context = useContext(SortByContext)
  if (context === undefined) {
    throw new Error('useSortBy must be used within SortByProvider.')
  }
  return context
}
