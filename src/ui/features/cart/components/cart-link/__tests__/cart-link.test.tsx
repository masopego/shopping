import { screen } from '@testing-library/react';
import { CartMother } from '@/core/domain/models/__mothers__/CartMother';
import { renderWithCartProvider } from '@/ui/features/cart/state/__mocks__/render-with-cart-provider';
import { CartLink } from '../cart-link';

const getBagIcon = (container: HTMLElement) => container.querySelector('svg');

describe('CartLink', () => {
  it('shows the number of units in the cart', async () => {
    renderWithCartProvider(<CartLink />, { cart: CartMother.withOneItem({ quantity: 2 }) });

    expect(await screen.findByRole('link', { name: 'Cart (2)' })).toBeInTheDocument();
  });

  it('links to the cart page', () => {
    renderWithCartProvider(<CartLink />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/cart');
  });

  it('keeps the inherited color of the bag icon when the cart is empty', async () => {
    const { container } = renderWithCartProvider(
      <div style={{ color: 'rgb(107, 99, 117)' }}>
        <CartLink />
      </div>,
    );
    await screen.findByRole('link', { name: 'Cart (0)' });

    expect(getBagIcon(container)).toHaveStyle({ color: 'rgb(107, 99, 117)' });
  });

  it('paints the bag icon black when the cart has items', async () => {
    const { container } = renderWithCartProvider(<CartLink />, { cart: CartMother.withOneItem() });
    await screen.findByRole('link', { name: 'Cart (1)' });

    expect(getBagIcon(container)).toHaveStyle({ color: '#000' });
  });

  it('draws the bag outline when the cart is empty', async () => {
    const { container } = renderWithCartProvider(<CartLink />);
    await screen.findByRole('link', { name: 'Cart (0)' });

    expect(container.querySelector('svg rect')).not.toBeInTheDocument();
  });

  it('fills the bag when the cart has items', async () => {
    const { container } = renderWithCartProvider(<CartLink />, { cart: CartMother.withOneItem() });
    await screen.findByRole('link', { name: 'Cart (1)' });

    expect(container.querySelector('svg rect')).toBeInTheDocument();
  });
});
