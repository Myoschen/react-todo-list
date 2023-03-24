import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function AppContainer({ children }: Props) {
  return (
    <div className="mx-auto min-h-[500px] w-full max-w-sm p-4">{children}</div>
  );
}
export default AppContainer;
