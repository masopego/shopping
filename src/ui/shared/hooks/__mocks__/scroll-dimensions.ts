import { vi } from 'vitest';

interface ScrollDimensions {
  scrollWidth: number;
  clientWidth: number;
}

export const mockScrollDimensions = ({ scrollWidth, clientWidth }: ScrollDimensions) => {
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(scrollWidth);
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(clientWidth);
};
