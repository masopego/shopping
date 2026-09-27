'use client';

import { ChevronLeftIcon } from '@/ui/shared/icons/chevron-left-icon';
import { StyledGoBack } from './go-back.styles';
import { ROUTES } from '@/ui/shared/routes';
import { LITERALS } from '@/ui/shared/literals';

export const GoBack = () => (
  <StyledGoBack href={ROUTES.HOME}>
    <ChevronLeftIcon />
    {LITERALS.productDetail.back}
  </StyledGoBack>
);
