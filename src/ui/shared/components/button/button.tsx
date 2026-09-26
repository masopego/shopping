'use client';

import { StyledButton } from './button.styles';
import type { IButtonProps } from './types/button';

export const Button = ({
  children,
  variant,
  onClick,
  type = 'submit',
  disabled,
  fullWidth = false,
}: IButtonProps): React.JSX.Element => {
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick} $variant={variant} $fullWidth={fullWidth}>
      {children}
    </StyledButton>
  );
};
