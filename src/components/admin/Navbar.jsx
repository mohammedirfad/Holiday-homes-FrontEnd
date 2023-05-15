import React from 'react';
import { GiBurningForest } from 'react-icons/gi';

function Navbar() {
  return (
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" className="flex items-center">
        <h3 className='font-bold '><GiBurningForest className="text-3xl h-8 text-primary mx-2" /></h3>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Holiday Homes
          </span>
        </a>
        <div className="flex items-center">
          <a
            href="tel:5541251234"
            className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline"
          >
            
          </a>
          <a
            href="#"
            className="text-xl  text-blue-600 dark:text-blue-500 hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
   
  </>
  
  )
}

export default Navbar