import React from 'react'
import { addToCart } from '../../services/cart'
import { useUser } from '../../contexts/UserContextProvider'
import { useParams } from 'react-router-dom'
import { useCart } from '../../contexts/CartContextProvider'
import ProductDetail from './ProductDetail'
import toast from 'react-hot-toast'

function UserProduct() {
    const { id } = useParams()
    const {token}=useUser()
    const {fetchCartItem}=useCart()

    async function addToCartHandler(quantity) {
    try {
      const response=await addToCart(id,quantity,token)
      if(response){
        toast.success("Added to Cart")
        await fetchCartItem()
      }
    } catch (error) {
      toast.error("Unable to add to Cart, try later")
      console.log(error);
    }
  }
  
  return (
    <>
    <ProductDetail isAdmin={false} productId={id} onCart={addToCartHandler}></ProductDetail>
    </>
  )
}

export default UserProduct