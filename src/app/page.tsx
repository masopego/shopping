import Link from 'next/link'
import { productRepository } from '@/core/infrastructure/repositories/ApiProductRepository'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const products = await productRepository.getProducts({ limit: 20 })

  return (
    <main>
      <h1>Phones</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
