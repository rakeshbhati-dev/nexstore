import React from 'react'
import image from '../assets/NotLogin.jpg'
import { Link } from 'react-router-dom'

function NotLogin() {
  return (
    <>
     <div className='h-[90vh] flex justify-center items-center flex-col'>
        <img src={image} alt="" className='md:w-1/2'/>
        <p className='text-center text-stone-400 text-lg'>It seems like you are not login. Please <Link to='/login' className='text-violet-700'>Login</Link> to continue</p>
    </div>
    </>
  )
}

export default NotLogin