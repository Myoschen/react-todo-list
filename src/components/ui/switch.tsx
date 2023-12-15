interface Props {
  checked: boolean
  onClick: () => void
}

/**
 * 切換按紐
 * Switch button
 */
function Switch({ checked, onClick }: Props) {
  return (
    <label
      className={'relative inline-flex cursor-pointer items-center shadow-sm'}
    >
      <input
        type={'checkbox'}
        defaultChecked={checked}
        onClick={onClick}
        className={'peer sr-only'}
      />
      <div
        className={
        'h-6 w-11 rounded-full bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:transition-all after:content-[\'\'] peer-checked:after:translate-x-full peer-focus:outline-none'
        }
      >
      </div>
    </label>
  )
}
export default Switch
