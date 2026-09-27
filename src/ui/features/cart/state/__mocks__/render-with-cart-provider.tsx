import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import type { Cart } from '@/core/domain/models/Cart';
import { CartMother } from '@/core/domain/models/__mothers__/CartMother';
import { createCartRepositoryMock } from '@/core/infrastructure/repositories/__mocks__/cartRepositoryMock';
import { CartProvider } from '../cart-provider';

export const renderWithCartProvider = (ui: ReactElement, { cart = CartMother.empty() }: { cart?: Cart } = {}) => {
  const repository = createCartRepositoryMock();
  repository.get.mockReturnValue(cart);

  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider repository={repository}>{children}</CartProvider>
  );

  return { repository, ...render(ui, { wrapper }) };
};
