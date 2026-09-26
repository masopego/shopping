'use client';

import type { Product } from '@/core/domain/models/Product';
import { ProductCard } from '../product-card';
import { StyledProductGrid, StyledProductGridItem } from './product-grid.styles';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps): React.JSX.Element | null => {
  if (products.length === 0) return null;

  return (
    <StyledProductGrid>
      {products.map((product) => (
        <StyledProductGridItem key={`${product.id}-product`}>
          <ProductCard product={product} />
        </StyledProductGridItem>
      ))}
    </StyledProductGrid>
  );
};
