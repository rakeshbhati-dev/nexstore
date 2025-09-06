import axios from "axios"
const categoryAPI = import.meta.env.VITE_CATEGORY_API

async function fetchCategories() {
    try {
        const response = await axios.get(`${categoryAPI}/`)
        return response.data
    } catch (error) {
        throw error
    }
}

async function addCategory(token, categoryTitle) {
    try {
        const response = await axios.post(`${categoryAPI}/`, { title: categoryTitle }, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    } catch (error) {
        throw error
    }
}

async function updateCategory(id, categoryTitle, token) {
    try {
        const response = await axios.put(`${categoryAPI}/${id}`, { title: categoryTitle }, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    } catch (error) {
        throw error
    }
}

async function deleteCategory(id, token) {
    try {
        const response=await axios.delete(`${categoryAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

export { fetchCategories, addCategory, updateCategory,deleteCategory }