import type { Cart } from '@/core/domain/models/Cart';
import type { CartRepository } from '@/core/domain/repositories/CartRepository';
import { createEmptyCart } from '@/core/domain/services/cartService';

const SERVER_CART = createEmptyCart();

export interface CartStore {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => Cart;
  getServerSnapshot: () => Cart;
  update: (change: (cart: Cart) => Cart) => void;
}

export const createCartStore = (repository: CartRepository): CartStore => {
  let cart: Cart | undefined;
  const listeners = new Set<() => void>();

  const getSnapshot = () => (cart ??= repository.get());

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot,
    getServerSnapshot: () => SERVER_CART,
    update(change) {
      cart = change(getSnapshot());
      repository.save(cart);
      listeners.forEach((listener) => listener());
    },
  };
};
