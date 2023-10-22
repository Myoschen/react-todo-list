import {
  type FormEvent,
  memo,
  type MouseEvent,
  useCallback,
  useRef,
} from 'react';

interface Props {
  onSubmit: (t: string) => void;
}

/**
 * 底部的輸入框及按鈕
 * The input box and button at the bottom
 */
function NewTodo({onSubmit}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // 新增 todo
  // Add a new todo
  const handleNewTodo = useCallback(
    (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
      // 避免 form 預設行為
      // Avoid form default behavior
      e.preventDefault();

      // 去除前後空白並判斷長度不得為 0
      // Remove the leading and trailing blanks and determine that the length must not be 0
      if (inputRef.current && inputRef.current.value.trim().length !== 0) {
        // 送出並重設輸入框的值
        // Send and reset the value of the input box
        onSubmit(inputRef.current.value);
        inputRef.current.value = '';
      }
    },
    [onSubmit],
  );

  return (
    <div className="mt-16 space-y-1">
      <span className="text-indigo-500">Add to list</span>
      <div className="flex w-full flex-wrap items-center gap-2">
        <form className="flex-1" onSubmit={handleNewTodo}>
          <input
            className="w-full rounded border-none p-2 text-indigo-500 shadow-sm transition-shadow focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-indigo-700 dark:text-white"
            type="text"
            ref={inputRef}
          />
        </form>
        <button
          className="ease rounded bg-indigo-500 px-3 py-2 text-white shadow-sm transition-colors duration-300 hover:bg-indigo-600 active:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:active:bg-indigo-900"
          type="button"
          onClick={handleNewTodo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
export default memo(NewTodo);
