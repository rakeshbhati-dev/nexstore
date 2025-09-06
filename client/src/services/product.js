import axios from "axios"

const productAPI = import.meta.env.VITE_PRODUCT_API

async function fetchProductUnder(price, page = 1, limit = 10) {
    try {
        const response = await axios.get(`${productAPI}/under/${price}?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        throw error
    }
}

async function fetchParticularProduct(id) {
    try {
        const response = await axios.get(`${productAPI}/${id}`)
        return response.data
    } catch (error) {
        throw error

    }
}

async function fetchProductBySubCategory(id, page = 1, limit = 24) {
    try {
        const response = await axios.get(`${productAPI}/subcategory/${id}?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        throw error
    }
}

async function fetchAllProduct(page = 1, limit = 20) {
    try {
        const response = await axios.get(`${productAPI}/list?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        throw error
    }
}

async function addProduct(token, formData) {
    try {
        const response = await axios.post(`${productAPI}/`, formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
        return response.data
    } catch (error) {
        throw error
    }
}

async function updateProduct(id, formData, token) {
    try {
        const response = await axios.put(`${productAPI}/${id}`, formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
        return response.data
    } catch (error) {
        throw error
    }
}

async function deleteProduct(token,id) {
    try {
            const response=await axios.delete(`${productAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
            return response.data
        } catch (error) {
            throw error
        }
}

async function searchProduct(query,page=1,limit=1) {
    try {
        const response=await axios.get(`${productAPI}/list?search=${query}&page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export { fetchProductUnder, fetchParticularProduct, fetchProductBySubCategory, fetchAllProduct, addProduct,updateProduct,deleteProduct,searchProduct }