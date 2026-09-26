import styled from 'styled-components';

export const StyledTrack = styled.ul`
  display: flex;
  margin: 0 calc(-1 * var(--carousel-bleed-right, 0px)) 0 0;
  padding: 0 1px 1px 0;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  cursor: grab;
  user-select: none;

  & a,
  & img {
    -webkit-user-drag: none;
  }

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > li {
    scroll-snap-align: start;
  }

  &:active {
    cursor: grabbing;
  }
`;

export const StyledProgressLine = styled.div`
  height: 1px;
  margin-top: 1.5rem;
  overflow: hidden;
  background-color: #e5e5e5;
`;

export const StyledProgressThumb = styled.div`
  height: 100%;
  background-color: #000;
`;
