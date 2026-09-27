import { vi } from 'vitest';
import type { CartRepository } from '../../../domain/repositories/CartRepository';

export const createCartRepositoryMock = () => ({
  get: vi.fn<CartRepository['get']>(() => ({ items: [] })),
  save: vi.fn<CartRepository['save']>(),
});
