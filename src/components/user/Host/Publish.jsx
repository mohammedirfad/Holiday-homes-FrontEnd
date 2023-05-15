import React,{useRef ,useEffect} from 'react'
import sign from '../../../Asset/Text_Signature.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Publish(){
    const videoRef = useRef(null);
    const clientName = useSelector(state => state.userAuth.name);
    useEffect(() => { videoRef.current.play(); },[]);
    const navigate = useNavigate()

    return(
        <div className='w-full h-full'>
            <div className='md:flex gap-2 relative'>
            <div className=' bg-red width-full justify-center md:w-1/2'>
            <video
        className="w-screen object-cover h-screen"
        src="https://stream.media.muscache.com/aRvUnNwsZ4XCcjkXwSXwP1jcO7oZcLszmCZjN7pbG200.mp4?v_q=high"
        
        ref={videoRef}
       
        controls
        autoPlay
      />
            </div>
                <div className='bg-black flex  selection: w-full md:w-1/2 justify-center '>
                    <div className=' items-center flex flex-row bg-black justify-center mx-40 h-auto'>
                   <div className='justify-start flex flex-col '>
                   <h1 className='text-white font-semibold text-5xl text-start md:mt-4'>Congratulations,</h1>
                   <h1 className='text-white font-semibold text-5xl text-start mt-2 capitalize'>{clientName}!</h1>
                   <h1 className='text-white text-lg mt-5  font-normal '>From one Host to another – welcome aboard. Thank you for sharing your home and helping to create incredible experiences for our guests.</h1>
                   <h1 className='mt-4 text-black'><img src={sign} className='w-6 h-4' alt='signature ceo'></img>

                   </h1>
                   <h1 className='text-white font-bold mt-5'>Mohammed irfad ,CEO</h1>
                   <div className='bg-white'>
                   <button className='bg-primary absolute bottom-0 right-0 mx-10 my-4 rounded-md' onClick={()=>navigate('/hosting')}>
                    <h1 className='mx-2 my-2 text-center text-white font-semibold  '>Lets get started </h1></button>  </div>  
                   </div>
                    </div>

               
                    
                
                    
                </div>
                   



            </div>


        </div>
    )
}

export default Publish;

{/* <div className='justify-center flex flex-col items-center'>
<h1 className='text-white font-semibold text-5xl text-start'>Congratulations,</h1>
<div className='justify-start flex flex-col '>
<h1 className='text-white font-semibold text-5xl text-start'>Mohammed!</h1>
</div>

</div> */}