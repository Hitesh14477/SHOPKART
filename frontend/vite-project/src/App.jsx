import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Landing from './pages/Landing'
import Home from './pages/Home'
import { AuthProvider } from './Context/AuthContext.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'



function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><SignUp /> </PublicRoute>} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path='/products/:id' element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
