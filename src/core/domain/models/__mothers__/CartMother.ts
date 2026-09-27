import type { Cart } from '../Cart';
import type { CartItem } from '../CartItem';
import { CartItemMother } from './CartItemMother';

export const CartMother = {
  empty(): Cart {
    return { items: [] };
  },

  withItems(...items: CartItem[]): Cart {
    return { items };
  },

  withOneItem(overrides: Partial<CartItem> = {}): Cart {
    return { items: [CartItemMother.create(overrides)] };
  },
};
