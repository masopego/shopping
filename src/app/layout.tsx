import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CartProvider } from '@/ui/features/cart/state/cart-provider';
import { Header } from '@/ui/layout/header';
import { PageWrapper } from '@/ui/layout/page-wrapper';
import { StyledComponentsRegistry } from '@/ui/shared/styles/styled-components-registry';
import './globals.css';

export const metadata: Metadata = {
  title: 'shopping',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <CartProvider>
            <PageWrapper>
              <Header />
              {children}
            </PageWrapper>
          </CartProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
