import { render, screen } from '@testing-library/react';
import { ProductMother } from '@/core/domain/models/__mothers__/ProductMother';
import HomePage from '../page';

vi.mock('@/core/infrastructure/repositories/ApiProductRepository', async () => {
  const { productRepositoryMock } = await import('@/core/infrastructure/repositories/__mocks__/productRepositoryMock');
  return { productRepository: productRepositoryMock };
});

vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }) }));

const { productRepositoryMock } = await import('@/core/infrastructure/repositories/__mocks__/productRepositoryMock');

const renderPage = async (searchParams: { search?: string | string[] } = {}) =>
  render(await HomePage({ searchParams: Promise.resolve(searchParams) }));

describe('HomePage', () => {
  beforeEach(() => {
    productRepositoryMock.getProducts.mockResolvedValue([]);
  });

  it('requests the first 20 products when there is no search', async () => {
    await renderPage();

    expect(productRepositoryMock.getProducts).toHaveBeenCalledWith({ search: undefined, limit: 20 });
  });

  it('requests the products that match the search in the URL', async () => {
    await renderPage({ search: 'samsung' });

    expect(productRepositoryMock.getProducts).toHaveBeenCalledWith({ search: 'samsung', limit: 20 });
  });

  it('ignores a repeated search param', async () => {
    await renderPage({ search: ['samsung', 'pixel'] });

    expect(productRepositoryMock.getProducts).toHaveBeenCalledWith({ search: undefined, limit: 20 });
  });

  it('shows the search in the search field', async () => {
    await renderPage({ search: 'samsung' });

    expect(screen.getByRole('searchbox')).toHaveValue('samsung');
  });

  it('shows the number of products found', async () => {
    productRepositoryMock.getProducts.mockResolvedValue([
      ProductMother.create({ id: 'a' }),
      ProductMother.create({ id: 'b' }),
    ]);
    await renderPage();

    expect(screen.getByText('2 results')).toBeInTheDocument();
  });

  it('renders the products in a grid', async () => {
    productRepositoryMock.getProducts.mockResolvedValue([
      ProductMother.create({ id: 'a' }),
      ProductMother.create({ id: 'b' }),
    ]);
    await renderPage();

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
