import Link from 'next/link';
import styled, { css } from 'styled-components';

const HOVER_TRANSITION = '0.4s ease';
const LINE_COLOR = '#000';

export const PRODUCT_CARD_SIZE = '21.5rem';

export const productCardLines = css`
  box-shadow:
    inset 1px 0 0 0 ${LINE_COLOR},
    inset 0 1px 0 0 ${LINE_COLOR},
    1px 0 0 0 ${LINE_COLOR},
    0 1px 0 0 ${LINE_COLOR},
    1px 1px 0 0 ${LINE_COLOR};
`;

export const StyledProductCard = styled(Link)`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  color: #000;
  text-decoration: none;
  text-transform: uppercase;
  transition: color ${HOVER_TRANSITION};

  /* Black layer that grows from the bottom on hover and shrinks back down when the hover ends */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: #000;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform ${HOVER_TRANSITION};
  }

  &:hover,
  &:focus-visible {
    color: #fff;

    &::before {
      transform: scaleY(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &::before {
      transition: none;
    }
  }
`;

export const StyledImageWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const StyledBrand = styled.p`
  margin: 0;
  font-size: 0.625rem;
  color: #79736d;
  transition: color ${HOVER_TRANSITION};

  ${StyledProductCard}:hover &,
  ${StyledProductCard}:focus-visible & {
    color: #fff;
  }
`;

export const StyledInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
`;
