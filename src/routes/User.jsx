import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientPrivateRoutes from '../Utils/UserPrivateRoutes';
import Home from '../pages/user/Home/Home';
import HostHomePg from '../pages/user/Hosting/HostmainPg';
import Login from '../pages/user/Login/Login';
import Text from '../../src/components/user/Test.jsx';
import Hosting from '../pages/user/Hosting/Hostinglist';
import Verify from '../pages/user/Hosting/VerifyListing';
import AccountFovs from '../pages/user/Hosting/AccountFovs';
import IdSelect from '../pages/user/Hosting/IdSelect';
import IdUpload from '../pages/user/Hosting/IdUploads';
import UserSelfies from '../pages/user/Hosting/UserSelfie';
import BecomeHost from './BecomeHost';
import HostAdderss from '../components/user/Host/HostAdderss';
import HostPaymentsetu from '../components/user/Host/HostPaymentsetu';
import HostReviewing from '../components/user/Host/HostReviewing';
import Listings from '../components/user/Host/Listings';
import SingleHome from '../pages/user/Home/SingleHome';
import Booking from '../components/user/Booking';
import Chat from '../components/user/Chat';
import MyBookings from '../components/user/MyBookings';
import SingleDetails from '../components/user/SingleDetails';
import ErrorPage from '../components/admin/ErrorPage';


function User() {
  return (
    <Routes>
      {/* <Route element={<ClientPublicRoutes/>}> */}
      <Route path='/home' element={<Home />} />
      <Route path='/host' element={<HostHomePg />} />
      <Route path='/rooms/:id' element={<SingleHome/>}/>
      

      {/* </Route> */}


      {/* CLIENT-PROTECTED-PAGE */}

      <Route element={<ClientPrivateRoutes />}>
      <Route path='/hostings' element={<Hosting />} />
      <Route path='/booking/:id' element={<Booking/>} />
      <Route path='/Mybookings' element={<MyBookings/>} />
      <Route path='/Mybookings/:id' element={<SingleDetails/>} />
      <Route path='/chat' element={<Chat/>} />

        <Route path='/become-a-host/*' element={<BecomeHost />} />
       

        <Route path='/verify-listing/:id' element={<Verify />} />
        <Route path='/Account-fov' element={<AccountFovs />} />
        <Route path='/id-select/:id' element={<IdSelect />} />
        <Route path='/id-upload/:id' element={<IdUpload />} />
        <Route path='/selfie-upload/:id' element={<UserSelfies />} />
   
        <Route path='/account-setting/address' element={<HostAdderss/>}/>
        <Route path='/account-setting/bankDetails' element={<HostPaymentsetu/>}/>
        <Route path='/reviewing' element={<HostReviewing/>}/>

        <Route path='/Listing' element={<Listings/>}/>
      </Route>



      {/* ERROR PAGE */}

      <Route path='/*' element={<ErrorPage/>} />

    </Routes>
  )
}

export default User