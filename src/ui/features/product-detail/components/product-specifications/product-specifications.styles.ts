import styled from 'styled-components';

const ROW_LINE = '1px solid #000';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;

  & tr {
    border-top: ${ROW_LINE};
  }

  & tr:last-child {
    border-bottom: ${ROW_LINE};
  }

  & th,
  & td {
    padding: 1rem 0;
    text-align: left;
    vertical-align: top;
  }

  & th {
    width: 30%;
    padding-right: 1rem;
    font-weight: normal;
    text-transform: uppercase;
  }
`;
