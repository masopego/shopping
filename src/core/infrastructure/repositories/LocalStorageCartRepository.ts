import type { Cart } from '../../domain/models/Cart';
import type { CartRepository } from '../../domain/repositories/CartRepository';
import { createEmptyCart } from '../../domain/services/cartService';

export const CART_STORAGE_KEY = 'shopping:cart';

const getBrowserStorage = (): Storage | undefined => (typeof window === 'undefined' ? undefined : window.localStorage);

const isCart = (value: unknown): value is Cart =>
  typeof value === 'object' && value !== null && 'items' in value && Array.isArray(value.items);

export class LocalStorageCartRepository implements CartRepository {
  constructor(private readonly getStorage: () => Storage | undefined = getBrowserStorage) {}

  get(): Cart {
    try {
      const storedCart = this.getStorage()?.getItem(CART_STORAGE_KEY);
      if (!storedCart) return createEmptyCart();

      const cart: unknown = JSON.parse(storedCart);
      return isCart(cart) ? cart : createEmptyCart();
    } catch {
      return createEmptyCart();
    }
  }

  save(cart: Cart): void {
    try {
      this.getStorage()?.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage may be full or blocked (e.g. private mode); the cart stays in memory
    }
  }
}

export const cartRepository: CartRepository = new LocalStorageCartRepository();
