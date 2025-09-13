import axios from "axios"

const userAPI=import.meta.env.VITE_USER_API

async function fetchUser(token,id) {
    if(token){
        try {
            const response=await axios.get(`${userAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
            return response.data
        } catch (error) {
            throw error
        }
    }
}

async function deleteUser(token,id) {
    try {
        const response=await axios.delete(`${userAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function updateUser(token,id,data) {
    try {
        const response=await axios.put(`${userAPI}/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data;
    } catch (error) {
        throw error
    }
}

async function updatePassword(token,oldPassword,newPassword) {
    try {
        const response=await axios.put(`${userAPI}/password`,{oldPassword,newPassword},{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}
export {fetchUser,deleteUser,updateUser,updatePassword}