import styled from 'styled-components';
import { visuallyHidden } from '@/ui/shared/styles/visually-hidden';
import { MEDIA_QUERIES } from '@/ui/shared/styles/breakpoints';

const OPTION_BORDER = '1px solid #ccc';

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

export const StyledOptions = styled.div`
  display: flex;
`;

export const StyledRadio = styled.input`
  ${visuallyHidden}
`;

export const StyledOptionBox = styled.span`
  display: block;
  padding: 1.25rem 1.5rem;
  border: ${OPTION_BORDER};
  font-size: 0.875rem;

  ${StyledRadio}:checked + & {
    position: relative;
    box-shadow: 0 0 0 1px #000;
  }

  ${StyledRadio}:focus-visible + & {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

export const StyledOption = styled.label`
  cursor: pointer;

  & + & ${StyledOptionBox} {
    border-left: none;
  }
`;
