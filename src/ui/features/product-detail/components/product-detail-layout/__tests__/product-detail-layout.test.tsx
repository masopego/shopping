import { render, screen } from '@testing-library/react';
import { ProductDetailLayout } from '../product-detail-layout';

const renderLayout = () =>
  render(
    <ProductDetailLayout
      overview={<p>Overview</p>}
      specifications={<p>Specifications</p>}
      similarProducts={<p>Similar products</p>}
    />,
  );

describe('ProductDetailLayout', () => {
  it('renders the overview', () => {
    renderLayout();

    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders the specifications', () => {
    renderLayout();

    expect(screen.getByText('Specifications')).toBeInTheDocument();
  });

  it('renders the similar products', () => {
    renderLayout();

    expect(screen.getByText('Similar products')).toBeInTheDocument();
  });

  it('renders the sections in order', () => {
    const { container } = renderLayout();

    expect(container.textContent).toBe('OverviewSpecificationsSimilar products');
  });
});
