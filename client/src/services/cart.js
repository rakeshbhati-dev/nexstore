import axios from "axios";

const cartAPI = import.meta.env.VITE_CART_API

async function addToCart(productId, quantity = 1, token) {
    try {
        if (token) {
            const response = await axios.post(`${cartAPI}/`, { productId, quantity }, { headers: { Authorization: `Bearer ${token}` } })
            return response.data
        }
        else {
            console.log("Token not provided");
        }
    } catch (error) {
        throw error
    }
}

async function fetchCart(token) {
    try {
        if (token) {
            const response = await axios.get(`${cartAPI}/`, { headers: { Authorization: `Bearer ${token}` } })
            return response.data
        }
        else {
            console.log("Token not provided");
        }
    } catch (error) {
        throw error
    }
}

async function updateCart(productId, quantity, token) {
    try {
        if (token) {
            const response = await axios.put(`${cartAPI}/`, { productId, quantity }, { headers: { Authorization: `Bearer ${token}` } })
            return response.data
        }
        else {
            console.log("No token Provided");

        }
    }
    catch (error) {
        throw error
    }
}

async function deleteCartItem(token, id) {
    try {
        const response = await axios.delete(`${cartAPI}/item/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    } catch (error) {
        throw error
    }
}

export { addToCart, fetchCart, updateCart,deleteCartItem }