import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`)

        if (!response.ok) {
          throw new Error('Products load nahi ho sake')
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Our Products
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Latest Products
          </h1>
        </div>

        {loading && (
          <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
            Products loading...
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-rose-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
