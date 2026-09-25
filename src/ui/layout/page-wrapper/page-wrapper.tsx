'use client';

import type { ReactNode } from 'react';
import { StyledPageWrapper } from './page-wrapper.styles';

export const PageWrapper = ({ children }: { children: ReactNode }): React.JSX.Element => {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
};
