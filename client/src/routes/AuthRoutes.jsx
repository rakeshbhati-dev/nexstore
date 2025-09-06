import React from 'react'
import { Route } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'

function AuthRoutes() {
  return (
    <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Route>
  )
}

export default AuthRoutes