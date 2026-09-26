'use client';

import { useRef, type MouseEvent, type PointerEvent, type RefObject } from 'react';

const DRAG_THRESHOLD_PX = 5;

interface DragState {
  startX: number;
  startScrollLeft: number;
  hasDragged: boolean;
}

export const useDragToScroll = <T extends HTMLElement>(ref: RefObject<T | null>) => {
  const dragRef = useRef<DragState | null>(null);
  const hasDraggedRef = useRef(false);

  const onPointerDown = (event: PointerEvent<T>) => {
    const element = ref.current;
    if (!element || event.pointerType !== 'mouse' || event.button !== 0) return;

    dragRef.current = { startX: event.clientX, startScrollLeft: element.scrollLeft, hasDragged: false };
    hasDraggedRef.current = false;
  };

  const onPointerMove = (event: PointerEvent<T>) => {
    const element = ref.current;
    const drag = dragRef.current;
    if (!element || !drag) return;

    const distance = event.clientX - drag.startX;
    if (!drag.hasDragged && Math.abs(distance) < DRAG_THRESHOLD_PX) return;

    if (!drag.hasDragged) {
      drag.hasDragged = true;
      element.setPointerCapture?.(event.pointerId);
      element.style.scrollSnapType = 'none';
    }
    element.scrollLeft = drag.startScrollLeft - distance;
  };

  const endDrag = () => {
    const element = ref.current;
    hasDraggedRef.current = dragRef.current?.hasDragged ?? false;
    dragRef.current = null;
    if (element) element.style.scrollSnapType = '';
  };

  const onClickCapture = (event: MouseEvent<T>) => {
    if (!hasDraggedRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    hasDraggedRef.current = false;
  };

  const onDragStart = (event: MouseEvent<T>) => event.preventDefault();

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture,
    onDragStart,
  };
};
