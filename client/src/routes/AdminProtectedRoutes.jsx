import React from 'react'
import { useUser } from '../contexts/UserContextProvider'
import Unauthorized from '../pages/Unauthorized'

function AdminProtectedRoutes({children}) {
    const {token,loading,user}=useUser()
    if(loading){
        return <span className="loading loading-spinner loading-xs"></span>
    }
    if(user.role=='admin' && !loading){
        return (children)
    }
  else{
        return (
            <Unauthorized></Unauthorized>
        )
    }
}

export default AdminProtectedRoutes