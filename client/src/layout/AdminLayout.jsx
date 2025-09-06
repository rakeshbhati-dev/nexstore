import React from 'react'
import logo from '../assets/nexstore-logo.png'
import { Link, Outlet } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'

function AdminLayout() {
    return (
        <div>
            <header>
                <div className="logo w-full shadow-sm p-1 hidden md:block">
                    <Link to='/'><img src={logo} alt="" className='w-15' /></Link>
                </div>
            </header>
            <div className='flex items-start'>
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout