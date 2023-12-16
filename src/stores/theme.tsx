import { createContext, type Dispatch, type ReactNode, type SetStateAction, useEffect, useState } from 'react'

import type { Theme } from '@/lib/types'

type ThemeState = {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeState>({
  theme: 'light',
  setTheme: () => {},
})

interface ProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const data = localStorage.getItem('theme')
    return data ? JSON.parse(data) : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
