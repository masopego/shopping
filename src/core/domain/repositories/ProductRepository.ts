import type { Product } from '../models/Product'
import type { ProductDetails } from '../models/ProductDetails'

export interface GetProductsParams {
  search?: string
  limit?: number
  offset?: number
}

export interface ProductRepository {
  getProducts(params?: GetProductsParams, signal?: AbortSignal): Promise<Product[]>
  getProductById(id: string, signal?: AbortSignal): Promise<ProductDetails>
}
