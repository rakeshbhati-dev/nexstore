
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import React from 'react'

function CategoryCard({ category,onEdit,onDelete,onNavigate }) {
    return (
        <div className="collapse collapse-arrow bg-base-100 border-base-300 border w-1/2 md:w-1/4 lg:w-1/5 mb-3 text-xs">
            <input type="checkbox" />
            <div className="collapse-title font-semibold">{category.title}</div>
            <div className="collapse-content text-sm">
                <EyeIcon className='w-5 h-5 inline-block mr-5' onClick={()=>onNavigate(category._id)}></EyeIcon>
                <PencilIcon className='w-5 h-5 inline-block mr-5' onClick={()=>onEdit(category)}></PencilIcon>
                <TrashIcon className='w-5 h-5 inline-block' onClick={()=>onDelete(category._id)}></TrashIcon>
            </div>
        </div>
    )
}

export default CategoryCard