import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const MyOrders = () => {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/api/order/myorders`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Orders load nahi ho sake')
        }

        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-950">Login Required</h1>
          <p className="mt-2 text-sm text-slate-500">Orders dekhne ke liye login karein.</p>
          <Link to="/login" className="mt-5 inline-flex rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white">
            Login
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-950">My Orders</h1>

        {loading && <p className="mt-6 rounded-lg bg-white p-6 text-slate-600">Orders loading...</p>}
        {error && <p className="mt-6 rounded-lg bg-rose-50 p-6 text-rose-700">{error}</p>}
        {!loading && !error && orders.length === 0 && <p className="mt-6 rounded-lg bg-white p-6 text-slate-600">Abhi koi order nahi hai.</p>}

        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <article key={order._id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">Order #{order._id}</p>
                  <p className="mt-1 text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="w-fit rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.items?.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm text-slate-600">
                    <span>{item.productid?.name || 'Product'} x {item.qty}</span>
                    <span>PKR {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4 text-right font-bold text-slate-950">
                PKR {order.totalamount.toLocaleString()}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default MyOrders
