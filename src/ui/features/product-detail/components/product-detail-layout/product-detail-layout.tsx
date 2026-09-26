'use client';

import type { ReactNode } from 'react';
import {
  StyledProductDetailLayout,
  StyledSimilarProductsSlot,
  StyledSpecificationsSlot,
} from './product-detail-layout.styles';

interface ProductDetailLayoutProps {
  overview: ReactNode;
  specifications: ReactNode;
  similarProducts: ReactNode;
}

export const ProductDetailLayout = ({
  overview,
  specifications,
  similarProducts,
}: ProductDetailLayoutProps): React.JSX.Element => (
  <StyledProductDetailLayout>
    {overview}
    <StyledSpecificationsSlot>{specifications}</StyledSpecificationsSlot>
    <StyledSimilarProductsSlot>{similarProducts}</StyledSimilarProductsSlot>
  </StyledProductDetailLayout>
);
