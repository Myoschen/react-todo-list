import {memo} from 'react';

const Divider = memo(function Divider() {
  return <hr className={'my-2 border border-indigo-200'} />;
});

export default Divider;
