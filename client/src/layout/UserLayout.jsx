import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/UserNavbar'
import { CartContextProvider } from '../contexts/CartContextProvider'
import { OrderContextProvider } from '../contexts/OrderContextProvider'

function UserLayout() {
  return (
    <>
      <CartContextProvider>
        <OrderContextProvider>
          <UserNavbar />
          <Outlet />
        </OrderContextProvider>
      </CartContextProvider>
    </>
  )
}

export default UserLayout