import { act, fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { MIN_SEARCH_LENGTH, ProductSearch, SEARCH_DELAY_MS } from '../product-search';

vi.mock('next/navigation', () => ({ useRouter: vi.fn() }));

const replace = vi.fn();

const renderProductSearch = ({ search = '', resultsCount = 20 } = {}) => {
  vi.mocked(useRouter).mockReturnValue({ replace } as unknown as ReturnType<typeof useRouter>);
  return render(<ProductSearch search={search} resultsCount={resultsCount} />);
};

const type = (value: string) => fireEvent.change(screen.getByRole('searchbox'), { target: { value } });

const waitForSearchDelay = () => act(() => vi.advanceTimersByTime(SEARCH_DELAY_MS));

describe('ProductSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the current search in the field', () => {
    renderProductSearch({ search: 'samsung' });

    expect(screen.getByRole('searchbox', { name: 'Search for a smartphone' })).toHaveValue('samsung');
  });

  it('shows the number of results', () => {
    renderProductSearch({ resultsCount: 20 });

    expect(screen.getByText('20 results')).toBeInTheDocument();
  });

  it('uses the singular when there is only one result', () => {
    renderProductSearch({ resultsCount: 1 });

    expect(screen.getByText('1 result')).toBeInTheDocument();
  });

  it('does not search while the user is still typing', async () => {
    renderProductSearch();
    type('samsung');

    expect(replace).not.toHaveBeenCalled();
  });

  it('searches when the user stops typing', async () => {
    renderProductSearch();
    type('samsung');
    await waitForSearchDelay();

    expect(replace).toHaveBeenCalledWith('/?search=samsung', { scroll: false });
  });

  it('ignores the spaces around the search', async () => {
    renderProductSearch();
    type('  pixel ');
    await waitForSearchDelay();

    expect(replace).toHaveBeenCalledWith('/?search=pixel', { scroll: false });
  });

  it('does not search again when the search does not change', async () => {
    renderProductSearch({ search: 'pixel' });
    type('pixel ');
    await waitForSearchDelay();

    expect(replace).not.toHaveBeenCalled();
  });

  it(`does not search with less than ${MIN_SEARCH_LENGTH} characters`, async () => {
    renderProductSearch();
    type('s');
    await waitForSearchDelay();

    expect(replace).not.toHaveBeenCalled();
  });

  it(`searches from ${MIN_SEARCH_LENGTH} characters`, async () => {
    renderProductSearch();
    type('sa');
    await waitForSearchDelay();

    expect(replace).toHaveBeenCalledWith('/?search=sa', { scroll: false });
  });

  it(`removes the search when it gets shorter than ${MIN_SEARCH_LENGTH} characters`, async () => {
    renderProductSearch({ search: 'samsung' });
    type('s');
    await waitForSearchDelay();

    expect(replace).toHaveBeenCalledWith('/', { scroll: false });
  });

  it('removes the search right away when the field is cleared', async () => {
    renderProductSearch({ search: 'samsung' });
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(replace).toHaveBeenCalledWith('/', { scroll: false });
  });

  it('shows the new search when the URL changes from outside', () => {
    const { rerender } = renderProductSearch({ search: 'samsung' });
    rerender(<ProductSearch search="" resultsCount={20} />);

    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('does not repeat a pending search after the URL changes from outside', async () => {
    const { rerender } = renderProductSearch();
    type('samsung');
    rerender(<ProductSearch search="pixel" resultsCount={20} />);
    await waitForSearchDelay();

    expect(replace).not.toHaveBeenCalled();
  });

  it('keeps what the user typed once the requested search is loaded', async () => {
    const { rerender } = renderProductSearch();
    type('sam');
    await waitForSearchDelay();
    type('samsung');
    rerender(<ProductSearch search="sam" resultsCount={6} />);

    expect(screen.getByRole('searchbox')).toHaveValue('samsung');
  });
});
