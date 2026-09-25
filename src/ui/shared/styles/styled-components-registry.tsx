'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

// Collects the styles generated during server rendering and injects them into the HTML,
// so the page is not painted without styles before hydration
export function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  const [styleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styleSheet.getStyleElement();
    styleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return <StyleSheetManager sheet={styleSheet.instance}>{children}</StyleSheetManager>;
}
