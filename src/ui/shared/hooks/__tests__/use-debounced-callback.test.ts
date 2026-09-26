import { renderHook } from '@testing-library/react';
import { useDebouncedCallback } from '../use-debounced-callback';

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not run the callback before the delay', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));
    result.current('a');
    vi.advanceTimersByTime(299);

    expect(callback).not.toHaveBeenCalled();
  });

  it('runs the callback with its arguments after the delay', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));
    result.current('a');
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledWith('a');
  });

  it('only runs the last call when it is called several times in a row', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));
    result.current('a');
    result.current('ab');
    vi.advanceTimersByTime(300);

    expect(callback.mock.calls).toEqual([['ab']]);
  });

  it('does not run the callback when it is cancelled', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));
    result.current('a');
    result.current.cancel();
    vi.advanceTimersByTime(300);

    expect(callback).not.toHaveBeenCalled();
  });

  it('does not run the callback after unmounting', () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 300));
    result.current('a');
    unmount();
    vi.advanceTimersByTime(300);

    expect(callback).not.toHaveBeenCalled();
  });

  it('runs the latest version of the callback', () => {
    const firstCallback = vi.fn();
    const latestCallback = vi.fn();
    const { result, rerender } = renderHook(({ callback }) => useDebouncedCallback(callback, 300), {
      initialProps: { callback: firstCallback },
    });
    result.current('a');
    rerender({ callback: latestCallback });
    vi.advanceTimersByTime(300);

    expect(latestCallback).toHaveBeenCalledWith('a');
  });
});
