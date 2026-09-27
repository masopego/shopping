import { render, screen } from '@testing-library/react';
import { ProductMother } from '@/core/domain/models/__mothers__/ProductMother';
import { SimilarProducts } from '../similar-products';

const products = [ProductMother.create({ id: 'a' }), ProductMother.create({ id: 'b' })];

describe('SimilarProducts', () => {
  it('shows the section title', () => {
    render(<SimilarProducts products={products} />);

    expect(screen.getByRole('heading', { name: 'Similar items' })).toBeInTheDocument();
  });

  it('shows a card for each similar product', () => {
    render(<SimilarProducts products={products} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('links each card to its product detail', () => {
    render(<SimilarProducts products={[ProductMother.create({ id: 'GPX-8A' })]} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/products/GPX-8A');
  });

  it('renders nothing when there are no similar products', () => {
    const { container } = render(<SimilarProducts products={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
