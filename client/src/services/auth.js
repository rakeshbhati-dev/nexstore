import axios from 'axios'

const userAPI=import.meta.env.VITE_USER_API

async function register(formData) {
    try {
        const response=await axios.post(`${userAPI}/register`,formData)
        return response.data
    } catch (error) {
        throw error
    }
}

async function login(formData) {
    try{
         const response = await axios.post(`${userAPI}/login`,formData)
         return response.data
    }
    catch(error){
        throw error
    }
}

export {register,login}