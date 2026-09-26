import styled from 'styled-components';

export const StyledSearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
`;

export const StyledSearchInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  color: #000;
  font-size: 1.125rem;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-search-cancel-button {
    appearance: none;
  }
`;

export const StyledClearButton = styled.button`
  display: inline-flex;
  padding: 0;
  border: none;
  background: transparent;
  color: #000;
  cursor: pointer;
`;
