import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchUser } from '../services/user';

const UserContext = createContext();
export function UserContextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)
    const location = useLocation()

    async function fetchUserHandler(id){
      try {
        const response=await fetchUser(token,id)
        setUser(response.user);
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
    if(token){
      const decoded=jwtDecode(token)
      fetchUserHandler(decoded.userId)
    }
    else{
      setLoading(false)
    }
  },[token])

    return (
        <UserContext.Provider value={{token,setToken,setUser,user,loading}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser=()=>useContext(UserContext)

