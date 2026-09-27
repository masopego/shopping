'use client';

import { StyledBagIcon, StyledCartLink } from './cart-link.styles';
import { useCart } from '@/ui/features/cart/state/use-cart';
import { ROUTES } from '@/ui/shared/routes';
import { LITERALS, formatLiteral } from '@/ui/shared/literals';

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <StyledCartLink href={ROUTES.CART} aria-label={formatLiteral(LITERALS.header.cartLink, { count: itemCount })}>
      <StyledBagIcon $hasItems={itemCount > 0} filled={itemCount > 0} />
      <span>{itemCount}</span>
    </StyledCartLink>
  );
}
