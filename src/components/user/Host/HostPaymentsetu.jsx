import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { GiBurningForest } from 'react-icons/gi';
import Bank from '../../../Asset/Bank.gif';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { hostBankDetails } from "../../../api/Services/HostsetUp";
import { useNavigate,useParams } from 'react-router-dom';

function HostPaymentsetu () {
 
    const location = useLocation()
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [branch, setBranch] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [pan ,setpan] = useState('');
    const [errors, setErrors] = useState({});

    const user_id = useSelector(state => state.userAuth.id);
    const token = useSelector(state => state.userAuth.token);

    const Navigate = useNavigate();

    const {id} = location.state;
    console.log(id,">>>>>>>>>>>>>>>>>>>>>>>>>>")

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // validate form inputs
        const errors = {};
        if (!accountName) {
          errors.accountName = 'Account name is required';
        }
        if (!accountNumber) {
          errors.accountNumber = 'Account number is required';
        } else if (!/^\d+$/.test(accountNumber)) {
          errors.accountNumber = 'Account number should contain only digits';
        }
        if (!branch) {
          errors.branch = 'Branch is required';
        }
        if (!ifscCode) {
          errors.ifscCode = 'IFSC code is required';
        }
        
        setErrors(errors);
    
        // submit form data if no errors
        if (Object.keys(errors).length === 0) {
         
          try{

            const response = await hostBankDetails(accountName,accountNumber,branch,ifscCode,pan,id,user_id,token)
            console.log("response vannu")
            if(response.status ===200){
              Navigate('/hosting')
            }
          }
          catch(err){
            console.error(err,"Please enter a valid data")
          }
        }
      };
    
      const renderIcon = (name) => {
        if (!errors[name] && (name === 'accountName' ? accountName : (name === 'accountNumber' ? accountNumber : (name === 'branch' ? branch : (name==="ifscCode" ? ifscCode :pan))))) {
          return (
            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
          );
        } else if (errors[name]) {
          return (
            <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          );
        }
        return null;
      };
    return (
        <>
            <header className='mx-auto p-5  items-center justify-between border border-gray-200'>
                <div className="mx-8 flex relative">

                    <a href='/home' className=' px-5 flex items-center gap-2  '>
                        <h3 className='font-bold '><GiBurningForest className="text-3xl h-8 "/></h3>

                    </a>
                    <div className='justify-center items-center flex absolute right-1/2'>
                        <h1 className='text-xl font-semibold text-gray-900'>Set up payouts</h1>
                    </div>
                    <button className='mx-auto border border-gray-300 hover:border-black absolute right-0 flex rounded-full justify-center items-center h-9 w-16 '>
                        <span className='text-black font-semibold mx-1 justify-center items-center '>Exit</span>
                    </button>
                </div>
            </header>
    <div className=' py-6 md:flex gap-2  mx-6 mt-8 relative'>
        <div className='mx-auto bg-red width-full justify-center md:w-1/2'>
        <div className="justify-center flex items-center ">
            <h1>Please provide your bank details. This will let you receive funds<br></br> to your  bank account.</h1>
        </div>

 <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-7">
      <div className="mb-4">
        <label htmlFor="accountNumber" className="block font-medium text-gray-700">
          Account Number
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="accountNumber"
            placeholder="Enter AccountNumber"
            className={` w-full sm:text-sm rounded-md   h-[36px] ${
              errors.accountNumber ? 'border-red-500' : ''
            }`}
            value={accountNumber}
            onChange={(event) => setAccountNumber(event.target.value)}
          
          />
            {renderIcon('accountNumber')}
          
        </div>
        {errors.accountNumber && (
          <p className="mt-2 text-sm text-red-500">
            <XCircleIcon className="inline-block h-4 w-4 mr-1 text-red-500" aria-hidden="true" />
            {errors.accountNumber}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="accountName" className="block font-medium text-gray-700">
          Account Name
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="accountName"
            placeholder="Enter AccountName"
            className={` w-full sm:text-sm rounded-md   h-[36px] ${
              errors.accountName ? 'border-red-500' : ''
            }`}
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
          
          />
            {renderIcon('accountName')}
          
        </div>
        {errors.accountName && (
          <p className="mt-2 text-sm text-red-500">
            <XCircleIcon className="inline-block h-4 w-4 mr-1 text-red-500" aria-hidden="true" />
            {errors.accountName}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="branch" className="block font-medium text-gray-700">
          Branch Name
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="branch"
            placeholder="Enter branch"
            className={` w-full sm:text-sm rounded-md   h-[36px] ${
              errors.branch ? 'border-red-500' : ''
            }`}
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
          
          />
            {renderIcon('branch')}
          
        </div>
        {errors.branch && (
          <p className="mt-2 text-sm text-red-500">
            <XCircleIcon className="inline-block h-4 w-4 mr-1 text-red-500" aria-hidden="true" />
            {errors.branch}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="ifscCode" className="block font-medium text-gray-700">
        IFSC Code
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="ifscCode"
            placeholder="Enter ifscCode"
            className={` w-full sm:text-sm rounded-md   h-[36px] ${
              errors.ifscCode ? 'border-red-500' : ''
            }`}
            value={ifscCode}
            onChange={(event) => setIfscCode(event.target.value)}
          
          />
            {renderIcon('ifscCode')}
          
        </div>
        {errors.ifscCode && (
          <p className="mt-2 text-sm text-red-500">
            <XCircleIcon className="inline-block h-4 w-4 mr-1 text-red-500" aria-hidden="true" />
            {errors.ifscCode}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="pan" className="block font-medium text-gray-700">
        Pan Number
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="pan"
            placeholder="Enter pan  *optional"
            className={` w-full sm:text-sm rounded-md   h-[36px] ${
              errors.pan ? 'border-red-500' : ''
            }`}
            value={pan}
            onChange={(event) => setpan(event.target.value)}
          
          />
            {renderIcon('pan')}
          
        </div>
        {errors.pan && (
          <p className="mt-2 text-sm text-red-500">
            <XCircleIcon className="inline-block h-4 w-4 mr-1 text-red-500" aria-hidden="true" />
            {errors.pan}
          </p>
        )}
      </div>
      <button type="submit" className="bg-black rounded-md" ><h1 className="mx-2 my-2 text-white font-semibold">Submit</h1></button>
    </form>
         


    <div className='flex  mx-5 border-t-2 border-gray-300 mt-3 '>
     
        <Link to='/hosting'>
        <button className='mt-2 bg-black rounded-md right-0 absolute mx-10 ' >
      <h1 className='my-2 mx-2 font-semibold text-white'>Continue</h1>
      
      </button>
        </Link>
    
      <div className='justify-center flex text-black text-center mt-4'>
     
      </div>
      </div>
        </div>
        

        <div className='flex mx-auto justify-center w-full md:w-1/2 '>
          <div className='justify-center'>
       
        <img src={Bank} className='w-[400px]justify-center h-[300px]' alt='bank'></img>

          </div>

        </div>
      </div>






        </>
    )
}

export default HostPaymentsetu