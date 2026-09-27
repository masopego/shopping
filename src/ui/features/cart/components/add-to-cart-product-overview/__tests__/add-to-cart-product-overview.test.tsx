import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { CartMother } from '@/core/domain/models/__mothers__/CartMother';
import { ProductDetailsMother } from '@/core/domain/models/__mothers__/ProductDetailsMother';
import { renderWithCartProvider } from '@/ui/features/cart/state/__mocks__/render-with-cart-provider';
import { AddToCartProductOverview } from '../add-to-cart-product-overview';

vi.mock('next/navigation', () => ({ useRouter: vi.fn() }));

const push = vi.fn();

const product = ProductDetailsMother.create({
  colorOptions: [{ name: 'Titanium Black', hexCode: '#000000', imageUrl: 'https://example.com/black.png' }],
  storageOptions: [{ capacity: '512 GB', price: 1329 }],
});

const addToCart = async () => {
  vi.mocked(useRouter).mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);
  const view = renderWithCartProvider(<AddToCartProductOverview product={product} />);
  await userEvent.click(screen.getByRole('radio', { name: '512 GB' }));
  await userEvent.click(screen.getByRole('radio', { name: 'Titanium Black' }));
  await userEvent.click(screen.getByRole('button', { name: 'Añadir' }));
  return view;
};

describe('AddToCartProductOverview', () => {
  it('adds the selected configuration to the cart', async () => {
    const { repository } = await addToCart();

    expect(repository.save).toHaveBeenCalledWith(
      CartMother.withOneItem({
        id: 'SMG-S24U-Titanium Black-512 GB',
        imageUrl: 'https://example.com/black.png',
        storageCapacity: '512 GB',
        price: 1329,
      }),
    );
  });

  it('opens the cart after adding the product', async () => {
    await addToCart();

    expect(push).toHaveBeenCalledWith('/cart');
  });
});
