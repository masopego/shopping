import styled from 'styled-components';

export const HEADER_HEIGHT = '5rem';

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${HEADER_HEIGHT};
  margin-inline: calc(-1 * var(--page-padding, 0px));
  padding-inline: var(--page-padding, 0px);
  background-color: #fff;
`;
