import { render, screen } from '@testing-library/react';
import { ProductMother } from '@/core/domain/models/__mothers__/ProductMother';
import HomePage from '../page';

vi.mock('@/core/infrastructure/repositories/ApiProductRepository', async () => {
  const { productRepositoryMock } = await import('@/core/infrastructure/repositories/__mocks__/productRepositoryMock');
  return { productRepository: productRepositoryMock };
});

const { productRepositoryMock } = await import('@/core/infrastructure/repositories/__mocks__/productRepositoryMock');

describe('HomePage', () => {
  it('requests the first 20 products', async () => {
    productRepositoryMock.getProducts.mockResolvedValue([]);
    render(await HomePage());

    expect(productRepositoryMock.getProducts).toHaveBeenCalledWith({ limit: 20 });
  });

  it('renders the products in a grid', async () => {
    productRepositoryMock.getProducts.mockResolvedValue([
      ProductMother.create({ id: 'a' }),
      ProductMother.create({ id: 'b' }),
    ]);
    render(await HomePage());

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
