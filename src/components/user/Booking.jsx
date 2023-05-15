import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { GiBurningForest } from 'react-icons/gi';
import { useSelector ,useDispatch} from 'react-redux';
import visa1 from '../../../src/Asset/visa1.jpeg'
import visa2 from '../../../src/Asset/visa2.jpeg'
import visa3 from '../../../src/Asset/visa3.jpeg'
import visa4 from '../../../src/Asset/visa4.jpeg'
import visa5 from '../../../src/Asset/visa5.jpeg'
import moment from 'moment';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { OrderData } from '../../api/Services/order';

function Booking() {

    const [paymentOption, setPaymentOption] = useState('');
    const [showModal, setShowModal] = useState(false);

    const Navigate = useNavigate();
    const userBooking = useSelector(state => state.userAuth.userBooking);
    const total = useSelector(state => state.userAuth.total);
    const token = useSelector(state => state.userAuth.token);
    const id = useSelector(state => state.userAuth.id);
    const checkoutdate = useSelector(state => state.userAuth.checkoutdate);
    const checkindate = useSelector(state => state.userAuth.checkindate);
    const numberOfDays = useSelector(state => state.userAuth.numberOfDays);
    const host_id = userBooking._id
    console.log(userBooking,id,"////",token)

    function handlePaymentOptionChange(event) {
        setPaymentOption(event.target.value);
        setShowModal(false);
      }
    
    function renderCreditCardPayment() {
        return (
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" name="card-number" className="border border-gray-400 p-2" />
            </div>
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="expiration-date">Expiration Date</label>
                <input type="text" id="expiration-date" name="expiration-date" className="border border-gray-400 p-2" />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" className="border border-gray-400 p-2" />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="card-holder-name">Card Holder Name</label>
              <input type="text" id="card-holder-name" name="card-holder-name" className="border border-gray-400 p-2" />
            </div>
            <div className="flex flex-col space-y-2 justify-center">
               <button className='flex justify-center rounded-md bg-black'><h1 className='mx-3 my-2 text-white font-semibold'>Pay</h1></button>
            </div>
          </div>
        );
      } 
    
      function renderUpiPayment() {
        return (
          <div className="flex justify-center">
            {/* <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Pay with PayPal</button> */}
            <PayPalScriptProvider options={{ "client-id":"AZo0lCt1TirrRQNpBt40pQAc1ZNpcv0PpBbSnvAdr_rag85gB-0Zab9Lq9GJrBoYPpmlpLeUcO9ml57Z"}}>
                                                <PayPalButtons
                                                    style={{
                                                        color: "blue",
                                                        shape: "pill",
                                                        label: "pay",
                                                        height: 40,
                                                    }}
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                   
                                                                    value:10,
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={async (data, actions) => {
                                                      console.log(data);
                                                      
                                                      console.log(actions);
                                               
                                                      const res = await actions.order.capture();
                                                     const response= await OrderData(id,host_id,checkindate,checkoutdate,numberOfDays,total,paymentOption,token)
                                                     console.log(response.data)
                                                     if(response.status === 200){
                                                        Navigate('/Mybookings')
                                                     }
                                                        console.log("res...");
                                                    }}
                                                />
                                            </PayPalScriptProvider>

          </div>
        );
      }
    
    
  return (
    <>
    <header className='p-4 flex justify-between border border-gray-200'>
            <a href='' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" onClick={()=>Navigate('/home')} /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </a>

    </header>

    <div className='w-full my-5 mt-8 mx-5 md:flex gap-2 relative'>
      <div className=' width-full justify-center md:w-1/2'>
            <div className='flex justify-start my-3 mx-4'>
                <h1 className='font-semibold text-4xl'>Confirm and pay</h1>
            </div>
            <div className='flex flex-col mx-3 my-14 w-3/4'>
                <h1 className='mx-2 text-2xl font-semibold justify-start flex'>Your trip</h1>
                <div className='flex flex-row justify-between mt-3 mx-2'>
                    <h1 className='text-black  font-semibold'>Guest</h1>
                    <h1 className='text-black  font-semibold mx-3'>{userBooking?.floorplan?.guest}</h1>
                </div>
                <div className='flex flex-row justify-between mt-3 mx-2'>
                    <h1 className='text-black  font-semibold'>Beds</h1>
                    <h1 className='text-black  font-semibold mx-3'>{userBooking?.floorplan?.beds}</h1>
                </div>
                <div className='flex flex-row justify-between mt-3 mx-2'>
                    <h1 className='text-black  font-semibold'>Bedrooms</h1>
                    <h1 className='text-black  font-semibold mx-3'>{userBooking?.floorplan?.bedrooms}</h1>
                </div>
                <div className='flex flex-row justify-between mt-3 mx-2'>
                    <h1 className='text-black font-semibold mt-3'>Check-in</h1>
                    <h1 className='text-black font-semibold mx-3 mt-3'>{moment(checkindate).format("DD-MM-YYYY")}</h1>
                </div>
                <div className='flex flex-row justify-between mt-3 mx-2'>
                    <h1 className='text-black font-semibold'>Check-out</h1>
                    <h1 className='text-black font-semibold mx-3'>{moment(checkoutdate).format("DD-MM-YYYY")}</h1>
                </div>


                <div className='my-6 mx-3 flex flex-col'>
                <div className='flex flex-col mt-3'>
                <h1 className=' text-2xl font-semibold justify-start flex'>Pay with</h1>
                <div className='flex flex-row justify-start gap-4 mt-2'>
                    <img src={visa1} className='w-6 h-6' alt=''></img>
                    <img src={visa2} className='w-6 h-6' alt=''></img>
                    <img src={visa3} className='w-6 h-6' alt=''></img>
                    <img src={visa4} className='w-6 h-6' alt='w-6 h-6'></img>
                    <img src={visa5} className='w-6 h-6' alt=''></img>
                </div>
                
                <div className="flex flex-col space-y-4 my-7">
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <label htmlFor="credit-card-option">
            <input
              type="radio"
              id="credit-card-option"
              name="payment-option"
              value="credit-card"
              checked={paymentOption === 'credit-card'}
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            Credit Card
          </label>
        </div>
        <div className="flex flex-col">
          <label htmlFor="upi-option">
            <input
              type="radio"
              id="upi-option"
              name="payment-option"
              value="upi"
              checked={paymentOption === 'upi'}
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            UPI
          </label>
        </div>
      </div>



      {paymentOption === 'credit-card' && renderCreditCardPayment()}
      {paymentOption === 'upi' && renderUpiPayment()}
    </div>

                </div>

                </div>
                
               </div>
      </div>

      <div className=' w-full mt-8 mx-5 gap-2 md:w-[48%]'>
        <div className='border border-gray-300 rounded-md w-1/2 my-3 mx-4  '>
            <div className='flex flex-row '>  
                <div className='w-32 h-32 mx-3 my-3'>
                    <img src={userBooking.images[0]} className='object-cover rounded-md' alt=''></img>
                </div>
               <div className='flex flex-col my-3 '>
                <h1 className='text-sm text-gray-400'>Room in {userBooking.structure}</h1>
                <h1 className='text-lg text-black'>{userBooking.title}</h1>
                <h1 className='text-lg text-black font-semibold'>{userBooking.location}</h1>
               </div>
            </div>
            <hr className='mt-[-10px]'></hr>
               <h1 className='text-center flex text-xl mx-2 my-2 ml-[14px]'>Your booking is protected by <span className=' text-rose-500  font-semibold'>AirCover</span></h1>
               <hr className='mt-5'></hr>
               <div className='flex flex-col mx-3 my-2 mt-3'>
                <h1 className='mx-2 text-2xl font-semibold justify-center flex'>Price Details</h1>
                <div className='flex flex-row justify-between mt-3'>
                    <h1 className='text-black '>₹ {userBooking.price} X  {numberOfDays}  nights</h1>
                    <h1 className='text-black font-semibold mx-3'>₹ {total}</h1>
                </div>
                <div className='flex flex-row justify-between mt-3'>
                    <h1 className='text-black '>Convinence fee</h1>
                    <h1 className='text-black font-semibold mx-3'>₹ 00.00</h1>
                </div>
                <div className='flex flex-row justify-between mt-3'>
                    <h1 className='text-black text-xl font-semibold'>Total</h1>
                    <h1 className='text-black text-xl font-semibold'>₹ {total}</h1>
                </div>
               </div>
        </div>

      </div>
    </div>


    </>
  )
}

export default Booking