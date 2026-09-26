import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../search-input';
import type { ISearchInputProps } from '../types/search-input';

const renderSearchInput = (props: Partial<ISearchInputProps> = {}) =>
  render(<SearchInput value="" onChange={vi.fn()} label="Search" {...props} />);

describe('SearchInput', () => {
  it('renders a search field with the given label', () => {
    renderSearchInput({ label: 'Search for a smartphone' });

    expect(screen.getByRole('searchbox', { name: 'Search for a smartphone' })).toBeInTheDocument();
  });

  it('shows the given placeholder', () => {
    renderSearchInput({ placeholder: 'Search for a smartphone...' });

    expect(screen.getByPlaceholderText('Search for a smartphone...')).toBeInTheDocument();
  });

  it('shows the given value', () => {
    renderSearchInput({ value: 'Samsung' });

    expect(screen.getByRole('searchbox')).toHaveValue('Samsung');
  });

  it('notifies the typed value', async () => {
    const onChange = vi.fn();
    renderSearchInput({ onChange });
    await userEvent.type(screen.getByRole('searchbox'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('hides the clear button when there is no value', () => {
    renderSearchInput({ value: '' });

    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('shows the clear button when there is a value', () => {
    renderSearchInput({ value: 'Samsung' });

    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('uses the given label for the clear button', () => {
    renderSearchInput({ value: 'Samsung', clearLabel: 'Remove text' });

    expect(screen.getByRole('button', { name: 'Remove text' })).toBeInTheDocument();
  });

  it('clears the value when the clear button is clicked', async () => {
    const onChange = vi.fn();
    renderSearchInput({ value: 'Samsung', onChange });
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('moves the focus back to the field after clearing it', async () => {
    renderSearchInput({ value: 'Samsung' });
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(screen.getByRole('searchbox')).toHaveFocus();
  });
});
