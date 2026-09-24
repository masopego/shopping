import type { Product } from './Product'

export interface ProductSpecs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

export interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

export interface StorageOption {
  capacity: string
  price: number
}

export interface ProductDetails {
  id: string
  brand: string
  name: string
  description: string
  basePrice: number
  rating: number
  specs: ProductSpecs
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: Product[]
}
