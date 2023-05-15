import React, { useContext } from 'react';
import { GiBurningForest } from 'react-icons/gi';
import finish from '../../../Asset/finish.gif';
import { useNavigate } from 'react-router-dom';
import { Host_id } from '../../../Context/HostDetails';

function HostReviewing() {
   const navigate = useNavigate();
   const {hostid} = useContext(Host_id)
  return (

  <>
    <header className='p-4 flex justify-between border-b-2 border-gray-250 '>
            <a href='' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </a>
            <div className='flex gap-6 '>

               <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex' >

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
        <div className='mx-auto bg-red width-full justify-center md:w-1/2'>
        <div className="justify-center flex flex-col items-center ">
            <h1 className='text-start'>
            <lord-icon
  src="https://cdn.lordicon.com/qznlhdss.json"
  trigger="hover"
  style={{ width: 70, height: 70 }}
></lord-icon>
            </h1>
            <h1 className='font-semibold text-2xl'>We’re reviewing your ID</h1>
            
        </div>
       <div className='justify-center items-center flex mt-8'>
        <h1>Thanks for completing this important step.<br></br> We’ll let you know soon if we need any more info from you.</h1>
       </div>

       <div className="justify-center items-center flex">
        <h1 className=" text-black mt-10 ml-[-56px]">
        In the meantime, you can pick up where you left off.
        </h1>
       </div>
<hr className='mt-7'></hr>
<div className='w-full mt-2 flex '>
    <button className='bg-black rounded-md flex right-1/2 absolute ' onClick={()=> navigate('/verify-listing/'+hostid)}>
        <h1 className='mx-2 my-2 text-white font-semibold'>Done</h1>
    </button>
</div>

         
        </div>
        

        <div className='flex mx-auto justify-center w-full mt-5 md:mt-0 md:w-1/2 '>
          <div className='justify-center'>
       
        <img src={finish} className='w-[400px]justify-center h-[300px]' alt='bank'></img>

          </div>

        </div>
      </div>



  </>

  )
}

export default HostReviewing