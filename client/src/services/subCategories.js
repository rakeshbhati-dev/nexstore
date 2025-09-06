import axios from "axios"
const subCatgAPI = import.meta.env.VITE_SUBCATEGORY_API

async function fetchSubCategories(categoryId) {
    try {
        const response = await axios.get(`${subCatgAPI}/list/${categoryId}`)
        return response.data
    } catch (error) {
        throw error;
    }
}

async function addSubCategories(categoryId, subCatgTitle, token) {
    try {
        const response = await axios.post(`${subCatgAPI}/${categoryId}`, { title: subCatgTitle }, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    } catch (error) {
        throw error
    }
}

async function deleteSubCategories(subCatgId, token) {
    try {
        const response = await axios.delete(`${subCatgAPI}/${subCatgId}`, { headers: { Authorization: `Bearer ${token}` } })
        return response
    } catch (error) {
        console.log(error);
    }
}

export { fetchSubCategories, addSubCategories, deleteSubCategories }