import styled from 'styled-components';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

export const StyledPageWrapper = styled.div`
  --page-padding: 1rem;

  container-type: inline-size;
  padding-inline: var(--page-padding);
  padding-bottom: 4rem;

  @media ${MEDIA_QUERIES.TABLET} {
    --page-padding: 2.5rem;
    padding-bottom: 5rem;
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    --page-padding: 6.25rem;
    padding-bottom: 7.5rem;
  }
`;
