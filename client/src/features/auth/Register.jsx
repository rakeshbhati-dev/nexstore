import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Input from '../../components/Input'
import { textValidation } from '../../utils/textValidation'
import { register } from '../../services/auth'
import Button from '../../components/Button'

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        mobile: "",
        password: ""
    })

    const [errorMessages, setErrorMessages] = useState({})
    const navigate = useNavigate()

    const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobPattern = /^([7-9]{1,1})+([0-9]{9,9})$/


    function inputHandler(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    async function submitHandler(e) {
        e.preventDefault()
        if (isValidate()) {
            try {
                const response = await register(formData)
                if (response) {
                    toast.success("Account Created Successfully")
                    navigate('/login')
                }
            } catch (error) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message);
                }
                else{
                    console.log(error);
                    toast.error("Something went wrong")
                }
            }
        }
    }

    function isValidate() {
        let err = {}
        if (textValidation(formData.username, 'Username', '', 3)) err.nameError = textValidation(formData.username, 'Username', '', 3)
        if (textValidation(formData.email, 'Email ID', mailPattern, 10)) err.mailError = textValidation(formData.email, 'Email ID', mailPattern, 10)
        if (textValidation(formData.mobile, 'Mobile Number', mobPattern, 10)) err.mobError = textValidation(formData.mobile, 'Mobile Number', mobPattern, 10)
        if (textValidation(formData.password, 'Password', '', 8)) err.pswdError = textValidation(formData.password, 'Password', '', 8)
        setErrorMessages(err)
        if (Object.keys(err).length > 0) {
            return false
        }
        else {
            return true
        }
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <Input label="Username" type="text" name="username" id="uname" placeholder="Enter Username" value={formData.username} onChange={inputHandler} errorMsg={errorMessages.nameError} inputStyle=' py-2' divStyle='mb-3'/>
                <Input label="Email ID" type="email" name="email" id="umail" placeholder="Enter Email ID" value={formData.email} onChange={inputHandler} errorMsg={errorMessages.mailError} inputStyle=' py-2'  divStyle='mb-3'/>
                <Input label="Mobile No" type="number" name="mobile" id="mob" placeholder="Enter Mobile No" value={formData.mobile} onChange={inputHandler} errorMsg={errorMessages.mobError} inputStyle='py-2'  divStyle='mb-3'/>
                <Input label="Password" type="password" name="password" id="pswd" placeholder="Enter Password" value={formData.password} onChange={inputHandler} errorMsg={errorMessages.pswdError} inputStyle='py-2'  divStyle='mb-3'/>
                <Button value='Register'/>
            </form>
            <div className='text-center mt-10'>
                <p>Already have an account?<Link to='/login' className='text-primary'>Login</Link></p>
            </div>
        </>
    )
}

export default Register