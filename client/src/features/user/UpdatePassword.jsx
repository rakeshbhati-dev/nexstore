import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { textValidation } from '../../utils/textValidation'
import { updatePassword } from '../../services/user'
import { useUser } from '../../contexts/UserContextProvider'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [errorMessages, setErrorMessages] = useState({})
    const {token,loading,setUser,setToken}=useUser()
    const navigate=useNavigate()

    async function submitHandler(e) {
        e.preventDefault()
        if(isValidate()){
            try {
                const response=await updatePassword(token,oldPassword,newPassword)
                if(response){
                    toast.success("Password Updated Successfully")
                    setUser(null)
                    setToken(null)
                    navigate('/login')
                }
            } catch (error) {
                toast.error(error.response.data.message)
                
            }
        }
    }

    function isValidate() {
        let err = {}
        if (textValidation(oldPassword, 'Password', '', 8)) err.oldPswdError = textValidation(oldPassword, 'Password', '', 8)
        if (textValidation(newPassword, 'Password', '', 8)) err.newPswdError = textValidation(newPassword, 'Password', '', 8)
        setErrorMessages(err)
        if (Object.keys(err).length > 0) {
            return false
        }
        else {
            return true
        }
    }

    if(loading){
        return <span className="loading loading-spinner loading-xs"></span>
    }
    return (
        <div className='flex items-center justify-center h-[90vh]'>
            <form className='w-120 border border-base-300 px-5 py-7 rounded shadow-zinc-500' onSubmit={submitHandler}>
                <h1 className='font-semibold mb-4 text-xl'>Update Password</h1>
                <Input label='Old Password' type='password' name='oldPassword' id='old' placeholder='Enter Previous Password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} errorMsg={errorMessages.oldPswdError} />
                <Input label='New Password' type='password' name='newPassword' id='new' placeholder='Enter New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} errorMsg={errorMessages.newPswdError} />
                <Button value='Update Password' buttonStyle='mt-5' />
            </form>
        </div>
    )
}

export default UpdatePassword