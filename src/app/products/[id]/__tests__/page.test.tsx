import { screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { ProductDetailsMother } from '@/core/domain/models/__mothers__/ProductDetailsMother';
import { HttpError } from '@/core/infrastructure/http/httpError';
import { renderWithCartProvider } from '@/ui/features/cart/state/__mocks__/render-with-cart-provider';
import ProductDetailPage, { generateMetadata } from '../page';

vi.mock('@/core/infrastructure/repositories/ApiProductRepository', async () => {
  const { productRepositoryMock } = await import('@/core/infrastructure/repositories/__mocks__/productRepositoryMock');
  return { productRepository: productRepositoryMock };
});

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
  useRouter: () => ({ push: vi.fn() }),
}));

const { productRepositoryMock } = await import('@/core/infrastructure/repositories/__mocks__/productRepositoryMock');

const renderPage = async (id: string) =>
  renderWithCartProvider(await ProductDetailPage({ params: Promise.resolve({ id }) }));

describe('ProductDetailPage', () => {
  it('requests the product by the id in the URL', async () => {
    productRepositoryMock.getProductById.mockResolvedValue(ProductDetailsMother.create());
    await renderPage('SMG-S24U');

    expect(productRepositoryMock.getProductById).toHaveBeenCalledWith('SMG-S24U');
  });

  it('renders the product name', async () => {
    const product = ProductDetailsMother.create();
    productRepositoryMock.getProductById.mockResolvedValue(product);
    await renderPage(product.id);

    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
  });

  it('renders a link to go back to the phone list', async () => {
    productRepositoryMock.getProductById.mockResolvedValue(ProductDetailsMother.create());
    await renderPage('SMG-S24U');

    expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument();
  });

  it('renders the add to cart button', async () => {
    productRepositoryMock.getProductById.mockResolvedValue(ProductDetailsMother.create());
    await renderPage('SMG-S24U');

    expect(screen.getByRole('button', { name: 'Añadir' })).toBeInTheDocument();
  });

  it('renders the specifications', async () => {
    productRepositoryMock.getProductById.mockResolvedValue(ProductDetailsMother.create());
    await renderPage('SMG-S24U');

    expect(screen.getByRole('heading', { name: 'Specifications' })).toBeInTheDocument();
  });

  it('renders the similar products', async () => {
    productRepositoryMock.getProductById.mockResolvedValue(ProductDetailsMother.create());
    await renderPage('SMG-S24U');

    expect(screen.getByRole('heading', { name: 'Similar items' })).toBeInTheDocument();
  });

  it('shows the not found page when the product does not exist', async () => {
    productRepositoryMock.getProductById.mockRejectedValue(new HttpError(404, 'Product not found'));
    await renderPage('unknown').catch(() => {});

    expect(notFound).toHaveBeenCalled();
  });

  it('rethrows any other error', async () => {
    const error = new HttpError(500, 'Server error');
    productRepositoryMock.getProductById.mockRejectedValue(error);

    await expect(renderPage('SMG-S24U')).rejects.toBe(error);
  });

  it('uses the brand and name of the product as the page title', async () => {
    productRepositoryMock.getProductById.mockResolvedValue(
      ProductDetailsMother.create({ brand: 'Samsung', name: 'Galaxy S24 Ultra' }),
    );
    const metadata = await generateMetadata({ params: Promise.resolve({ id: 'SMG-S24U' }) });

    expect(metadata.title).toBe('Samsung Galaxy S24 Ultra');
  });
});
