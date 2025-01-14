import React, {useState, useEffect} from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import axios from 'axios'

const AllProducts = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const {data} = await axios.get("http://localhost:5972/api/products/all")
            console.log(data)
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() => {
        getAllProducts()
    }, [])

  return (
    <div className='relative'>
      <Header/>
      <h1 className='text-3xl font-bold underline'>About</h1>
      <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-gray-800 tracking-wide">
            ALL PRODUCTS
          </h2>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-2"></div>
        </div>
        <div> {JSON.stringify(products, null, 4)}</div>
      </div>    
    </section>
      <Footer />
    </div>
  )
}

export default AllProducts