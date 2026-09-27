'use client';

import type { Product } from '@/core/domain/models/Product';
import { ProductCard } from '@/ui/features/product/components/product-card';
import { Carousel } from '@/ui/shared/components/carousel';
import { LITERALS } from '@/ui/shared/literals';
import { StyledSectionTitle } from '../../styles/section-title.styles';
import { StyledSimilarProducts, StyledSimilarProductsItem } from './similar-products.styles';

interface SimilarProductsProps {
  products: Product[];
}

export const SimilarProducts = ({ products }: SimilarProductsProps): React.JSX.Element | null => {
  if (products.length === 0) return null;

  return (
    <StyledSimilarProducts>
      <StyledSectionTitle>{LITERALS.productDetail.similarItemsTitle}</StyledSectionTitle>
      <Carousel label={LITERALS.productDetail.similarItemsTitle}>
        {products.map((product) => (
          <StyledSimilarProductsItem key={product.id}>
            <ProductCard product={product} />
          </StyledSimilarProductsItem>
        ))}
      </Carousel>
    </StyledSimilarProducts>
  );
};
