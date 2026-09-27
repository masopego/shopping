import styled from 'styled-components';

const ROW_LINE = '1px solid #000';

export const StyledSpecifications = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.75rem;
`;

export const StyledSpecification = styled.li`
  display: grid;
  grid-template-columns: 30% 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-top: ${ROW_LINE};

  &:last-child {
    border-bottom: ${ROW_LINE};
  }
`;

export const StyledSpecificationLabel = styled.div`
  text-transform: uppercase;
`;
