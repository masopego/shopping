import { CartItemMother, NewCartItemMother } from '../../models/__mothers__/CartItemMother';
import { ProductDetailsMother } from '../../models/__mothers__/ProductDetailsMother';
import { CartMother } from '../../models/__mothers__/CartMother';
import {
  addToCart,
  createCartItem,
  createEmptyCart,
  getCartItemCount,
  getCartTotal,
  removeFromCart,
} from '../cartService';

describe('cartService', () => {
  describe('createEmptyCart', () => {
    it('creates a cart without items', () => {
      const cart = createEmptyCart();

      expect(cart.items).toEqual([]);
    });
  });

  describe('createCartItem', () => {
    it('builds the cart line with the price of the storage and the image of the color', () => {
      const product = ProductDetailsMother.create({ id: 'SMG-S24U', brand: 'Samsung', name: 'Galaxy S24 Ultra' });
      const item = createCartItem(
        product,
        { capacity: '512 GB', price: 1329 },
        { name: 'Titanium Violet', hexCode: '#8E6F96', imageUrl: 'https://example.com/violet.png' },
      );

      expect(item).toEqual({
        productId: 'SMG-S24U',
        brand: 'Samsung',
        name: 'Galaxy S24 Ultra',
        imageUrl: 'https://example.com/violet.png',
        colorName: 'Titanium Violet',
        storageCapacity: '512 GB',
        price: 1329,
      });
    });
  });

  describe('addToCart', () => {
    it('adds a new item with quantity 1', () => {
      const cart = addToCart(CartMother.empty(), NewCartItemMother.create());

      expect(cart.items).toEqual([CartItemMother.create({ quantity: 1 })]);
    });

    it('identifies the item by product, color and storage', () => {
      const cart = addToCart(
        CartMother.empty(),
        NewCartItemMother.create({ productId: 'GPX-8A', colorName: 'Obsidian', storageCapacity: '128 GB' }),
      );

      expect(cart.items[0].id).toBe('GPX-8A-Obsidian-128 GB');
    });

    it('increases the quantity when the same item is already in the cart', () => {
      const cart = addToCart(CartMother.withOneItem({ quantity: 1 }), NewCartItemMother.create());

      expect(cart.items).toEqual([CartItemMother.create({ quantity: 2 })]);
    });

    it('keeps the other items untouched when increasing the quantity of an item', () => {
      const otherItem = CartItemMother.create({ id: 'other', productId: 'GPX-8A' });
      const cart = addToCart(CartMother.withItems(otherItem, CartItemMother.create()), NewCartItemMother.create());

      expect(cart.items[0]).toBe(otherItem);
    });

    it('adds a separate item when the same product has a different configuration', () => {
      const cart = addToCart(CartMother.withOneItem(), NewCartItemMother.create({ storageCapacity: '512 GB' }));

      expect(cart.items).toHaveLength(2);
    });

    it('does not mutate the original cart', () => {
      const originalCart = CartMother.empty();
      addToCart(originalCart, NewCartItemMother.create());

      expect(originalCart.items).toEqual([]);
    });
  });

  describe('removeFromCart', () => {
    it('removes the item with the given id', () => {
      const item = CartItemMother.create();
      const cart = removeFromCart(CartMother.withItems(item), item.id);

      expect(cart.items).toEqual([]);
    });

    it('keeps the other items', () => {
      const itemToKeep = CartItemMother.create({ id: 'keep' });
      const cart = removeFromCart(CartMother.withItems(itemToKeep, CartItemMother.create({ id: 'remove' })), 'remove');

      expect(cart.items).toEqual([itemToKeep]);
    });

    it('does not mutate the original cart', () => {
      const originalCart = CartMother.withOneItem();
      removeFromCart(originalCart, originalCart.items[0].id);

      expect(originalCart.items).toHaveLength(1);
    });
  });

  describe('getCartItemCount', () => {
    it('returns 0 for an empty cart', () => {
      const count = getCartItemCount(CartMother.empty());

      expect(count).toBe(0);
    });

    it('sums the quantities of all items', () => {
      const cart = CartMother.withItems(
        CartItemMother.create({ id: 'a', quantity: 2 }),
        CartItemMother.create({ id: 'b', quantity: 3 }),
      );
      const count = getCartItemCount(cart);

      expect(count).toBe(5);
    });
  });

  describe('getCartTotal', () => {
    it('returns 0 for an empty cart', () => {
      const total = getCartTotal(CartMother.empty());

      expect(total).toBe(0);
    });

    it('sums the price of each item multiplied by its quantity', () => {
      const cart = CartMother.withItems(
        CartItemMother.create({ id: 'a', price: 100, quantity: 2 }),
        CartItemMother.create({ id: 'b', price: 50, quantity: 1 }),
      );
      const total = getCartTotal(cart);

      expect(total).toBe(250);
    });
  });
});
