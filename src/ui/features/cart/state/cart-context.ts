import { createContext } from 'react';
import type { CartItem, NewCartItem } from '@/core/domain/models/CartItem';

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  isReady: boolean;
  addItem: (item: NewCartItem) => void;
  removeItem: (itemId: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
