import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductRow({ product,onDelete }) {
    const imageURL = import.meta.env.VITE_IMAGE_API
    const navigate=useNavigate()
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="h-20 w-30 object-contain">
                            <img
                                src={`${imageURL}/product/${product.prodImage}`}
                                alt="Product Image"
                                className='object-contain' />
                        </div>
                    </div>
                    <div className='w-50'>
                        <div className="font-bold truncate ">{product.prodName}</div>
                        <div className="text-sm opacity-50">{product.price}</div>
                    </div>
                </div>
            </td>
            <td >
                {product.subCategory.category.title}
                <br />
                <span className="badge badge-ghost badge-sm">{product.subCategory.title}</span>
            </td>
            <td>
               <div className={`${product.prodStock<20?'badge-error':'badge-success'} badge badge-sm badge-soft align-middle`}>{product.prodStock}</div> 
            </td>
            <td>
                <EyeIcon className='w-5 h-5 inline-block mr-4 cursor-pointer' onClick={()=>navigate(`/admin/products/${product._id}`)}></EyeIcon>
                <PencilIcon className='w-5 h-5 inline-block mr-4 cursor-pointer' onClick={()=>navigate(`/admin/products/update/${product._id}`)}></PencilIcon>
                <TrashIcon className='w-5 h-5 inline-block cursor-pointer' onClick={()=>onDelete(product._id)}></TrashIcon>
            </td>
        </tr>
    )
}

export default ProductRow