import type { Product } from '../../../domain/models/Product'
import type { ProductDetails } from '../../../domain/models/ProductDetails'
import type { ProductEntityDto, ProductListEntityDto } from '../dtos/ProductDto'

export const toProduct = (dto: ProductListEntityDto): Product => ({
  id: dto.id,
  brand: dto.brand,
  name: dto.name,
  basePrice: dto.basePrice,
  imageUrl: dto.imageUrl,
})

export const toProductDetails = (dto: ProductEntityDto): ProductDetails => ({
  id: dto.id,
  brand: dto.brand,
  name: dto.name,
  description: dto.description,
  basePrice: dto.basePrice,
  rating: dto.rating,
  specs: { ...dto.specs },
  colorOptions: (dto.colorOptions ?? []).map((color) => ({ ...color })),
  storageOptions: (dto.storageOptions ?? []).map((storage) => ({ ...storage })),
  similarProducts: (dto.similarProducts ?? []).map(toProduct),
})
