import { vi } from 'vitest';
import type { ProductRepository } from '../../../domain/repositories/ProductRepository';

export const productRepositoryMock = {
  getProducts: vi.fn<ProductRepository['getProducts']>(),
  getProductById: vi.fn<ProductRepository['getProductById']>(),
};
