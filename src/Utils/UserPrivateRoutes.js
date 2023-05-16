import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';


function UserPrivateRoutes() {
    const clientToken = useSelector(state => state.userAuth.token);


  return (

     clientToken ? <Outlet/> : <Navigate to="/home"/>
  )
}

export default UserPrivateRoutes



