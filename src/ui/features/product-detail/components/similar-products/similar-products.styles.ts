import styled from 'styled-components';
import { PRODUCT_CARD_SIZE, productCardLines } from '@/ui/features/product/components/product-card/product-card.styles';

export const StyledSimilarProductsItem = styled.li`
  flex: 0 0 min(${PRODUCT_CARD_SIZE}, 85%);
  aspect-ratio: 1;
  ${productCardLines}
`;

export const StyledSimilarProducts = styled.section`
  --carousel-bleed: calc((100cqw - min(var(--content-max-width, 100cqw), 100cqw)) / 2 + var(--page-padding, 0px));
`;
