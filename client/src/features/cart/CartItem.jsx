import React, { useState } from 'react'
import { updateCart } from '../../services/cart';
import { useUser } from '../../contexts/UserContextProvider';
import { useCart } from '../../contexts/CartContextProvider';

function CartItem({ item,onDelete }) {
    const [quantity, setQuantity] = useState(item.quantity)
    const imageUrl = import.meta.env.VITE_IMAGE_API
    const { token } = useUser()
    const {setCartItem,cartItem}=useCart()

    async function quantityHandling(qty) {
        try {
            if (qty <= 10 && qty>=1) {
                const totalAmt=qty*item.productId.price
                setQuantity(qty)
                const response = await updateCart(item.productId._id, qty, token)
                if(response){
                    const updatedCartItem=cartItem.map((ci)=>ci._id==item._id?{...ci,quantity:qty,totalAmount:totalAmt}:ci)
                    setCartItem(updatedCartItem)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='border border-stone-300 w-full p-3 flex'>
            <div className='h-42 object-center w-1/2 md:w-[30%] border border-stone-100'>
                <img src={`${imageUrl}/product/${item.productId.prodImage}`} alt="" className='object-contain w-full h-full' />
            </div>
            <div className='ml-5 mt-1'>
                <h1 className='text-sm md:text-lg'>{item.productId.prodName}</h1>
                <p className='font-semibold text-lg'>&#8377;{item.productId.price}</p>
                <div className='border border-stone-300 w-1/3 md:w-1/4 h-7 mt-3'>
                    <button className='w-[30%] bg-stone-200 h-full font-semibold' onClick={()=>quantityHandling(quantity-1)}>-</button>
                    <p className='inline-block w-[40%] px-1 text-center font-semibold'>{quantity}</p>
                    <button className='w-[30%] bg-stone-200 h-full font-semibold' onClick={()=>quantityHandling(quantity+1)}>+</button>
                </div>
                <div>
                    <div className="badge badge-neutral badge-outline cursor-pointer hover:bg-black hover:text-white mt-5" role='button' onClick={()=>onDelete(item._id)}>Delete</div>
                </div>
            </div>
        </div>
    )
}

export default CartItem