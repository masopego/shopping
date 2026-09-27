import styled from 'styled-components';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

export const StyledPageWrapper = styled.div`
  --page-padding: 1rem;

  container-type: inline-size;
  padding-inline: var(--page-padding);
  --page-end-spacing: 4rem;
  padding-bottom: var(--page-end-spacing);

  @media ${MEDIA_QUERIES.TABLET} {
    --page-padding: 2.5rem;
    --page-end-spacing: 5rem;
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    --page-padding: 6.25rem;
    --page-end-spacing: 7.5rem;
  }
`;
