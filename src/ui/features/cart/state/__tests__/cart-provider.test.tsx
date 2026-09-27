import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import type { Cart } from '@/core/domain/models/Cart';
import { CartItemMother, NewCartItemMother } from '@/core/domain/models/__mothers__/CartItemMother';
import { CartMother } from '@/core/domain/models/__mothers__/CartMother';
import { createCartRepositoryMock } from '@/core/infrastructure/repositories/__mocks__/cartRepositoryMock';
import { CartProvider } from '../cart-provider';
import { useCart } from '../use-cart';

const renderUseCart = async (cart: Cart = CartMother.empty()) => {
  const repository = createCartRepositoryMock();
  repository.get.mockReturnValue(cart);
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider repository={repository}>{children}</CartProvider>
  );
  const hook = renderHook(() => useCart(), { wrapper });
  await waitFor(() => expect(hook.result.current.isReady).toBe(true));

  return { repository, result: hook.result };
};

describe('CartProvider', () => {
  it('loads the stored cart', async () => {
    const storedCart = CartMother.withOneItem();
    const { result } = await renderUseCart(storedCart);

    expect(result.current.items).toEqual(storedCart.items);
  });

  it('exposes the number of units in the cart', async () => {
    const { result } = await renderUseCart(CartMother.withOneItem({ quantity: 3 }));

    expect(result.current.itemCount).toBe(3);
  });

  it('exposes the cart total', async () => {
    const { result } = await renderUseCart(CartMother.withOneItem({ price: 100, quantity: 2 }));

    expect(result.current.total).toBe(200);
  });

  it('adds an item to the cart', async () => {
    const { result } = await renderUseCart();
    act(() => result.current.addItem(NewCartItemMother.create()));

    expect(result.current.items).toEqual([CartItemMother.create()]);
  });

  it('saves the cart after adding an item', async () => {
    const { repository, result } = await renderUseCart();
    act(() => result.current.addItem(NewCartItemMother.create()));

    expect(repository.save).toHaveBeenCalledWith(CartMother.withOneItem());
  });

  it('removes an item from the cart', async () => {
    const item = CartItemMother.create();
    const { result } = await renderUseCart(CartMother.withItems(item));
    act(() => result.current.removeItem(item.id));

    expect(result.current.items).toEqual([]);
  });

  it('saves the cart after removing an item', async () => {
    const item = CartItemMother.create();
    const { repository, result } = await renderUseCart(CartMother.withItems(item));
    act(() => result.current.removeItem(item.id));

    expect(repository.save).toHaveBeenCalledWith(CartMother.empty());
  });
});
