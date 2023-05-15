
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getBankDetails, paymentSucesss } from '../../api/Services/HostsetUp';
import loadgifs from '../../../src/Asset/loadgif.gif';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function BankDetails() {

  
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const Navigate = useNavigate();

    const {state} = useLocation();
    const Orderid = state.orderId;

    const token = useSelector(state => state?.adminAuth?.admin_token);

    useEffect( ()=>{

        const fetchUser = async () =>{
           try{
              const response = await getBankDetails(id,token);
              console.log(response,1);
              console.log(response?.data,"..............11111111");
              setUsers(response?.data)
              setIsLoading(false);
            
              setError(null);
           }
           catch(err){
              
              setError(err?.response?.data?.message);
           }
        };    
          fetchUser();
        
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
   <div className='w-full'>
   <div className='flex my-5 justify-center '>
      <h1 className='text-xl md:text-4xl font-bold  justify-center mx-10 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 '>Host Bank-Details</h1>
    </div>
 <form  className="max-w-md mx-auto mt-7 flex flex-col  justify-center">
      <div className="mb-4">
        <label htmlFor="accountNumber" className="block font-medium text-gray-700">
          Account Number
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="accountNumber"
            placeholder="Enter AccountNumber"
            className={` w-full sm:text-sm rounded-md   h-[36px] `}
            value={users?.BankDetails?.AccountNumber}
           
          
          />
      
          
        </div>
       
      </div>

      <div className="mb-4">
        <label htmlFor="accountName" className="block font-medium text-gray-700">
          Account Name
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="accountName"
            placeholder="Enter AccountName"
            className={` w-full sm:text-sm rounded-md   h-[36px] `}
            value={users.BankDetails?.AccountHolderName}
        
          
          />
            
          
        </div>
       
      </div>

      <div className="mb-4">
        <label htmlFor="branch" className="block font-medium text-gray-700">
          Branch Name
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="branch"
            placeholder="Enter branch"
            className={` w-full sm:text-sm rounded-md   h-[36px]`}
            value={users.BankDetails?.BankName}
           
          
          />
            
          
        </div>
      
      </div>

      <div className="mb-4">
        <label htmlFor="ifscCode" className="block font-medium text-gray-700">
        IFSC Code
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="ifscCode"
            placeholder="Enter ifscCode"
            className={` w-full sm:text-sm rounded-md   h-[36px] `}
            value={users.BankDetails?.IFSC}
          
          
          />
       
          
        </div>
        
      </div>

      <div className="mb-4">
        <label htmlFor="pan" className="block font-medium text-gray-700">
        Pan Number
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="pan"
            placeholder="Enter pan  *optional"
            className={` w-full sm:text-sm rounded-md   h-[36px]`}
            value={users.BankDetails?.PAN}
           
          
          />
         
          
        </div>
        
       
      </div>
      <button type="submit" className=" rounded-md" >
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
                                                     const response= await paymentSucesss(Orderid,token);
                                                     console.log(response?.data)
                                                     if(response?.status === 200){
                                                        Navigate('/admin/paymentrequests')
                                                     }
                                                        console.log("res...");
                                                    }}
                                                />
                                            </PayPalScriptProvider>

      </button>
    </form>
   </div>
         


   </>
  )
}

export default BankDetails