import type { Cart } from '../models/Cart';

export interface CartRepository {
  get(): Cart;
  save(cart: Cart): void;
}
