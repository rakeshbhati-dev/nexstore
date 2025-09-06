import React from 'react'
import Button from './Button';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const imageUrl = import.meta.env.VITE_IMAGE_API
    return (
        <div className='border-1 border-stone-300 w-1/2 md:w-1/4 lg:w-1/7 rounded p-3'>
            <Link to={`/product/${product._id}`}>
            <div className='h-42 object-center'>
                <img src={`${imageUrl}/product/${product.prodImage}`} alt="" className='object-contain w-full h-full' />
            </div>
            <h1 className='truncate overflow-hidden whitespace-nowrap text-sm text-stone-600 mt-4 w-[90%]'>{product.prodName}</h1>
            <p className='font-semibold'>&#8377;{product.price}</p>
            </Link>
        </div>
    )
}

export default ProductCard