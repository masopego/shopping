import type { ProductDetails } from '../ProductDetails'
import { ProductMother } from './ProductMother'

export const ProductDetailsMother = {
  create(overrides: Partial<ProductDetails> = {}): ProductDetails {
    return {
      id: 'SMG-S24U',
      brand: 'Samsung',
      name: 'Galaxy S24 Ultra',
      basePrice: 1329,
      description: 'High-end smartphone with a built-in S Pen',
      rating: 4.6,
      specs: {
        screen: '6.8" Dynamic AMOLED 2X',
        resolution: '3120 x 1440',
        processor: 'Snapdragon 8 Gen 3',
        mainCamera: '200 MP',
        selfieCamera: '12 MP',
        battery: '5000 mAh',
        os: 'Android 14',
        screenRefreshRate: '120 Hz',
      },
      colorOptions: [
        { name: 'Titanium Black', hexCode: '#000000', imageUrl: 'https://example.com/images/SMG-S24U-black.png' },
      ],
      storageOptions: [{ capacity: '256 GB', price: 1329 }],
      similarProducts: [ProductMother.create({ id: 'GPX-8A', brand: 'Google', name: 'Pixel 8a', basePrice: 459 })],
      ...overrides,
    }
  },
}
