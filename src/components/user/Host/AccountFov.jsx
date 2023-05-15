import React, { useContext } from 'react';
import { GiBurningForest } from 'react-icons/gi';
import gif from '../../../Asset/icon_9.gif';
import { useNavigate } from 'react-router-dom';
import { Host_id } from '../../../Context/HostDetails';


function AccountFov() {
   const Navigate = useNavigate()
   const {hostid} = useContext(Host_id)
  return (
    <>
    <header className='p-4 flex justify-between border-b-2 border-gray-250 '>
            <a href='' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </a>
            <div className='flex gap-6 '>

               <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex
            ' >

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden md:block">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <div className='bg-gray-500 text-white rounded-full border border-gray overflow-hidden '>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-.5 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                     </svg>

                  </div>


               </div>
            </div>

         </header>
    
    <div className=' py-6 md:flex gap-2  mx-6 mt-8 relative'>
        <div className="flex justify-center">
        <div className='mx-5 md:mx-15 bg-red width-full w-full md:w-1/2 '>
        <h1 className='text-black text-2xl font-bold'>Please provide a larger photo</h1>
                <p className='text-black  mt-4'>Your ID looks too small for us to read it. Make sure your ID or passport page takes up the entire
                 frame when you take your photo.</p>
        <img className=' w-96' src={gif} alt='photo'></img>
        <hr className='w-full'></hr>
        <div className='flex right-0 justify-end mx-2 '>
               <button className='bg-black rounded-md justify-end mt-3' onClick={()=>Navigate('/id-select/'+hostid)}><h1 className='text-white mx-3 my-2.5'>Take photo</h1></button>
            </div>


    </div>
        </div>
   
    <div className='md:flex mb-5 flex-col mx-16 p-12 hidden   md:w-1/2 '>
        <div className='border border-gray-300 rounded-md w-2/4 flex-row mx-5 '>
            <h1 className='font-bold mx-2 '>Your privacy</h1>
            <h1 className='text-gray-500 mt-3 mx-2'>We aim to keep the data you share during this process private, safe, and secure. Learn more in our</h1>
            <h1 className='text-black-500 mt-3 mx-2 underline font-bold mb-1'>Privacy Policy.</h1>
        </div>
    </div>

    </div>


    </>
  )
}

export default AccountFov