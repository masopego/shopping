import { CartMother } from '../../../domain/models/__mothers__/CartMother';
import { CART_STORAGE_KEY, LocalStorageCartRepository } from '../LocalStorageCartRepository';

describe('LocalStorageCartRepository', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('get', () => {
    it('returns an empty cart when nothing is stored', () => {
      const cart = new LocalStorageCartRepository().get();

      expect(cart).toEqual(CartMother.empty());
    });

    it('returns the stored cart', () => {
      const storedCart = CartMother.withOneItem();
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
      const cart = new LocalStorageCartRepository().get();

      expect(cart).toEqual(storedCart);
    });

    it('returns an empty cart when the stored value is not valid JSON', () => {
      localStorage.setItem(CART_STORAGE_KEY, '{not json');
      const cart = new LocalStorageCartRepository().get();

      expect(cart).toEqual(CartMother.empty());
    });

    it('returns an empty cart when the stored value is not a cart', () => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ products: [] }));
      const cart = new LocalStorageCartRepository().get();

      expect(cart).toEqual(CartMother.empty());
    });

    it('returns an empty cart when storage is not available', () => {
      const cart = new LocalStorageCartRepository(() => undefined).get();

      expect(cart).toEqual(CartMother.empty());
    });

    it('returns an empty cart when reading from storage throws', () => {
      const repository = new LocalStorageCartRepository(() => {
        throw new Error('SecurityError');
      });
      const cart = repository.get();

      expect(cart).toEqual(CartMother.empty());
    });
  });

  describe('save', () => {
    it('stores the cart as JSON under the cart key', () => {
      const cart = CartMother.withOneItem();
      new LocalStorageCartRepository().save(cart);

      expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '')).toEqual(cart);
    });

    it('does not throw when writing to storage fails', () => {
      const failingStorage = {
        setItem: vi.fn(() => {
          throw new Error('QuotaExceededError');
        }),
      } as unknown as Storage;
      const repository = new LocalStorageCartRepository(() => failingStorage);

      expect(() => repository.save(CartMother.withOneItem())).not.toThrow();
    });
  });
});
