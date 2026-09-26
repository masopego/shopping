import { productRepository } from '@/core/infrastructure/repositories/ApiProductRepository';
import { ProductGrid } from '@/ui/features/product/components/product-grid';
import { ProductSearch } from '@/ui/features/product/components/product-search';

export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: Promise<{ search?: string | string[] }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search.trim() : '';
  const products = await productRepository.getProducts({ search: search || undefined, limit: 20 });

  return (
    <main>
      <ProductSearch search={search} resultsCount={products.length} />
      <ProductGrid products={products} />
    </main>
  );
}
