import { render, screen } from '@testing-library/react';
import { ProductDetailsMother } from '@/core/domain/models/__mothers__/ProductDetailsMother';
import { ProductSpecifications } from '../product-specifications';

const product = ProductDetailsMother.create();

describe('ProductSpecifications', () => {
  it('shows the section title', () => {
    render(<ProductSpecifications product={product} />);

    expect(screen.getByRole('heading', { name: 'Specifications' })).toBeInTheDocument();
  });

  it('shows a row for the brand, the name, the description and each technical spec', () => {
    render(<ProductSpecifications product={product} />);

    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('shows each spec next to its label', () => {
    render(<ProductSpecifications product={product} />);

    expect(screen.getByRole('row', { name: `Battery ${product.specs.battery}` })).toBeInTheDocument();
  });

  it('shows the description', () => {
    render(<ProductSpecifications product={product} />);

    expect(screen.getByText(product.description)).toBeInTheDocument();
  });
});
