import { ChevronRightIcon } from '@heroicons/react/16/solid'
import React from 'react'

function ProductItemMob({ product }) {
    const imageURL = import.meta.env.VITE_IMAGE_API
    return (
        <div className='flex border-1 border-neutral-300 p-3 mt-2 items-center h-26 justify-between rounded-md'>
            <div className='w-20'>
                <img src={`${imageURL}/product/${product.prodImage}`} alt="product image" />
            </div>
            <div className='w-60 text-xs ml-3'>
                <h1 className='truncate'>{product.prodName}</h1>
                <p>{product.price}</p>
                <div className={`badge badge-soft text-xs mt-1 ${product.prodStock > 20 ? 'badge-success' : 'badge-error'}`}>{product.prodStock}</div>
            </div>
            <div className='w-15 ml-5'>
                <ChevronRightIcon className='w-5 h-5 inline-block' />
            </div>
        </div>
    )
}

export default ProductItemMob