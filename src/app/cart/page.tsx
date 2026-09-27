import type { Metadata } from 'next';
import { CartView } from '@/ui/features/cart/components/cart-view';
import { LITERALS } from '@/ui/shared/literals';

export const metadata: Metadata = { title: LITERALS.pageTitles.cart };

export default function CartPage() {
  return (
    <main>
      <CartView />
    </main>
  );
}
