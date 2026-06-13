import React from 'react'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyOrders from './pages/MyOrders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/shop" element={ <Shop/> } />
          <Route path="/categories" element={ <Categories/> } />
          <Route path="/about" element={ <About/> } />
          <Route path="/contact" element={ <Contact/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/register" element={ <Register/> } />
          <Route path="/verify-otp" element={ <VerifyOtp/> } />
          <Route path="/cart" element={ <Cart/> } />
          <Route path="/checkout" element={ <Checkout/> } />
          <Route path="/my-orders" element={ <MyOrders/> } />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
