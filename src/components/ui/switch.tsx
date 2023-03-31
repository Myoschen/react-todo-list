interface Props {
  checked: boolean;
  onClick: () => void;
}

/**
 * 切換按紐
 * Switch button
 */
function Switch({ checked, onClick }: Props) {
  return (
    <label className="relative inline-flex cursor-pointer items-center shadow-sm">
      <input
        type="checkbox"
        defaultChecked={checked}
        onClick={onClick}
        className="peer sr-only"
      />
      <div className="h-6 w-11 rounded-full bg-white after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-indigo-200 after:transition-all after:content-[''] peer-checked:bg-indigo-200 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white peer-focus:outline-none dark:bg-slate-500 dark:peer-checked:bg-slate-700"></div>
    </label>
  );
}
export default Switch;
