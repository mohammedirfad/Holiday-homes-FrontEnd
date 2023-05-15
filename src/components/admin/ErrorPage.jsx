import React from 'react';
import e1 from '../../../src/Asset/e2.gif';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GiBurningForest } from 'react-icons/gi';

function ErrorPage() {

  const Navigate = useNavigate();
  return (
    <>
 <header className='p-4 flex justify-between border  border-gray-200'>
                <a href='/home' className='flex items-center gap-1 '>
                    <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" onClick={() => Navigate('/home')} /></h3>
                    <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
                </a>

    </header>

    <div className='w-full mx-5 my-5'>

      <img src={e1} className='' alt='error page'></img>

    </div>
    <button className='rounded-lg right-[50%] flex justify-center absolute bottom-[10%] bg-primary' onClick={() => Navigate('/home')}><h1 className='mx-3 text-white font-semibold my-3'>Go Back To Home</h1></button>

    </>
  )
}

export default ErrorPage