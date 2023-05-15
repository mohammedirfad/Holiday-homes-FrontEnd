import React, { useContext } from 'react';
import { useState } from 'react';
import { GiBurningForest } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import {  setHostVerify} from '../../../Store/features/HostVerification';
import { Host_id } from '../../../Context/HostDetails';

function IdSelect() {
   console.log("1")
   const Idtype = useSelector(state => state.HostVerifys.IdType);
   console.log("2",Idtype)
    const [options ,setOption] = useState(Idtype || "")
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const {hostid} = useContext(Host_id)

  

    const selectOption = (event) =>{
      console.log(event)
      var value = event;
        setOption(event)
        console.log(options)
        console.log(value,"2")
        dispatch(
         setHostVerify({
            user:"HostUser",
            IdType:value,
         })
        )
         
    }
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
         <div className='py-6 flex flex-col md:flex gap-2  mx-6 mt-4 relative'>
         <div className="flex justify-center">
         <div className=' md:mx-20  my:5 md:my-10  bg-red width-full justify-start w-full md:w-2/4 p-4'>
         <div className='flex flex-col'>
                  <h1 className='font-semibold text-2xl'>Choose an ID type to add</h1>

        <div className='flex flex-row '>
            <div className='flex justify-between w-full md:w-2/3 mt-7'>
            <h1 className='text-xl '>Driver's license</h1>
            <div className={`right-0 rounded-full border border-black-700 w-5 h-5 mt-[10px] ${options === "DrivingLicense" && "border-4 border-black"}`} onClick={()=>selectOption("DrivingLicense")}>
               {/* {options === "DrivingLicense" && <div className='rounded-full w-3 h-3 bg-black justify-center' ></div>} */}
            </div>
            </div>
           
            </div>     
            <hr className='text-gray-400 mt-5 md:w-2/3'></hr>

            <div className='flex flex-row '>
            <div className='flex justify-between w-full md:w-2/3 mt-7'>
            <h1 className='text-xl '>Passport</h1>
            <div className={`right-0 rounded-full border-2 border-black-700 w-5 h-5 mt-[10px] ${options === "Passport" && "border-4 border-black"}`} onClick={()=>selectOption("Passport")}>
               {/* {options === "DrivingLicense" && <div className='rounded-full w-3 h-3 bg-black justify-center' ></div>} */}
            </div>
            </div>
           
            </div>  
            <hr className='text-gray-400 mt-5 md:w-2/3'></hr>

            <div className='flex flex-row '>
            <div className='flex justify-between w-full md:w-2/3 mt-7'>
            <h1 className='text-xl '>Identity card
</h1>
            <div className={`right-0 rounded-full border-2 border-black-700 w-5 h-5 mt-[10px] ${options === "Identitycard" && "border-4 border-black"}`} onClick={()=>selectOption("Identitycard")}>
               {/* {options === "DrivingLicense" && <div className='rounded-full w-3 h-3 bg-black justify-center' ></div>} */}
            </div>
            </div>
           
            </div> 
            <hr className='text-gray-400 mt-5 md:w-2/3'></hr> 

            <div className='bg-gray-200 w-full md:w-2/3 mt-5 rounded-md'>
            <h1 className='mx-4 my-3 text-sm'>
            󰀘
Your ID will be handled according to our <span className='font-semibold  underline'>Privacy Policy</span> and won’t be shared with your Host or guests.
            </h1>

         
         </div>
         <hr className='w-full mt-4'></hr>
        <div className='flex right-0 justify-end mx-2 '>
               <button className='bg-black rounded-md justify-end mt-3' onClick={()=>Navigate('/id-upload/'+hostid)}><h1 className='text-white mx-3 my-2.5'>Continue</h1></button>
            </div>
         </div>
         </div>
         </div>
        

         </div>
    </>
  )
}

export default IdSelect;