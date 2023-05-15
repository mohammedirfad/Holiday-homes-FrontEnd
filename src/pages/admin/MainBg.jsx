import React from 'react'
import Dashborad from '../../components/admin/Dashborad';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';

function MainBg() {
  return (

      <>
      <Navbar/>
     <div className='flex'>
     <Sidebar/>
     <Dashborad/>
     </div>
    
      
      
      </>

  )
}

export default MainBg;
