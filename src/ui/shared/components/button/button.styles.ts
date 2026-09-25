import styled, { css } from 'styled-components';
import { ButtonVariant } from './types/variants';

const variantStyles = {
  [ButtonVariant.PRIMARY]: css`
    background-color: #000;
    color: #fff;
  `,
  [ButtonVariant.SECONDARY]: css`
    background-color: #fff;
    color: #000;
  `,
};

export const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  appearance: none;
  border: 1px solid #000;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.3125rem 0.4375rem;

  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    cursor: not-allowed;
  }
`;
