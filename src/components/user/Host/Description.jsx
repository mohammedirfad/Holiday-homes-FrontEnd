import React,{useState} from 'react';
import {AiOutlineHome} from 'react-icons/ai'
import {RiFootprintLine} from 'react-icons/ri'
import {GiEvilTower} from 'react-icons/gi'
import {MdFamilyRestroom} from 'react-icons/md'
import {SiStylelint} from 'react-icons/si'
import {GoLocation} from 'react-icons/go'
import {TbBrandSpacehey} from 'react-icons/tb'
import ProgressComponent from './ProgressComponent';
import { ADD_MORE, HOST_PLAN } from '../../../Constants/HostLinks';
import { hostDesc } from '../../../api/Services/HostsetUp';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"; 
import { setHoststep2 } from '../../../Store/features/HostSlicestep2';
 



function Description(){

const Desc = useSelector (state => state.Hostslice2.description);

const [selectedOption, setSelectedOption] = useState(Desc || "");
const token = useSelector(state => state.userAuth.token);
const host_id = useSelector(state => state.Hostslice1.host_id);

const dispatch = useDispatch();

const handleOptionChange = (event) => {
    console.log("bdjgsbfugf hur")
    const value =event.target.value
  setSelectedOption(event.target.value);
  console.log(selectedOption,"...........................",value)
  dispatch(
    setHoststep2({
        user:"Hostuser",
        description:value
    })
)

  event.target.value = "";
}; 
const handleNext = async () => {

  if(selectedOption === ""){
    alert("Please select an option")
  }
 await hostDesc(selectedOption,host_id,token).then((response)=>{
    console.log(response,"@ escription")
    if(response.status === 200){
      
    }
    else{
      alert("Something went wrong")
    }
 })
    
}
    return(
        <>
        <div className='w-full'>
            <div className='justify-center items-center flex flex-col my-16'>
            <div className='justify-center'>
            <h1 className='text-2xl md:text-3xl font-semibold font-sans'>
                  Next, let's describe your casa particular </h1>
            <h1 className='tex-lg md:text-lg text-gray-500'>
                Choose up to 1 highlights. We'll use these to get your description started.</h1>

            


            </div>
            <div className='flex flex-col gap-3 mt-8 ml-24 '>
            <div className='flex flex-row gap-3 ml-[-43px]'>
                <div className={`flex flex-col gap-3 border ${selectedOption === "Peacefull" ? "border-2 border-black" : " border-gray-300"} hover:border-black w-48 h-12 rounded-full p-4`}>
                        <button>
                        <input 
                            type='radio'
                            value="Peacefull"
                            id='op2'
                            className='hidden'
                            
                            onChange={handleOptionChange}>

                            </input>
                          
                            <RiFootprintLine className='text-xl'/>
                            <h1 className='font-semibold text-lg mt-[-23px]'><label htmlFor='op2'>Peacefull</label></h1>
                        </button>
                   </div>
                   <div className={`flex flex-col gap-3 border ${selectedOption === "unique" ? "border-2 border-black" : " border-gray-300"} hover:border-black w-48 h-12 rounded-full p-4`}>
                        <button >
                            <input 
                            type='radio'
                            value="unique"
                            id='op1'
                            className='hidden'
                            
                            onChange={handleOptionChange}></input>
                            <GiEvilTower className='text-xl'/>
                            <h1 className='font-semibold text-lg mt-[-23px]'><label htmlFor="op1">Unique</label></h1>
                        </button>
                   </div>


                   <div className='flex flex-col gap-3 border border-gray-300 hover:border-black w-48 h-12 rounded-full p-4'>
                        <button>
                        <input 
                            type='radio'
                            value="family-freindly"
                            id='op6'
                            className='hidden'
                            
                            onChange={handleOptionChange}></input>
                            <MdFamilyRestroom className='text-xl'/>
                            <h1 className='font-semibold text-lg mt-[-23px] mx-2'><label htmlFor='op6'>family-freindly</label></h1>
                        </button>
                   </div>
                </div>



                <div className='flex flex-row gap-3 mt-4 ml-[-43px]'>
                <div className='flex flex-col gap-3 border border-gray-300 hover:border-black w-48 h-12 rounded-full p-4'>
                        <button>
                        <input 
                            type='radio'
                            value="Stylish"
                            id='op3'
                            className='hidden'
                            
                            onChange={handleOptionChange}></input>
                          
                            <SiStylelint className='text-xl'/>
                            <h1 className='font-semibold text-lg mt-[-23px]'><label htmlFor='op3'>Stylish</label></h1>
                        </button>
                   </div>
                   <div className='flex flex-col gap-3 border border-gray-300 hover:border-black w-48 h-12 rounded-full p-4'>
                        <button >
                        <input 
                            type='radio'
                            value="Spacious"
                            id='op4'
                            className='hidden'
                            
                            onChange={handleOptionChange}></input>
                          
                            <TbBrandSpacehey className='text-xl'/>
                            <h1 className='font-semibold text-lg mt-[-23px]'><label htmlFor='op4'>Spacious</label></h1>
                        </button>
                   </div>
                   <div className='flex flex-col gap-3 border border-gray-300 hover:border-black w-48 h-12 rounded-full p-4'>
                        <button>
                        <input 
                            type='radio'
                            value="Centrel"
                            id='op5'
                            className='hidden'
                            
                            onChange={handleOptionChange}></input>
                            <GoLocation className='text-xl'/>
                            <h1 className='font-semibold text-lg mt-[-23px]'><label htmlFor='op5'>Centrel</label></h1>
                        </button>
                   </div>
                </div>
            </div>

          
               
               



            "selected" :{selectedOption}

            </div>

        </div>
        <ProgressComponent link={ADD_MORE} handler={handleNext}/>
        </>
    )
}

export default Description;