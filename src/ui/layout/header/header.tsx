'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BagIcon } from '@/ui/shared/icons/bag-icon';
import { StyledCartLink, StyledHeader } from './header.styles';
import { ROUTES } from '@/ui/shared/routes';
import { LITERALS, formatLiteral } from '@/ui/shared/literals';

// TOOD remove hardcode products amount
export const Header = (): React.JSX.Element => {
  const pathname = usePathname();
  const isCartPage = pathname === ROUTES.CART;

  return (
    <StyledHeader>
      <Link href={ROUTES.HOME}>
        <Image src="/logo.png" alt={LITERALS.header.logoAlt} width={77} height={29} priority />
      </Link>
      {!isCartPage && (
        <StyledCartLink href={ROUTES.CART} aria-label={formatLiteral(LITERALS.header.cartLink, { count: 0 })}>
          <BagIcon />
          <span>(0)</span>
        </StyledCartLink>
      )}
    </StyledHeader>
  );
};
