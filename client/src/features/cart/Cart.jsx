import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/CartContextProvider'
import CartItem from './CartItem'
import Button from '../../components/Button'
import { useOrder } from '../../contexts/OrderContextProvider'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContextProvider'
import { deleteCartItem } from '../../services/cart'
import EmptyCart from '../../pages/EmptyCart'

function Cart() {
  const { cartItem,setCartItem } = useCart()
  const {token}=useUser()
  const [SubTotal, setSubTotal] = useState()
  const [totalItem, setTotalItem] = useState()
  const {setOrderItem}=useOrder()
  const navigate=useNavigate()

  function subTotalHandler() {
    if (cartItem.length > 0) {
      const total = cartItem.reduce((acc, item) => acc + item.totalAmount, 0)
      setSubTotal(total)
    }
  }

  function totalItemHandler() {
    const total = cartItem.reduce((acc, item) => acc + item.quantity, 0)
    setTotalItem(total)
  }

  function orderHandler(){
    setOrderItem(cartItem)
    navigate('/checkout')
  }

  async function deleteHandler(id) {
    const filteredCart=cartItem.filter((item)=>item._id!==id)
    try {
      const response=await deleteCartItem(token,id)
      if(response){
        setCartItem(filteredCart)
      }
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    if (cartItem) {
      subTotalHandler(),
        totalItemHandler()
    }

  }, [cartItem])




  if (!cartItem || cartItem.length === 0) {
    return (
      <EmptyCart></EmptyCart>
    )
  }
  return (
    <div className='p-5'>
      <h1 className='font-semibold md:text-lg mb-3'>Shopping Cart</h1>
      <div className='md:flex items-start'>
        <div className='w-full md:w-[70%]'>
          {
            cartItem.map((item) => {
              return (
                <CartItem item={item} key={item._id} onDelete={deleteHandler}></CartItem>
              )
            })
          }
        </div>
        {/* Desktop and Tablet View */}
        <div className='hidden md:block border  border-stone-300 ml-3 p-3 w-[25%]'>
          <h1 className='font-semibold border-b border-stone-400'>Cart Summary</h1>
          <div className='mt-5'>
            <div>
              <h3 className='font-semibold'>No of Items</h3>
              <p>{totalItem}</p>
            </div>
            <div className='mt-2'>
              <h3 className='font-semibold'>SubTotal</h3>
              <p>{SubTotal}</p>
            </div>
            <Button value='Place Order' buttonStyle='mt-5' onClick={orderHandler}></Button>
          </div>
        </div>

        {/* Mobile View */}
        <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-300 shadow-md p-4 z-10'>
          <div className='flex justify-between items-center text-sm font-medium'>
            <span>No of Items</span>
            <span>{totalItem}</span>
          </div>
          <div className='flex justify-between items-center text-sm font-medium mt-1'>
            <span>Subtotal</span>
            <span>{SubTotal}</span>
          </div>
          <Button value='Place Order' buttonStyle='mt-3 w-full' onClick={orderHandler}/>
        </div>
      </div>
    </div>
  )
}

export default Cart