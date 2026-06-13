import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const Categories = () => {
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`)

        if (!response.ok) {
          throw new Error('Categories load nahi ho sake')
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

  const categories = useMemo(() => {
    const names = products.map((product) => product.category).filter(Boolean)
    return ['All', ...new Set(names)]
  }, [products])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return products
    }

    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory, products])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Categories
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Browse By Category
          </h1>
        </div>

        {loading && (
          <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
            Categories loading...
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-rose-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="mb-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === category
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default Categories
