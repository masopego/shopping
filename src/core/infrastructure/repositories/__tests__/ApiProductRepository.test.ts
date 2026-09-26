import { ProductDetailsMother } from '../../../domain/models/__mothers__/ProductDetailsMother';
import { ProductMother } from '../../../domain/models/__mothers__/ProductMother';
import { ProductEntityDtoMother } from '../../api/dtos/__mothers__/ProductEntityDtoMother';
import { ProductListEntityDtoMother } from '../../api/dtos/__mothers__/ProductListEntityDtoMother';
import { httpClient } from '../../http/httpClient';
import { HttpError } from '../../http/httpError';
import { ApiProductRepository } from '../ApiProductRepository';

vi.mock('../../http/httpClient');

const httpGet = vi.mocked(httpClient.get);

describe('ApiProductRepository', () => {
  let repository: ApiProductRepository;

  beforeEach(() => {
    repository = new ApiProductRepository();
  });

  describe('getProducts', () => {
    it('requests the products from the /products endpoint', async () => {
      httpGet.mockResolvedValue([]);
      await repository.getProducts();

      expect(httpGet).toHaveBeenCalledWith('/products', expect.anything());
    });

    it('sends the search and pagination params', async () => {
      httpGet.mockResolvedValue([]);
      await repository.getProducts({ search: 'galaxy', limit: 20, offset: 40 });

      expect(httpGet).toHaveBeenCalledWith(
        '/products',
        expect.objectContaining({ query: { search: 'galaxy', limit: 20, offset: 40 } }),
      );
    });

    it('forwards the abort signal to the HTTP client', async () => {
      httpGet.mockResolvedValue([]);
      const { signal } = new AbortController();
      await repository.getProducts({}, signal);

      expect(httpGet).toHaveBeenCalledWith('/products', expect.objectContaining({ signal }));
    });

    it('returns the products mapped to the domain model', async () => {
      httpGet.mockResolvedValue([ProductListEntityDtoMother.create()]);
      const products = await repository.getProducts();

      expect(products).toEqual([ProductMother.create()]);
    });

    it('propagates HTTP client errors', async () => {
      const error = new HttpError(500, 'Server error');
      httpGet.mockRejectedValue(error);
      const request = repository.getProducts();

      await expect(request).rejects.toBe(error);
    });
  });

  describe('getProductById', () => {
    it('requests the product from the /products/:id endpoint', async () => {
      httpGet.mockResolvedValue(ProductEntityDtoMother.create());
      await repository.getProductById('SMG-S24U');

      expect(httpGet).toHaveBeenCalledWith('/products/SMG-S24U', expect.anything());
    });

    it('encodes the id in the URL', async () => {
      httpGet.mockResolvedValue(ProductEntityDtoMother.create());
      await repository.getProductById('a/b c');

      expect(httpGet).toHaveBeenCalledWith('/products/a%2Fb%20c', expect.anything());
    });

    it('forwards the abort signal to the HTTP client', async () => {
      httpGet.mockResolvedValue(ProductEntityDtoMother.create());
      const { signal } = new AbortController();
      await repository.getProductById('SMG-S24U', signal);

      expect(httpGet).toHaveBeenCalledWith('/products/SMG-S24U', { signal });
    });

    it('returns the details mapped to the domain model', async () => {
      httpGet.mockResolvedValue(ProductEntityDtoMother.create());
      const details = await repository.getProductById('SMG-S24U');

      expect(details).toEqual(ProductDetailsMother.create());
    });

    it('propagates HTTP client errors', async () => {
      const error = new HttpError(404, 'Product not found');
      httpGet.mockRejectedValue(error);
      const request = repository.getProductById('unknown');

      await expect(request).rejects.toBe(error);
    });
  });
});
