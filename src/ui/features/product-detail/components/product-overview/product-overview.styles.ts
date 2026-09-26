import styled from 'styled-components';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

export const StyledProductOverview = styled.section`
  display: grid;
  gap: 3rem;
  align-items: center;

  @media ${MEDIA_QUERIES.TABLET} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    grid-template-columns: minmax(0, 31.875rem) minmax(0, 23.75rem);
    justify-content: space-between;
  }
`;

export const StyledImageWrapper = styled.div`
  position: relative;
  width: 16.25rem;
  max-width: 100%;
  aspect-ratio: 1;

  & img {
    object-position: left center;
  }

  @media ${MEDIA_QUERIES.TABLET} {
    width: 21.0625rem;
  }

  @media ${MEDIA_QUERIES.DESKTOP} {
    width: 31.875rem;
  }
`;

export const StyledInfo = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const StyledName = styled.h1`
  margin: 0;
  color: #000;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: normal;
  text-transform: uppercase;

  @media ${MEDIA_QUERIES.DESKTOP} {
    font-size: 1.5rem;
  }
`;

export const StyledPrice = styled.p`
  margin: 0.5rem 0 0;
  color: #000;
  font-size: 0.875rem;
  font-weight: 300;

  @media ${MEDIA_QUERIES.DESKTOP} {
    font-size: 1.25rem;
  }
`;
