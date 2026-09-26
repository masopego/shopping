'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useDebouncedCallback } from '@/ui/shared/hooks/use-debounced-callback';
import { SearchInput } from '@/ui/shared/components/search-input';
import { ROUTES } from '@/ui/shared/routes';
import { StyledProductSearch, StyledResultsCount } from './product-search.styles';
import { LITERALS, formatLiteral } from '@/ui/shared/literals';

export const SEARCH_DELAY_MS = 400;
export const MIN_SEARCH_LENGTH = 2;

interface ProductSearchProps {
  search: string;
  resultsCount: number;
}

export const ProductSearch = ({ search, resultsCount }: ProductSearchProps): React.JSX.Element => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(search);
  const [requestedSearch, setRequestedSearch] = useState(search);
  const [previousSearch, setPreviousSearch] = useState(search);

  if (search !== previousSearch) {
    setPreviousSearch(search);
    if (search !== requestedSearch) {
      setValue(search);
      setRequestedSearch(search);
    }
  }

  const requestSearch = (nextValue: string) => {
    const trimmedValue = nextValue.trim();
    const nextSearch = trimmedValue.length >= MIN_SEARCH_LENGTH ? trimmedValue : '';
    if (nextSearch === requestedSearch) return;

    setRequestedSearch(nextSearch);
    startTransition(() => router.replace(ROUTES.HOME_SEARCH(nextSearch), { scroll: false }));
  };

  const debouncedRequestSearch = useDebouncedCallback(() => requestSearch(value), SEARCH_DELAY_MS);

  const handleChange = (nextValue: string) => {
    setValue(nextValue);

    if (nextValue === '') {
      debouncedRequestSearch.cancel();
      requestSearch('');
      return;
    }

    debouncedRequestSearch();
  };

  return (
    <StyledProductSearch aria-busy={isPending}>
      <SearchInput
        value={value}
        onChange={handleChange}
        label={LITERALS.productSearch.label}
        placeholder={LITERALS.productSearch.placeholder}
      />
      <StyledResultsCount aria-live="polite">
        {formatLiteral(resultsCount === 1 ? LITERALS.productSearch.results.one : LITERALS.productSearch.results.other, {
          count: resultsCount,
        })}
      </StyledResultsCount>
    </StyledProductSearch>
  );
};
