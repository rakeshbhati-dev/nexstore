import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useCart } from '../contexts/CartContextProvider'

function ShoppingIcon() {
    const {cartCount}=useCart()
    return (
        <div className='indicator'>
            <span className="indicator-item indicator-bottom indicator-start badge badge-primary text-xs h-5 w-3">{cartCount}</span>
            <ShoppingBagIcon className='w-7 h-7 mr-2 md:mr-4'></ShoppingBagIcon>
        </div>
    )
}

export default ShoppingIcon