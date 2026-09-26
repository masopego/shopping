import { productRepository } from '@/core/infrastructure/repositories/ApiProductRepository';
import { ProductGrid } from '@/ui/features/product/components/product-grid';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await productRepository.getProducts({ limit: 20 });

  return (
    <main>
      <h1>Phones</h1>
      <ProductGrid products={products} />
    </main>
  );
}
