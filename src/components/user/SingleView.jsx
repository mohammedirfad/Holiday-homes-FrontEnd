import React, { useEffect, useState } from 'react';
import { Button, Tooltip, Typography ,message} from 'antd';
import loadgifs from '../../../src/Asset/loadgif.gif';
import {DatePicker,Modal} from 'antd';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { getSingledata } from '../../api/Services/HostgetData';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {BsDoorOpen} from 'react-icons/bs';
import {BsCalendar3} from 'react-icons/bs';
import {SiSimpleicons} from 'react-icons/si';
import Map from './Map';
import moment from 'moment';
import './SingleView.css';
import { setLogin } from '../../Store/features/authSlice';
import { createChat } from '../../api/Services/ChatRequest';
const { RangePicker } = DatePicker;
const { Text } = Typography;


function SingleView() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dates ,setDates ] = useState([]);
    const [location, setLocation] = useState(null);
    
    const [endDate, setEndDate] = useState(null);

    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [perDayPrice, setPerDayPrice] = useState(100);

    const token = useSelector(state => state.userAuth.token);
    const userid = useSelector(state => state.userAuth.id);
    const imageUrls = useSelector(state => state.userAuth.imageUrl);
    const names = useSelector(state => state.userAuth.name);

    const dispatch = useDispatch();

    const Navigate = useNavigate();

    function handleCheckInDateChange(date) {
        setCheckInDate(date);
      }
    
      let numberOfDays;
      let totalPrice;

      async function handleCheckOutDateChange  (date) {
        setCheckOutDate(date);

       numberOfDays =await  checkOutDate?.diff(checkInDate, 'days');
       totalPrice = numberOfDays * perDayPrice;

      }
      console.log(numberOfDays,totalPrice)
    
    //   const numberOfDays = checkOutDate.diff(checkInDate, 'days');
    //   const totalPrice = numberOfDays * perDayPrice;

      function handleReservation() {
        const numberOfDays = checkOutDate?.diff(checkInDate, 'days');
        const totalPrice = numberOfDays * perDayPrice;
    
        // TODO: Send reservation to backend
        

        console.log(`Reservation for ${numberOfDays} days, total price: $${totalPrice}`);
        dispatch(
            setLogin({
                user:"user",
                token:token,
                id:userid,
                imageUrl:imageUrls,
                userBooking:users,
                name:names,
                total:totalPrice,
                numberOfDays:numberOfDays,
                checkindate:new Date(checkInDate.$d).toISOString(),
                checkoutdate:new Date(checkOutDate.$d).toISOString()

            })

        )
        Navigate('/booking/'+id)
      }

    const {id} = useParams();

    console.log(id)
    useEffect( ()=>{

        const fetchUser = async () =>{
           try{
              const response = await getSingledata(id);
              console.log(response,1);
              console.log(response.data,"..............11111111");
              setIsLoading(false);
              setUsers(response.data)
              setLocation(response.data.location)
              setEndDate(new Date(response?.data?.selectedDate));
              setPerDayPrice(response?.data?.price)
              setError(null);
           }
           catch(err){
            setIsLoading(false);
              setError(err?.response?.data?.message);
           }
        };    
          fetchUser();
         
          
     }, []);

     console.log(endDate,"...................................................................................................")
   
     function disabledDate(current) {
        // Disable dates before the end date
       
    return current && current.toDate() < endDate;
      }

  

function dateCellRender(value) {
    const date = value.date();
    const isDisabled = disabledDate(value);

    return (
      <div className={`ant-picker-cell-inner ${isDisabled ? 'ant-picker-cell-disabled' : ''}`}>
        <span className={`ant-picker-date ${isDisabled ? 'ant-picker-date-disabled' : ''}`}>
          {date}
        </span>
      </div>
    );
  }
  
     const dateSubmit = (date) =>
     {
        setDates(date)
        // setDates(date.map((item) =>{
        //     return (
        //         new Date(item.$d).toISOString()
        //     )
        // }) )
        setCheckOutDate(dates[1].$d)
        setCheckInDate(dates[0].$d)
     }
     console.log(dates,"::::" ,checkInDate,checkOutDate )

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

      const viewImage = (img ,i )=>{

      }
