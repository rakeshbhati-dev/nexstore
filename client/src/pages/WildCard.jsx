import React from 'react'
import image from '../assets/404.jpg'
import { Link } from 'react-router-dom'
function WildCard() {
  return (
    <div className='h-[90vh] flex justify-center items-center flex-col'>
        <img src={image} alt="" className='md:w-1/3'/>
        <p className='text-stone-400 text-lg'>The page you are looking for doesn't exist. </p>
        <Link to='/' className='font-semibold text-violet-700'>Go to Nexstore.</Link>
    </div>
  )
}

export default WildCard