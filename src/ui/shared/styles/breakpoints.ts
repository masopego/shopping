export const BREAKPOINTS = {
  TABLET: 768,
  DESKTOP: 1024,
} as const;

export const MEDIA_QUERIES = {
  TABLET: `(min-width: ${BREAKPOINTS.TABLET}px)`,
  DESKTOP: `(min-width: ${BREAKPOINTS.DESKTOP}px)`,
} as const;
