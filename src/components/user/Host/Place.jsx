import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiMushroomHouse } from 'react-icons/gi';
import { GiWoodCabin } from 'react-icons/gi';
import { GiCastle } from 'react-icons/gi';
import { GiMountainCave } from 'react-icons/gi';
import { GiCampingTent } from 'react-icons/gi';
import { FaHotel } from 'react-icons/fa';
import { GiTreehouse } from 'react-icons/gi';
import { MdOutlineHouseboat } from 'react-icons/md';
import { GiVikingLonghouse } from 'react-icons/gi';
import { BiTaxi } from 'react-icons/bi';
import { HOST_PLAN } from '../../../Constants/HostLinks';
import ProgressComponent from './ProgressComponent';
import { useDispatch } from "react-redux"; 
import { hostStruture } from '../../../api/Services/HostsetUp';
import { useSelector } from 'react-redux';
import { setHoststep1 } from '../../../Store/features/HostSlicestep1';

function Place() {
    const structure = useSelector(state => state.Hostslice1.structure)
    const [selectedOption, setSelectedOption] = useState( structure || "");
    const token = useSelector(state => state.userAuth.token);
    const id = useSelector(state => state.userAuth.id);
   
    const dispatch = useDispatch();

    const handleOptionChange = (event) => {
        const value = event.target.value;
        console.log("bdjgsbfugf hur",value)
        setSelectedOption(event.target.value);
        console.log(selectedOption)
        dispatch(
            setHoststep1({
                user:"Hostuser",
                structure:value
            })
        )
console.log("evide ethii okie byee")
        event.target.value = "";
    };

    const handleNext = async () => {

       try{
            
        const response = await hostStruture(selectedOption,id,token)
        console.log(response)

        if(response.status === 200){
console.log("ivade inde.....")
            dispatch(
                setHoststep1({
                    user:"Hostuser",
                    name:id,
                    structure:response.data.structure,
                    host_id:response.data.host_id,
                    status:response.data.status
                })
            )
            console.log("herer it ids")
        }
        else{
            alert(response.data.message)
        }
       }
       
       catch (err) {
        console.log("err", err)
     }
    }
    return (
        <>
        <div className=''>
            <div className=' items-center flex flex-col mt-6  duration-75 '>
                <div className='justify-center flex delay-1000'>
                    <h1 className='font-semibold text-4xl  font-sans'>Which of these best describes <br></br>your place?</h1>
                </div>
                <div className='flex flex-col gap-3 mt-8 ml-24  h-96'>
                    <div className='flex flex-row gap-3 justify-center items-center'>
                        {/* <div className='flex  gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'> */}
                        <div className={`flex  gap-3 border ${selectedOption === "House" ? "border-[3px] border-black" :  "border-gray-300"} hover:border-black w-48 h-24 rounded-md p-4`}>
                            <button >


                                <AiOutlineHome className='text-4xl' />
                                <input
                                    type="radio"
                                    value='House'
                                    id='option1'
                                    className="hidden"
                                    checked={selectedOption === 'House'} 
                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option1">House</label></h1>
                            </button>

                        </div>


                        {/* <div className=' border border-gray-300 hover:border-black w-48  h-24 rounded-md p-4'> */}
                        <div className={`flex  gap-3 border ${selectedOption === "Flat" ? "border-[3px] border-black" :  "border-gray-300"} hover:border-black w-48 h-24 rounded-md p-4`}>
                            <button >


                                <BiBuildingHouse className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Flat'
                                    id='option2'
                                    className="hidden"
                                    checked={selectedOption === 'Flat'} 

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option2">Flat</label></h1>
                            </button>
                        </div>


                        <div className=' border border-gray-300 hover:border-black w-48  h-24 rounded-md p-4'>


                            <button >


                                <GiMushroomHouse className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Barn'
                                    id='option3'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option3">Barn</label></h1>
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-3'>
                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>


                            <button >


                                <GiWoodCabin className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Cabin'
                                    id='option4'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option4">Cabin</label></h1>
                            </button>


                        </div>
                        <div className=' border border-gray-300 hover:border-black w-48  h-24 rounded-md p-4'>


                            <button >
                                <BiTaxi className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Motorhome'
                                    id='option5'
                                    className="hidden"
                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option5">Motorhome</label></h1>
                            </button>
                        </div>

                        <div className=' border border-gray-300 hover:border-black w-48  h-24 rounded-md p-4'>


                            <button >
                                <GiCastle className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Castle'
                                    id='option6'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option6">Castle</label></h1>
                            </button>
                        </div>

                    </div>


                    <div className='flex flex-row gap-3'>
                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>

                            <button >
                                <GiMountainCave className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Cave'
                                    id='option7'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option7">Cave</label></h1>
                            </button>
                        </div>
                        <div className=' border border-gray-300 hover:border-black w-48  h-24 rounded-md p-4'>


                            <button >
                                <GiCampingTent className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Tent'
                                    id='option8'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option8">Tent</label></h1>
                            </button>



                        </div>
                        <div className=' border border-gray-300 hover:border-black w-48  h-24 rounded-md p-4'>


                            <button >
                                <FaHotel className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Hotel'
                                    id='option9'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option9">Hotel</label></h1>
                            </button>

                        </div>
                    </div>


                    <div className='flex flex-row gap-3'>
                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>


                            <button >
                                <GiTreehouse className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Tree house'
                                    id='option10'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option10">Tree house</label></h1>
                            </button>
                        </div>
                        <div className=' border border-gray-300 hover:border-black w-48  h-24 rounded-md p-4'>

                            <button >
                                <GiVikingLonghouse className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Yurt'
                                    id='option11'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option11">Yurt</label></h1>
                            </button>
                        </div>
                        <div className=' border border-gray-300 hover:border-black w-48  h-24 rounded-md p-4'>


                            <button >
                                <MdOutlineHouseboat className='text-4xl' />
                                <input
                                    type="radio"
                                    value='Houseboat'
                                    id='option12'
                                    className="hidden"

                                    onChange={handleOptionChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option12">Houseboat</label></h1>
                            </button>
                        </div>
                    </div>


                </div>

            </div>
        </div>

        <ProgressComponent link={HOST_PLAN} handler={handleNext}/>



        </>

    )
}

export default Place;