import React from 'react'
import { useUser } from '../contexts/UserContextProvider'
import NotLogin from '../pages/NotLogin'

function UserProtectedRoute({children}) {
    const {token,loading}=useUser()
    if(loading){
        return <span className="loading loading-spinner loading-xs"></span>
    }
    if(token && !loading){
        return (children)
    }
    else{
        return (
            <NotLogin></NotLogin>
        )
    }
}

export default UserProtectedRoute