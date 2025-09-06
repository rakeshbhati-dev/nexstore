import React, { useEffect, useState } from 'react'
import { fetchParticularProduct } from '../../services/product'
import Button from '../../components/Button'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { ArrowUpLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

function ProductDetail({ isAdmin = false, productId, onCart }) {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const imageUrl = import.meta.env.VITE_IMAGE_API
  const navigate=useNavigate()

  async function fetchProductHandler() {
    try {
      const response = await fetchParticularProduct(productId)
      setProduct(response.product)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProductHandler()
  }, [productId])
  return (
    <>

      {
        product &&
        <div className='px-4 py-7 pb-30 min-h-[90vh]'>
          {isAdmin && 
          <header className='md:hidden mb-4 font-semibold'>
            <h1><ArrowUpLeftIcon className='inline-block w-5 h-5' />All Products</h1>
          </header>
          }
          <div className='flex flex-col md:flex-row md:items-center'>
            <div className='w-full md:w-1/2 max-h-[80vh] border border-stone-200'>
              <img
                src={`${imageUrl}/product/${product?.prodImage}`}
                alt={product?.prodName || "Product image"}
                className='w-full max-h-[70vh] object-contain'
              />
            </div>
            <div className='mt-4 md:mt-0 md:ml-6 w-full md:w-1/3'>
              <div>
                <h1 className='md:text-xl lg:text-2xl'>
                  {product.prodName}
                </h1>
                <p className='font-semibold md:text-xl lg:text-3xl mt-1'>&#8377;{product.price}</p>
              </div>

              {
                !isAdmin?
                <div>
                <div className='border border-stone-300 w-1/4 h-7 mt-3'>
                  <button className='w-[30%] bg-stone-200 h-full font-semibold' onClick={() => setQuantity((prev) => prev > 1 ? prev - 1 : 1)}>-</button>
                  <p className='inline-block w-[40%] px-1 text-center'>{quantity}</p>
                  <button className='w-[30%] bg-stone-200 h-full font-semibold' onClick={() => setQuantity((prev) => prev < 10 ? prev + 1 : 10)}>+</button>
                </div>

                <div className='w-full md:w-1/2 mt-7'>
                  <Button value='Add to Cart' buttonStyle='rounded-md font-semibold' onClick={() => onCart(quantity)}></Button>
                </div>
              </div>:
              <div>
                <div className='mt-4'>
                  <h3 className='font-semibold text-lg'>Stock</h3>
                  <p className={`border inline-block px-4 py-1 text-white ${product.prodStock>20?'bg-success border-success':'bg-error border-error'} rounded-sm`}>{product.prodStock}</p>
                </div>
                <div className='md:block mt-5'>
                  <button className='border cursor-pointer px-3 py-2 bg-amber-400 text-white mr-3' onClick={()=>navigate(`/admin/products/update/${product._id}`)}>{<PencilIcon className='w-5 h-5 inline-block mr-2' />}Edit</button>
                  <button className='border px-3 py-2 bg-error text-white' >{<TrashIcon className='w-5 h-5 inline-block mr-2' />}Delete</button>
                </div>
              </div>
              }
            </div>
          </div>
          <div className='mt-5 mb-3'>
            <h3 className='font-semibold'>Description</h3>
            <p className='mt-2'>
              {product.description}
            </p>
          </div>
        </div>
      }
    </>
  )
}

export default ProductDetail