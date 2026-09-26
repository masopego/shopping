import { render, screen } from '@testing-library/react';
import { ProductMother } from '@/core/domain/models/__mothers__/ProductMother';
import { ProductGrid } from '../product-grid';

describe('ProductGrid', () => {
  it('renders a card for each product', () => {
    const products = [ProductMother.create({ id: 'a' }), ProductMother.create({ id: 'b' })];
    render(<ProductGrid products={products} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders an empty list when there are no products', () => {
    render(<ProductGrid products={[]} />);

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
