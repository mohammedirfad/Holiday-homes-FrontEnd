import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Payment from '../../components/admin/PaymentRequests';

function HostPaymentRequest() {
  return (
    <>
    <Navbar />
    <div className='flex'>
          <Sidebar />
          <Payment />

      </div>
  
    
    
    </>
  )
}

export default HostPaymentRequest