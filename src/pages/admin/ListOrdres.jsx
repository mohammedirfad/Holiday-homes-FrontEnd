import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Orders from '../../components/admin/Orders';

function ListOrdres() {
  return (
    <>
    <Navbar />
    <div className='flex'>
          <Sidebar />
          <Orders />

      </div>
  
    
    
    </>
  )
}

export default ListOrdres