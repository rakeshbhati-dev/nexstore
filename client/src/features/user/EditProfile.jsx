import React, { useState } from 'react'
import Input from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

function EditProfile() {
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

    function isValidate() {
        let err = {}
        if (textValidation(formData.username, 'Username', '', 3)) err.nameError = textValidation(formData.username, 'Username', '', 3)
        if (textValidation(formData.email, 'Email ID', mailPattern, 10)) err.mailError = textValidation(formData.email, 'Email ID', mailPattern, 10)
        if (textValidation(formData.mobile, 'Mobile Number', mobPattern, 10)) err.mobError = textValidation(formData.mobile, 'Mobile Number', mobPattern, 10)
        if (textValidation(formData.password, 'Password', '', 8)) err.pswdError = textValidation(formData.password, 'Password', '', 8)
        setErrorMessages(err)
        return Object.keys(err).length === 0
    }

    async function submitHandler(e) {
        e.preventDefault()
        if (isValidate()) {
            alert("Updated")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>
                <form onSubmit={submitHandler}>
                    <Input label="Username" type="text" name="username" id="uname" placeholder="Enter Username" value={formData.username} onChange={inputHandler} errorMsg={errorMessages.nameError} inputStyle="py-2" divStyle="mb-3"
                    />
                    <Input label="Email ID" type="email" name="email" id="umail" placeholder="Enter Email ID" value={formData.email} onChange={inputHandler} errorMsg={errorMessages.mailError} inputStyle="py-2" divStyle="mb-3"
                    />
                    <Input label="Mobile No" type="number" name="mobile" id="mob" placeholder="Enter Mobile No" value={formData.mobile} onChange={inputHandler} errorMsg={errorMessages.mobError} inputStyle="py-2" divStyle="mb-3"
                    />
                    <Button value="Update" />
                    
                </form>
            </div>
        </div>
    )
}

export default EditProfile
