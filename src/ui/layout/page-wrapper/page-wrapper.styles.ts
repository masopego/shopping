import styled from 'styled-components';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

export const StyledPageWrapper = styled.div`
  padding-inline: 1rem;

  @media ${MEDIA_QUERIES.TABLET} {
    padding-inline: 2.5rem;
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    padding-inline: 6.25rem;
  }
`;
