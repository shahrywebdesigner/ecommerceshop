import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const getProductImage = (images = []) => {
  const image = Array.isArray(images) ? images[0] : images

  if (!image) {
    return 'https://placehold.co/600x600/f1f5f9/334155?text=Product'
  }

  if (image.startsWith('http')) {
    return image
  }

  if (image.startsWith('/uploads')) {
    return `${API_URL}${image}`
  }

  return `${API_URL}/uploads/${image}`
}

const formatPrice = (price = 0) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price)

const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useContext(CartContext)

  if (!product) {
    return null
  }

  const {
    _id,
    name,
    description,
    price,
    category,
    stock,
    images,
    rating = 0,
    numreviews = 0,
  } = product

  const productUrl = _id ? `/product/${_id}` : '#'
  const isOutOfStock = Number(stock) <= 0

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return
    }

    if (onAddToCart) {
      onAddToCart(product)
      return
    }

    addToCart(product)
  }

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link to={productUrl} className="block" aria-label={`View ${name}`}>
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={getProductImage(images)}
            alt={name || 'Product image'}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {category || 'Product'}
          </span>
          {isOutOfStock && (
            <span className="absolute right-3 top-3 rounded-md bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              Out of stock
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold text-amber-500">*</span>
          <span className="font-medium text-slate-800">{Number(rating).toFixed(1)}</span>
          <span className="text-slate-400">({numreviews} reviews)</span>
        </div>

        <Link to={productUrl}>
          <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-950 transition hover:text-slate-700">
            {name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-slate-950">{formatPrice(price)}</p>
            <p className="text-xs font-medium text-slate-500">
              {isOutOfStock ? 'No stock available' : `${stock} items left`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
