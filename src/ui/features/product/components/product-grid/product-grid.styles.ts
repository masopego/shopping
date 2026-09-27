import styled from 'styled-components';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';
import { PRODUCT_CARD_SIZE, productCardLines } from '../product-card/product-card.styles';

export const StyledProductGrid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, ${PRODUCT_CARD_SIZE});
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  list-style: none;

  @media ${MEDIA_QUERIES.TABLET} {
    grid-template-columns: repeat(2, minmax(0, ${PRODUCT_CARD_SIZE}));
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    width: auto;
    grid-template-columns: repeat(auto-fill, minmax(${PRODUCT_CARD_SIZE}, 1fr));
  }
`;

export const StyledProductGridItem = styled.li`
  aspect-ratio: 1;
  ${productCardLines}
`;
