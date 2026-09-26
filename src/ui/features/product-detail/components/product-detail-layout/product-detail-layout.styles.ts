import styled from 'styled-components';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

const SECTION_SPACING = '5rem';

export const StyledProductDetailLayout = styled.div`
  margin: 3rem auto 0;
  color: #000;

  @media ${MEDIA_QUERIES.TABLET} {
    max-width: 47.125rem;
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    max-width: 75rem;
    margin: 11.375rem auto 0;
  }
`;

export const StyledSpecificationsSlot = styled.div`
  margin-top: ${SECTION_SPACING};

  @media ${MEDIA_QUERIES.DESKTOP} {
    margin-top: 13rem;
  }
`;

export const StyledSimilarProductsSlot = styled.div`
  margin-top: ${SECTION_SPACING};

  @media ${MEDIA_QUERIES.DESKTOP} {
    margin-top: 9.875rem;
  }
`;
