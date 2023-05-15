import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import loadgifs from '../../../Asset/loadgif.gif';
import { OrderStatus, getMyBookings, paymentRequest } from '../../../api/Services/order';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {message} from 'antd';


function CompletedCheckout() {

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

                const completedDate = response?.data.filter(data => new Date(data.Check_out) < new Date() );
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

    const HandleRequestAdmin = async () =>{

        try{
            console.log(showAlldata[0].hoster,"....................................................................")
            const response = await paymentRequest(showAlldata[0]?.hoster,token)
            if(response?.status === 200){
                message.success("Payment Requsted Succesfully")

            }
            else{
                message.error("try after sometime")
              }
        }
        catch(error){
            console.error(error,"error while creating host payment data")
        }
    }


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

<h1 className='text-xl font-semibold text-gray-500 '>Check-out Completed</h1>


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
                <h1 className='flex justify-end text-green-500 font-semibold'>{
                    booking?.orderstatus ==="Completed" ? 
                    <span className='text-red font-semibold flex flex-row'>
                        <img className='w-8 h-8 mt-[-3px]' src="data:image/png;base64,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"></img>
checkouted
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

                    <div className='flex flex-col justify-between mt-4'>
                        
                        <button className='rounded-lg bg-primary mt-4 mx-3' onClick={HandleRequestAdmin}><h1 className='mx-3 my-3 text-white font-semibold'>Request Payment</h1></button>
                        <h1 className='underline text-black text-xs justify-center flex font-bold mt-2'>
                        By clicking you can request payment with terms and condition
                        </h1>
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

export default CompletedCheckout