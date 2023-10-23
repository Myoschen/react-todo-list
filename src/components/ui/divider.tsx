import {memo} from 'react';

const Divider = memo(function Divider() {
  return <hr className={'my-2'} />;
});

export default Divider;
