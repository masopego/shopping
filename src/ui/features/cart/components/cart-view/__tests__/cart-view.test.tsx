import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItemMother } from '@/core/domain/models/__mothers__/CartItemMother';
import { CartMother } from '@/core/domain/models/__mothers__/CartMother';
import type { Cart } from '@/core/domain/models/Cart';
import { renderWithCartProvider } from '@/ui/features/cart/state/__mocks__/render-with-cart-provider';
import { CartView } from '../cart-view';

const renderCartView = (cart: Cart = CartMother.empty()) => renderWithCartProvider(<CartView />, { cart });

describe('CartView', () => {
  it('shows the number of units in the title', async () => {
    renderCartView(CartMother.withOneItem({ quantity: 2 }));

    expect(await screen.findByRole('heading', { name: 'Cart (2)' })).toBeInTheDocument();
  });

  it('shows the image of each item', async () => {
    const item = CartItemMother.create();
    renderCartView(CartMother.withItems(item));

    expect(await screen.findByRole('img', { name: `${item.brand} ${item.name}` })).toBeInTheDocument();
  });

  it('shows the name of each item', async () => {
    const item = CartItemMother.create();
    renderCartView(CartMother.withItems(item));

    expect(await screen.findByText(item.name)).toBeInTheDocument();
  });

  it('shows the selected storage and color of each item', async () => {
    renderCartView(CartMother.withOneItem({ storageCapacity: '512 GB', colorName: 'Titanium Violet' }));

    expect(await screen.findByText('512 GB | Titanium Violet')).toBeInTheDocument();
  });

  it('shows the price of each item', async () => {
    renderCartView(CartMother.withOneItem({ price: 1199 }));

    expect(await screen.findByRole('listitem')).toHaveTextContent('1199 EUR');
  });

  it('shows the quantity when an item was added more than once', async () => {
    renderCartView(CartMother.withOneItem({ quantity: 2 }));

    expect(await screen.findByText('Quantity: 2')).toBeInTheDocument();
  });

  it('does not show the quantity of items added once', async () => {
    renderCartView(CartMother.withOneItem({ quantity: 1 }));
    await screen.findByRole('listitem');

    expect(screen.queryByText(/Quantity/)).not.toBeInTheDocument();
  });

  it('removes an item from the cart', async () => {
    const item = CartItemMother.create();
    renderCartView(CartMother.withItems(item));
    await userEvent.click(await screen.findByRole('button', { name: `Eliminar ${item.name}` }));

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('shows the total of the cart', async () => {
    renderCartView(CartMother.withOneItem({ price: 100, quantity: 2 }));

    expect(await screen.findByText('200 EUR')).toBeInTheDocument();
  });

  it('links the continue shopping button to the phone list', async () => {
    renderCartView(CartMother.withOneItem());

    expect(await screen.findByRole('link', { name: 'Continue shopping' })).toHaveAttribute('href', '/');
  });

  it('shows the pay button when there are items', async () => {
    renderCartView(CartMother.withOneItem());

    expect(await screen.findByRole('button', { name: 'Pay' })).toBeInTheDocument();
  });

  describe('when the cart is empty', () => {
    it('shows zero units in the title', async () => {
      renderCartView();

      expect(await screen.findByRole('heading', { name: 'Cart (0)' })).toBeInTheDocument();
    });

    it('does not show the total', async () => {
      renderCartView();
      await screen.findByRole('heading');

      expect(screen.queryByText('Total')).not.toBeInTheDocument();
    });

    it('does not show the pay button', async () => {
      renderCartView();
      await screen.findByRole('heading');

      expect(screen.queryByRole('button', { name: 'Pay' })).not.toBeInTheDocument();
    });

    it('still lets the user continue shopping', async () => {
      renderCartView();

      expect(await screen.findByRole('link', { name: 'Continue shopping' })).toHaveAttribute('href', '/');
    });
  });
});
