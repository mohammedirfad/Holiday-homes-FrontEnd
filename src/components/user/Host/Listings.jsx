import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { GiBurningForest } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Hostdata } from '../../../api/Services/HostgetData';
import loadgifs from '../../../../src/Asset/loadgif.gif';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import Modals from '../../Re-components/Modal';


function Listings() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
     const [itemOffset, setItemOffset] = useState(0);
        const [showAll, setShowAll] = useState(false);
          const [searchTerm , setSearchTerm] =useState("");
     const itemsPerPage=8;


    const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);
   // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


    const Navigate = useNavigate();

    const token = useSelector(state => state?.userAuth?.token);
   const image  = useSelector (state => state?.userAuth?.imageUrl);
   const clientName = useSelector(state => state?.userAuth?.name);
   const id = useSelector(state => state?.userAuth?.id);


   useEffect( ()=>{

    const fetchUser = async () =>{
       try{
          const response = await Hostdata(id,token);
          console.log(response,1);
          console.log(response?.data,"123123111111111111");
          setUsers(response?.data);
          setIsLoading(false);
        
          setError(null);
       }
       catch(err){
          setIsLoading(false);
          setError(err?.response?.data?.message);
       }
    };    
      fetchUser();
  
 }, []);

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
      };


      const handleShowAll = async (user) => {

        console.log('show all', user)
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
    <header className='p-4 flex justify-between border-b-2 border-gray-250 '>
            <a href='' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </a>

            <div className='flex gap-5  py-2 px-4  mx-auto sm:px-4 justify-center items-center'>
               <div className='font-medium text-gray-500 hover:text-black hover:underline '>Today</div>
               <div className='font-bold border-l border-gray-300'></div>
               <div className='font-medium text-gray-500  hover:text-black hover:underline '>Inbox</div>
               <div className='border-l border-gray-300'></div>
               <div className='font-medium text-gray-500  hover:text-black hover:underline '>
                  <button className='hover:underline' onClick={toggleModal} >
                     Menu
                  </button>
               

                  <Modal isOpen={isModalOpen} onRequestClose={toggleModal} >
  <div className="flex flex-col p-4">

    <h1 className='mb-4 text-gray-800 font-bold hover:text-gray-600' onClick={()=> Navigate('/')}>Listings</h1>
    <h1 className='mb-4 text-gray-800 font-bold hover:text-gray-600' onClick={()=> Navigate('/become-a-host')}>Create a Listings</h1>
    <h1 className='mb-4 text-gray-800 font-bold hover:text-gray-600' onClick={()=> Navigate('/account-setting/address')}>Transaction</h1>
    <h1 className='mb-4 text-gray-800 font-bold hover:text-gray-600' onClick={()=> Navigate('/home')}>switch to traveling</h1>
    <h1 className='mb-4 text-gray-800 font-bold hover:text-gray-600' onClick={()=> Navigate('/home')}>Help</h1>

  </div>
</Modal>
               </div> 
              

            </div>
          

            <div className='flex gap-6 '>

               
               <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex
            ' >

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden md:block">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <div className='bg-gray-500 text-white rounded-full border border-gray overflow-hidden '>
                  { image ? <img src={image} alt="image" className="w-6 h-6 relative top-.5"></img> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-.5 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                     </svg>}

                  </div>


               </div>
            </div>

         </header>

<div className='justify-between flex  mx-12 my-5'>
    <h1 className='text-xl font-semibold'>{users.length} - Listings</h1>

 
   <button className='right-[5%] absolute flex rounded-md border border-black mx-10' onClick={()=> Navigate('/become-a-host/Overview')}>
   <h1 className='mx-2 my-2' >+ Create Listing</h1>
   </button>

</div>


<div className='mx-12 my-4 flex flex-roew gap-3'>
<input id='search' className='text-black  border border-gray-400 text-start h-8 my-3 rounded-md' placeholder="search orders" onChange={(e)=>setSearchTerm(e.target.value)} />
<button className='bg-black rounded-md h-8 my-3'><h1 className='text-white font-semibold mx-2 '>Search</h1></button>
</div>
      
    <div className='overflow-auto rounded-lg shadow hidden sm:block mx-9 my-5'>
        <table className='w-full cursor-pointer'>
            <thead className='bg-gray-50 border-b-2 border-gray-200 '>
                <tr className=''>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>NO.</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Hoster_id</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Title</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Verification</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Baths</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Beds</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Guests</th>

                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Location</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Price</th>

                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>


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
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'><span className={`p-1.5 text-xs font-medium uppercase tracking-wider
                    'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}>{val._id}</span></td>
                    {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' onClick={()=>navigate(`/viewAndpay/${val.carval}`,{state:{amount:val.amount,orderId:val?._id}})} ><button className='font-bold text-blue-500 hover:underline text-lg'  >view and pay</button></td> */}
                    {/* <ViewApprove open={isOpen} setOpen={setIsOpen} carval={hostval[count]}  token={token} /> */}
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' o ><span className={`p-1.5 text-xs font-medium uppercase tracking-wider
                    'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}>{val.title}</span></td>
                     <td className={`p-3 text-sm ${val.Verification_list === "Verification Approved" ?"text-green-700" : "text-red-700"}  whitespace-nowrap`} onClick={()=> handleShowAll(val)} >{val.Verification_list === "Verification Approved" ? "Approved" : "Pending"}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{val?.floorplan?.bathrooms}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{val?.floorplan?.beds}</td>
                    <td className={`p-3 text-sm text-gray-700 whitespace-nowrap`} >{val?.floorplan?.guest}</td>
                    <td className={`p-3 text-sm ${val.block === true ?"text-red-700" : "text-green-700"}  whitespace-nowrap`} onClick={()=> handleShowAll(val)} >{val.block === true ? "Blocked" : "completed"}</td>
                    <td className="p-3 text-sm  Completed text-gray-700  whitespace-nowrap" >{val.location}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >₹ {val.price}</td>

                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{moment(val.updatedAt).format("DD/MM/YYYY")}</td>
                 
                 
 <Modals isOpen={showAll}  close={()=>setShowAll(false)} title={"Admin Verification"} className='rounded-md'>
       {/* <div className="w-full mt-5 flex justify-center border-gray-400 z-1 rounded-md ">
           <div className="w-full relative flex flex-col mt-50 max-w-lg gap-4 p-0 z-1 rounded-md shadow-md  dark:bg-black-400">
            <div className="w-full z-1 ">
        <div className='flex justify-center'>
          <h1 className='font-semibold text-xl '>Order-Details</h1>
          </div>            
          <div className='flex gap-6 justify-center mt-2'>
          <img className='h-48 w-full rounded-md mx-3' src={users?.hoster?.images[0]} alt={users?.hoster?.title}></img>
            

            </div>
          <div className='' >
          <div className='flex flex-col justify-center'>
                                <div className='flex flex-row justify-center mt-3'>
                                <h1 className='font-semibold '>Booking-Date :</h1>
                              
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
                          </div>
          </div>
  </div>
          </div>
        </div> */}
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

    </>
  )
}

export default Listings