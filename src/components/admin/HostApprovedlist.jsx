import React, { useEffect, useState } from 'react';
import { HostApprovedstatus } from '../../api/Services/HostgetData';
import loadgifs from '../../../src/Asset/loadgif.gif';
import Modals from '../../../src/components/Re-components/Modal';
import { useSelector } from 'react-redux';


function HostApprovedlist({status}) {

  const [users, setUsers] = useState([]);
  const [data ,setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const token = useSelector(state => state?.adminAuth?.admin_token);

  useEffect( ()=>{

    const fetchUser = async () =>{
       try{
          const response = await HostApprovedstatus(token);
          console.log(response,1);
          console.log(response.data,"123123111111111111");
          setUsers(response.data);
          setIsLoading(false);
        
          setError(null);
       }
       catch(err){
          setIsLoading(false);
          setError(err.response.data.message);
       }
    };    
      fetchUser();
      console.log(users,">>>>>>>>>>>>0000>>>>>>>>>>>>>>>>>>")
 }, []);

 const handleShowAll =async (host) => {
  console.log(host,":::::::::::::::::::::::::::::::::::::::::::::")
  setData(host)
  setShowAll(true);


};

function toggleModal() {
  setIsModalOpen(!isModalOpen);
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
    <div className='mx-4 mt-4'>
        <h1 className='font-semibold text-2xl'>
          Showing {status} listings..
        </h1>
    </div>

    <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4 mx-3">
        {
          users.map((host)=>{
            return (
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white justify-center flex underline">
                {host.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {host.structure}
            </p>
            <Modals isOpen={showAll}  close={()=>setShowAll(false)} title={"Admin Verification"} className='rounded-md'>
       <div className="w-full mt-5 flex justify-center border-gray-400 z-1 rounded-md ">
           <div className="w-full relative flex flex-col mt-50 max-w-lg gap-4 p-0 z-1 rounded-md shadow-md  dark:bg-black-400">
            <div className="w-full z-1 ">
        
            <div className='flex gap-6 justify-center'>
              <div className='h-56 w-56'>
                  <h1 className='flex font-semibold justify-center'>front image</h1>
                  <img className='h-48 w-56' src={data.Id_front_Image} alt={data.title}></img>
              </div>
              <div className='h-56 w-56'>
              <h1 className='flex font-semibold justify-center'>back image</h1>
              <img className='h-48 w-56' src={data.Id_back_Image} alt={data.title}></img>
              </div>

              <div className=' h-56 w-56'>
            <h1 className='flex font-semibold justify-center'>user Selfie image</h1>
              <img className='h-48 w-56' src={data.Host_Selfie} alt={data.title}></img>

            </div>

            </div>
            <div className='w-full border border-black rounded-md mt-5 '>
              <div className='flex flex-col mx-6'>
                  <div className='flex flex-row'>
                  <h1 className='font-semibold '>Title :</h1>
                  <h1 className=' '>{host.title}</h1>
                  </div>
                  <div className='flex flex-row'>
                  <h1 className='font-semibold '>ID-Type :</h1>
                  <h1 className=' '>{host.IdType}</h1>
                  </div>
                  <div className='flex flex-row'>
                  <h1 className='font-semibold '>Amenities :</h1>
                  <h1 className=' '>{host.amenities}</h1>
                  </div>
                  <div className='flex flex-row'>
                  <h1 className='font-semibold '>PropertyList:</h1>
                  <h1 className=' '>{host.PropertyList}</h1>
                  </div>
              </div>

              <div className='flex mx-14 justify-center mt-7 mb-14'>
                 <div className='flex flex-row'>
                  <h1 className='font-semibold '>Verification :</h1>
                  <h1 className='text-xl  font-bold text-green-500 mt-[-1px] mx-2'>Approved</h1>
                  </div>
              </div>
            </div>
           

         
            </div>
          </div>
        </div>
       </Modals>
           <div className='flex justify-between  gap-10'>
           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {host.location}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              ${host.price ? host.price :"00.00" }
            </p>
           </div>
            <div
            onClick={()=> handleShowAll(host)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              view details
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
          




            )
          })
        }
        
      </div>
    </>
  )
}

export default HostApprovedlist