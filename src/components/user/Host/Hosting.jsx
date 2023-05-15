import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { GiBurningForest } from 'react-icons/gi';
import { Hostdata } from '../../../api/Services/HostgetData';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadgifs from '../../../../src/Asset/loadgif.gif';
import Modals from '../../Re-components/Modal';
import CompletedCheckout from './CompletedCheckout';
import Ongoing from './Ongoing';
import Arriving from './Arriving';



const tabsData = [
   {

      label: "Checking out (0)",
     content:
       <CompletedCheckout/>
   },{   
     label: "Currently hosting (0)",
     content:
       <Ongoing/>
   },
   {
     label: "Arriving soon (0)",
     content:
       <Arriving/>
   },
 ];


function Hosting() {

   const [activeTabIndex, setActiveTabIndex] = useState(0);
   const [users, setUsers] = useState([]);
   const [allusers, setAllusers] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
   const [showAll, setShowAll] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [showAll1, setShowAll1] = useState(false);
   const [data , setData] = useState([]);

 
   const Navigate = useNavigate();

   const host_id = useSelector(state => state.Hostslice1.host_id);
   const token = useSelector(state => state.userAuth.token);
   const image  = useSelector (state => state.userAuth.imageUrl);
   const clientName = useSelector(state => state.userAuth.name);
   const hoster = useSelector(state => state.userAuth.id);



   useEffect( ()=>{

      const fetchUser = async () =>{
         try{
            const response = await Hostdata(hoster,token);
            console.log(response,1);
            console.log(response.data,"123123111111111111");
            setUsers(response.data.slice(0,4));
            setIsLoading(false);
          
            setError(null);
         }
         catch(err){
            setIsLoading(false);
            setError(err.response.data.message);
         }
      };    
        fetchUser();
       
   }, []);
 

   const handleShowAll =async () => {
      const response = await Hostdata(hoster,token);
      setAllusers(response.data)
      setShowAll(true);

    };

    const handlesetShowAll =async (host) => {
      console.log(host,":::::::::::::::::::::::::::::::::::::::::::::")
      setData(host)
      setShowAll1(true);
  
  
    };

    function toggleModal() {
      setIsModalOpen(!isModalOpen);
    }
   

   const slicedCards = showAll ? users : users.slice(0, 4);

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

 const test = allusers?.filter(data => data?.block !== undefined);
 console.log(test)


  return (
    <div className='w-full '>
      {console.log(users[0],5)}
        <header className='p-4 flex justify-between border-b-2 border-gray-250 '>
            <a href='' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </a>

            <div className='flex gap-5  py-2 px-4  mx-auto sm:px-4 justify-center items-center'>
               <div className='font-medium text-gray-500 hover:text-black hover:underline '>Today</div>
               <div className='font-bold border-l border-gray-300'></div>
               <div className='font-medium text-gray-500  hover:text-black hover:underline ' >Inbox</div>
               <div className='border-l border-gray-300'></div>
               <div className='font-medium text-gray-500  hover:text-black hover:underline '>
                  <button className='hover:underline' onClick={toggleModal} >
                     Menu
                  </button>
               

                  <Modal isOpen={isModalOpen} onRequestClose={toggleModal} >
  <div className="flex flex-col p-4">

    <h1 className='mb-4 text-gray-800 font-bold hover:text-gray-600' onClick={()=> Navigate('/listing')}>Listings</h1>
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

       
         <div className='p-6  justify-between  my-10  mx-4  md:mx-20 z-10'>
        <div className='flex justify-between max-w-full'>
        <div className='flex'>
                <h1 className='text-3xl  md:text-4xl font-semibold'>Welcome Back , {clientName}</h1>
        
            </div>
           {
            // allusers.length >5 && !showAll && (


              <div className='flex right-0 justify-end absolute mx-32 font-semibold underline' onClick={handleShowAll}>
               Show all ({allusers.length})
              </div>

            // )
           }
            <br></br>
      
        </div>
       
        <Modals isOpen={showAll} close={()=>setShowAll(false)} className='rounded-md'>
         <div className="w-full mt-5 flex justify-center border-gray-400 z-1 rounded-md ">
           <div className="w-full relative flex flex-col mt-50 max-w-lg gap-4 p-0 z-1 rounded-md shadow-md  dark:bg-black-400">
            <div className="w-full z-1 ">
             <div className='flex flex-wrap overflow-y-scroll h-[500px] w-full mx-4 my-6'>
             {allusers.map((user) =>{
               return(
               <div className='flex gap-10 mt-10 p-4 border border-gray-350 rounded-md relative'>

               <div className='flex flex-col justify-start'>
               <div className='font-semibold text-black'>Complete important details</div>

               <div className={`first-letter:font-normal ${
                  user.Verification_list === "Required to publish" ? "text-red-600" : "text-yellow-600"
               }`}>{user.Verification_list}</div>

              <div className='flex flex-row justify-between '>
              <div className='font-semibold text-gray-400' key={user._id}>{user.title}</div>
              

              </div>
              
               <div className='font-semibold text-gray mt-3 underline' onClick={()=>Navigate('/verify-listing')}>Continue</div>
               
               </div>

               <div className='justify-center top-1/2 bottom-1/2'>
               <div className=' right-0  flex'>
                  {
                     user.Verification_list === "Required to publish" ? <img className='w-6 h-6 justify-end flex' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFeUlEQVR4nO1aS49URRRuMuhomCiDz6XGR4IQdW00s9MmPWPXd24qcXAMG0ATA/PQLehaXZGY+A9UlioSWIBuCK9hGIgCI65AF4BESWS6qjVlTvWpOzXdPY++fXumnVBJLarvvVX11fnOqVNfdaFwr6zR4rTeVCFShuhTAxyywGVDdNsAxlei2xa4xM/4nYpSZVcq9Re6obgdOx4wRO8YoqMG+NcSuVaqAf4xwBGTJCOuWOxdeQBaP2iJPjBEv6eTIqoY4JgF9rFlKkpt5hV3u3ff52up1M+/8TNLtN8Ax/mbCNhvlmiCF2dFQFSBkgV+jVb1jAF2Oq0fbrUvVy5vNErtskRnI0BXq0pt6zSNvogGnKwmyevxOwZ4yQLjluigBabFR6yv7CNE5+XZuEmSF+Nvq0DREk1FFv48d+s4rZ/kicsAf1tgj9O6R571MSUs8FOrPuK/Aca5D+mrxxKNGuBusLYbGnoiFxCzWj/N5paBOeps9YMODKy3wJgB/mgZQL3TE91iAG5gYD33zdayRFdkzF94DnlYwoMwRCc4xPLvFaWet8C5dgE0qZMVouf82Eo9YoCTAUxmyzA/IzqdcCMjG/j3qlKDhuhOB0AE69zhgOLnMDKyIYDxNMviM6ljA5eCJQzRdkNU7RQIOxcJrUmS4WCZQDMOAK2HWHHs4BNiiY6DsBGYEIbZZ0IA4Oi2/M0u7BPAnuATmeiUJK+Efq1Sr2YA89es1s/674Gx1F+WQzELfBgcj8OhRKdMjt3QdzbLnEnnUduHGMzYcjY9n3aEzS5diVUCYiNmMNWkfX3R3IyTt7AKQrO+dvaJvIAYopscwVyhsC6KpNsXBkJ0VIDslIEnMq9inhahOTpZ4F0Bcrg5rbTe5NNqokpIADOlHZ0CQnTRz7NU6pfzTbVpoirpNVvjWJoAtjdw3kCcSZItwpwfuF0B3mykFfCZmHBfHrTqBBBLNCpz/VgW/ZNmQA55lEqVZdCDXQcE+MqzB4AHQvRtAxALzAiQzdKe7jogRFN+0ZNkiwC73GiRWirtOLeJ290ExBDd5H7c4OCjcbueWsYD0fr+uN1lQCoeSLHYG7fXKBBaI9SyHXB2znjT/pPktZVy9u/mhV/g6xwGzrt+GYdfC3yz8IZItF+AjHfBxN28CuxdckOMUpTjkZLhuqlWtH5BgPzo20RDDUAkGasljeXyxjySxpzrhSi5rSWNxeJDDUAE6RFvFaV25UKvNo+6tkmeZZV6z8+R6PumIATI2/LRWUHf104Yru8/az8GuJEerOTYHVSWxbQsVsVdlegNGXx0tYFY4P1Y3bFE15a8hkjTd+BcdOj3x8vV2EcM0elIBJmOo9eiRaxyNeYly5idVBcXodSfs0o9M2+Bia4s+1IoqBUsigX5n83KotkKgrBBjDPl8ssGmPWUr7vKWLKwPJmuQMi/kmR4JcCY2p3KW54hWj/GopzQ7EBLIALFWBaSjk9GIvY2VgA7SaeqWEKi5ikBcSrzPSNL+elqMBixDMuYAWSuIIhOB59gSwQQnNA64PFC2xc9AoZpxuqKDNTDCiCn0jlY4QaHWCe3YOwT6ZjAzGy5/FRbIGLLRDS7y2JZuF1iyomsejEDiAv+pkpo62qhfiI4tqdTu5ZYQBcOAYDr+frbVzknjLLawWcHllujPwxwhjDlnwF7QwLo+y4U1slt8XREswMdvXv3t69zVOM6yTJmln8xcALoc6dY7QdmWg6xWYvfNJlOwPWI50bS64/44MPW4eDAGoCvtTvBrRWliN/hd+t0gWtsqdX5B0Sx2CvXcYf5CJAhSlX9f1OSZHhVADQrLCjzQYdPbawA+qtsolt1PvIzH0/5HX53wfPEvVL4/5f/AJBXGxRXsD66AAAAAElFTkSuQmCC"></img> :<img className='mt-1.5 w-8 h-8' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAJK0lEQVR4nO2ZaVRT6RnH0870tD3TTs+0Z87ITNtvth86006/eEZZFJFNRDaBhAgE2Rw2BRVBQRxDEEGEQRGpghuLICIOCGUTcQBHTTT3omDuTVxwB1miEe8Njv+eGysDJFHAoB+G/znPSXLvzXPfX/7Pu9w3PN6MZjSjGb1LPaz544f36j75YLBhVqK6YdZOdf1ns9/azUFd/JihiGUsTW5jKbKSoYjzLE1cYWhCzlBEG0OTRQxNbNRS5HxQ1K+N5kni/VLdaCYebJi1V91ohhcxqxvNvPenr/HNze+zCkLA0mQDQxE/sjSJiQRDE2qGJgq0iktzjOVWN5hJfwIxg6b541nTAvF/ANVEG288iHpWRXwxPv9g4yfhgw1mzzmIwQazkyYHeNIl+5Rz4M0BRjtEDrMUKeEcHn2vgbpPvxxsNLM1eVlpVXILliIfmBJiHNAZdHb+ydC9weP9wiQQjJJwZChyaLog2J9KrZNzffS9+6yW7eqz9Lh+fb7/b94IQqsgLE0JQTeehOxYEVRNNYadocgO3CQ/+gnEM6bfyqMa8+dPvcSeKC59xtBkrykA2ksKEGDxFdw+/8dIBFjOQ9W32/WhKLIGgGnKiUvEUsSp1zXwydVLUDbXQna8BLLKUlw/XYenCvmYaw5tjofXl/8cA/Ey3L/4HBeOFhlwhlhlEhCWlvu9CuBybQVSfATYYGOLXdb2KLJyQKGVPbIXOiDWxhbpASKoTtfiwfkz+NpmHg6tWoYTG5ejIs4HeaGukHjbQuJthw2uC3EkNdFA5ycecRXxZm5Ipb9iKeKGIQD15QtIF/ljxwI7nLNwQrmLN45FRiE7KBCFMTEoC49ApSsfMgsnJC+wwSaBJ8Tei0AXRBuMM9uCkSLyMjKSEblv5oaCEBlK3CNtRayjI1rMnVDozkfzob1ghu7jx2f9UPffhJbt1b1/PHgL1buzUCsQIW2eFfZHuqNeLEJZLB/nslZCkR+NingfHI0V4EpeFDYL3YyBMJrOTrMpgzAU+f34pJpOGeJdluKsuRMy+QJo1Ld1jX4Z7U3fYUhzb8yx+7c6sV1og/YsBygPCnFu5xKoDougOhgKRb4IF7K90H3EHYc3emCA+MHY/LJmShBPKOLPDEU8H5/wQHwsas0dsY8vhKytbkyDuWj67ogeXPa6UFRsssbNEhfdL38g0gN3y+1wv9IKsuwwFMV44U65I37IsUJGoAtutzUZ6vTnpwTC0h2+45P1ytqw0XoRTtgsxb1rHXoQxkAyYkJRFu+F64X+uFnMR3eJN24U+ek+3z1mhzvlDrhV6orqzb7YE+6B7rZGQ/PKs9HzysRBKGLn+GTHM1Lx33kOKF692iDES5CB3mvYnZKEtLgYaB7dQVleJgpjBWM698Vd4TibETrmWOPWFRCLPI2OkE+pDrspOKK/KNzs7o5z5ksgra18JUhhbiaa6yuQLU7AdeqSbiAQhwXgfHaYbnTaFeSMNKEDtvs64uAqDxxZ660DkYjcQFQdNQ5CkxGTBmEo8vL4RAmOjjixcIluNDIE8Wy4D5IoIeKD+UheG4Wy/JyRc309KqSH+YDYHYH8MDfkBDkjK8AJeStd0JoWjNPpK1GyNenVKwOKSJm8Iwbmj422diiwXYL640UGQeoqilAuno0E4b9Qd6wILTXHdNFzV6E7X1O6H+LlTqhO9EVVgi92+C3Wdf50fydsCVyOx1ekrwEhd00ehCav6YE4OKLK1tWgI1eJdmxdtwrR3taoLdlltPSKd25FkttCRNubw2/Ov7FusRU2eDm/HoLmgvh20iAMRRCssgPPhzR4zgyBvXYFCUudIbVcio7Wej2IbXHRSF4TgcG+G4bLTvsQ5wpykSJ0w9n0FSiJXoYtyxbitMQfe8K9cHLTejy+fP51MOIpOEJUaW9cxUtpbylRtDkBLfMWo2JTwkgDO+WtSI2LhmRdJNQD3XoA91RyFCfF4tDXwZA6eeOhPR93PX2gjPRF1wYRbgQI0ePsg64F7jjssxz5USEgyg8bcyRoCiBkGvfl4fvdGO65rUt0s7UBEutFqHbmo+++StfQrKQ4pK6PNgghrSlDeUQEBnL2QrOnAJrsPAw4B6Dfahn6l/ijzysI/bYCDFh7Qx24RnfNo9x9aIlLwHZfPnovto0B4Z5OJw3CdO5er+2q4n6FMcl2BAXqhuDiqChcJdp06yqubAyVU16w6AXAqHiUkomBpQHQZOVCHR4PdXQSBjxDoMnNH3Ndp2Qb9sWuGj2zP0V3+28nBTEs40uGZQLogkzVm93X2i5Ch6UrskJDwD59YBBiWNuDwyGheiC6yH3xyoHoPu8eC6HhzuXmI9lXMLqs6ibthlYquDMCIhNy4/cYGKqhGrHWC0FaLEVJyEqQozo/N6uzTA/uKC+hYc16wyAvGxsWp+eEZlRsEY5a1isJ/8mDyPhVIyDyGIMd71ZbE9YvdsRRS3uct/PE0cAQnEj+Bnvi1qA0NRl5qyPwfXziq0FeOmIkkv1eOMLQxENcvvy7SYOA9PloWMpPHpYJtjOKVsLokkEhR1VmOtbb2yPT2h5VX9mibe5itMx1wKG5Nsj19dOVyOO07Ak78njUtSn+vi9AFETCpCH03FHJLQwt58cH94xevzcHpeIklEm+QeP+PWgt3I/0wAA0BUfogCbiyKPErbgoTkFW4ApkRYVzZd0NufwDninEUGTe62ddw8FQBM4dLkB2+ErkhoSgMnotLmzaAmXaDlArIqHcloFOSRqa4hOQExKMBHc3HNiSiNvtp7jvPmeU5GKeqcQNewxFklOFGYFSyEE31eDU/jxUZ2egVLwZxclJKE1LxqkD/9F/oKKIdJ6pxe1kGNuIMHVoqTZoL63uHb7g68KbDjEq+d/eCkxXbaNWJhjSyviRvOmSbteRItqnA4B5MajsAMreQ5nne7zplm6/iybFDE2wJgS5xVByZ967ENNF/J2hiNLJ/FOl7wI5wNLElilNeFMVt6Xfb+751/HHGeXF2SxFJrMUSU2o8TQ5zNBki1ZBhkIl/QPvbavP0uNgn5UH+3CO8ENj1wzRHX/h/hBlaGID92jKUOQBhiL3sjSZyW1Iczsh6Or6Pe9damC+x4J+K89N77QRM5rRjH7e+h/En1psA/R66AAAAABJRU5ErkJggg=="></img>
                  }
                  
               </div>
               </div>


            </div>
            )})}

             </div>
            </div>
            
          </div>
         </div>
        </Modals>


            <div className='flex flex-col gap-7 sm:flex-row sm:flex-wrap'>
            {/* {users.map((user) => {console.log(user.title,1)})} */}
            {users.map((user) =>{
               return(
               <div className='flex gap-10 mt-10 p-4 border border-gray-350 rounded-md relative'>

               <div className='flex flex-col justify-start'>
               <div className='font-semibold text-black'>Complete important details</div>
               <div className={`first-letter:font-normal ${
                  user.Verification_list === "Required to publish" ? "text-red-600" : "text-yellow-600"
               }`}>{user.Verification_list}</div>

              <div className='flex flex-row justify-between '>
              <div className='font-semibold text-gray-400' key={user._id}>{user.title}</div>
              

              </div>
              
               <div className='font-semibold text-gray mt-3 underline' onClick={()=>Navigate('/verify-listing/'+user._id)}>Continue</div>
               
               </div>

               <div className='justify-center top-1/2 bottom-1/2'>
               <div className=' right-0  flex'>
               {
                     user.Verification_list === "Required to publish" ? <img className='w-6 h-6 justify-end flex' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFeUlEQVR4nO1aS49URRRuMuhomCiDz6XGR4IQdW00s9MmPWPXd24qcXAMG0ATA/PQLehaXZGY+A9UlioSWIBuCK9hGIgCI65AF4BESWS6qjVlTvWpOzXdPY++fXumnVBJLarvvVX11fnOqVNfdaFwr6zR4rTeVCFShuhTAxyywGVDdNsAxlei2xa4xM/4nYpSZVcq9Re6obgdOx4wRO8YoqMG+NcSuVaqAf4xwBGTJCOuWOxdeQBaP2iJPjBEv6eTIqoY4JgF9rFlKkpt5hV3u3ff52up1M+/8TNLtN8Ax/mbCNhvlmiCF2dFQFSBkgV+jVb1jAF2Oq0fbrUvVy5vNErtskRnI0BXq0pt6zSNvogGnKwmyevxOwZ4yQLjluigBabFR6yv7CNE5+XZuEmSF+Nvq0DREk1FFv48d+s4rZ/kicsAf1tgj9O6R571MSUs8FOrPuK/Aca5D+mrxxKNGuBusLYbGnoiFxCzWj/N5paBOeps9YMODKy3wJgB/mgZQL3TE91iAG5gYD33zdayRFdkzF94DnlYwoMwRCc4xPLvFaWet8C5dgE0qZMVouf82Eo9YoCTAUxmyzA/IzqdcCMjG/j3qlKDhuhOB0AE69zhgOLnMDKyIYDxNMviM6ljA5eCJQzRdkNU7RQIOxcJrUmS4WCZQDMOAK2HWHHs4BNiiY6DsBGYEIbZZ0IA4Oi2/M0u7BPAnuATmeiUJK+Efq1Sr2YA89es1s/674Gx1F+WQzELfBgcj8OhRKdMjt3QdzbLnEnnUduHGMzYcjY9n3aEzS5diVUCYiNmMNWkfX3R3IyTt7AKQrO+dvaJvIAYopscwVyhsC6KpNsXBkJ0VIDslIEnMq9inhahOTpZ4F0Bcrg5rbTe5NNqokpIADOlHZ0CQnTRz7NU6pfzTbVpoirpNVvjWJoAtjdw3kCcSZItwpwfuF0B3mykFfCZmHBfHrTqBBBLNCpz/VgW/ZNmQA55lEqVZdCDXQcE+MqzB4AHQvRtAxALzAiQzdKe7jogRFN+0ZNkiwC73GiRWirtOLeJ290ExBDd5H7c4OCjcbueWsYD0fr+uN1lQCoeSLHYG7fXKBBaI9SyHXB2znjT/pPktZVy9u/mhV/g6xwGzrt+GYdfC3yz8IZItF+AjHfBxN28CuxdckOMUpTjkZLhuqlWtH5BgPzo20RDDUAkGasljeXyxjySxpzrhSi5rSWNxeJDDUAE6RFvFaV25UKvNo+6tkmeZZV6z8+R6PumIATI2/LRWUHf104Yru8/az8GuJEerOTYHVSWxbQsVsVdlegNGXx0tYFY4P1Y3bFE15a8hkjTd+BcdOj3x8vV2EcM0elIBJmOo9eiRaxyNeYly5idVBcXodSfs0o9M2+Bia4s+1IoqBUsigX5n83KotkKgrBBjDPl8ssGmPWUr7vKWLKwPJmuQMi/kmR4JcCY2p3KW54hWj/GopzQ7EBLIALFWBaSjk9GIvY2VgA7SaeqWEKi5ikBcSrzPSNL+elqMBixDMuYAWSuIIhOB59gSwQQnNA64PFC2xc9AoZpxuqKDNTDCiCn0jlY4QaHWCe3YOwT6ZjAzGy5/FRbIGLLRDS7y2JZuF1iyomsejEDiAv+pkpo62qhfiI4tqdTu5ZYQBcOAYDr+frbVzknjLLawWcHllujPwxwhjDlnwF7QwLo+y4U1slt8XREswMdvXv3t69zVOM6yTJmln8xcALoc6dY7QdmWg6xWYvfNJlOwPWI50bS64/44MPW4eDAGoCvtTvBrRWliN/hd+t0gWtsqdX5B0Sx2CvXcYf5CJAhSlX9f1OSZHhVADQrLCjzQYdPbawA+qtsolt1PvIzH0/5HX53wfPEvVL4/5f/AJBXGxRXsD66AAAAAElFTkSuQmCC"></img> :<img className='mt-1.5 w-10 h-10' src="data:image/png;base64,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"></img>
                  }
               </div>
               </div>


            </div>
            )})}


    
            </div>

         </div>


{
   test.length !== 0  && (
   
   <div class="bg-red-100 border border-red-400 text-red-700 px-4 mx-24 py-3 rounded flex justify-center w-1/2 relative" role="alert">
   <strong class="font-bold">Nb:</strong>
   <p class="block sm:inline">Your Host-property <span className='text-white' onClick={handlesetShowAll}
   >{data._id};</span> has been blocked by admin</p>
   <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
     <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
   </span>
 </div>

 )
}

<Modals isOpen={showAll1} close={()=>setShowAll1(false)} className='rounded-md'>

{/* <div className="w-full mt-5 flex justify-center border-gray-400 z-1 rounded-md ">
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
  
                
                
  
  
              {/* </div>
           </div>
           

         
            </div>
          </div>
        </div> */}

</Modals>

         {/* RESERVATIONS */}

         <div className='p-6  justify-between  my-10  mx-4  md:mx-20 '>
            <div className='flex'>
                <h1 className='text-2xl  md:text-3xl font-semibold'>Your reservations</h1>
            </div>
            <br></br>
            <div className='flex flex-row mx-3 gap-4'>
  
               {/* <div className='border border-gray-500 rounded-full hover:border-black cursor-pointer'>
               <h1 className='mx-3 my-1.5'>Checking out (0)</h1>
               </div>
                      */}
               
                  
               {tabsData.map((tab, idx) => {
          return (

            <div className={`border border-gray-500 rounded-full mx-2 ${activeTabIndex && "border-2 border-black"} hover:border-black cursor-pointer`}>
            <h1
              key={idx}
              className={`   transition-colors duration-300  mx-2 my-1.5 ${
                idx === activeTabIndex
                  ? ""
                  : ""
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}>
            <div className='w-full justify-center items-center foent sem '>
            {tab.label}
            </div>
            </h1>
            </div>
          );
        
        })}
                  {/* <h1 className='mx-3 my-1.5'>Currently hosting (0)</h1> */}
                  
                  
                 

               {/* <div className='border border-gray-500 rounded-full hover:border-black cursor-pointer hidden md:block'><h1 className='mx-3 my-1.5'>Arriving soon (0)</h1></div>

               <div className='border border-gray-500 rounded-full hover:border-black cursor-pointer hidden md:block'><h1 className='mx-3 my-1.5'>Upcoming (0)</h1></div>
 */}


            </div>

          <div className='flex flex-col gap-7 sm:flex-row sm:flex-wrap'></div>
            <div className='flex flex-col gap-7 sm:flex-row sm:flex-wrap'>
            <div className='flex gap-10 mt-10 p-4 w-full rounded-md relative'>
               <div className='flex flex-col justify-center '>
               {tabsData[activeTabIndex].content}
               {/* <div className='font-semibold text-black'>Complete important details</div>
               <div className='font-normal text-red-600 '>Required to publish</div>
              
               <div className='font-semibold text-gray-400'>Castle</div>
               <div className='font-semibold text-gray mt-3 underline'>Continue</div> */}
               </div>
               {/* <div className='justify-center '>
               <div className='font-semibold flex text-black justify-end right-0 '>let</div>
               </div> */}
            </div>
            <div className='flex justify-start gap-2 mt-10 p-4'>
              
            </div>
            <div className='flex justify-start gap-2 mt-10 p-4'>
               
            </div>
           
            <div className='flex justify-start gap-2 mt-10 p-4'>
               
            </div>
            </div>
         </div>

    </div>
  )
}

export default Hosting
