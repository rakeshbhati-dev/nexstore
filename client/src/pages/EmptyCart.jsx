import React from 'react'
import image from '../assets/Empty-Cart.jpg'
import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <>
     <div className='h-[90vh] flex justify-center items-center flex-col'>
        <img src={image} alt="" className='md:w-1/3'/>
        <p className='text-stone-400 text-lg'>Your Cart is Empty.</p>
        <Link to='/' className='font-semibold text-violet-700'>Start Shopping</Link>
    </div>
    </>
  )
}

export default EmptyCart