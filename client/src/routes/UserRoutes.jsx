import React from 'react'
import { Route } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import HomeLayout from '../layout/HomeLayout'
import Cart from '../features/cart/Cart'
import SubCategoryProduct from '../features/product/SubCategoryProduct'
import Checkout from '../features/order/Checkout'
import UserProduct from '../features/product/UserProduct'
import SearchProduct from '../features/product/SearchProduct'
import UserProtectedRoute from './UserProtectedRoute'
import Profile from '../features/user/Profile'
import EditProfile from '../features/user/EditProfile'
import UpdatePassword from '../features/user/UpdatePassword'

function UserRoutes() {
  return (
    <Route path='/' element={<UserLayout />}>
      <Route index element={<HomeLayout />} />
      <Route path='/product/search' element={<SearchProduct />} />
      <Route path='/product/subcategory/:title' element={<SubCategoryProduct />} />
      <Route path='product/:id' element={<UserProduct />} />

      <Route path='/cart' element={
        <UserProtectedRoute>
          <Cart />
        </UserProtectedRoute>
      } />

      <Route path='/checkout' element={
        <UserProtectedRoute>
          <Checkout />
        </UserProtectedRoute>
      } />

      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/update' element={<EditProfile />} />
      <Route path='/profile/update/password' element={<UpdatePassword />} />
    </Route>
  )
}

export default UserRoutes