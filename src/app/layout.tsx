import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: 'shopping',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
          <div className="app">
            <header>
              <nav>
                <Link href="/">Home</Link>
              </nav>
            </header>
            {children}
          </div>
      </body>
    </html>
  )
}
