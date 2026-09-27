import { screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { CartMother } from '@/core/domain/models/__mothers__/CartMother';
import type { Cart } from '@/core/domain/models/Cart';
import { renderWithCartProvider } from '@/ui/features/cart/state/__mocks__/render-with-cart-provider';
import { Header } from '../header';

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));

const renderHeaderAt = (pathname: string, cart: Cart = CartMother.empty()) => {
  vi.mocked(usePathname).mockReturnValue(pathname);
  return renderWithCartProvider(<Header />, { cart });
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

  it('shows the number of units in the cart', async () => {
    renderHeaderAt('/', CartMother.withOneItem({ quantity: 2 }));

    expect(await screen.findByRole('link', { name: 'Cart (2)' })).toHaveTextContent('2');
  });

  it('shows the cart information outside the cart page', () => {
    renderHeaderAt('/products/SMG-S24U');

    expect(screen.getByRole('link', { name: 'Cart (0)' })).toBeInTheDocument();
  });

  it('hides the cart information on the cart page', () => {
    renderHeaderAt('/cart');

    expect(screen.queryByRole('link', { name: /^Cart/ })).not.toBeInTheDocument();
  });

  it('stays at the top of the screen while scrolling', () => {
    renderHeaderAt('/');

    expect(screen.getByRole('banner')).toHaveStyle({ position: 'sticky', top: '0px' });
  });
});
