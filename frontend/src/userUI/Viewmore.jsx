import React from 'react'
import Footer from './Footer'
import Productlist from './Productlist'
import Pagination from './Pagination'
import Nav from './Nav'
import Filter from './Filter'

function Viewmore() {
  return (
    <>
      <Nav />
      <Filter />
      <Productlist />
      <Footer />
    </>
  )
}

export default Viewmore
