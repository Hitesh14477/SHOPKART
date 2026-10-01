import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Landing from './pages/Landing'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Wishlist from './pages/WishList.jsx'
import { WishlistProvider } from './context/wishlistContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './pages/Profile.jsx'



function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
         <CartProvider>
        <Routes>
          <Route path='/' element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><SignUp /> </PublicRoute>} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path='/products/:id' element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path='/wishlist' element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
              <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        </Routes>
        </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
