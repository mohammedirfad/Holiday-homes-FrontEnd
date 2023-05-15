import React, { useState } from 'react'
import { adminLogin } from '../../api/Services/HostsetUp';
import { useNavigate,useParams } from 'react-router-dom';
import { GiBurningForest } from 'react-icons/gi';
import { useDispatch } from "react-redux";
import { setLogin } from '../../Store/features/AdminSlice';

function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) {
      return;
    }

  try{
    const response = await adminLogin(email,password);
    console.log(response?.data)
    if(response?.status === 200){
     console.log(response?.data)
     dispatch(
      setLogin({
         user: "Admin",
         name: response?.data?.response?.Email,
         admin_token: response?.data?.Token,
        
      })
   )
        Navigate('/admin/home')
    }
  }
  catch (error) {
    console.error(error);
    setErrorMsg('An error occurred while logging in');
  }
  }
  return (
    <>
     <header className='p-4 flex justify-between border border-gray-200'>
                <a href='' className='flex items-center gap-1 '>
                    <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" onClick={() => Navigate('/home')} /></h3>
                    <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
                </a>

            </header>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        </div>
       <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
         
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm  rounded-md bg-black text-white font-bold bg-black-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
                Submit
           </button>
           </div>
           </form>
           </div>
           </div>
            
                
    </>
  )
}

export default AdminLogin