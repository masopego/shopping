import styled from 'styled-components';
import { visuallyHidden } from '@/ui/shared/styles/visually-hidden';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

export const StyledFieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: none;
`;

export const StyledLegend = styled.legend`
  margin-bottom: 1rem;
  padding: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 300;

  @media ${MEDIA_QUERIES.DESKTOP} {
    font-size: 0.875rem;
  }
`;

export const StyledSwatches = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StyledRadio = styled.input`
  ${visuallyHidden}
`;

export const StyledSwatch = styled.span<{ $color: string }>`
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid #ccc;
  background-color: ${({ $color }) => $color};

  ${StyledRadio}:checked + & {
    box-shadow:
      0 0 0 2px #fff,
      0 0 0 3px #000;
  }

  ${StyledRadio}:focus-visible + & {
    outline: 2px solid #000;
    outline-offset: 4px;
  }
`;

export const StyledOption = styled.label`
  cursor: pointer;
`;

export const StyledSelectedName = styled.p`
  min-height: 1rem;
  margin: 0.75rem 0 0;
  font-size: 0.75rem;
`;
