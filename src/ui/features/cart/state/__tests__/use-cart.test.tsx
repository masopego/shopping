import { renderHook } from '@testing-library/react';
import { useCart } from '../use-cart';

describe('useCart', () => {
  it('throws when used outside a CartProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within a CartProvider');
  });
});
