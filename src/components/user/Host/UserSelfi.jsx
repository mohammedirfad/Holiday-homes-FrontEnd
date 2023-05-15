import React ,{ useState, useEffect ,useRef, useContext}from 'react';
import { GiBurningForest } from 'react-icons/gi';
import {BsCamera } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Host_id } from '../../../Context/HostDetails';
import { HostPhotoverify } from '../../../api/Services/HostsetUp';
import { useSelector } from 'react-redux';

function UserSelfi() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const {hostid} = useContext(Host_id);
    console.log(hostid,"..................")

    const token = useSelector(state => state.userAuth.token);
  
    
  
    const handleCapture = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImageData(dataUrl);
     
    };
  console.log(imageData,"....................")
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    .catch(error => {
      if (error.name === 'NotAllowedError') {
        setErrorMessage('Permission to access webcam denied');
      } else {
      setErrorMessage(error.message);
      }
    });

const HandleSubmit = async () =>{
  console.log(1);
  try{

    const response = await HostPhotoverify(imageData,hostid,token)
    if(response.status === 200){
      navigate('/reviewing')
    }
    else{
      alert("error occured")
    }
  }
  catch(err){
    console.error(err,"error at user photo verification")
  }
  navigate('/reviewing')
}
  return (
    <>
     <header className='p-4 flex justify-between border-b-2 border-gray-250 '>

            <a href='' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </a>
            
            <div className='flex gap-6 '>

               <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex' >


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

         <div className='justify-center items-center flex flex-col my-16'>
              <div className='justify-center mx-3'>

              <h1 className='text-2xl md:text-3xl font-semibold font-sans'>
             Take a photo
                </h1>
                <h1 className='tex-lg md:text-lg text-gray-500 mt-5'>
                Make sure it’s well-lit, clear, and we can see your entire face.

                </h1>

                <div>
      {errorMessage && <p>{errorMessage}</p>}
      <div className='justify-center items-center mx-10 my-10 ml-[10px]' style={{ position: 'relative'  }}>
        <video ref={videoRef} className='h-96 w-96 border border-black-500'  />
        <canvas className=' mx-2 w-12 h-24 border border-gray-700' ref={canvasRef} style={{ display: 'none' }} />
        {imageData && <img src={imageData} style={{ position: 'absolute', top: 0, left: 0 }} />}
      </div>
      <button className='justify-center bg-black rounded-md absolute right-[49%] flex' onClick={handleCapture}><h1 className='mx-3 my-2 text-white font-semibold flex'><BsCamera className='mt-1 mx-2'/>Capture</h1></button>
    </div>

                </div>
                </div>
                <hr className='mt-7'></hr>
<div className='w-full mt-2 flex mx-4 mb-2'>
<button className='justify-end bg-black right-[40px] absolute rounded-md mt-3 mx-3 mb-3' onClick={HandleSubmit}>
  <h1 className='mx-3 my-2 text-white font-semibold '>Continue</h1></button>
</div>

    </>
  )
}

export default UserSelfi