import React, { useEffect, useState } from 'react'
import { fetchDashboardStats } from '../../services/dashboard'
import { useUser } from '../../contexts/UserContextProvider'
import DashboardCard from '../../components/DashboardCard'

function Dashboard() {
  const [productCount, setProductCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const {token}=useUser()

  async function fetchHandler() {
    try {
      const response=await fetchDashboardStats(token)
      setProductCount(response.totalProduct)
      setOrderCount(response.totalOrder)
      setUserCount(response.totalUser)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchHandler()
  }, [])
  return (
    <div className='px-3 py-3 w-full'>
      <h1 className='font-semibold'>Dashboard</h1>
      <div className='flex flex-wrap '>
        <DashboardCard title='Total Product' count={productCount} />
        <DashboardCard title='Total Customer' count={userCount} />
        <DashboardCard title='Total Order' count={orderCount} />
      </div>
    </div>
  )
}

export default Dashboard