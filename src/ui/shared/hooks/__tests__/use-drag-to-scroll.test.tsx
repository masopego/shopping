import { fireEvent, render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { useDragToScroll } from '../use-drag-to-scroll';

const DraggableRow = ({ onLinkClick = vi.fn() }: { onLinkClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handlers = useDragToScroll(ref);

  return (
    <div ref={ref} data-testid="row" {...handlers}>
      <a href="#item" onClick={onLinkClick}>
        Item
      </a>
    </div>
  );
};

const drag = (
  element: HTMLElement,
  { from, to, pointerType = 'mouse' }: { from: number; to: number; pointerType?: string },
) => {
  fireEvent.pointerDown(element, { pointerType, button: 0, clientX: from });
  fireEvent.pointerMove(element, { pointerType, clientX: to });
  fireEvent.pointerUp(element, { pointerType, clientX: to });
};

describe('useDragToScroll', () => {
  it('scrolls the element when it is dragged with the mouse', () => {
    render(<DraggableRow />);
    const row = screen.getByTestId('row');
    drag(row, { from: 300, to: 200 });

    expect(row.scrollLeft).toBe(100);
  });

  it('does not scroll with touch, which already scrolls natively', () => {
    render(<DraggableRow />);
    const row = screen.getByTestId('row');
    drag(row, { from: 300, to: 200, pointerType: 'touch' });

    expect(row.scrollLeft).toBe(0);
  });

  it('ignores tiny movements so a click is still a click', () => {
    render(<DraggableRow />);
    const row = screen.getByTestId('row');
    drag(row, { from: 300, to: 297 });

    expect(row.scrollLeft).toBe(0);
  });

  it('does not open the link under the pointer after a drag', () => {
    const onLinkClick = vi.fn();
    render(<DraggableRow onLinkClick={onLinkClick} />);
    drag(screen.getByTestId('row'), { from: 300, to: 200 });
    fireEvent.click(screen.getByRole('link'));

    expect(onLinkClick).not.toHaveBeenCalled();
  });

  it('opens the link on a normal click', () => {
    const onLinkClick = vi.fn();
    render(<DraggableRow onLinkClick={onLinkClick} />);
    fireEvent.click(screen.getByRole('link'));

    expect(onLinkClick).toHaveBeenCalled();
  });

  it('restores the scroll snapping when the drag ends', () => {
    render(<DraggableRow />);
    const row = screen.getByTestId('row');
    drag(row, { from: 300, to: 200 });

    expect(row.style.scrollSnapType).toBe('');
  });

  it('stops dragging when the browser cancels the pointer', () => {
    render(<DraggableRow />);
    const row = screen.getByTestId('row');
    fireEvent.pointerDown(row, { pointerType: 'mouse', button: 0, clientX: 300 });
    fireEvent.pointerCancel(row, { pointerType: 'mouse' });
    fireEvent.pointerMove(row, { pointerType: 'mouse', clientX: 200 });

    expect(row.scrollLeft).toBe(0);
  });

  it('keeps dragging when the pointer leaves the element', () => {
    render(<DraggableRow />);
    const row = screen.getByTestId('row');
    fireEvent.pointerDown(row, { pointerType: 'mouse', button: 0, clientX: 300 });
    fireEvent.pointerMove(row, { pointerType: 'mouse', clientX: 250 });
    fireEvent.pointerLeave(row, { pointerType: 'mouse' });
    fireEvent.pointerMove(row, { pointerType: 'mouse', clientX: 200 });

    expect(row.scrollLeft).toBe(100);
  });
});
