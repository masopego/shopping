import type { Cart } from '../models/Cart';
import type { NewCartItem } from '../models/CartItem';
import type { ColorOption, ProductDetails, StorageOption } from '../models/ProductDetails';

const buildItemId = ({ productId, colorName, storageCapacity }: NewCartItem): string =>
  `${productId}-${colorName}-${storageCapacity}`;

export const createEmptyCart = (): Cart => ({ items: [] });

export const createCartItem = (product: ProductDetails, storage: StorageOption, color: ColorOption): NewCartItem => ({
  productId: product.id,
  brand: product.brand,
  name: product.name,
  imageUrl: color.imageUrl,
  colorName: color.name,
  storageCapacity: storage.capacity,
  price: storage.price,
});

export const addToCart = (cart: Cart, newItem: NewCartItem): Cart => {
  const id = buildItemId(newItem);
  const existingItem = cart.items.find((item) => item.id === id);

  if (existingItem) {
    return {
      items: cart.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    };
  }

  return { items: [...cart.items, { ...newItem, id, quantity: 1 }] };
};

export const removeFromCart = (cart: Cart, itemId: string): Cart => ({
  items: cart.items.filter((item) => item.id !== itemId),
});

export const getCartItemCount = (cart: Cart): number => cart.items.reduce((count, item) => count + item.quantity, 0);

export const getCartTotal = (cart: Cart): number =>
  cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
