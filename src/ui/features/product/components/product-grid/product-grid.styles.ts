import styled from 'styled-components';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

const CARD_SIZE = '21.5rem';
const GRID_LINE_COLOR = '#000';

export const StyledProductGrid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, ${CARD_SIZE});
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  list-style: none;

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
  box-shadow:
    inset 1px 0 0 0 ${GRID_LINE_COLOR},
    inset 0 1px 0 0 ${GRID_LINE_COLOR},
    1px 0 0 0 ${GRID_LINE_COLOR},
    0 1px 0 0 ${GRID_LINE_COLOR},
    1px 1px 0 0 ${GRID_LINE_COLOR};
`;
