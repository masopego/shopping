export const uniqueBy = <T, K>(items: T[], getKey: (item: T) => K): T[] => {
  const seenKeys = new Set<K>();

  return items.filter((item) => {
    const key = getKey(item);
    if (seenKeys.has(key)) return false;

    seenKeys.add(key);
    return true;
  });
};
