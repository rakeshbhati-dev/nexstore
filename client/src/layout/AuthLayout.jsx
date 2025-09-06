import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/nexstore-logo.png'

function AuthLayout() {
    return (
        <main className='flex justify-center h-screen items-center'>
            <div className=' w-120 px-10 py-7 border-1 border-base-300 shadow-zinc-500 rounded'>
                <Link to='/'>
                    <div className="logo text-center">
                        <img src={logo} alt="nexstore-logo" className='w-20 mx-auto mb-6' />
                    </div>
                </Link>
                <Outlet />
            </div>
        </main>

    )
}

export default AuthLayout