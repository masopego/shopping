import { render, screen } from '@testing-library/react';
import { mockScrollDimensions } from '@/ui/shared/hooks/__mocks__/scroll-dimensions';
import { Carousel } from '../carousel';

const renderCarousel = () =>
  render(
    <Carousel label="Similar items">
      <li>First</li>
      <li>Second</li>
    </Carousel>,
  );

describe('Carousel', () => {
  it('renders its items in a list with the given label', () => {
    renderCarousel();

    expect(screen.getByRole('list', { name: 'Similar items' })).toBeInTheDocument();
  });

  it('renders all its items', () => {
    renderCarousel();

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('shows the progress line when the items do not fit', () => {
    mockScrollDimensions({ scrollWidth: 1000, clientWidth: 250 });
    renderCarousel();

    expect(screen.getByTestId('carousel-progress')).toBeInTheDocument();
  });

  it('hides the progress line when all the items fit', () => {
    mockScrollDimensions({ scrollWidth: 500, clientWidth: 500 });
    renderCarousel();

    expect(screen.queryByTestId('carousel-progress')).not.toBeInTheDocument();
  });

  it('makes the progress thumb as wide as the visible share of the items', () => {
    mockScrollDimensions({ scrollWidth: 1000, clientWidth: 250 });
    renderCarousel();

    expect(screen.getByTestId('carousel-progress').firstElementChild).toHaveStyle({ width: '25%' });
  });

  it('hides the progress line from assistive technologies', () => {
    mockScrollDimensions({ scrollWidth: 1000, clientWidth: 250 });
    renderCarousel();

    expect(screen.getByTestId('carousel-progress')).toHaveAttribute('aria-hidden', 'true');
  });
});
