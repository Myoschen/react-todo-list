import {memo, type ReactNode} from 'react';

interface HeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const Header = memo(function Header({
  title,
  description,
  children,
}: HeaderProps) {
  return (
    <header className={'flex flex-wrap items-center justify-between'}>
      <div className={'font-light'}>
        <h1 className={'text-3xl font-bold text-indigo-500'}>{title}</h1>
        <p className={'text-xs font-light text-indigo-400'}>{description}</p>
      </div>
      {children}
    </header>
  );
});

export default Header;
