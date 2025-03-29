import React from 'react'
import Usernav from './Usernav'
import Slider from './Slider'
import Features from './Features'
import Contact from './Contact'
import About from './About'
import Reviews from './Reviews'
import Footer from './Footer'
import Productlist from './Productlist'

function Home() {
  return (
    <>
      <Usernav />
      <Slider />
      <Productlist />
      <About />
      <Features />
      <Contact />
      <Reviews />
      <Footer />
    </>
  )
}

export default Home
