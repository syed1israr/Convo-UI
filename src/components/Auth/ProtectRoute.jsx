import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({children,user,redirect="/login"}) => {
 if(!user){
    return <Navigate to={redirect}/>
 }
 return children ? children : <Outlet/>;
}
{/*
  Hi
*/}
export default ProtectRoute