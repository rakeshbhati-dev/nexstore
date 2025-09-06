import axios from "axios"

const bannerAPI=import.meta.env.VITE_BANNER_API

async function getAllBanner() {
    try {
        const response=await axios.get(`${bannerAPI}/list`)
        return response.data
    } catch (error) {
        throw error
    }
}

export {getAllBanner}