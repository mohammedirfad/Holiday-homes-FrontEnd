import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Complait from '../../components/admin/Complaints';

function Complaint() {
  return (
    <>
    <Navbar/>
   <div className='flex'>
   <Sidebar/>
   <Complait/>
  
   </div>
  
    
    
    </>
  )
}

export default Complaint