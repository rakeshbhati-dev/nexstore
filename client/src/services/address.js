import axios from "axios";
const addressAPI=import.meta.env.VITE_ADDRESS_API

async function getAddress(token) {
    try {
        const response=await axios.get(`${addressAPI}/`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

export {getAddress}