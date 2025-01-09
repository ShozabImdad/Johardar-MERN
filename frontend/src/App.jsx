import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'

const App = () => {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/about" element = {<About />} />
      <Route path = "/contact" element = {<Contact />} />
      <Route path = "/register" element = {<SignupPage />} />
      <Route path = "/login" element = {<LoginPage />} />
      <Route path = "/*" element = {<Home />} />
    </Routes>
    </>
  )
}

export default App
