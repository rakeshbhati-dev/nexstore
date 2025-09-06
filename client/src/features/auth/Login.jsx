import { useState } from "react"
import { useUser } from "../../contexts/UserContextProvider"
import { Link, useNavigate } from "react-router-dom"
import { textValidation } from "../../utils/textValidation"
import { login } from "../../services/auth"
import Input from "../../components/Input"
import Button from "../../components/Button"
import toast from "react-hot-toast"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const {setToken } = useUser()
    const [errorMessages, setErrorMessages] = useState({})
    const navigate = useNavigate()
    const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    function inputHandler(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function isValidate() {
        let err = {}
        if (textValidation(formData.email, 'Email ID', mailPattern, 10)) {
            err.mailError = textValidation(formData.email, 'Email ID', mailPattern, 10)
        }
        if (textValidation(formData.password, 'Password', '', 8)) {
            err.pswdError = textValidation(formData.password, 'Password', '', 8)
        }
        setErrorMessages(err)
        if (Object.keys(err).length > 0) {
            return false
        }
        else {
            return true
        }
    }

    
    async function submitHandler(e) {
        e.preventDefault()
        if (isValidate()) {
            try {
                const response=await login(formData)
                if(response){
                    localStorage.setItem('token',response.token)
                    setToken(response.token)
                    toast.success("Login Successfull")
                    navigate('/')
                }
            } catch (error) {
                if(error.status>=400 && error.status<500){
                  toast.error(error.response.data.message);
                }
                else{
                    toast.error("Something went wrong.")
                  console.log(error);
                  
                }
            }

        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <Input label="Email ID" name="email" id="mail" type="email" placeholder="Enter Email ID" onChange={inputHandler} errorMsg={errorMessages.mailError} divStyle='mb-3' inputStyle="py-2"/>
                <Input label="Password" name="password" id="pswd" type="password" placeholder="Enter Password" onChange={inputHandler} errorMsg={errorMessages.pswdError} divStyle='mb-3' inputStyle="py-2"/>
                <Button value="Login" buttonStyle='mt-5'/>
            </form>
            <div>
                <p className='mt-10'>New User?<Link to='/register' className='text-primary'>Register</Link></p>
            </div>
        </>

    )
}

export default Login