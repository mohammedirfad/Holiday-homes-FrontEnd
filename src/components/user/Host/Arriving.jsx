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

                const completedDate = response?.data.filter(data => new Date(data.Check_in) >= new Date() );
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
                <h1 className='flex justify-end text-yellow-500 font-semibold mx-1'>{
                    booking?.orderstatus ==="Completed" ? 
                    <span className='text-red font-semibold flex flex-row'>
                        <img className='w-8 h-8 mt-[-3px]' src="data:image/png;base64,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"></img>
Arriving
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