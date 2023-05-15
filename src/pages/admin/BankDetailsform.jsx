import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Bankdetails from '../../components/admin/BankDetails';


function BankDetailsform() {

   
  return (
    <>
    <Navbar />
    <div className='flex'>
          <Sidebar />
          <Bankdetails />

      </div>
  
    
    
    </>
  )
}

export default BankDetailsform