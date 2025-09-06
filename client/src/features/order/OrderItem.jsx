import React from 'react'

function OrderItem({item}) {
    const imageUrl=import.meta.env.VITE_IMAGE_API
  return (
    <div className='border border-stone-300 mb-2 flex items-center justify-between px-4 py-2'>
        <div className='w-1/4 h-20 object-center'>
            <img src={`${imageUrl}/product/${item.productId.prodImage}`} alt="" className='object-contain w-full h-full'/>
        </div>
        <div className='w-[50%] text-sm ml-3'>
            <h3 className=' truncate '>{item.productId.prodName}</h3>
            <p className='text-stone-400'>{item.productId.price} x {item.quantity}</p>
        </div>
        <div>
            <h3 className='font-semibold text-lg'>&#8377;{item.totalAmount}</h3>
        </div>
    </div>
  )
}

export default OrderItem