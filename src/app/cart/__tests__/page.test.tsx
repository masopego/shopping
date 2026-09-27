import { screen } from '@testing-library/react';
import { renderWithCartProvider } from '@/ui/features/cart/state/__mocks__/render-with-cart-provider';
import CartPage, { metadata } from '../page';

describe('CartPage', () => {
  it('renders the cart', async () => {
    renderWithCartProvider(<CartPage />);

    expect(await screen.findByRole('heading', { name: 'Cart (0)' })).toBeInTheDocument();
  });

  it('has its own page title, announced to screen readers when navigating', () => {
    expect(metadata.title).toBe('Cart');
  });
});
