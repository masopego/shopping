import { screen } from '@testing-library/react';
import { renderWithCartProvider } from '@/ui/features/cart/state/__mocks__/render-with-cart-provider';
import CartPage from '../page';

describe('CartPage', () => {
  it('renders the cart', async () => {
    renderWithCartProvider(<CartPage />);

    expect(await screen.findByRole('heading', { name: 'Cart (0)' })).toBeInTheDocument();
  });
});
