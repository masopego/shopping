'use client';

import { useEffect, useMemo, useRef } from 'react';

export interface DebouncedCallback<Args extends unknown[]> {
  (...args: Args): void;
  cancel: () => void;
}

export const useDebouncedCallback = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
): DebouncedCallback<Args> => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return useMemo(() => {
    const debounced = (...args: Args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callbackRef.current(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timeoutRef.current);
    return debounced;
  }, [delay]);
};
