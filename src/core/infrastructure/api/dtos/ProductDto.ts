export interface ProductListEntityDto {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

export interface ProductSpecsDto {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

export interface ColorOptionDto {
  name: string
  hexCode: string
  imageUrl: string
}

export interface StorageOptionDto {
  capacity: string
  price: number
}

export interface ProductEntityDto {
  id: string
  brand: string
  name: string
  description: string
  basePrice: number
  rating: number
  specs: ProductSpecsDto
  colorOptions: ColorOptionDto[]
  storageOptions: StorageOptionDto[]
  similarProducts: ProductListEntityDto[]
}

export interface ErrorEntityDto {
  error: string
  message: string
}
