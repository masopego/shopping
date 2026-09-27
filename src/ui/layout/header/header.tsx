'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartLink } from '@/ui/features/cart/components/cart-link';
import { LITERALS } from '@/ui/shared/literals';
import { ROUTES } from '@/ui/shared/routes';
import { StyledHeader } from './header.styles';

export const Header = (): React.JSX.Element => {
  const pathname = usePathname();
  const isCartPage = pathname === ROUTES.CART;

  return (
    <StyledHeader>
      <Link href={ROUTES.HOME}>
        <Image src="/logo.png" alt={LITERALS.header.logoAlt} width={77} height={29} priority />
      </Link>
      {!isCartPage && <CartLink />}
    </StyledHeader>
  );
};
