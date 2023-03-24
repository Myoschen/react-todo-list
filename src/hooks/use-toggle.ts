import { useCallback, useState } from 'react';

function useToggle(defaultValue?: boolean) {
  const [value, setValue] = useState(defaultValue ?? false);

  const toggle = useCallback((val?: boolean) => {
    setValue((prev) => (typeof val === 'boolean' ? val : !prev));
  }, []);

  return { value, toggle };
}

export default useToggle;
