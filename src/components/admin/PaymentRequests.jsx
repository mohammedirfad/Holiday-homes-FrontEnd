import React, { useEffect, useState } from 'react';
import loadgifs from '../../../src/Asset/loadgif.gif';
import { getPaymentRequests } from '../../api/Services/HostsetUp';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

function PaymentRequests() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ID = users;
  console.log(ID,"??????????????????????????????")
  const Navigate = useNavigate();
  const token = useSelector(state => state?.adminAuth?.admin_token);
    useEffect( ()=>{

        const fetchUser = async () =>{
           try{
              const response = await getPaymentRequests(token);
              console.log(response,1);
              console.log(response?.data,"123123111111111111");
              setUsers(response?.data);
              response?.data && setIsLoading(false);
            
              setError(null);
           }
           catch(err){
              setIsLoading(false);
              setError(err?.response?.data?.message);
           }
        };    
          fetchUser();
          console.log(users,">>>>>>>>>>>>0000>>>>>>>>>>>>>>>>>>")
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
<div className="w-full">
<div className='flex my-5 justify-center'>
      <h1 className='text-xl md:text-4xl font-bold  justify-center mx-10 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 '>Host Payment</h1>
    </div>


    <div className='overflow-auto rounded-lg shadow hidden sm:block mx-5 my-4'>
        <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr className=''>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>NO.</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Hoster_id</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Check-in</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Check-out</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Payment Status</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>refund/camcel</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Procced Payment</th>


                </tr>

            </thead>
            <tbody>
            { users.map((data,index)=>
                (<tr >
                
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{index + 1}</td>
                    {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' onClick={()=>navigate(`/viewAndpay/${data.carData}`,{state:{amount:data.amount,orderId:data?._id}})} ><button className='font-bold text-blue-500 hover:underline text-lg'  >view and pay</button></td> */}
                    {/* <ViewApprove open={isOpen} setOpen={setIsOpen} carData={hostData[count]}  token={token} /> */}
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' ><span className={`p-1.5 text-xs font-medium uppercase tracking-wider
                    'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}>{data.hoster._id}</span></td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{moment(data.Check_in).format('DD,MM,YYYY')}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{moment(data.Check_out).format('DD,MM,YYYY')}</td>
                    <td className={`p-3 text-sm ${data.payment === "Refunded" && "text-green-700"} text-red-700 whitespace-nowrap`} >{data.payment ? data.payment :"Nil"}</td>
                    <td className={`p-3 text-sm ${data.paymentstatus === "Refunded" && "text-green-700"} text-red-700 whitespace-nowrap`} >{data.paymentstatus}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >₹ {(data.Amount * 5)/100} </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' ><button className='rounded-md bg-primary'onClick={()=>Navigate('/admin/proccedPayment/'+ data?.hoster?.owner , {state:{orderId:data._id}})}><h1 className='mx-2 my-2 text-white font-semibold'>Pay out</h1></button></td>
                </tr>)
            ) }
              
            </tbody>

        </table>
        </div>
        
    













</div>
   </>
  )
}

export default PaymentRequests