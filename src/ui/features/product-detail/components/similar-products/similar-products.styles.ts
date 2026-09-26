import styled from 'styled-components';
import { PRODUCT_CARD_SIZE, productCardLines } from '@/ui/features/product/components/product-card/product-card.styles';

export const StyledSimilarProductsItem = styled.li`
  flex: 0 0 min(${PRODUCT_CARD_SIZE}, 85%);
  aspect-ratio: 1;
  ${productCardLines}
`;

export const StyledSimilarProducts = styled.section`
  /* The carousel reaches the right edge of the screen: the space between the content and the edge of
     the page (100cqw is the width of the page) plus the page padding */
  --carousel-bleed-right: calc((100cqw - 100%) / 2 + var(--page-padding, 0px));
`;
