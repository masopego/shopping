import { act, renderHook } from '@testing-library/react';
import { mockScrollDimensions } from '../__mocks__/scroll-dimensions';
import { useScrollProgress } from '../use-scroll-progress';

const renderScrollProgress = () => {
  const element = document.createElement('div');
  const hook = renderHook(() => useScrollProgress({ current: element }));
  return { element, result: hook.result };
};

const scrollTo = (element: HTMLElement, scrollLeft: number) =>
  act(() => {
    element.scrollLeft = scrollLeft;
    element.dispatchEvent(new Event('scroll'));
  });

describe('useScrollProgress', () => {
  it('considers everything visible when the content fits', () => {
    mockScrollDimensions({ scrollWidth: 500, clientWidth: 500 });
    const { result } = renderScrollProgress();

    expect(result.current.visibleRatio).toBe(1);
  });

  it('returns the visible share of the content', () => {
    mockScrollDimensions({ scrollWidth: 1000, clientWidth: 250 });
    const { result } = renderScrollProgress();

    expect(result.current.visibleRatio).toBe(0.25);
  });

  it('starts at the beginning', () => {
    mockScrollDimensions({ scrollWidth: 1000, clientWidth: 250 });
    const { result } = renderScrollProgress();

    expect(result.current.progress).toBe(0);
  });

  it('updates the progress when the content is scrolled', () => {
    mockScrollDimensions({ scrollWidth: 1000, clientWidth: 250 });
    const { element, result } = renderScrollProgress();
    scrollTo(element, 375);

    expect(result.current.progress).toBe(0.5);
  });

  it('reaches 1 at the end of the content', () => {
    mockScrollDimensions({ scrollWidth: 1000, clientWidth: 250 });
    const { element, result } = renderScrollProgress();
    scrollTo(element, 750);

    expect(result.current.progress).toBe(1);
  });
});
