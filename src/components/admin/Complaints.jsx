import React, { useEffect, useState } from 'react';
import loadgifs from '../../../src/Asset/loadgif.gif';
import { getOrders } from '../../api/Services/HostsetUp';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import './Orders.css'
import moment from 'moment';
import Modals from '../../../src/components/Re-components/Modal';
import BookingTimers from '../Re-components/TimerBooking.jsx';
import {message} from 'antd';
import { BlocktheHost } from '../../api/Services/order';

function Complaints() {

    const [showAll, setShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [data ,setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm , setSearchTerm] =useState("");
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage=8;

    const token = useSelector(state => state?.adminAuth?.admin_token);

    const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data?.slice(itemOffset, endOffset);
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
            const complaints = response?.data?.filter(data => data?.complaints !== undefined);
            console.log(complaints, "njnj");
            setData(complaints);
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

     
      const handleShowAllhost =async (host) => {
       
        setUsers(host)
         setIsModalOpen(true);
    
      };

      const handleBlock = async (host) =>{
        console.log("host",host)
        try{
            const response = await BlocktheHost(host?.hoster?._id ,host?.complaints,token)
            if(response?.status == 200){
                message.success("host have been blocked")
                setIsModalOpen(false);

            }
            else{
                message.error("error ocuured")
            }
        }
        catch(error){
            console.error(error,"error while sending complaint to he order")
        }

      }




  return (
    <>
    <div className="w-full">
    <div className='flex my-5 justify-center'>
      <h1 className='text-xl md:text-4xl font-bold  justify-center mx-10 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 '>Complaint Box </h1>
    </div>

<div className='mx-10 my-4 flex flex-roew gap-3'>
<input id='search' className='text-black  border border-gray-400 text-start h-8 my-3 rounded-md' placeholder="search orders" onChange={(e)=>setSearchTerm(e.target.value)} />
<button className='bg-black rounded-md h-8 my-3'><h1 className='text-white font-semibold mx-2 '>Search</h1></button>
</div>


    <div className='overflow-auto rounded-lg shadow hidden sm:block mx-10 my-4'>
        <table className='w-full cursor-pointer'>
            <thead className='bg-gray-50 border-b-2 border-gray-200  justify-center '>
                <tr className=''>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>NO.</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Order_id</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Hoster_id</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Check-in</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Check-out</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Details</th>

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
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' ><span className={`p-1.5 text-xs font-medium uppercase tracking-wider
                    'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}>{val._id}</span></td>
                    {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' onClick={()=>navigate(`/viewAndpay/${val.carval}`,{state:{amount:val.amount,orderId:val?._id}})} ><button className='font-bold text-blue-500 hover:underline text-lg'  >view and pay</button></td> */}
                    {/* <ViewApprove open={isOpen} setOpen={setIsOpen} carval={hostval[count]}  token={token} /> */}
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'  ><span className={`p-1.5 text-xs font-medium uppercase tracking-wider
                    'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}>{val.hoster._id}</span></td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{moment(val.Check_in).format('DD/MM/YYYY')}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{moment(val.Check_out).format('DD/MM/YYYY')}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >₹ {val.Amount * 5/100}</td>
                    <td className='p-3 text-sm text-blue-700 whitespace-nowrap'onClick={()=> handleShowAllhost(val)} >View details</td>
                 
                 
                    
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
                    <div className='flex flex-row'>
                    <h1 className='font-semibold '>Location :</h1>
                    <h1 className='mx-1 '>{users?.hoster?.location}</h1>
                    </div>
                    
                </div>
  
              </div>



              <div className='flex flex-col mt-3 mx-6'>
                <h1 className='font-semibold'>Complaint :</h1>
               <div className='flex flex-row justify-between mb-4'>
               <h1 className='font-semibold text-red-400 mt-1 '>{users?.complaints}</h1>
              {
                users?.hoster?.block === true ?  <button className='rounded-lg bg-primary my[-9px] ' ><h1 className='mx-3 my-3 text-white font-semibold'>Blocked</h1></button> : <button className='rounded-lg bg-primary my[-9px] ' onClick={()=>handleBlock(users)} ><h1 className='mx-3 my-3 text-white font-semibold'>Block the Host</h1></button>
              }
               </div>
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

export default Complaints