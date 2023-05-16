import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';


function AdminPrivateRoutes() {
    const AdminToken = useSelector(state => state.adminAuth.admin_token);
   
  return (

    AdminToken ? <Outlet/> : <Navigate to="/admin"/>
  )
}

export default AdminPrivateRoutes
