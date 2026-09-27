'use client';

import Image from 'next/image';
import { useCart } from '@/ui/features/cart/state/use-cart';
import { Button, ButtonVariant } from '@/ui/shared/components/button';
import { LITERALS, formatLiteral } from '@/ui/shared/literals';
import { ROUTES } from '@/ui/shared/routes';
import {
  StyledActions,
  StyledCartView,
  StyledContinueShopping,
  StyledItem,
  StyledItemImage,
  StyledItemInfo,
  StyledItemPrice,
  StyledItems,
  StyledPay,
  StyledRemoveButton,
  StyledTitle,
  StyledTotal,
} from './cart-view.styles';

const formatPrice = (price: number) => formatLiteral(LITERALS.common.price, { price });

export function CartView() {
  const { items, itemCount, total, isReady, removeItem } = useCart();

  if (!isReady) return null;

  const hasItems = items.length > 0;

  return (
    <StyledCartView>
      <StyledTitle>{formatLiteral(LITERALS.cart.title, { count: itemCount })}</StyledTitle>

      {hasItems && (
        <StyledItems>
          {items.map((item) => (
            <StyledItem key={item.id}>
              <StyledItemImage>
                <Image
                  src={item.imageUrl}
                  alt={`${item.brand} ${item.name}`}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 150px"
                  style={{ objectFit: 'contain' }}
                />
              </StyledItemImage>
              <StyledItemInfo>
                <p>{item.name}</p>
                <p>
                  {item.storageCapacity} | {item.colorName}
                </p>
                <StyledItemPrice>{formatPrice(item.price)}</StyledItemPrice>
                {item.quantity > 1 && <p>{formatLiteral(LITERALS.cart.quantity, { quantity: item.quantity })}</p>}
                <StyledRemoveButton
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={formatLiteral(LITERALS.cart.removeItem, { name: item.name })}
                >
                  {LITERALS.cart.remove}
                </StyledRemoveButton>
              </StyledItemInfo>
            </StyledItem>
          ))}
        </StyledItems>
      )}

      <StyledActions>
        {hasItems && (
          <StyledTotal>
            <span>{LITERALS.cart.total}</span>
            <span>{formatPrice(total)}</span>
          </StyledTotal>
        )}
        <StyledContinueShopping $alone={!hasItems}>
          <Button variant={ButtonVariant.SECONDARY} href={ROUTES.HOME} fullWidth>
            {LITERALS.common.continueShopping}
          </Button>
        </StyledContinueShopping>
        {hasItems && (
          <StyledPay>
            <Button type="button" variant={ButtonVariant.PRIMARY} fullWidth>
              {LITERALS.cart.pay}
            </Button>
          </StyledPay>
        )}
      </StyledActions>
    </StyledCartView>
  );
}
