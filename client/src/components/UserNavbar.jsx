import React, { useState } from 'react'
import logo from '../assets/nexstore-logo.png'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Input from './Input'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import { useUser } from '../contexts/UserContextProvider'
import ShoppingIcon from './ShoppingIcon'

function UserNavbar() {
    const { token,setToken,user } = useUser()
    const [search,setSearch]=useState('')
    const navigate=useNavigate()
    function logoutHandler(){
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <nav className='flex justify-between items-center py-2 px-4 border-1 border-stone-300 border-b'>
            <div className='w-12'>
                <Link to='/'><img src={logo} alt="" className='w-full' /></Link>
            </div>
            <div className='w-1/2 flex items-center md:w-1/3'>
                <Input type='search' name='search' id='srch' value={search} placeholder='Search Product' inputStyle='text-sm py-2 px-3 bg-stone-50 mt-3' onChange={(e)=>setSearch(e.target.value)}/>
                <div className='bg-violet-700 px-4 cursor-pointer text-white'>
                    <MagnifyingGlassIcon className='w-5 h-9' onClick={()=>navigate(`/product/search?search=${search}`)}></MagnifyingGlassIcon>
                </div>
            </div>
            <div>
                {
                    token ?
                        <div className='flex'>
                            <Link to='/cart'><ShoppingIcon></ShoppingIcon></Link>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} ><UserCircleIcon className='w-7 h-7'></UserCircleIcon></div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm">
                                    {user?.role=='admin' && <Link to='/admin' className='py-2 hover:text-violet-700 pl-3'>Admin Dashboard</Link>}
                                    <Link className='py-2 hover:text-violet-700 pl-3' to='/profile'>My Profile</Link>
                                    <Link className='py-2 hover:text-violet-700 pl-3'>My Orders</Link>
                                    <li className='py-2 hover:text-violet-700 pl-3 cursor-pointer' onClick={logoutHandler}>Logout</li>
                                </ul>
                            </div>
                        </div> :
                        <div>
                            <Button value='Login' buttonStyle='px-4' onClick={()=>navigate('/login')}></Button>
                        </div>}
            </div>
        </nav>

    )
}

export default UserNavbar