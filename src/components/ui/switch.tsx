import { cn } from '@/lib/utils'

interface SwitchProps {
  checked: boolean
  onCheckedChange: () => void
  disabled?: boolean
}

export default function Switch({ checked, onCheckedChange, disabled }: SwitchProps) {
  return (
    <label
      className={'relative inline-flex cursor-pointer items-center shadow-sm'}
    >
      <input
        className={'peer sr-only'}
        type={'checkbox'}
        defaultChecked={checked}
        onClick={onCheckedChange}
        disabled={disabled}
      />
      <div className={cn([
        'h-6 w-11 rounded-full bg-primary peer-checked:after:translate-x-full peer-focus:outline-none',
        'after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:transition-all after:content-[\'\'] '])}
      />
    </label>
  )
}
