import { notFound } from 'next/navigation'
import { HttpError } from '@/core/infrastructure/http/httpError'
import { productRepository } from '@/core/infrastructure/repositories/ApiProductRepository'

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

const getProductDetails = async (id: string) => {
  try {
    return await productRepository.getProductById(id)
  } catch (error) {
    if (error instanceof HttpError && error.isNotFound) notFound()
    throw error
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = await getProductDetails(id)

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.brand}</p>
      <p>{product.description}</p>

    </main>
  )
}
