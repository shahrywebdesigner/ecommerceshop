import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const getImageUrl = (images = []) => {
  const image = Array.isArray(images) ? images[0] : images

  if (!image) {
    return 'https://placehold.co/200x200/f1f5f9/334155?text=Product'
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

const Cart = () => {
  const { cartItems, cartTotal, updateQty, removeFromCart } = useContext(CartContext)

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-950">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 text-center">
            <p className="text-slate-600">Cart empty hai.</p>
            <Link
              to="/shop"
              className="mt-4 inline-flex rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={getImageUrl(item.images)}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-slate-950">{item.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{formatPrice(item.price)}</p>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.qty}
                    onChange={(event) => updateQty(item._id, event.target.value)}
                    className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromCart(item._id)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-950">Order Summary</h2>
              <div className="mt-4 flex justify-between text-sm text-slate-600">
                <span>Total</span>
                <span className="font-bold text-slate-950">{formatPrice(cartTotal)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-6 block rounded-lg bg-slate-950 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800"
              >
                Checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}

export default Cart
