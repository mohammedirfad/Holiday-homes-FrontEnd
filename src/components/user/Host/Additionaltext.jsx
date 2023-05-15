import React,{useState} from 'react';
import ProgressComponent from './ProgressComponent';
import { HOST_AMENITIES } from '../../../Constants/HostLinks';
import { hostAddDesc } from '../../../api/Services/HostsetUp';
import { useSelector,useDispatch } from 'react-redux';
import { setHoststep2 } from '../../../Store/features/HostSlicestep2';

function Additionaltext(){

    const adddescriptions = useSelector(state => state.Hostslice2.adddescriptions)
  
    console.log(adddescriptions,"  qlkwefrgthjkl")
    const [text, setText] = useState(adddescriptions || "");
    const [count, setCount] = useState(52);
    const token = useSelector(state => state.userAuth.token);
    const host_id = useSelector(state => state.Hostslice1.host_id);

    const dispatch = useDispatch();

    const handleTextChange = event => {
       const value = event.target.value;
    
      if (value.length <= 100) {
        setText(value);
        setCount(value.length);
        dispatch(
          setHoststep2({
            user:"Hostuser",
            adddescriptions:value
          })
        )
      }
    };
    const handleNext = async () => {
      try{
        if (text.length < 0) {
          alert('Please enter more text');
        
        }
         const response = await hostAddDesc (text,host_id,token)
      }
      catch(e){
        console.error(e,"erorr occured at host additional description");
      }
     
  }

    return(
      <>
        <div className='w-full'>
              <div className='justify-center items-center flex flex-col my-16'>
              <div className='justify-center'>
              <h1 className='text-3xl md:text-4xl w-full font-semibold font-sans'>
              Create your description
                </h1>
                <h1 className='tex-2g md:text-xl text-gray-500 mt-5'>
                Share what makes your place special.

                </h1>
                <textarea className='border border-gray-500 w-[40rem] h-48 mt-8 rounded-md' value={text} onChange={handleTextChange} />
                <div className='font-semibold'> {count}/100</div>


              </div>
              </div>
        </div>
        
  <ProgressComponent link={HOST_AMENITIES} handler={handleNext}/>
        </>
    )
}

export default Additionaltext;