import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const Checkout = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { cartItems, cartTotal, clearCart } = useContext(CartContext)
  const [address, setAddress] = useState({
    fullname: user?.name || '',
    street: '',
    city: '',
    postcode: '',
    country: 'Pakistan',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setAddress({ ...address, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!user) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }

    if (cartItems.length === 0) {
      setError('Cart empty hai')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productid: item._id,
            qty: item.qty,
            price: item.price,
          })),
          totalamount: cartTotal,
          address,
          paymentid: `cod_${Date.now()}`,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Order create nahi ho saka')
      }

      clearCart()
      navigate('/my-orders')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-950">Login Required</h1>
          <p className="mt-2 text-sm text-slate-500">Order place karne ke liye login karein.</p>
          <Link to="/login" state={{ from: '/checkout' }} className="mt-5 inline-flex rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white">
            Login
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Checkout</h1>
        <p className="mt-2 text-sm text-slate-500">Shipping address fill karein.</p>
        {error && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}

        <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          {[
            ['fullname', 'Full name'],
            ['street', 'Street address'],
            ['city', 'City'],
            ['postcode', 'Postcode'],
            ['country', 'Country'],
          ].map(([name, label]) => (
            <label key={name} className={name === 'street' ? 'block sm:col-span-2' : 'block'}>
              <span className="text-sm font-medium text-slate-700">{label}</span>
              <input
                name={name}
                value={address[name]}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
          ))}

          <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">
            <div className="flex justify-between text-sm">
              <span>Total Amount</span>
              <span className="font-bold text-slate-950">PKR {cartTotal.toLocaleString()}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Payment method: Cash on delivery</p>
          </div>

          <button type="submit" disabled={loading} className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:bg-slate-300 sm:col-span-2">
            {loading ? 'Placing order...' : 'Place Order'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Checkout
