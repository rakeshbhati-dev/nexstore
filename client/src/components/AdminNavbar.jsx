import { ChartPieIcon, GiftIcon, Square3Stack3DIcon, Squares2X2Icon, UserGroupIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminNavbar() {
  return (
    <nav className='border-r-1 border-neutral-200 h-[90vh] py-1 md:min-w-[200px] '>
      <ul className='hidden md:block mediumDevice'>
        <NavLink to="/admin" end
          className={({ isActive }) => `px-3 py-2 mb-2 block ${isActive ? 'bg-[#5e17eb] text-white' : 'text-gray-700'}`}>
          Dashboard
        </NavLink>
        <NavLink to="products"
          className={({ isActive }) => `px-3 py-2 mb-2 block ${isActive ? 'bg-[#5e17eb] text-white' : 'text-gray-700'}`}>
          Products
        </NavLink>
        <NavLink to="categories"
          className={({ isActive }) => `px-3 py-2 mb-2 block ${isActive ? 'bg-[#5e17eb] text-white' : 'text-gray-700'}`}>
          Categories
        </NavLink>
        <NavLink to="subcategories"
          className={({ isActive }) => `px-3 py-2 mb-2 block ${isActive ? 'bg-[#5e17eb] text-white' : 'text-gray-700'}`}>
          Sub Categories
        </NavLink>
        <NavLink to="users"
          className={({ isActive }) => `px-3 py-2 mb-2 block ${isActive ? 'bg-[#5e17eb] text-white' : 'text-gray-700'}`}>
          Users
        </NavLink>

      </ul>

      <div className="block sm:hidden fixed bottom-0 left-0 right-0 bg-white z-50 px-4 py-3">
        <div className='flex justify-between text-center text-xs '>
          
          <NavLink to="/admin" end
            className={({ isActive }) =>
              `${isActive ? 'text-violet-400' : 'text-gray-700'} flex flex-col items-center`
            }
          >
            <Squares2X2Icon className='w-5 h-5 text-center'></Squares2X2Icon> Dashboard
          </NavLink>
          <NavLink to='products'
            className={({ isActive }) => `${isActive ? 'text-violet-400' : 'text-gray-700'} flex flex-col items-center`}>
            <GiftIcon className='w-5 h-5'></GiftIcon>Product
          </NavLink>
          <NavLink to='categories'
            className={({ isActive }) => `${isActive ? 'text-violet-400' : 'text-gray-700'} flex flex-col items-center`}>
            <Square3Stack3DIcon className='w-5 h-5'></Square3Stack3DIcon>Categories
          </NavLink>
          <NavLink to='users'
            className={({ isActive }) => `${isActive ? 'text-violet-400' : 'text-gray-700'} flex flex-col items-center`}>
            <UserGroupIcon className='w-5 h-5'></UserGroupIcon> Users
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar