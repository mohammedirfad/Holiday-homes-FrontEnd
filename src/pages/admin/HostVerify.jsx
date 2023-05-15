import React from 'react';

import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import HostVerification from '../../components/admin/HostVerification';

function HostVerify() {
  return (
    <>
    <Navbar/>
   <div className='flex'>
   <Sidebar/>
   <HostVerification/>
  
   </div>
  
    
    
    </>
  )
}

export default HostVerify