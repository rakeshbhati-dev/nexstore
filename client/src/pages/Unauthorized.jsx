import React from 'react'
import image from '../assets/Unauthorized2.jpg'
import { Link } from 'react-router-dom'
function Unauthorized() {
  return (
    <div className='h-[90vh] flex justify-center items-center flex-col'>
        <img src={image} alt="" className='md:w-1/3'/>
        <p className='text-stone-400 text-lg'>Sorry, you do not have access to it.</p>
        <Link to='/' className='font-semibold text-violet-700'>Go to Home</Link>
    </div>
  )
}

export default Unauthorized