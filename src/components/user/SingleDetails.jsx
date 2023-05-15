import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GiBurningForest } from 'react-icons/gi';
import moment from 'moment';
import { OrderCancell, complaintRegister } from '../../api/Services/order';
import {message} from 'antd';
import loadgifs from '../../../src/Asset/loadgif.gif';
import Modal from '../Re-components/Modal';


function SingleDetails(props) {

  const [showAllPhotos,setShowAllPhotos] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [data ,setData] = useState("");

  const token = useSelector(state => state.userAuth.token);

    const location = useLocation();
    const propsData = location.state;
    const Navigate = useNavigate();


    console.log(propsData)
    const id = propsData._id

    const HandleCanacelation = async (e) =>{
      console.log("w8ing for cancelAnimationFramellation")
      e.preventDefault();

      try{
        setIsLoading(true)
        const response = await OrderCancell(id,propsData._id,propsData.Check_in,token)
        setIsLoading(false);
      if(response?.status === 200){
      
        message.success("Order cancelled")
        Navigate('/Mybookings')
      }
      else{
        message.error("error ocuured")
      }
      }
      catch (err) {
        setIsLoading(false);
    
      }

    }
  

    const handleShowAll =async () => {
    
     setShowAll(true);
   };
  

   const handleSubmit = async () =>{

    try{
 
      const response = await complaintRegister(propsData._id,data,token);
   
      if(response?.status === 200){
        setShowAll(false);
        message.success("Complaint registered successfully")

      }
      else{
        message.error("error ocuured ")
      }
    }
    catch(error){
      console.error(error,"error while sending complaint to he order")
      message.error("error ocuured ",error)
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


    if (showAllPhotos) {
      return (
        <div className="absolute inset-0 bg-black text-white min-h-screen">
          <div className="bg-black p-8 grid gap-4">
            <div>
              <h2 className="text-3xl mr-48">Photos of {propsData?.hoster?.title}</h2>
              <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
                Close photos
              </button>
            </div>
            {propsData?.hoster?.images?.length > 0 && propsData?.hoster?.images?.map(photo => (
              <div>
                <img  src={photo} className='' alt="photo" />
              </div>
            ))}
          </div>
        </div>
      );
    }


  return (
   <>
   <header className='p-4 flex justify-between border  border-gray-200'>
                <a href='' className='flex items-center gap-1 '>
                    <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" onClick={() => Navigate('/home')} /></h3>
                    <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
                </a>

    </header>

    <div className='flex justify-center items-center mt-3'>

      <h1 className='flex justify-center font-bold  text-gray-500 text-3xl '>Your Reservation</h1>
    </div>

    <div className="mt-5 flex-col bg-gray-100 mx-10 px-8  h-96 pt-8">
      <h1 className="text-3xl font-semibold flex mt-[-10px]">{propsData?.hoster?.title}</h1>
      <div className='flex flex-row mt-3 font-'>
      You are going to  
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
       {propsData?.hoster?.location}
      
      </div>

      <hr className='mt-5 text-white'></hr>

 <div className='flex justify-center items-center my-6'>
 <div className="md:flex relative justify-center items-center md:w-[900px] ">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden ">
        <div>
          {propsData?.hoster?.images[0] && (
            <div>
              <img src={propsData?.hoster?.images[0]} onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover h-1/4"  alt=""/>
            </div>
          )}
        </div>
        <div className="grid">
          {propsData?.hoster?.images[1] && (
            <img src={propsData?.hoster?.images[1]} onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover"  alt=""/>
          )}
          <div className="overflow-hidden">
            {propsData?.hoster?.images[2]  && (
              <img src={propsData?.hoster?.images[2]} onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2"     alt=""/>
            )}
          </div>
        </div>
      </div>
      <button onClick={() => setShowAllPhotos(true)} className="flex gap-1  absolute right-0 bottom-2  py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
        </svg>
        Show more photos
      </button>
    </div>
 </div>

<hr className='mt-1'></hr>
<div className='flex mt-2'>
  <h1 className='font-semibold text-2xl'>More Detials</h1>
</div>


      {/* {/* <PlaceGallery place={place} /> */}
      <div className="flex flex-col mt-2">
        <div>
          <div className="my-2 flex flex-row ">

            <h1 className='font-normal text-xl '>Reservation id :</h1>
            <h1 className='font-semibold mx-3 text-xl'>{propsData?._id}</h1>
            
            {/* {place.description} */}
          </div>

          <div className="my-2 flex flex-row ">

            <h1 className='font-normal text-xl '>Structure :</h1>
            <h1 className='font-semibold mx-3 text-xl'>{propsData?.hoster?.structure}</h1>
            
            {/* {place.description} */}
          </div>
         
          <div className="my-2 flex flex-row ">

            <h1 className='font-normal text-xl '>Location :</h1>
            <h1 className='font-semibold mx-3 text-xl'>{propsData?.hoster?.location}</h1>
            
            {/* {place.description} */}
          </div>

          <div className="my-2 flex flex-row ">

            <h1 className='font-normal text-xl '>Location :</h1>
            <h1 className='font-semibold mx-3 text-xl'>{propsData?.hoster?.location}</h1>
            
            {/* {place.description} */}
          </div>


          <h1 className='font-semibold mt-5 text-gray-600 text-xl'>Booking Details :</h1>

          <hr className='mt-2'></hr>
         <div className='flex flex-row '>
         <div className='mx-auto  md:w-1/2 '>
         <div className="my-2 flex flex-row  mt-2">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                            </svg>
<h1 className='font-normal text-xl mx-2 '>Check-in :</h1>
<h1 className='font-semibold mx-2 text-xl'> {moment(propsData?.Check_in).format('DD/MM/YYYY')}</h1>

{/* {place.description} */}
</div>

<div className="my-2 flex flex-row  mt-2">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                            </svg>
<h1 className='font-normal text-xl mx-2 '>Check-out :</h1>
<h1 className='font-semibold mx-2 text-xl'> {moment(propsData?.Check_out).format('DD/MM/YYYY')}</h1>

{/* {place.description} */}
</div>

<div className="my-2 flex flex-row  mt-2">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                        </svg>
<h1 className='font-normal text-xl mx-2'>Nights :</h1>
<h1 className='font-semibold mx-2 text-xl'>{propsData?.NumberOffdays}</h1>

{/* {place.description} */}
</div> 

<div className="my-2 flex flex-row  mt-2">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mt-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
<h1 className='font-normal text-xl mx-2 '>Total :</h1>
<h1 className='font-semibold mx-2 text-xl'> ₹ {propsData?.Amount}</h1>

{/* {place.description} */}


</div> 

<div className="my-2 flex flex-row  mt-2">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mt-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
<h1 className='font-normal text-xl mx-2'>BookingStatus :</h1>
<h1 className='font-semibold mx-2 text-xl text-green-600'>  {propsData?.paymentstatus}</h1>

{/* {place.description} */}


</div> 

<div className="my-2 flex flex-row  mt-2">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mt-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
<h1 className='font-normal text-xl mx-2 '>Orderstatus:</h1>
<h1 className={`font-semibold mx-2 text-xl ${propsData?.orderstatus==="Cancelled" ? "text-red-600" :"text-green-600"}`}>  {propsData?.orderstatus}</h1>

{/* {place.description} */}


</div> 

        </div>
          <div className='flex mb-5 flex-col selection: w-full md:w-1/2 '>
              <div className='mx-6'>
                <h1 className='text-bold text-xl text-black'>Cancellation policy</h1>

                <h1 className='mt-3 font-normal '>Partial refund: Get back 50% of every night. Get back all service fees.</h1>
                <h1 className=''>Cancel berfore a day to get full refund of yout Money</h1>

               {
                propsData.orderstatus === "Cancelled" ?  <button className='rounded-lg bg-primary mt-5' ><h1 className='mx-3 my-3 text-white font-semibold'>Cancelled</h1></button> :  <button className='rounded-lg bg-primary mt-5' onClick={HandleCanacelation}><h1 className='mx-3 my-3 text-white font-semibold'>Cancel Reservation</h1></button>
               }

                <h1 className='underline text-black text-xs font-bold mt-2'>By clicking cancel you cancel your booking with terms and condition</h1>
              </div>
'
          </div>
         </div>

         <hr className='mt-10 text-red-500 border-2 bg-red-400'></hr>

         <div className='flex flex-col my-4'>

          <h1 className="">if you have a complaint regarding the facilities or with the property you can add here</h1>

  <button className='rounded-lg w-32 mt-5 border-2 border-black'  onClick={()=> handleShowAll()}><h1 className='mx-3 my-3 text-black font-semibold'>Complaint</h1></button>
  
 <div className='flex felx-col mt-2'>NB: <h1 className='underline text-black text-xs font-bold mx-2 mt-1 '>By clicking you will be regetering a complaint against the host and the property terms and condition</h1></div>
         </div>

         <Modal isOpen={showAll}  close={()=>setShowAll(false)} title={"Admin Verification"} className='rounded-md'>
         <div className="w-full mt-5 flex justify-center border-gray-400 z-1 rounded-md ">
           <div className="w-full relative flex flex-col mt-50 max-w-lg gap-4 p-0 z-1 rounded-md shadow-md  dark:bg-black-400">
            <div className="w-full z-1 ">
         <div className='flex flex-col justify-center mt-5'>
          <h1 className='font-semibold text-xl flex justify-center '>Complaint Box</h1>
<hr className='mt-3'></hr>
          <div className='text-xl flex justify-start my-4'>
            <h1 className='mx-10 justify-start text-start'>Write your complaint here.</h1>

          </div>

          <div className='flex border border-black rounded-md mx-10 my-5 mt-4 h-12'>
                                 <input className='pl-1 justify-center text-black color-gray w-full'
                                    type='text'
                                    placeholder='Enter your complaint here'
                                    name='complaint'
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                 ></input>
           </div>
           <button type="submit" onClick={handleSubmit} className='rounded-lg bg-primary mt-3 mx-14 mb-5' ><h1 className='mx-3 my-3 text-white font-semibold'>Report</h1></button>
          </div>
          </div>   
          </div> 
          </div> 

         </Modal>

        </div>
        <div>
          {/* <BookingWidget place={place} /> */}
        </div>
      </div>

    </div>


   </>
  )
}

export default SingleDetails