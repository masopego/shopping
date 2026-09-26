import { render, screen } from '@testing-library/react';
import { ProductMother } from '@/core/domain/models/__mothers__/ProductMother';
import { ProductCard } from '../product-card';

const product = ProductMother.create({ brand: 'Apple', name: 'iPhone 15 Pro', basePrice: 1219 });

describe('ProductCard', () => {
  it('links to the product detail page', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', `/products/${product.id}`);
  });

  it('shows the brand', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('shows the model', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
  });

  it('shows the price in euros', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('1219 EUR')).toBeInTheDocument();
  });

  it('shows the product image', () => {
    const { container } = render(<ProductCard product={product} />);

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent(product.imageUrl)),
    );
  });

  it('shows the text in uppercase', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole('link')).toHaveStyle({ textTransform: 'uppercase' });
  });
});
