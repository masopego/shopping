import { notFound } from 'next/navigation';
import { HttpError } from '@/core/infrastructure/http/httpError';
import { productRepository } from '@/core/infrastructure/repositories/ApiProductRepository';
import { AddToCartProductOverview } from '@/ui/features/cart/components/add-to-cart-product-overview';
import { GoBack } from '@/ui/features/product-detail/components/go-back';
import { ProductDetailLayout } from '@/ui/features/product-detail/components/product-detail-layout';
import { ProductSpecifications } from '@/ui/features/product-detail/components/product-specifications';
import { SimilarProducts } from '@/ui/features/product-detail/components/similar-products';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const getProductDetails = async (id: string) => {
  try {
    return await productRepository.getProductById(id);
  } catch (error) {
    if (error instanceof HttpError && error.isNotFound) notFound();
    throw error;
  }
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductDetails(id);

  return (
    <main>
      <GoBack />
      <ProductDetailLayout
        overview={<AddToCartProductOverview product={product} />}
        specifications={<ProductSpecifications product={product} />}
        similarProducts={<SimilarProducts products={product.similarProducts} />}
      />
    </main>
  );
}
