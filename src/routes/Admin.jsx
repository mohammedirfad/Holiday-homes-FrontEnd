import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainBg from '../pages/admin/MainBg'
import HostVerify from '../pages/admin/HostVerify';
import AdminLogin from '../components/admin/AdminLogin';
import PaymentRequests from '../components/admin/PaymentRequests';
import HostPaymentRequest from '../pages/admin/HostPaymentRequest';
import BankDetailsform from '../pages/admin/BankDetailsform';
import ListOrdres from '../pages/admin/ListOrdres';
import ErrorPage from '../components/admin/ErrorPage';
import Complaint from '../pages/admin/Complaint';

function Admin() {
    return (
        <div className="bg-gradient-to-r from-regal-blue via-regal-blue1 to-regal-blue2 h-screen flex justify-center  items-center font-sans">
            <div className="grid h-[97%] w-[97%] rounded-3xl bg-black-rgba overflow-hidden">

              <Routes>
              <Route path="/" element={<AdminLogin />} />
                 <Route path="/home" element={<MainBg />} />
                 <Route path="/HostVerification" element={<HostVerify />} />
                 <Route path="/paymentrequests" element={<HostPaymentRequest />} />
                 <Route path="/proccedPayment/:id" element={<BankDetailsform />} />
                 <Route path="/orders" element={<ListOrdres />} />
                 <Route path="/Complaints" element={<Complaint />} />

                 <Route path="/*" element={<ErrorPage />} />
              </Routes>
            </div>
        </div>
    )
}

export default Admin;