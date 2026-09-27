export interface CartItem {
  id: string;
  productId: string;
  brand: string;
  name: string;
  imageUrl: string;
  colorName: string;
  storageCapacity: string;
  price: number;
  quantity: number;
}

export type NewCartItem = Omit<CartItem, 'id' | 'quantity'>;
