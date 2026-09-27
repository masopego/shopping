import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CartProvider } from '@/ui/features/cart/state/cart-provider';
import { Header } from '@/ui/layout/header';
import { PageTransition } from '@/ui/layout/page-transition';
import { PageWrapper } from '@/ui/layout/page-wrapper';
import { LITERALS } from '@/ui/shared/literals';
import { StyledComponentsRegistry } from '@/ui/shared/styles/styled-components-registry';
import './globals.css';

export const metadata: Metadata = {
  title: { template: LITERALS.pageTitles.template, default: LITERALS.pageTitles.default },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <CartProvider>
            <PageWrapper>
              <Header />
              <PageTransition>{children}</PageTransition>
            </PageWrapper>
          </CartProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
