import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from './UserContextProvider'
import { fetchCart } from '../services/cart'

const CartContext = createContext()
export function CartContextProvider({ children }) {

  const { token } = useUser()
  const [cartCount, setCartCount] = useState(0)
  const [cartItem,setCartItem]=useState(null)
  const [loading,setLoading]=useState(true)

  async function fetchCartItem() {
    try {
      const response = await fetchCart(token)
      setCartCount(response.cart.cartItem.length);
      setCartItem(response.cart.cartItem);
    } catch (error) {
      setCartItem(null)
      setCartCount(0)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(token){
      fetchCartItem()
    }
    else{
      setLoading(false)
    }
  }, [])
  return (
    <CartContext.Provider value={{ cartCount, setCartCount,fetchCartItem,cartItem,setCartItem,loading }}>
      {children}
    </CartContext.Provider>
  )
} 

export const useCart=()=>useContext(CartContext)
