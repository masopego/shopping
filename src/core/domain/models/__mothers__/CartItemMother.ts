import type { CartItem, NewCartItem } from '../CartItem';

export const NewCartItemMother = {
  create(overrides: Partial<NewCartItem> = {}): NewCartItem {
    return {
      productId: 'SMG-S24U',
      brand: 'Samsung',
      name: 'Galaxy S24 Ultra',
      imageUrl: 'https://example.com/images/SMG-S24U-black.png',
      colorName: 'Titanium Black',
      storageCapacity: '256 GB',
      price: 1329,
      ...overrides,
    };
  },
};

export const CartItemMother = {
  create(overrides: Partial<CartItem> = {}): CartItem {
    return {
      id: 'SMG-S24U-Titanium Black-256 GB',
      ...NewCartItemMother.create(),
      quantity: 1,
      ...overrides,
    };
  },
};
