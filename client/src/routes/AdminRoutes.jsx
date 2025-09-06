import React from 'react'
import { Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import Dashboard from '../features/admin/Dashboard'
import Categories from '../features/admin/Categories'
import SubCategories from '../features/admin/SubCategories'
import Products from '../features/admin/Products'
import AdminProduct from '../features/product/AdminProduct'
import AddProduct from '../features/product/AddProduct'
import UpdateProduct from '../features/product/UpdateProduct'
import AdminProtectedRoutes from './AdminProtectedRoutes'

function AdminRoutes() {
  return (
    <Route path='/admin' element={
      <AdminProtectedRoutes>
        <AdminLayout />
      </AdminProtectedRoutes>
    }>
      <Route index element={<Dashboard />} />
      <Route path='categories' element={<Categories />} />
      <Route path='subcategories' element={<SubCategories />} />
      <Route path='products' element={<Products />} />
      <Route path='products/add' element={<AddProduct />} />
      <Route path='products/update/:id' element={<UpdateProduct />} />
      <Route path='products/:id' element={<AdminProduct />} />
    </Route>
  )
}

export default AdminRoutes