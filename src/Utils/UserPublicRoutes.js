import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

function UserPublicRoutes() {

    const clientToken = useSelector(state => state.userAuth.token);
    console.log(clientToken)
  return (
    clientToken ? <Navigate to="/home" /> :  <Outlet/>
  )
}

export default UserPublicRoutes