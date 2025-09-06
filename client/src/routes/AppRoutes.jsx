import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import UserRoutes from './UserRoutes'
import AdminRoutes from './AdminRoutes'
import WildCard from '../pages/WildCard'

function AppRoutes() {
  return (
    <Routes>
        {AuthRoutes()}
        {UserRoutes()}
        {AdminRoutes()}
        <Route path='*' element={<WildCard />}></Route>
    </Routes>
  )
}

export default AppRoutes