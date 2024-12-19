import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Hero from '../components/hero/Hero'
import myVideo from '../assets/Home-main.mp4'
import WhyChoseUs from '../components/whychoseus/WhyCoseUs'
import Trending from '../components/trending/Trending'
import BestSelling from '../components/bestselling/BestSelling'

const Home = () => {
  return (
    <div className='relative'>
      <Header />
      <Hero myVideo= {myVideo} />
      <Trending />
      <BestSelling />
      <WhyChoseUs />
      <h1 className='text-3xl font-bold underline'>Homepage</h1>
      <Footer />
    </div>
  )
}

export default Home
