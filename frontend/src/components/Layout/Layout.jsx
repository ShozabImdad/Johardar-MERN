import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import {Toaster} from 'react-hot-toast'

const Layout = ({children}) => {
  return (
    <div>
      <Header />
      <main>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