console.log(userid,users._id,token,"///////////////////////////////////////////////////////////////////////////////////")
      const handleCreateChat = async () =>{

        try{

          const response = await createChat(userid,users.owner._id,token)
          console.log("response received")

          if(response.status === 200 ){
            Navigate('/chat')
          }
        }
        catch(error){
          console.error(error,"error while creating host structure")
      }

    }
     

  return (
   <>

   <div className='mx-20 bg-gray-150 '>
   <div className='mt-4 mx-5 justify-start flex flex-row'>
    <h1 className='font-semibold text-3xl '>{users.title}</h1>
    <h1 className='font-semibold text-3xl mx-2'>( {users.structure} )</h1>
   </div>
   <div className=' mx-5 justify-start flex flex-row'>
    <h1 className='font-semibold text-lg '>Location : </h1>
    <h1 className='font-semibold text-lg mx-2 underline'>{users.location} </h1>
   </div>

    <div className='p-[10px] mt-5 '>
    <div class="image-grid">
<img class="image-grid-col-2 image-grid-row-2 rounded-l-md" src={users.images[0]} alt="architecture"></img>
		<img  src={users.images[1]} alt="architecture"></img>
		<img className='rounded-r-md'src={users.images[2]} alt="architecture"></img>
		<img   src={users.images[3]} alt="architecture"></img>
		<img className='rounded-r-md' src={users.images[4]} alt="architecture"></img>
</div>
    </div>
    {/* <ResponsiveMasonry
                columnsCountBreakPoints={{250: 1, 600: 2, 1000: 3,}}
            >
                <Masonry gutter='10px'>
                    {users.images.map((image,i)=>{
                        return (
                        <img 
                            className='hover:scale-120'
                            key={i}
                            src={image}
                            style={{width: '100%', display: "block"}}
                            alt='k'
                            onClick={()=>viewImage(image,i)}>
                        </img>
                        )
                    })}
                </Masonry>
            </ResponsiveMasonry> */}



             

<div className='w-full my-5 mt-8 mx-5 md:flex gap-2 relative'>
    <div className=' width-full justify-center md:w-1/2'>
        <div className=' flex gap-4'>
            <h1 className='font-semibold text-3xl '>Entire guest house hosted by {users.owner.LastName}</h1>
            {users.owner.Image ? <img className="w-10 h-10 relative rounded-full mt-[1.5px] " src={users.owner.Image} alt='' ></img> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-.5 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                     </svg>}

        </div>
        <hr className='mt-4'></hr>

        <div className='flex flex-col gap-6 mt-3 justify-center'>
          <div className='flex flex-row gap-3 '>
                    <BsDoorOpen className='mt-1 text-2xl'/>
                    <h1 className='font-semibold text-lg'>Self check-in</h1>
                
         </div>
         <div className='flex flex-row gap-3'>
                    <SiSimpleicons className='mt-1 text-2xl'/>
                    <h1 className='font-semibold text-lg'>{users.owner.LastName} is a Superhost</h1>
                
         </div>
         <div className='flex flex-row gap-3'>
                    <BsCalendar3 className='mt-1 text-2xl'/>
                    <h1 className='font-semibold text-lg'>Free cancellation before 2 days</h1>
                
         </div>
            
        </div>
        <hr className='mt-5'></hr>
        <div className='flex flex-col mt-3'>
            <h1 className='font-semibold text-2xl'>
                Description
            </h1>
            <h1 className='font-normal mt-1 text-gray-500'>
                {users.AdditionalDescription}
            </h1>        
                </div>

                <hr className='mt-3'></hr>

                <div className='flex flex-col gap-3 mt-3'>
                    <h1 className='font-semibold text-2xl mt-2'>What this place offers</h1>
                    <div className='flex flex-row gap-6'>
                        <h1 className='text-xl text-gray-400'>{users.description}</h1>
                       
                    </div>
                    {users.amenities.map((items)=>{
                        return (
                            <h1 className='text-xl text-gray-400'>{items}</h1>
                        )
                    })}
                </div>
            <hr className='mt-3'></hr>

            <div className='flex flex-col mt-3 '>
                <h1 className='text-2xl font-semibold'>Select checkout date</h1>
                <h1 className='text-gray-400 text-sm mt-2 mb-3'>Minimum stay: 2 nights</h1>
                {/* <RangePicker 
                
                 disabledDate={disabledDate}
                 dateRender={dateCellRender}
                 onChange={dateSubmit}
                /> */}
                  <div style={{ display: 'flex', flexDirection: 'row',gap:"2px" }}>
        <DatePicker
          value={checkInDate}
          onChange={handleCheckInDateChange}
          disabledDate={(current) => current && current.toDate() < endDate}
        />
        <DatePicker
          value={checkOutDate}
          onChange={handleCheckOutDateChange}
          disabledDate={(current) => current && current.toDate() < checkInDate}
        />
      </div>
            </div>

            <hr className='mt-5'></hr>
            <div className='flex flex-col  mt-3'>
              <h1 className='text-2xl font-semibold'>Meet your Host</h1>
              <h1 className='mt-2'>Contact the host for more info.</h1>
              <div className=''><button className='border border-black mt-3 rounded-md' onClick={handleCreateChat}><h1 className='text-black font-semibold mx-3 my-2 justify-start'>chat with host</h1></button></div>
            </div>


             

    </div>



       <div className=' width-full justify-center md:w-1/2'>
      {/* <div className='rounded-md shadow-md w-1/2 justify-start flex flex-col ml-44 md:ml-[172px]  border border-gray-300 mx-3 mt-5'>
            <div className='flex flex-row mx-2 my-3'>
                <h1 className='font-semibold text-2xl'>₹{users.price}</h1>
                <h1 className='mt-1 ml-1'>  night</h1>
            </div>
      <div className='mt-2 mx-2 mb-2'>
      <div style={{ display: 'flex', flexDirection: 'row', gap:"2px" }}>
        <DatePicker

          value={checkInDate}
          onChange={handleCheckInDateChange}
          disabledDate={(current) => current && current.toDate() < moment()}
        />
        <DatePicker
          value={checkOutDate}
          onChange={handleCheckOutDateChange}
          disabledDate={(current) => current && current.toDate() < checkInDate}
        />
      </div>
      </div>
      <div className='w-full justify-center flex'>

        <button onClick={handleReservation} disabled={!checkInDate || !checkOutDate} className='border border-primary w-[90%] rounded-md my-3 bg-primary'><h1 className='text-white font-semibold my-2'>Reserver</h1></button>
     
      </div>

       {/* {checkInDate && checkOutDate && (
        <div style={{ margin: '10px 0' }}>
          <Text>Total: ${checkOutDate.diff(checkInDate, 'days') * perDayPrice}</Text>
        </div>
      )}
      <Button type="primary" onClick={handleReservation} disabled={!checkInDate || !checkOutDate}>
        Reserve
      </Button> */}
        {/* <div className='flex justify-center '>
            <h1 className='text-neutral-600'>You won't be charged yet</h1>
        </div>

        <div className='flex justify-between mt-2 mx-4'>
<h1 className='flex'>
<h1 className='text-black font-semibold'>{users.price}</h1> <h1 className='text-black  font-semibold'><span className='hidden'>kk</span>X {numberOfDays}</h1> <p>nights</p>
</h1>
            <h1 className='font-semibold text-xl text-black'> {checkInDate && checkOutDate && (
        <div className='mt-[-2px]' >
          <Text>₹ {checkOutDate.diff(checkInDate, 'days') * perDayPrice}</Text>
        </div>
      )}

      </h1>

        </div>

        <div className='flex justify-between mt-3 mx-4'>
            <h1 className='text-black font-semibold '>Convenience Fee</h1>
            <h1 className='text-black font-semibold'>₹ 00.00</h1>
        </div>
        <hr className='text-gray-400 mt-2'></hr>
        <div className='flex justify-between mt-3 mb-3 mx-4'>
            <h1 className='text-xl font-bold '>Total</h1>
            {checkInDate && checkOutDate && (  
            <h1 className='text-xl font-bold '>₹  {checkOutDate?.diff(checkInDate, 'days') * perDayPrice}</h1>  )}
        </div>

      </div>  */}





 <div className=' shadow-md bg-white md:shadow border border-gray-300 p-4 rounded-2xl w-1/2 j mx-3 mt-5 ml-[154px]'>
 <div className="text-2xl text-center">
        Price: ₹ {users.price} / per night
      </div>

      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
          <label>Check in:</label>
          <DatePicker

value={checkInDate}
onChange={handleCheckInDateChange}
disabledDate={(current) => current && current.toDate() < moment()}
/>
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <DatePicker
          value={checkOutDate}
          onChange={handleCheckOutDateChange}
          disabledDate={(current) => current && current.toDate() < checkInDate}
        />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input type="number"
          className='decoration-none justify-center flex'
                //  value={numberOfGuests}
                //  onChange={ev => setNumberOfGuests(ev.target.value)}
                />
        </div>

    </div>





      
      <div className='w-full justify-center flex'>

        <button onClick={handleReservation} disabled={!checkInDate || !checkOutDate} className='border border-primary w-[90%] rounded-md my-3 bg-primary'><h1 className='text-white font-semibold my-2'>Reserver</h1></button>
     
      </div>

     
        <div className='flex justify-center '>
            <h1 className='text-neutral-600'>You won't be charged yet</h1>
        </div>

        <div className='flex justify-between mt-2 mx-4'>
<h1 className='flex'>
<h1 className='text-black font-semibold'>{users.price}</h1> <h1 className='text-black  font-semibold'><span className='hidden'>kk</span>X {numberOfDays}</h1> <p>nights</p>
</h1>
            <h1 className='font-semibold text-xl text-black'> {checkInDate && checkOutDate && (
        <div className='mt-[-2px]' >
          <Text>₹ {checkOutDate.diff(checkInDate, 'days') * perDayPrice}</Text>
        </div>
      )}

      </h1>

        </div>

        <div className='flex justify-between mt-3 mx-4'>
            <h1 className='text-black font-semibold '>Convenience Fee</h1>
            <h1 className='text-black font-semibold'>₹ 00.00</h1>
        </div>
        <hr className='text-gray-400 mt-2'></hr>
        <div className='flex justify-between mt-3 mb-3 mx-4'>
            <h1 className='text-xl font-bold '>Total</h1>
            {checkInDate && checkOutDate && (  
            <h1 className='text-xl font-bold '>₹  {checkOutDate?.diff(checkInDate, 'days') * perDayPrice}</h1>  )}
        </div>

      </div> 



    </div>


   

      
  
</div>

<hr className='mt-3'></hr>
<div className='h-full w-full mx-5 my-8'>
  <div className='flex justify-start mb-3'>
    <h1 className='text-black font-semibold text-2xl'>Where you’ll be</h1>
  </div>
            {location && <Map location={location} />}
 </div>
                
   </div> 

   <hr className='mt-3'></hr>



    
   </>
  )
}

export default SingleView