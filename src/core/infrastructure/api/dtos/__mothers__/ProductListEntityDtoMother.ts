import type { ProductListEntityDto } from '../ProductDto'

export const ProductListEntityDtoMother = {
  create(overrides: Partial<ProductListEntityDto> = {}): ProductListEntityDto {
    return {
      id: 'SMG-S24U',
      brand: 'Samsung',
      name: 'Galaxy S24 Ultra',
      basePrice: 1329,
      imageUrl: 'https://example.com/images/SMG-S24U.png',
      ...overrides,
    }
  },
}
