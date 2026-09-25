import type { MouseEventHandler, ReactNode } from 'react';
import type { ButtonVariant } from './variants';

export interface IButtonProps {
  variant: ButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loader?: ReactNode;
  type?: HTMLButtonElement['type'];
}
