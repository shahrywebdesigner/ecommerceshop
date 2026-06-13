import React, { useEffect, useMemo, useState } from 'react'
import { CartContext } from './CartContext'

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('Cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item._id === product._id)

      if (existingItem) {
        return items.map((item) =>
          item._id === product._id
            ? { ...item, qty: Math.min(item.qty + 1, Number(product.stock) || item.qty + 1) }
            : item,
        )
      }

      return [...items, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item._id !== productId))
  }

  const updateQty = (productId, qty) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === productId
          ? { ...item, qty: Math.max(1, Math.min(Number(qty), Number(item.stock) || Number(qty))) }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems],
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.qty, 0),
    [cartItems],
  )

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
