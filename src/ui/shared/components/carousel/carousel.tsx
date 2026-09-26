'use client';

import { useRef } from 'react';
import { useDragToScroll } from '@/ui/shared/hooks/use-drag-to-scroll';
import { useScrollProgress } from '@/ui/shared/hooks/use-scroll-progress';
import { StyledProgressLine, StyledProgressThumb, StyledTrack } from './carousel.styles';
import type { ICarouselProps } from './types/carousel';

export const Carousel = ({ children, label }: ICarouselProps): React.JSX.Element => {
  const trackRef = useRef<HTMLUListElement>(null);
  const { visibleRatio, progress } = useScrollProgress(trackRef);
  const dragHandlers = useDragToScroll(trackRef);

  const thumbOffset = progress * ((1 - visibleRatio) / visibleRatio) * 100;

  return (
    <div>
      <StyledTrack ref={trackRef} aria-label={label} {...dragHandlers}>
        {children}
      </StyledTrack>
      {visibleRatio < 1 && (
        <StyledProgressLine aria-hidden="true" data-testid="carousel-progress">
          <StyledProgressThumb style={{ width: `${visibleRatio * 100}%`, transform: `translateX(${thumbOffset}%)` }} />
        </StyledProgressLine>
      )}
    </div>
  );
};
