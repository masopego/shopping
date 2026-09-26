export const ROUTES = {
  HOME: '/',
  HOME_SEARCH: (search: string) => (search ? `/?search=${encodeURIComponent(search)}` : '/'),
  CART: '/cart',
  PRODUCT_DETAIL: (productId: string) => `/products/${encodeURIComponent(productId)}`,
} as const;
