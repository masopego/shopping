import styled from 'styled-components';
import { HEADER_HEIGHT } from '@/ui/layout/header/header.styles';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

const ACTION_WIDTH = '16.25rem';

export const StyledCartView = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100svh - ${HEADER_HEIGHT} - var(--page-end-spacing, 0px));
  padding-top: 1.5rem;
  box-sizing: border-box;
  color: #000;
`;

export const StyledTitle = styled.h1`
  margin: 0 0 3rem;
  color: #000;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: normal;
  text-transform: uppercase;
`;

export const StyledItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledItem = styled.li`
  display: flex;
  gap: 2rem;

  @media ${MEDIA_QUERIES.DESKTOP} {
    gap: 2.5rem;
  }
`;

export const StyledItemImage = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 9.375rem;
  aspect-ratio: 1;

  @media ${MEDIA_QUERIES.TABLET} {
    width: 12.5rem;
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    width: 15rem;
  }
`;

export const StyledItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  text-transform: uppercase;

  & p {
    margin: 0;
  }
`;

export const StyledItemPrice = styled.p`
  && {
    margin-top: 1rem;
  }
`;

export const StyledRemoveButton = styled.button`
  align-self: flex-start;
  margin-top: 1.5rem;
  padding: 0;
  border: none;
  background: none;
  color: #df0000;
  font-size: 0.75rem;
  cursor: pointer;

  @media ${MEDIA_QUERIES.DESKTOP} {
    margin-top: auto;
  }
`;

export const StyledActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 0.75rem;
  margin-top: auto;
  padding-top: 3rem;

  @media ${MEDIA_QUERIES.TABLET} {
    display: flex;
    align-items: center;
    gap: 3rem;
  }
`;

export const StyledTotal = styled.p`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0;
  font-size: 0.875rem;
  text-transform: uppercase;
`;

export const StyledContinueShopping = styled.div<{ $alone: boolean }>`
  grid-column: ${({ $alone }) => ($alone ? '1 / -1' : 'auto')};

  @media ${MEDIA_QUERIES.TABLET} {
    order: -1;
    width: ${ACTION_WIDTH};
    margin-right: auto;
  }
`;

export const StyledPay = styled.div`
  @media ${MEDIA_QUERIES.TABLET} {
    width: ${ACTION_WIDTH};
  }
`;
