'use client';

import Link from 'next/link';
import { StyledButton } from './button.styles';
import type { IButtonProps } from './types/button';

export const Button = ({
  children,
  variant,
  onClick,
  type = 'submit',
  disabled,
  fullWidth = false,
  href,
}: IButtonProps): React.JSX.Element => {
  if (href) {
    return (
      <StyledButton as={Link} href={href} $variant={variant} $fullWidth={fullWidth}>
        {children}
      </StyledButton>
    );
  }

  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick} $variant={variant} $fullWidth={fullWidth}>
      {children}
    </StyledButton>
  );
};
