import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { HeartIcon } from '@heroicons/react/solid';
import { getHostData } from '../../api/Services/HostsetUp';
import loadgifs from '../../../src/Asset/loadgif.gif';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeView() {

    const [selectedFilter, setSelectedFilter] = useState("House");
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const Navigate = useNavigate();
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              dots: true,
              arrows: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2,
              dots: true,
              arrows: false,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 3,
              dots: true,
              arrows: false,
            },
          },
        ],
      };

    const filters = [
        { name: 'House', icon: <AiOutlineHome className='text-2xl'/> },
        { name: 'Flat', icon:  <BiBuildingHouse className='text-2xl' /> },
        { name: 'Barn', icon: <GiMushroomHouse className='text-2xl' /> },
        { name: 'Cabin', icon:   <GiWoodCabin className='text-2xl' /> },
        { name: 'Motorhome', icon:<BiTaxi className='text-2xl' /> },
        { name: 'Castle', icon:   <GiCastle className='text-2xl' /> },
        { name: 'Cave', icon:  <GiMountainCave className='text-2xl' /> },
        { name: 'Tent', icon:    <GiCampingTent className='text-2xl' /> },
        { name: 'Hotel', icon: <FaHotel className='text-2xl' /> },
        { name: 'Treehouse', icon:  <GiTreehouse className='text-2xl' /> },
        { name: 'HouseBoat', icon:   <MdOutlineHouseboat className='text-2xl' /> },
        { name: 'Yurt', icon:     <GiVikingLonghouse className='text-2xl' /> },
      ];

    const getHost = async (selectedFilter) =>{
    const fetchUser = async () =>{
        try{
           const response = await getHostData(selectedFilter);
           console.log(response,1);
           console.log(response?.data,"123123111111111111");
           setFilteredData(response?.data)
           setIsLoading(false);
         
           setError(null);
        }
        catch(err){
           setIsLoading(false);
           setError(err?.response?.data?.message);
        }
      }  
       fetchUser();
//        console.log(users,">>>>>>>>>>>>0000>>>>>>>>>>>>>>>>>>")
}


      useEffect( ()=>{

        getHost(selectedFilter)
     }, []);
     
    const handleFilterClick = async (filter) =>{
        setSelectedFilter(filter)
        getHost(filter)
    }
    if (isLoading) {
        return <div className='w-full'>
           <div className='flex justify-center items-center w-full'>
              <img className='w-48 h-48 justify-center' src={loadgifs} alt='loading.....'></img>
           </div>
        </div>;
      }
     
      if (error) {
        return <div>Error: {error}</div>;
      }
  return (
   <>
   <div className="flex space-x-10 text-gray-500 hover:text-black justify-center  ">
  {filters.map(filter => (
    <button
      key={filter.name}
      className={`flex flex-col items-center p-2  hover:text-black hover:border-b-2 hover:border-black ${
        selectedFilter === filter.name ? 'text-black border-b-2 border-black' : ''
      }`}
      onClick={() => handleFilterClick(filter?.name)}
    >
      <span className="text-xl text-gray-500 ">{filter?.icon}</span>
      <span className='text-sm text-gray-500  pb-1'>{filter?.name}</span>
    </button>
  ))}
</div>
<hr className='mt-1'></hr>

<div className='mx-5'>
{selectedFilter && (
  <div className="mt-4">
   
    {error ? (
      <div className="text-red-500">{error}</div>
    ) : filteredData?.length > 0 ? (


        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      //   <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      //   {filteredData.map((item) => (
      //        <div className="bg-white rounded-lg overflow-hidden shadow-md " onClick={()=> Navigate('/rooms/' +item._id) }>
      //        <div className="relative rounded-md">
      //          <Slider {...settings}>
      //            {item.images.map((image) => (
      //              <div key={image}>
      //                <img src={image} alt={item.title} className=" h-80 w-full object-cover rounded-md" />
      //              </div>
      //            ))}
      //          </Slider>
      //          <button className="py-2 px-4  absolute top-2 right-2"><HeartIcon className="h-8 w-8 opacity-60 border-white border-2 rounded-full p-1" /></button>
      //        </div>
      //        <div className="p-3">
      //          <h2 className="text-lg font-semibold mb-0">{item.title}</h2>
      //          <p className="text-gray-500 text-sm mb-0 ">{item.location}</p>
      //          <p className="text-gray-500 text-sm mb-0 ">{item.structure}</p>
      //          <p className="text-black-500 text-sm mb-0 font-bold">₹ {item.price} Night</p>
      //        </div>
      //      </div>
       
      //   ))}
      // </div>

      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
      {filteredData.length > 0 && filteredData.map(item => (
        <Link to={'/rooms/' +item._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {/* {item.images?.[0] && ( */}
              <img className="rounded-2xl object-cover aspect-square" src={item.images[0]} alt=""/>
            {/* )} */}
{/* {item.images.map((image) => (
                   <div key={image}>
                     <img src={image} alt={item.title} className=" h-80 w-full object-cover rounded-md" />
                   </div>
                 ))} */}


          </div>
          <h2 className="font-bold">{item.location}</h2>
          <h3 className="text-sm text-gray-500">{item.title}</h3>
          <div className="mt-1">
            <span className="font-bold">₹{item.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
      


    ) : (
      <div className='mt-20 mx-10 text-2xl font-semibold'>No Result found</div>
    )}
  </div>
)}
</div>
   </>
  )
}


export default HomeView