'use client';

import { usePathname } from 'next/navigation';
import { ViewTransition, type ReactNode } from 'react';

export const PageTransition = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} update="none">
      {children}
    </ViewTransition>
  );
};
