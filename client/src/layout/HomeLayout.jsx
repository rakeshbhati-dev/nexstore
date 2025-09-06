import React from 'react'
import CategoriesNav from '../components/CategoriesNav'
import Banner from '../components/Banner'
import ProductList from '../features/product/ProductList'

function HomeLayout() {
  return (
    <div>
        <CategoriesNav></CategoriesNav>
        <Banner></Banner>
        <ProductList label="Under 1000" maxPrice="1000"></ProductList>
    </div>
  )
}

export default HomeLayout