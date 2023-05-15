import React from 'react'
import { useState,useEffect } from 'react'
import {Link} from "react-router-dom"
import {GiHamburgerMenu} from "react-icons/gi"
import {FaUserAlt} from "react-icons/fa"
import {BsBuildingFill} from "react-icons/bs"
import {BsBagFill} from "react-icons/bs"
import {TbBusinessplan} from "react-icons/tb"

const SideBar=()=> {

   const [open,setOpen]=useState(true)
   const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 767px)").matches);
   

   useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.matchMedia("(max-width: 767px)").matches);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

   const menus=[
      {name:"Dasboard",link:'/admin/home',icon:GiHamburgerMenu},
      {name:"Verification",link:'/admin/HostVerification',icon:FaUserAlt},
      {name:"Payment Request",link:'/admin/paymentrequests',icon:BsBuildingFill},
      {name:"Orders",link:'/admin/orders',icon:BsBagFill},
      {name:"Complaints",link:'/admin/Complaints',icon:TbBusinessplan},
      // {name:"dasboard",link:'/',icon:GiHamburgerMenu},
   ]
  return (
   

  <div className="flex gap-6">
   <div className={`bg-slate-100 min-h-[42.887rem]  ${!isMobile?'w-72':'w-16'}  duration-500 text-gray-700 px-4`}>
      {/* <div className='py-3 flex justify-end'>
            <GiHamburgerMenu size={26} className="cursor-pointer" onClick={()=>setOpen(!open)}/> 
         </div> */}
            <div className='mt-4 flex flex-col gap-4 relative'>
               {
               menus?.map((menu,i)=>(
               <Link to={menu?.link} key={i} 
               className="group flex items-center gap-3.5 font-medium p-2 bg-white hover:text-white hover:bg-gradient-to-r from-regal-blue via-regal-blue1 to-regal-blue2 rounded-md">
                <div>{React.createElement(menu?.icon,{size:"20"})}</div>
              
                <h2 
               //  style={{
               //    transitionDelay:`${i + 3}00ms`
               //  }}
                className={`whitespace-pre duretion-500 
                ${isMobile&&"opacity-0 translate-x-28 overflow-hidden"} transition-all transform  duration-500 delay-500`}>{menu?.name}
                </h2>
                <h2 
                className={` ${!isMobile && 'hidden'} absolute left-48 bg-white font-semibold whitespace-pre
                text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden z-10  group-hover:px-2 group-hover:py-1
                group-hover:left-14  group-hover:duration-300  group-hover:w-fit`}>
                  {menu?.name}
                </h2>
               </Link>

                  ))}
              
         </div>
      </div>
</div>
  ) }
export default SideBar