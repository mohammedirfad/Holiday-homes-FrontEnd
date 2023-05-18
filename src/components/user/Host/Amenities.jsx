import React, { useState } from "react";
import ProgressComponent from "./ProgressComponent";
import { HOST_PHOTOS } from "../../../Constants/HostLinks";
import { hostAmenities } from "../../../api/Services/HostsetUp";
import { useSelector ,useDispatch } from 'react-redux';

function Amenities() {
    const Amenities = useSelector(state => state.Hostslice3.amenities)
    const [checkedItems, setCheckedItems] = useState( Amenities || []);
    const token = useSelector(state => state.userAuth.token);
    const host_id = useSelector(state => state.Hostslice1.host_id);
    const dispatch = useDispatch();



    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setCheckedItems([...checkedItems,value]);

            console.log(checkedItems, 'ljkmkj')

        } else {
            setCheckedItems(checkedItems.filter((item) => item !== value));
        }
    };


    const handleNext = async () => {
        
        try{
            if(checkedItems === ""){
                alert("Please select at least one amenity");
                
            }
            const response = await hostAmenities(checkedItems,host_id,token);
        }
        catch(error){
            console.log(error);
        }
        
    }
    return (
        <> 
        <div className='w-full'>
            <div className=' items-center flex flex-col mt-6  duration-75 my-auto '>
                <div className='justify-center flex flex-col delay-1000 mx-auto md:mx-auto'>
                    <h1 className='font-semibold text-3xl md:4xl mx-2 font-sans'>Tell guests what your place has to offer </h1>
                    <h1 className='text-md md:text-lg text-gray-500 mt-2 mx-2'>You can add more amenities after you publish your listing.</h1>
                </div>

                <div className='flex flex-col gap-3 justify-center items-center mt-8 ml-24'>
                    <div className='flex flex-row gap-3 justify-center items-center'>

                        <div className={`flex gap-3 ${checkedItems === "Wifi" ? "border-[3px] border-black" :  "border border-gray-300"} hover:border-black w-48 h-24 rounded-md p-4 `}>
                            <button >

                                <lord-icon
                                    src="https://cdn.lordicon.com/vpcmkqzt.json"
                                    trigger="hover"
                                    style={{ width: 36, height: 36 }}
                                ></lord-icon>

                                <input
                                    type="checkbox"
                                    value='Wifi'
                                    id='option1'
                                    className="hidden"

                                    onChange={handleCheckboxChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option1">Wifi</label></h1>
                            </button>
                        </div>





                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>
                            <button
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/pnwpbzow.json"
                                    trigger="hover"
                                    style={{ width: 36, height: 36 }}
                                ></lord-icon>
                                <input
                                    type="checkbox"
                                    value='TV'
                                    id='option2'
                                    className="hidden"

                                    onChange={handleCheckboxChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option2">TV</label></h1>
                            </button>
                        </div>


                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>
                            <button
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/zqxjldws.json"

                                    trigger="hover"
                                    style={{ width: 36, height: 36 }}
                                ></lord-icon>
                                <input
                                    type="checkbox"
                                    value='Kitchen'
                                    id='option3'
                                    className="hidden"

                                    onChange={handleCheckboxChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option3">Kitchen</label></h1>
                            </button>
                        </div>

                    </div>

                    <div className='flex flex-row gap-3 justify-center items-center'>

                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>
                            <button >

                                <lord-icon
                                    src="https://cdn.lordicon.com/wrvsvaoj.json"
                                    trigger="hover"
                                    style={{ width: 36, height: 36 }}
                                ></lord-icon>
                                <input
                                    type="checkbox"
                                    value='Parking'
                                    id='option4'
                                    className="hidden"

                                    onChange={handleCheckboxChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option4">Parking</label></h1>
                            </button>
                        </div>




                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>
                            <button
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/ifqmqwui.json"
                                    trigger="hover"
                                    style={{ width: 36, height: 36, justify: 'start' }}
                                ></lord-icon>
                                <input
                                    type="checkbox"
                                    value='Machine'
                                    id='option5'
                                    className="hidden"

                                    onChange={handleCheckboxChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option5">Machine</label></h1>
                            </button>
                        </div>


                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>
                            <button
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/uitzjnpu.json"
                                    trigger="hover"
                                    style={{ width: 36, height: 36 }}
                                ></lord-icon>
                                <input
                                    type="checkbox"
                                    value='Premises'
                                    id='option6'
                                    className="hidden"

                                    onChange={handleCheckboxChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option6">Premises</label></h1>
                            </button>
                        </div>

                    </div>

                    <div className='flex flex-row gap-3 justify-start items-start'>

                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>
                            <button >

                                <lord-icon
                                    src="https://cdn.lordicon.com/kipaqhoz.json"
                                    trigger="hover"
                                    style={{ width: 36, height: 36 }}
                                ></lord-icon>
                                <input
                                    type="checkbox"
                                    value='Library'
                                    id='option7'
                                    className="hidden"

                                    onChange={handleCheckboxChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option7">Library</label></h1>
                            </button>
                        </div>

                        <div className='flex gap-3 border border-gray-300 hover:border-black w-48 h-24 rounded-md p-4'>
                            <button >

                                <lord-icon
                                        src="https://cdn.lordicon.com/kulwmpzs.json"

                                    trigger="hover"
                                    style={{ width: 36, height: 36 }}
                                ></lord-icon>
                                <input
                                    type="checkbox"
                                    value='Work'
                                    id='option8'
                                    className="hidden"

                                    onChange={handleCheckboxChange}

                                />
                                <h1 className='font-semibold text-lg '><label htmlFor="option8">Work</label></h1>
                            </button>
                        </div>
                    </div>



                </div>




              
                {/* <div>Checked items: {JSON.stringify(checkedItems)}</div> */}
                
            </div>
            
        </div>
        <ProgressComponent link={HOST_PHOTOS} handler={handleNext}/>
    </>
    )
}

export default Amenities
