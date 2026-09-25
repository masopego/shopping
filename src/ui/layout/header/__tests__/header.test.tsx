import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Header } from '../header';

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));

const renderHeaderAt = (pathname: string) => {
  vi.mocked(usePathname).mockReturnValue(pathname);
  return render(<Header />);
};

describe('Header', () => {
  it('shows the logo linking to the phone list', () => {
    renderHeaderAt('/');

    expect(screen.getByRole('link', { name: 'MBST' })).toHaveAttribute('href', '/');
  });

  it('shows a link to the cart', () => {
    renderHeaderAt('/');

    expect(screen.getByRole('link', { name: 'Cart (0)' })).toHaveAttribute('href', '/cart');
  });

  it('shows the number of items in the cart', () => {
    renderHeaderAt('/');

    expect(screen.getByText('(0)')).toBeInTheDocument();
  });

  it('shows the cart information outside the cart page', () => {
    renderHeaderAt('/products/SMG-S24U');

    expect(screen.getByRole('link', { name: 'Cart (0)' })).toBeInTheDocument();
  });

  it('hides the cart information on the cart page', () => {
    renderHeaderAt('/cart');

    expect(screen.queryByRole('link', { name: 'Cart (0)' })).not.toBeInTheDocument();
  });
});
