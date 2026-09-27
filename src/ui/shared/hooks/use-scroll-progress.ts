'use client';

import { useCallback, useSyncExternalStore, type RefObject } from 'react';

interface ScrollProgress {
  visibleRatio: number;
  progress: number;
}

const INITIAL_PROGRESS: ScrollProgress = { visibleRatio: 1, progress: 0 };

const measure = (element: HTMLElement | null): ScrollProgress => {
  if (!element || element.scrollWidth === 0) return INITIAL_PROGRESS;

  const { scrollLeft, scrollWidth, clientWidth } = element;
  const maxScroll = scrollWidth - clientWidth;

  return {
    visibleRatio: Math.min(clientWidth / scrollWidth, 1),
    progress: maxScroll > 0 ? Math.min(scrollLeft / maxScroll, 1) : 0,
  };
};

export const useScrollProgress = (ref: RefObject<HTMLElement | null>): ScrollProgress => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const element = ref.current;
      if (!element) return () => {};

      element.addEventListener('scroll', onChange, { passive: true });
      const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onChange);
      resizeObserver?.observe(element);

      return () => {
        element.removeEventListener('scroll', onChange);
        resizeObserver?.disconnect();
      };
    },
    [ref],
  );

  const visibleRatio = useSyncExternalStore(
    subscribe,
    () => measure(ref.current).visibleRatio,
    () => INITIAL_PROGRESS.visibleRatio,
  );
  const progress = useSyncExternalStore(
    subscribe,
    () => measure(ref.current).progress,
    () => INITIAL_PROGRESS.progress,
  );

  return { visibleRatio, progress };
};
