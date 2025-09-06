import React from 'react'

function DashboardCard({title,count=0}) {
  return (
    <div className='border-1 border-neutral-300 w-1/2 rounded-lg md:w-1/3 px-5 py-3 text-lg my-3'>
      <h1 className='font-semibold'>{title}</h1>
      <p className='ml-2'>{count}</p>
    </div>
  )
}

export default DashboardCard