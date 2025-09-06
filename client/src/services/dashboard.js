import axios from "axios"

const dashboardAPI=import.meta.env.VITE_DASHBOARD_API

async function fetchDashboardStats(token) {
    if(token){
        try {
            const response=await axios.get(`${dashboardAPI}/stats`,{headers:{Authorization:`Bearer ${token}`}})
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export {fetchDashboardStats}