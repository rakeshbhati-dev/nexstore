import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useUser } from '../../contexts/UserContextProvider'
import { textValidation } from '../../utils/textValidation'
import { updateUser } from '../../services/user'
import { useNavigate } from 'react-router-dom'

function EditProfile() {
    const [userData,setUserData]=useState({
        username:"",
        email:"",
        mobile:""
    })

    const {user,loading,token,setUser}=useUser()
    const [errorMessages,setErrorMessages]=useState({})
    const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobPattern = /^([7-9]{1,1})+([0-9]{9,9})$/
    const navigate=useNavigate()

    function isValidate() {
            let err = {}
            if (textValidation(userData.username, 'Username', '', 3)) err.nameError = textValidation(userData.username, 'Username', '', 3)
            if (textValidation(userData.email, 'Email ID', mailPattern, 10)) err.mailError = textValidation(userData.email, 'Email ID', mailPattern, 10)
            if (textValidation(userData.mobile, 'Mobile Number', mobPattern, 10)) err.mobError = textValidation(userData.mobile, 'Mobile Number', mobPattern, 10)
            setErrorMessages(err)
            if (Object.keys(err).length > 0) {
                return false
            }
            else {
                return true
            }
        }

    function inputHandler(e){
        const {name,value}=e.target
        setUserData((prev)=>({...prev,[name]:value}))
    }

    async function submitHandler(e){
        e.preventDefault()
        if(isValidate()){
            try {
                const response=await updateUser(token,user._id,userData)
                if(response){
                    setUser(response.user)
                    navigate('/profile')
                }  
            } catch (error) {
                console.log("Error");
                
            }
        }
    }

    useEffect(()=>{
        if(user){
            setUserData({username:user.username,email:user.email,mobile:user.mobile})
        }
    },[loading])

    if (loading) {
    return <span className="loading loading-spinner loading-xs"></span>
  }
  return (
    <>
    <div className='flex items-center justify-center h-[90vh]'>
        <form className='w-120 border border-base-300 px-5 py-7 rounded shadow-zinc-500' onSubmit={submitHandler}>
            <h1 className='font-semibold mb-4 text-xl'>Update Profile</h1>
            <Input label="Username" type='text' name="username" id='uname' placeholder='Enter Username' value={userData.username} onChange={inputHandler} errorMsg={errorMessages.nameError} />
            <Input label="Email ID" type='email' name="email" id='mail' placeholder='Enter Email Address' value={userData.email} onChange={inputHandler} errorMsg={errorMessages.mailError}/>
            <Input label="Mobile No" type='number' name="mobile" id='mob' placeholder='Enter Mobile No' value={userData.mobile} onChange={inputHandler} errorMsg={errorMessages.mobError} />
            <div className='mt-5'>
                <Button value='Update' />
            </div>
        </form>
    </div>
    </>
  )
}

export default EditProfile