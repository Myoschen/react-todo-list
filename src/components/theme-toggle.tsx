import { Moon, Sun } from 'lucide-react'

import Switch from '@/components/ui/switch'
import { useTheme } from '@/hooks/use-theme'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <div className={'flex items-center space-x-1'}>
      <Sun className={'h-4 w-4'} />
      <Switch checked={theme === 'dark'} onClick={toggleTheme} />
      <Moon className={'h-4 w-4'} />
    </div>
  )
}
