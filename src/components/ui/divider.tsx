import {memo} from 'react';

/**
 * 水平分隔線
 * Horizontal divider
 */
const Divider = memo(function Divider() {
  return <hr className="my-2 border border-indigo-200" />;
});

export default Divider;
