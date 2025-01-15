import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'
import PrivateRoute from './components/routes/PrivateRoute'
import AdminRoute from './components/routes/AdminRoute'
// import AdminDashboard from './pages/admin/AdminDashboard'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/users/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AllProducts from './pages/AllProducts'
import AdminProducts from './pages/admin/AdminProducts'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCategory from './pages/admin/AdminCategory'
import AdminSubCategory from './pages/admin/AdminSubCategory'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/all-products" element={<AllProducts />} />

        
        {/* Protected User Routes */}
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} /> */}
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="subcategories" element={<AdminSubCategory />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
