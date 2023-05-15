
import HostPendingList from './HostPendingList'
import React, { useState } from 'react';
import HostApprovedlist from './HostApprovedlist';
import HostDeniedlist from './HostDeniedlist';

function HostVerification() {
  const [view, setView] = useState('pending');

  const handlePendingClick = () => {
    setView('pending');
    console.log("hii")
  };

  const handleApprovedClick = () => {
    setView('approved');
    console.log("hiis")
  };

  const handleDeniedClick = () => {
    setView('denied');
    console.log("whii")
  };

  return (
    <div className='w-full'>
      <div className='flex my-5 justify-center'>
        <h1 className='text-xl md:text-4xl font-bold  justify-center mx-10 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 '>Host Verification</h1>
      </div>
      <div className="mt-9 flex flex-wrap justify-center mx-16">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md mx-2 my-1 lg:my-0" onClick={handlePendingClick}>Pending</button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mx-2 my-1 lg:my-0" onClick={handleApprovedClick}>Approved</button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mx-2 my-1 lg:my-0" onClick={handleDeniedClick}>Denied</button>
      </div>
      <hr className='text-black mt-3 bg-black dark:black-500'></hr>
      <div>
        {view === 'pending' && <HostPendingList status={view} />}
        {view === 'approved' && <HostApprovedlist status={view} />}

        {view === 'denied' && <HostDeniedlist status={view} />}
      </div>
    </div>

  )
}

export default HostVerification