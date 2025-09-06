import React from 'react'
import Button from '../../components/Button'
import { useUser } from '../../contexts/UserContextProvider'
import { deleteUser } from '../../services/user'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Profile() {
  const {user,loading,token,setUser,setToken}=useUser()
  const navigate=useNavigate()
  if (loading) {
    return <span className="loading loading-spinner loading-xs"></span>
  }

  if(!user){
    return <h1>No user found</h1>
  }

  async function deleteHandler(){
    const canDelete=confirm("Do you want to delete Account?")
    if(canDelete){
      try {
        const response=await deleteUser(token,user._id)
        setUser(null)
        setToken(null)
        toast.success("Account Deleted Successfully")
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className='py-3 px-5'>
    <header className='md:flex justify-between items-center mb-4'>
      <h1 className='font-semibold text-xl'>My Profile</h1>
      <Link to='update' className='text-violet-700'>Edit Profile</Link>
    </header>
    <main className='border border-stone-300 mt-3 px-5 py-4'>
      <div className='flex mb-4'>
        <h3 className='md:w-[20%] w-[50%] font-semibold'>Username</h3>
        <p>{user.username}</p>
      </div>
      <div className='flex mb-4'>
        <h3 className='md:w-[20%]  w-[50%] font-semibold'>Email ID</h3>
        <p>{user.email}</p>
      </div>
      <div className='flex mb-4'>
        <h3 className='md:w-[20%]  w-[50%] font-semibold'>Mobile No</h3>
        <p>{user.mobile}</p>
      </div>
      <div className='md:w-[15%] w-[40%] mt-5'>
        <Button value='Delete Account' buttonStyle='text-sm' onClick={deleteHandler}></Button>
      </div>
    </main>
    </div>
  )
}

export default Profile