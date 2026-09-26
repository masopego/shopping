import type { Product } from '../Product';

export const ProductMother = {
  create(overrides: Partial<Product> = {}): Product {
    return {
      id: 'SMG-S24U',
      brand: 'Samsung',
      name: 'Galaxy S24 Ultra',
      basePrice: 1329,
      imageUrl: 'https://example.com/images/SMG-S24U.png',
      ...overrides,
    };
  },
};
