'use client';

import { useRef } from 'react';
import { CloseIcon } from '@/ui/shared/icons/close-icon';
import { StyledClearButton, StyledSearchInput, StyledSearchInputWrapper } from './search-input.styles';
import type { ISearchInputProps } from './types/search-input';
import { LITERALS } from '@/ui/shared/literals';

export const SearchInput = ({
  value,
  onChange,
  label,
  placeholder,
  clearLabel = LITERALS.searchInput.clear,
}: ISearchInputProps): React.JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <StyledSearchInputWrapper>
      <StyledSearchInput
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        placeholder={placeholder}
      />
      {value && (
        <StyledClearButton type="button" onClick={handleClear} aria-label={clearLabel}>
          <CloseIcon />
        </StyledClearButton>
      )}
    </StyledSearchInputWrapper>
  );
};
