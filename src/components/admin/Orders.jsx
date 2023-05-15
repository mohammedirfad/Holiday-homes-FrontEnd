import React, { useEffect, useState } from 'react';
import loadgifs from '../../../src/Asset/loadgif.gif';
import { getOrders } from '../../api/Services/HostsetUp';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Orders.css'
import moment from 'moment';
import { useSelector } from 'react-redux';
import Modals from '../../../src/components/Re-components/Modal';
import BookingTimers from '../Re-components/TimerBooking.jsx';

function Orders() {

    const [showAll, setShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [data,setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm , setSearchTerm] =useState("");
    const [itemOffset, setItemOffset] = useState(0);

    const token = useSelector(state => state?.adminAuth?.admin_token);
    const itemsPerPage=8;

    const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset,endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


    const Navigate = useNavigate();

    useEffect(() => {

        const fetchUser = async () => {
          try {
            const response = await getOrders(token);
            console.log(response, 1);
            console.log(response?.data, "123123111111111111");
            setData(response?.data);
            setIsLoading(false);
    
            setError(null);
          }
          catch (err) {
            setIsLoading(false);
            setError(err?.response?.data?.message);
          }
        };
        fetchUser();
   
      }, []);

      const handleShowAll =async (host) => {
        console.log(host,":::::::::::::::::::::::::::::::::::::::::::::")
        setUsers(host)
        setShowAll(true);
    
    
      };
      const handleShowAllhost =async (host) => {
        console.log(host,":::::::::::::::::::::::::::1236547893::::::::::::::::::")
        setUsers(host)
         setIsModalOpen(true);
    
    
      };




  return (
    <>
    <div className="w-full">
    <div className='flex my-5 justify-center'>
      <h1 className='text-xl md:text-4xl font-bold  justify-center mx-10 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 '>Orders</h1>
    </div>

<div className='mx-5 my-4 flex flex-roew gap-3'>
<input id='search' className='text-black  border border-gray-400 text-start h-8 my-3 rounded-md' placeholder="search orders" onChange={(e)=>setSearchTerm(e.target.value)} />
<button className='bg-black rounded-md h-8 my-3'><h1 className='text-white font-semibold mx-2 '>Search</h1></button>
</div>


    <div className='overflow-auto rounded-lg shadow hidden sm:block mx-5 my-4'>
        <table className='w-full cursor-pointer'>
            <thead className='bg-gray-50 border-b-2 border-gray-200 '>
                <tr className=''>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>NO.</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Order_id</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Hoster_id</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Check-in</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Check-out</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Payment Status</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>refund/camcel</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>order</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
 


                </tr>

            </thead>
            <tbody>


            { 

           
currentItems.filter((val)=>{
                if(searchTerm == ""){

                    return val;
                }
                else if(val._id.includes(searchTerm) ){
                    return val;
                }

            })
            
            
            .map((val,index)=>
                (<tr >
                
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{index + 1}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' onClick={()=> handleShowAll(val)}><span className={`p-1.5 text-xs font-medium uppercase tracking-wider
                    'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}>{val._id}</span></td>
                    {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' onClick={()=>navigate(`/viewAndpay/${val.carval}`,{state:{amount:val.amount,orderId:val?._id}})} ><button className='font-bold text-blue-500 hover:underline text-lg'  >view and pay</button></td> */}
                    {/* <ViewApprove open={isOpen} setOpen={setIsOpen} carval={hostval[count]}  token={token} /> */}
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' onClick={()=> handleShowAllhost(val)} ><span className={`p-1.5 text-xs font-medium uppercase tracking-wider
                    'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}>{val.hoster._id}</span></td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{moment(val.Check_in).format('DD/MM/YYYY')}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{moment(val.Check_out).format('DD/MM/YYYY')}</td>
                    <td className={`p-3 text-sm ${val.payment === "Refunded" ? "text-green-700" : "text-red-700"} whitespace-nowrap`} >{val.payment ? val.payment :"Nil"}</td>
                    <td className={`p-3 text-sm ${val.paymentstatus === "Completed" ?"text-green-700" : "text-red-700"}  whitespace-nowrap`} >{val.paymentstatus}</td>
                    <td className={`p-3 text-sm ${val.orderstatus === "Completed" ? "text-green-700 " :  "text-red-700"} whitespace-nowrap`} >{val.orderstatus}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >₹ {val.Amount * 5/100}</td>
                 
                 
                    <Modals isOpen={showAll}  close={()=>setShowAll(false)} title={"Admin Verification"} className='rounded-md'>
       <div className="w-full mt-5 flex justify-center border-gray-400 z-1 rounded-md ">
           <div className="w-full relative flex flex-col mt-50 max-w-lg gap-4 p-0 z-1 rounded-md shadow-md  dark:bg-black-400">
            <div className="w-full z-1 ">
        <div className='flex justify-center'>
          <h1 className='font-semibold text-xl '>Order-Details</h1>
          </div>            
          <div className='flex gap-6 justify-center mt-2'>
          <img className='h-48 w-full rounded-md mx-3' src={users?.hoster?.images[0]} alt={users?.hoster?.title}></img>
              {/* <div className='h-56 w-60 border border-black rounded-md'>
                  <h1 className='flex font-semibold justify-center'>front image</h1>
                  <img className='h-48 w-56 rounded-md' src={users?.hoster?.Id_front_Image} alt={users?.hoster?.title}></img>
              </div>
              <div className='h-56 w-60 border border-black rounded-md'>
              <h1 className='flex font-semibold justify-center'>back image</h1>
              <img className='h-48 w-56 rounded-md' src={users?.hoster?.Id_back_Image} alt={users?.hoster?.title}></img>
              </div>

              <div className=' h-56 w-60 border border-black rounded-md'>
            <h1 className='flex font-semibold justify-center'>user Selfie </h1>
              <img className='h-48 w-56 rounded-md' src={users?.hoster?.Host_Selfie} alt={users?.hoster?.title}></img>

            </div> */}

            </div>
          <div className='' >
          <div className='flex flex-col justify-center'>
                                <div className='flex flex-row justify-center mt-3'>
                                <h1 className='font-semibold '>Booking-Date :</h1>
                                {/* <h1 className=' '>{users?.Date}</h1> */}
<h1 className='text-red-500 font-semibold mx-2'
>
  {
  new Date() < users?.Check_in  ? <BookingTimers bookingDate={new Date(users?.Date)} checkinDate={new Date(users?.Check_in)} /> :moment(users?.Date).format('DD/MM/YYYY') 
}</h1>

                                </div>
                                </div>
          <div className='w-full border border-black rounded-md mt-5 justify-between flex'>
              
              
                          <div className='flex flex-col mx-6 my-3'>
                                <div className='flex flex-row'>
                                <h1 className='font-semibold '>Name :</h1>
                                <h1 className=' mx-1'>{users?.owner?.FirstName}</h1>
                                </div>
                                <div className='flex flex-row'>
                                <h1 className='font-semibold '>Email:</h1>
                                <h1 className='mx-1 '>{users?.owner?.Email}</h1>
                                </div>
                                <div className='flex flex-row'>
                                <h1 className='font-semibold '>PaymentMethod :</h1>
                                <h1 className='text-green-500 mx-1 font-semibold '>{users.PaymentMethod}</h1>
                                </div>
                                <div className='flex flex-row'>
                                <h1 className='font-semibold '>NumberOffdays :</h1>
                                <h1 className='mx-1 '>{users?.NumberOffdays}</h1>
                                </div>
                                <div className='flex flex-row'>
                                <h1 className='font-semibold '>Payment :</h1>
                                <h1 className='text-green-500 mx-1 font-semibold '>Completed</h1>
                                </div>
                            </div>
                            <div className='flex flex-col mx-6 my-3'>
                                <div className='flex flex-row'>
                                <h1 className='font-semibold '>Title :</h1>
                                <h1 className='mx-1 '>{users?.hoster?.title}</h1>
                                </div>
                                <div className='flex flex-row'>
                                <h1 className='font-semibold '>ID-Type :</h1>
                                <h1 className=' mx-1'>{users?.hoster?.IdType}</h1>
                                </div>
                                
                                <div className='flex flex-row'>
                                <h1 className='font-semibold '>PropertyList:</h1>
                                <h1 className='mx-1'>{users?.hoster?.PropertyList}</h1>
                                </div>
                                
                            </div>
              
                            
                            
              
                            {/* <div className='flex justify-between mx-14 mt-6 mb-10'>
                              <div className='flex'>
                                <button className='border border-green-500 rounded-md hover:bg-green-600 hover:text-white ' onClick={()=>userAccept(val.hoster._id)}>
                                  <h1 className='mx-3 my-2 text-semi-bold text-green-700 hover:text-white'>Accept</h1>
                                </button>
                              </div>
                              <div className='flex'>
                                <button className='border border-red-500 rounded-md  hover:bg-red-600 hover:text-white' onClick={()=>userReject(host._id)}>
                                <h1 className='mx-3 my-2 text-semi-bold'>Reject</h1>
                                </button>
                              </div>
                            </div> */}
              
                          </div>
          </div>
           

         
            </div>
          </div>
        </div>
       </Modals>
       <Modals isOpen={isModalOpen}  close={()=>setIsModalOpen(false)} title={"Admin Verification"} className='rounded-md'>
       <div className="w-full mt-5 flex justify-center border-gray-400 z-1 rounded-md ">
           <div className="w-full relative flex flex-col mt-50 max-w-lg gap-4 p-0 z-1 rounded-md shadow-md  dark:bg-black-400">
            <div className="w-full z-1 ">
        
            <div className='flex gap-6 justify-center'>
              <div className='h-56 w-56'>
                  <h1 className='flex font-semibold justify-center'>front image</h1>
                  <img className='h-48 w-56' src={users?.hoster?.Id_front_Image} alt={data.title}></img>
              </div>
              <div className='h-56 w-56'>
              <h1 className='flex font-semibold justify-center'>back image</h1>
              <img className='h-48 w-56' src={users?.hoster?.Id_back_Image} alt={data.title}></img>
              </div>

              <div className=' h-56 w-56'>
            <h1 className='flex font-semibold justify-center'>user Selfie image</h1>
              <img className='h-48 w-56' src={users?.hoster?.Host_Selfie} alt={data.title}></img>

            </div>

            </div>
           <div className=''>
            <div className='flex flex-row justify-center mt-1'>
              <h1 className='text-black font-semibold'>Verification :</h1>
              <h1 className='text-green-500 font-semibold mx-1'>{users?.hoster?.Verification_list}</h1>
            </div>
           <div className='w-full border border-black rounded-md mt-5 justify-between flex'>
              
              
              <div className='flex flex-col mx-6 my-3'>
                    <div className='flex flex-row'>
                    <h1 className='font-semibold '>Name :</h1>
                    <h1 className=' mx-1'>{users?.hoster?.owner?.FirstName}</h1>
                    </div>
                    <div className='flex flex-row'>
                    <h1 className='font-semibold '>Email:</h1>
                    <h1 className='mx-1 '>{users?.hoster?.owner?.Email}</h1>
                    </div>
                    <div className='flex flex-row'>
                    <h1 className='font-semibold '>Id-type :</h1>
                    <h1 className=' mx-1 font-semibold '>{users?.hoster?.IdType}</h1>
                    </div>
                    <div className='flex flex-row'>
                    <h1 className='font-semibold '>Location :</h1>
                    <h1 className='mx-1 '>{users?.hoster?.location}</h1>
                    </div>
                    <div className='flex flex-row'>
                    <h1 className='font-semibold '>Price :</h1>
                    <h1 className=' mx-1 font-semibold '>₹ {users?.hoster?.price}</h1>
                    </div>
                </div>
                <div className='flex flex-col mx-6 my-3'>
                    <div className='flex flex-row'>
                    <h1 className='font-semibold '>Structure :</h1>
                    <h1 className='mx-1 '>{users?.hoster?.structure}</h1>
                    </div>
                    
                    
                    <div className='flex flex-row'>
                    <h1 className='font-semibold '>PropertyList:</h1>
                    <h1 className='mx-1'>{users?.hoster?.PropertyList}</h1>
                    </div>
                    
                </div>
  
                
                
  
                {/* <div className='flex justify-between mx-14 mt-6 mb-10'>
                  <div className='flex'>
                    <button className='border border-green-500 rounded-md hover:bg-green-600 hover:text-white ' onClick={()=>userAccept(val.hoster._id)}>
                      <h1 className='mx-3 my-2 text-semi-bold text-green-700 hover:text-white'>Accept</h1>
                    </button>
                  </div>
                  <div className='flex'>
                    <button className='border border-red-500 rounded-md  hover:bg-red-600 hover:text-white' onClick={()=>userReject(host._id)}>
                    <h1 className='mx-3 my-2 text-semi-bold'>Reject</h1>
                    </button>
                  </div>
                </div> */}
  
              </div>
           </div>
           

         
            </div>
          </div>
        </div>
       </Modals>
                </tr>)
            ) }
              
            </tbody>

        </table>

   
        </div>
        
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />


    </div>
    </>
   
  )
}

export default Orders