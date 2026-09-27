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

export const StyledButton = styled.button<{ $variant: ButtonVariant; $fullWidth: boolean }>`
  appearance: none;
  display: inline-block;
  box-sizing: border-box;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  text-align: center;
  text-decoration: none;
  border: 1px solid #000;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.75rem 1rem;

  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    border-color: #f3f2f2;
    background-color: #f3f2f2;
    color: #aaa;
    cursor: not-allowed;
  }
`;
