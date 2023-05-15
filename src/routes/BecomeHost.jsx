import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BeHost from '../pages/user/Hosting/BeHost';
import HostOverView from '../pages/user/Hosting/HostOverView';
import Structures from '../pages/user/Hosting/Structure';
import Place from '../pages/user/Hosting/Place';
import FloorPlan from '../pages/user/Hosting/FloorPlan';
import Location from '../pages/user/Hosting/HostLocation';
import Image from '../pages/user/Hosting/Image';
import Title from '../pages/user/Hosting/Title';
import Description from '../pages/user/Hosting/Description';
import Additionaltext from '../pages/user/Hosting/AdditionalText';
import FinishSetup from '../pages/user/Hosting/FinishSetup';
import Price from '../pages/user/Hosting/Price';
import Standouts from '../pages/user/Hosting/Standout';
import Publish from '../pages/user/Hosting/Publish';
import Amenities from '../pages/user/Hosting/Amenities';
import BeHostNav from '../components/user/Host/BeHostNav';

const BecomeHost = () => {
    return (
        <>
        <Routes>
            <Route path='/Publish-celebration' element={<Publish />} />
            </Routes>
            <BeHostNav />

            <Routes>



                <Route path='/' element={<BeHost />} />
                <Route path='/Overview' element={<HostOverView />} />

                <Route path='/about-your-place' element={<Structures />} />
                <Route path='/structure' element={<Place />} />
                <Route path='/floor-plan' element={<FloorPlan />} />
                <Route path='/location' element={<Location />} />

                <Route path='/Standouts' element={<Standouts />} />
                <Route path='/amenities' element={<Amenities />} />
                <Route path='/photos' element={<Image />} />
                <Route path='/title' element={<Title />} />
                <Route path='/description' element={<Description />} />
                <Route path='/additional-description' element={<Additionaltext />} />

                <Route path='/FinishSetup' element={<FinishSetup />} />
                <Route path='/Price' element={<Price />} />
               
            </Routes>
            
        </>
    )
}

export default BecomeHost