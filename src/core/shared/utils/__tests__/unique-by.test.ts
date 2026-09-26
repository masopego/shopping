import { uniqueBy } from '../unique-by';

describe('uniqueBy', () => {
  it('removes the items whose key is repeated', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'a' }];
    const result = uniqueBy(items, (item) => item.id);

    expect(result).toEqual([{ id: 'a' }, { id: 'b' }]);
  });

  it('keeps the first item of each key', () => {
    const first = { id: 'a', name: 'first' };
    const result = uniqueBy([first, { id: 'a', name: 'second' }], (item) => item.id);

    expect(result).toEqual([first]);
  });

  it('keeps the original order', () => {
    const items = [{ id: 'c' }, { id: 'a' }, { id: 'c' }, { id: 'b' }];
    const result = uniqueBy(items, (item) => item.id);

    expect(result.map((item) => item.id)).toEqual(['c', 'a', 'b']);
  });

  it('returns the same items when there are no repeated keys', () => {
    const items = [{ id: 'a' }, { id: 'b' }];
    const result = uniqueBy(items, (item) => item.id);

    expect(result).toEqual(items);
  });

  it('returns an empty list when there are no items', () => {
    const result = uniqueBy([], (item: { id: string }) => item.id);

    expect(result).toEqual([]);
  });

  it('uses any value as the key', () => {
    const colors = [
      { name: 'Black', hex: '#000' },
      { name: 'Black', hex: '#111' },
    ];
    const result = uniqueBy(colors, (color) => color.name);

    expect(result).toHaveLength(1);
  });

  it('does not modify the original list', () => {
    const items = [{ id: 'a' }, { id: 'a' }];
    uniqueBy(items, (item) => item.id);

    expect(items).toHaveLength(2);
  });
});
