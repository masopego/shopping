'use client';

import { useRouter } from 'next/navigation';
import type { ProductDetails } from '@/core/domain/models/ProductDetails';
import { createCartItem } from '@/core/domain/services/cartService';
import {
  ProductOverview,
  type ProductConfiguration,
} from '@/ui/features/product-detail/components/product-overview/product-overview';
import { useCart } from '@/ui/features/cart/state/use-cart';
import { ROUTES } from '@/ui/shared/routes';

interface AddToCartProductOverviewProps {
  product: ProductDetails;
}

export const AddToCartProductOverview = ({ product }: AddToCartProductOverviewProps): React.JSX.Element => {
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = ({ storage, color }: ProductConfiguration) => {
    addItem(createCartItem(product, storage, color));
    router.push(ROUTES.CART);
  };

  return <ProductOverview product={product} onAddToCart={handleAddToCart} />;
};
