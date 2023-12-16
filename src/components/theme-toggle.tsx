import { useContext, useTransition } from 'react'
import { Moon, Sun } from 'lucide-react'

import Switch from '@/components/ui/switch'
import { ThemeContext } from '@/stores/theme'

export default function ThemeToggle() {
  const [isPending, startTransition] = useTransition()
  const { theme, setTheme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark'
    startTransition(() => setTheme(nextTheme))
  }

  return (
    <div className={'flex items-center space-x-1'}>
      <Sun className={'h-4 w-4'} />
      <Switch checked={isDark} onCheckedChange={toggleTheme} disabled={isPending} />
      <Moon className={'h-4 w-4'} />
    </div>
  )
}
