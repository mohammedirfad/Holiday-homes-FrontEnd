import React, { useContext, useEffect, useState } from 'react';
import { GiBurningForest } from 'react-icons/gi';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux"; 
import { setHostVerify } from '../../../Store/features/HostVerification';
import { Host_id } from '../../../Context/HostDetails';
import { HostverifyStatus } from '../../../api/Services/HostgetData';




function VerifyListing() {

   const [error, setError] = useState(null);
   const [userstatus,setUserStatus] = useState(null);
   const Navigate = useNavigate();
   const {id} = useParams();
   const dispatch = useDispatch();
   const token = useSelector(state => state.userAuth.token);

   console.log("asdfghjk........................",id);
   const { hostid, updateHostid } = useContext(Host_id);

   console.log(hostid);
   updateHostid(id)

   useEffect( ()=>{

      const fetchUser = async () =>{
         try{
            const response = await HostverifyStatus(id,token);
            console.log(response,1);
            console.log(response.data,"..............11111111");
            setUserStatus(response.data)
            
          
            setError(null);
         }
         catch(err){
            
            setError(err.response.data.message);
         }
      };    
        fetchUser();
        console.log(userstatus,">>>>>>>>>>>>0000>>>>>>>>>>>>>>>>>>")
   }, []);


   dispatch(
      setHostVerify({
         host_id: id,
         token:token
      })
   );
   
   


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
            <div className='flex gap-6 '>

               <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex
            ' >

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden md:block">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <div className='bg-gray-500 text-white rounded-full border border-gray overflow-hidden '>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-.5 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                     </svg>

                  </div>


               </div>
            </div>

         </header>
         <div className='py-6 flex flex-col md:flex gap-2  mx-6 mt-8 relative'>
            <div className=' md:mx-20  my:10 md:my-20  bg-red width-full justify-start md:w-3/4 p-4'>
               <div className='flex flex-col'>
                  <h1 className='font-bold text-2xl'>Key details to take care of</h1>
                  <h1 className='mt-5 text-sm text-black-300'>Before you publish your listing, we need to confirm a few details about you and your space. We’ll walk you through it.</h1>
               </div>
               <div className='mt-5  block md:hidden border border-gray-250 rounded-md'>
                  <h1 className='my-1.5 mx-3'>Before you publish your listing, we need to confirm a few details .</h1>
               </div>
               <div className='mt-6'>
                  <h1 className=''>Create your listing</h1>

               </div>
               <div className='flex flex-row'>

                  <h1 className=''>
                     <svg
                        className='mt-1.5'
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={25}
                        height={25}
                        viewBox="0 0 64 64"
                        style={{ fill: "#40C057" }}
                     >
                        <path d="M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M29,42L18,31l2-3l9,6 l13.957-12L46,25L29,42z" />
                     </svg>

                  </h1>
                  <h1 className='mx-2 font-bold text-sm mt-2 '>Complete!</h1>

               </div>
               <hr className='text-gray-400 w-1/2 mt-5'></hr>
               <div className='mt-6'>
                  <h1 className=''>Create your phone number</h1>

               </div>
               <div className='mt-3'>
                  <h1 className='text-gray-500'> We'll call or text you to confirm your number. Standard messaging rates apply.</h1>

               </div>
               <div className='flex flex-row'>

                  <h1 className=''>
                     <svg
                        className='mt-1.5'
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={25}
                        height={25}
                        viewBox="0 0 64 64"
                        style={{ fill: "#40C057" }}
                     >
                        <path d="M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M29,42L18,31l2-3l9,6 l13.957-12L46,25L29,42z" />
                     </svg>

                  </h1>
                  <h1 className='mx-2 font-bold text-sm mt-2 '>Complete!</h1>

               </div>

               <hr className='text-gray-400 w-1/2 mt-5'></hr>
               <div className='mt-6 flex justify-between md:w-2/4'>
                  <h1 className=''>Add a photo of your ID</h1>
                  <div className='right-0 '>
                  <BsFillArrowRightCircleFill className='mt-1.5 text-lg' onClick={()=>Navigate('/Account-fov')}/>
                  </div>

               </div>
               
               <div className='mt-3'>
                  <h1 className='text-gray-500'> It’s a simple way to help guests feel confident booking your place.</h1>

               </div>
              
              



               <div className='flex flex-row'>
                 

                  <h1 className=''>
{
   userstatus === "Required to publish" ?

                     <img className='mt-1.5 w-6 h-6' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC2klEQVR4nO1ay04UURBtdKPoTldufCc+FipfYIyPzYSZOp2rLEjQNYGVL4gIK/9BV/oJBuICMoIRTYRPwN+AmapOpk2NPTLCvOhbPQ9CJTeZdHeqzqmq+6i6EwRHcogkzuWGmWiEicaEaEqIXiVjSp/pO/0m6CcpFQqXhWiOidaZSASIWw39hoHvArwpAZd6BjwiesBEXxmotAPdlAxQYaAYAfe7BpzD8CYDa2lBt4jMatm5G5kBj+fnjwkw00maeJAQAV7HQTBkC9650wx8yQq47E+tJbVpAz6XO8tEm90CL7skNtS2L/hhBn52G7zsptRm6khoznulDdGWLrHJMrvlEYnFVHNCJ6yn997VdOlvz2i8PPhS6bnaMNFCHYEFT11cLhSud06A6JtB/poRkL+pVOwIfBSGD32NZUFAgDgiutfe+0CxXwkw0UpL8CXnLvqcbTInAFQUY1MCAry1MJQVAdFBNNs8fYh+9DsBBtZaFSPS9wSIOHbuZCPvj5iFOcsUQlX3rUYExgaGQBg+3j+BiaYHhYAQTTYiMDswBICZQ0lgeqBTiAd9EnMY3jEmYFkPxG2X0WQjY8Mwb5Wcu1IGrgrw2ww8UG64kSWeWrf0VBaDmx0lkok812uAkmYFqkkpn79gdZzOyPuVlsdp44JGhOijEL1nYNuIwHLQTrTRamTsqXWZGoXh3bYEqlEgWvU1tj06eq6mL3buOANRpuVkvWiX2KCt8qymLwIeeeriMnAtOIhol9h7DgCfBPjARDueEX0RpGwtLlnkruf4nLrdnuzOZnVyqg6182yzV9vrwEYPwP+KC4UzXuD3XHAsdjVtxsdPmYD/RyIIhrRLbHrgwx6vq26i5+ZXTPWiXWKr3Vr+B79y4KXSR7TRqkYNrlmXO95hsxA9AGo9rS35TtJLv0muaWd2gPNBP4kWGpzP32bgidatdX81mNQyUN/FExMneo3zSAJD+QPO09KKQ9tG7gAAAABJRU5ErkJggg==" />
:
<img className='mt-1.5 w-6 h-6' src="data:image/png;base64,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"></img>

}

                  </h1>
                  <h1 className='mx-2 font-bold text-sm mt-2 '>{userstatus}</h1>

               </div>
             
               
               <hr className='text-gray-400  mt-5'></hr>

               {
                  userstatus === "Required to publish" ? "" : <div> <h1 className='font-semibold'>NB :</h1> <p>click Publish to publish your listing (24hr)</p></div>
               }
            </div>
          
         <div className='flex right-0 justify-end mx-10 '>
            {
               userstatus === "Required to publish" ?   <button className='bg-black rounded-md justify-end'><h1 className='text-white mx-3 my-2.5'>Publish listing</h1></button> :   <button className='bg-black rounded-md justify-end' onClick={()=> Navigate('/hosting')}><h1 className='text-white mx-3 my-2.5'>Publish listing</h1></button>
            }
               {/* <button className='bg-black rounded-md justify-end'><h1 className='text-white mx-3 my-2.5'>Publish listing</h1></button> */}
            </div>
          

         </div>
         
      </>
   )
}

export default VerifyListing