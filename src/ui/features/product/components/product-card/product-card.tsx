'use client';

import Image from 'next/image';
import type { Product } from '@/core/domain/models/Product';
import { ROUTES } from '@/ui/shared/routes';
import { StyledBrand, StyledImageWrapper, StyledInfoRow, StyledProductCard } from './product-card.styles';
import { LITERALS, formatLiteral } from '@/ui/shared/literals';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps): React.JSX.Element => {
  return (
    <StyledProductCard href={ROUTES.PRODUCT_DETAIL(product.id)}>
      <StyledImageWrapper>
        <Image
          src={product.imageUrl}
          alt=""
          fill
          sizes="(min-width: 768px) 344px, 100vw"
          style={{ objectFit: 'contain' }}
        />
      </StyledImageWrapper>
      <StyledBrand>{product.brand}</StyledBrand>
      <StyledInfoRow>
        <span>{product.name}</span>
        <span>{formatLiteral(LITERALS.common.price, { price: product.basePrice })}</span>
      </StyledInfoRow>
    </StyledProductCard>
  );
};
