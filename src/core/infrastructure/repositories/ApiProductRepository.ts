import type { Product } from '../../domain/models/Product'
import type { ProductDetails } from '../../domain/models/ProductDetails'
import type { GetProductsParams, ProductRepository } from '../../domain/repositories/ProductRepository'
import type { ProductEntityDto, ProductListEntityDto } from '../api/dtos/ProductDto'
import { toProduct, toProductDetails } from '../api/mappers/ProductMapper'
import { httpClient } from '../http/httpClient'

export class ApiProductRepository implements ProductRepository {
  async getProducts(params: GetProductsParams = {}, signal?: AbortSignal): Promise<Product[]> {
    const dtos = await httpClient.get<ProductListEntityDto[]>('/products', {
      query: {
        search: params.search,
        limit: params.limit,
        offset: params.offset,
      },
      signal,
    })
    return dtos.map(toProduct)
  }

  async getProductById(id: string, signal?: AbortSignal): Promise<ProductDetails> {
    const dto = await httpClient.get<ProductEntityDto>(`/products/${encodeURIComponent(id)}`, { signal })
    return toProductDetails(dto)
  }
}

export const productRepository: ProductRepository = new ApiProductRepository()
