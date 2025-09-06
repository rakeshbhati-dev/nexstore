import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { deleteProduct, fetchAllProduct } from '../../services/product'
import ProductRow from '../../components/ProductRow'
import ProductItemMob from '../../components/ProductItemMob'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContextProvider'
import toast from 'react-hot-toast'

function Products() {
  const [productList,setProductList]=useState([])
  const navigate=useNavigate()
  const {token}=useUser()
  async function fetchProductHandler() {
    try {
      const response=await fetchAllProduct(1,30)
      setProductList(response.product);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProductHandler(id) {
    try {
      const filteredProduct=productList.filter((product)=>product._id!==id)
      const response=await deleteProduct(token,id)
      if(response){
        toast.success("Product Deleted Successfully")
        setProductList(filteredProduct)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchProductHandler()
  },[])

  return (
    <div className='p-3 w-full mb-20'>
      <header className='flex justify-between items-center font-semibold'>
        <h1>Products</h1>
        <span className='md:hidden text-violet-500' role='button'>Add Product</span>
      </header>
      <div className='w-[10%] mt-5 hidden md:block'>
        <Button value='+ Add Product' buttonStyle='text-sm font-semibold rounded-lg' onClick={()=>navigate('/admin/products/add')}></Button>
      </div>
      
      {productList.length>0 && 
      <div>
        <div className='overflow-x-auto hidden md:block'>
          <table className='table text-center'>
            <thead>
                  <tr className=''>
                    <th className='text-justify'>Name</th>
                    <th>Categories</th>
                    <th>Stock</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productList.map((product)=>{
                      return(
                        <ProductRow product={product} onDelete={deleteProductHandler}></ProductRow>
                      )
                    })
                  }
                </tbody>
          </table>
        </div>
        <div className='mt-5 md:hidden'>
          {
            productList.map((product)=>{
              return(
                <Link to={`/admin/products/${product._id}`}><ProductItemMob product={product} /></Link>
              )
            })
          }
        </div>
      </div>
      }
    </div>
  )
}

export default Products