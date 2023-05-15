import React,{useState} from 'react';
import { GiBurningForest } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { hostAddress } from '../../../api/Services/HostsetUp';
import {Link, useNavigate} from 'react-router-dom';



function HostAdderss() {

  const [street, setStreet] = useState("");
  const [flat, setFlat] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [errors, setErrors] = useState({});
  const [respondid, setResponses] = useState('')



  const token = useSelector(state => state.userAuth.token);
  const user_id = useSelector(state => state.userAuth.id);


  var hostDetail_id;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await hostAddress(street,flat,city,state,zipcode,user_id,token);
      console.log(response)

          if(response.status === 200 ){
            console.log(response.data,">>>>>>>>>>>>>>>>")
             hostDetail_id = response.data;
             setResponses(hostDetail_id)
          }
          else{
            return ;
          }
    }
    catch(err){
      console.log(err,"err at host addresss");
    }

    
  };

  const validate = () => {
    const errors = {};

    if (!street) {
      errors.street = "Street is required";
    }

    if (!flat) {
      errors.flat = "Flat is required";
    }

    if (!city) {
      errors.city = "City is required";
    }

    if (!state) {
      errors.state = "State is required";
    }

    if (!zipcode) {
      errors.zipcode = "Zipcode is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleBlur = () => {
    validate();
  };



  return (
    <>
    
    <header className='mx-auto p-5  items-center justify-between border border-gray-200'>
        <div className="mx-8 flex relative">

          <a href='/home' className=' px-5 flex items-center gap-2  '>
            <h3 className='font-bold '><GiBurningForest className="text-3xl h-8 " /></h3>

          </a>
          <div className='justify-center items-center flex absolute right-1/2'>
            <h1 className='text-xl font-semibold text-gray-900'>Set up payouts</h1>
          </div>
          <button className='mx-auto border border-gray-300 hover:border-black absolute right-0 flex rounded-full justify-center items-center h-9 w-16 '>
<span className='text-black font-semibold mx-1 justify-center items-center '>Exit</span>
          </button>
        </div>
      </header>

      <div className='items-center flex flex-col mt-8 my-auto'>
      <div className='justify-center flex flex-col delay-1000 mx-auto md:mx-auto'>
                    <h1 className='font-semibold text-3xl md:4xl mx-2 font-sans'>What's their home address? </h1>
                 
                    <h1 className='text-md md:text-lg text-gray-500 mt-2 mx-2'>Add the primary address for beneficiary. This is where they actually live (usually on utility bills).</h1>
      </div>
      <div className='flex flex-col gap-3 mt-8 justify-center '>
        <div className='flex flex-row gap-3 justify-center w-96 '>



        <form  onSubmit={handleSubmit}  className='justify-center md:justify-center flex flex-col w-96 '>
        

      <div className="mb-4 w-full">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="street">
          Street
        </label>
        <input
          className={`${
            errors.street ? "border-red-500" : ""
          } shadow appearance-none border rounded h-12 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="street"
          type="text"
          placeholder="Enter street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          onBlur={handleBlur}
        />
        {errors.street && (
          <p className="text-red-500 text-xs italic">{errors.street}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="flat">
          Flat
        </label>
        <input
          className={`${
            errors.flat ? "border-red-500" : ""
          } shadow appearance-none border rounded h-12 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="flat"
          type="text"
          placeholder="Enter flat"
          value={flat}
          onChange={(e) => setFlat(e.target.value)}
          onBlur={handleBlur}
        />
        {errors.flat && (
          <p className="text-red-500 text-xs italic">{errors.flat}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
          City
        </label>
        <input
          className={`${
            errors.city ? "border-red-500" : ""
          } shadow appearance-none border rounded h-12 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="city"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={handleBlur}
        />
        {errors.city && (
          <p className="text-red-500 text-xs italic">{errors.city}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 " htmlFor='state'>
            State
        </label>
        <input
          className={`${
            errors.state? "border-red-500" : ""
          } shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="state"
          type="text"
          placeholder="Enter state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          onBlur={handleBlur}
          />
          {errors.state && (
            <p className="text-red-500 text-xs italic">{errors.state}</p>
          )}
</div>
<div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 " htmlFor='zipcode'>
            Zip code
        </label>
        <input
          className={`${
            errors.zipcode? "border-red-500" : ""
          } shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="zipcode"
          type="text"
          placeholder="Enter Zip code"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          onBlur={handleBlur}
          />
          {errors.state && (
            <p className="text-red-500 text-xs italic">{errors.zipcode}</p>
          )}
</div>

<button className='mt-5 bg-black rounded-md  mx-10 ' >
      <h1 className='my-2 mx-2 font-semibold text-white'>  Submit</h1>
      </button>
</form>

                </div>
        </div>

      </div>

      <div className='flex  mx-5 border-t-2 border-gray-300 mt-3 '>
      {console.log(respondid,"/////")}
        <Link to='/account-setting/bankDetails' state = {{id:respondid}}>
        <button className='mt-2 bg-black rounded-md right-0 absolute mx-10 ' >
      <h1 className='my-2 mx-2 font-semibold text-white'>Continue</h1>
      
      </button>
        </Link>
    
      <div className='justify-center flex text-black text-center mt-4'>
      <ul>
        <li>
       
        Next, you’ll be directed to our payment page,to enter your bank account info.
        </li>
      </ul>
      </div>
      </div>
    </>
  )
}

export default HostAdderss