import { formatLiteral } from '../format-literal';

describe('formatLiteral', () => {
  it('replaces the placeholders with their values', () => {
    const text = formatLiteral('{count} results', { count: 6 });

    expect(text).toBe('6 results');
  });

  it('replaces several placeholders', () => {
    const text = formatLiteral('{brand} {name}', { brand: 'Apple', name: 'iPhone 15' });

    expect(text).toBe('Apple iPhone 15');
  });

  it('keeps the placeholders without a value', () => {
    const text = formatLiteral('Total: {total}', {});

    expect(text).toBe('Total: {total}');
  });

  it('returns the literal unchanged when it has no placeholders', () => {
    const text = formatLiteral('Add to cart', { count: 1 });

    expect(text).toBe('Add to cart');
  });
});
