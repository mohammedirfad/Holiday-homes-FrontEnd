import React,{useState} from 'react';
import ProgressComponent from './ProgressComponent';
import { HOST_DECSRIPTION } from '../../../Constants/HostLinks';
import { hostTitle } from '../../../api/Services/HostsetUp';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"; 
import { setHoststep2 } from '../../../Store/features/HostSlicestep2';


function Title(){
    const Title = useSelector(state => state.Hostslice2.title) 
    const [text, setText] = useState( Title || "");
    const [count, setCount] = useState(0);
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
              title:value
          })
      )

      }

    };
    const handleNext = async () => {

      try{
        console.log("w8 response");
        const response = await hostTitle (text,host_id,token);
        console.log(response.data,">>>>>>>>>>>????<><><")
      }
      catch(err){
        console.log(err,"error occured at title")
      }
  }
    return(
      <>
        <div className='w-full'>
              <div className='justify-center items-center flex flex-col my-16'>
              <div className='justify-center'>
              <h1 className='text-2xl md:text-3xl font-semibold font-sans'>
              Now, let s give your casa particular a title
                </h1>
                <h1 className='tex-lg md:text-lg text-gray-500 mt-5'>
                Short titles work best. Have fun with it – you can always change it later.

                </h1>
                <textarea className='border border-gray-500 w-full h-40 mt-8 rounded-md' value={text} onChange={handleTextChange} />
                <div className='font-semibold'> {count}/100</div>


              </div>
              </div>
        </div>
        <ProgressComponent link={HOST_DECSRIPTION} handler={handleNext}/>
        </>
    )
}

export default Title;