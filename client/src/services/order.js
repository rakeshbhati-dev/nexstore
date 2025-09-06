import axios from "axios"

const ordeAPI=import.meta.env.VITE_ORDER_API

async function placeOrder(address,orderItem,token) {
    if(token){
        try {
            const response=await axios.post(`${ordeAPI}/`,{address:address,orderItem:orderItem},{headers:{Authorization:`Bearer ${token}`}})
            return response.data
        } catch (error) {
           throw error
        }
    }
}

// http://localhost:5000/order

export {placeOrder}