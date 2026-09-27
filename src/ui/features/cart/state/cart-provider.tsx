'use client';

import { useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import type { CartRepository } from '@/core/domain/repositories/CartRepository';
import { addToCart, getCartItemCount, getCartTotal, removeFromCart } from '@/core/domain/services/cartService';
import { cartRepository } from '@/core/infrastructure/repositories/LocalStorageCartRepository';
import { CartContext, type CartContextValue } from './cart-context';
import { createCartStore } from './cart-store';

interface CartProviderProps {
  children: ReactNode;
  repository?: CartRepository;
}

const subscribeToNothing = () => () => {};

export function CartProvider({ children, repository = cartRepository }: CartProviderProps) {
  const [store] = useState(() => createCartStore(repository));
  const cart = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const isReady = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: cart.items,
      itemCount: getCartItemCount(cart),
      total: getCartTotal(cart),
      isReady,
      addItem: (item) => store.update((current) => addToCart(current, item)),
      removeItem: (itemId) => store.update((current) => removeFromCart(current, itemId)),
    }),
    [cart, isReady, store],
  );

  return <CartContext value={value}>{children}</CartContext>;
}
