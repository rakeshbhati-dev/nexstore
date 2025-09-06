import React, { createContext, useContext, useState } from 'react'

const OrderContext=createContext()
export function OrderContextProvider({children}) {
    const [orderItem,setOrderItem]=useState([])
    const [address,setAddress]=useState(null)
    const [totalAmount,setTotalAmount]=useState()
  return (
    <OrderContext.Provider value={{orderItem,setOrderItem,address,setAddress,totalAmount,setTotalAmount}}>
        {children}
    </OrderContext.Provider>
  )
}

export const useOrder=()=>useContext(OrderContext)

