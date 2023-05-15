import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import loadgifs from '../../../Asset/loadgif.gif';
import { OrderStatus, getMyBookings, paymentRequest } from '../../../api/Services/order';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {message} from 'antd';


function Ongoing() {

    const [showAlldata,setShowAllData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const token = useSelector(state => state.userAuth.token);
    const userid = useSelector(state => state.userAuth.id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderStatus(userid, token);
                console.log(response, 1);
                console.log(response?.data, "..............11111111");
                setIsLoading(false);

                const completedDate = response?.data?.filter(data => new Date(data.Check_in) <= new Date() && new Date(data.Check_out) >= new Date());
                console.log(completedDate,".......................")
                setShowAllData(completedDate)

                setError(null);
            }
            catch (err) {
                setIsLoading(false);
                setError(err?.response?.data?.message);
            }
        };
        fetchData();
      

    }, []);

  


    if (isLoading) {
        return <div className='w-full'>
            <div className='flex justify-center items-center w-full'>
                <img className='w-48 h-48 justify-center' src={loadgifs} alt='loading.....'></img>
            </div>
        </div>;
    }
  
    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <>

<h1 className='text-xl font-semibold text-gray-500 '>Currently Ongoing</h1>


<div className='mx-6 my-5 flex flex-wrap gap-6'>


<div className='border-b border-black'></div>

<div className='flex flex-row flex-wrap gap-4'>
    {showAlldata?.length > 0 && showAlldata.map(booking => (
        <div   className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">

{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-[-1.1rem] mx-3 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
         </svg> */}
         
            <div className="my-3 mx-3">
                <div className='flex flex-row w-full justify-between'>
               <div className='flex flex-row'>
                <h1 className='text-xl'>Name :</h1>
               <h2 className="text-xl font-semibold mx-2">
                {booking?.ownerDetails?.FirstName}
                </h2>
               </div>
                <h1 className='flex justify-end text-red-500 font-semibold'>{
                    booking?.orderstatus ==="Completed" ? 
                    <span className='text-red font-semibold flex flex-row'>
                        <img className='w-8 h-8 mt-[-3px]' src="data:image/png;base64,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"></img>
Ongoing
                    </span>
: "."

}</h1>
                </div>


                <div className="text-xl">
                <div className='flex flex-row'>
                    <h1 className='text-lg'>Booking_id :</h1>
                       <h1 className='text-lg font-semibold text-black- mx-2'> {booking?._id}</h1> 
                    </div>


                    <div className='flex flex-row mt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                       <h1 className='text-xl font-semibold text-gray-500 mx-2'> {booking?.NumberOffdays}</h1> nights
                    </div>
                

                   <div className='flex flex-row justify-between w-full'>
                   <div className={"flex  gap-1  mt-4 text-gray-500 text-lg"}>
                      
                  
                      <div className="flex gap-1 items-center ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                          </svg>
                          {moment(booking?.Check_in).format('DD/MM/YYYY')}
                        
                      </div>
                      &rarr;
                      <div className="flex gap-1 items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black ">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                          </svg>
                      
                          {moment(booking?.Check_out).format('DD/MM/YYYY')}
                      </div>
                  </div>

                  <div className='mt-4 flex flex-row mx-6 justify-between '>
                    <div className='flex'>
                    <h1 className='text-lg'>Payment-Method :</h1>
                  <h1 className='text-lg mx-2 font-semibold'> {booking?.PaymentMethod}</h1>
                    </div>


                    
                 
                  </div>
                   </div>




                    <div className="flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mt-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        <span className="text-xl font-semibold mt-1">
                            Total price: ${booking?.Amount}
                        </span>
                    </div>

                   
                </div>
            </div>
        </div>
    ))}
</div>

</div>

    {/* <div className='flex flex-wrap mx-2 w-full'>

        <div className='rounded-md border-2 border-green-700 flex flex-col'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-[-1.1rem] mx-3 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
         </svg>

         <div className='flex flex-row w-full justify-between mx-2'>
            <div className='flex flex-row'>
                <h1 className=''>Name :</h1>
                <h1 className='font-semibold mx-1'> Irfad</h1>
            </div>
            <h1 className='font-semibold'>Checkout</h1>
         </div>
            
        </div>




    </div> */}
    
    </>
  )
}

export default Ongoing