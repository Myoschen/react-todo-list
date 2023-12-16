import { createContext, type Dispatch, type ReactNode, type SetStateAction, useEffect, useState } from 'react'

import type { SortBy } from '@/lib/types'

type SortByState = {
  sortBy: SortBy
  setSortBy: Dispatch<SetStateAction<SortBy>>
}

export const SortByContext = createContext<SortByState>({
  sortBy: 'time',
  setSortBy: () => {},
})

interface SortByProviderProps {
  children: ReactNode
}

export default function SortByProvider({ children }: SortByProviderProps) {
  const [sortBy, setSortBy] = useState<SortBy>(() => {
    const data = localStorage.getItem('sort-by')
    return data ? JSON.parse(data) : 'time'
  })

  useEffect(() => {
    localStorage.setItem('sort-by', JSON.stringify(sortBy))
  }, [sortBy])

  return (
    <SortByContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortByContext.Provider>
  )
}
