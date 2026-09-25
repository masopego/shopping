'use client';

import { StyledButton } from './button.styles';
import type { IButtonProps } from './types/button';

export const Button = ({ children, variant, onClick, type = 'submit', disabled }: IButtonProps): React.JSX.Element => {
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick} $variant={variant}>
      {children}
    </StyledButton>
  );
};
