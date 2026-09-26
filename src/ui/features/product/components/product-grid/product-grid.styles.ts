import styled from 'styled-components';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

const CARD_SIZE = '21.5rem';
const GRID_LINE = '1px solid #000';

export const StyledProductGrid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, ${CARD_SIZE});
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  border-top: ${GRID_LINE};
  border-left: ${GRID_LINE};

  @media ${MEDIA_QUERIES.TABLET} {
    grid-template-columns: repeat(2, minmax(0, ${CARD_SIZE}));
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    width: auto;
    grid-template-columns: repeat(auto-fill, minmax(${CARD_SIZE}, 1fr));
  }
`;

export const StyledProductGridItem = styled.li`
  aspect-ratio: 1;
  border-right: ${GRID_LINE};
  border-bottom: ${GRID_LINE};
`;
