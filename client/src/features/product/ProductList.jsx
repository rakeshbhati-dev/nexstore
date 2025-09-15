import React, { useEffect, useState } from 'react'
import { fetchProductUnder } from '../../services/product'
import ProductCard from '../../components/ProductCard';
import { Link } from 'react-router-dom';

function ProductList({label,maxPrice,subCategory}) {

  const [products,setProducts]=useState([])

 async function fetchProductUnderHandler(){
  try {
    const response=await fetchProductUnder(maxPrice,1,6)
    setProducts(response.product);
  } catch (error) {
    console.log(error);
  }
  }

  useEffect(()=>{
    if(maxPrice){
      fetchProductUnderHandler()
    }
  },[label,maxPrice])

  return (
    <>
    {
      products.length>0 && 
      <div className='py-3 px-3'>
        <h1 className='font-semibold md:text-lg mb-3'>{label}</h1>
        <div className='flex flex-wrap justify-between'>
          {
            products.map((prod)=>{
              return(
                <ProductCard product={prod} key={prod._id}></ProductCard>
              )
            })
          }
        </div>
      </div>
    }
    </>
  )
}

export default ProductList