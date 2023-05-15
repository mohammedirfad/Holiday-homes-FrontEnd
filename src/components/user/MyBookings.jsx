import React, { useEffect, useState } from 'react';
import loadgifs from '../../../src/Asset/loadgif.gif';
import { useSelector, useDispatch } from 'react-redux';
import { getMyBookings } from '../../api/Services/order';
import { GiBurningForest } from 'react-icons/gi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import './MyBookings.css'

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completedDate , setCompletedDate] = useState([]);
    const [Ongoing , setOngoing] = useState([]);
    const [Arriving , setArriving] = useState([]);
    const userid = useSelector(state => state.userAuth.id);
    const token = useSelector(state => state.userAuth.token);

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6


    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = bookings.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(bookings.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % bookings.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const Navigate = useNavigate();

   

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMyBookings(userid, token);
                console.log(response, 1);
                console.log(response.data, "..............11111111");
                
                const completedDate1 = response?.data.filter(data => new Date(data.Check_out) < new Date() );
                 setCompletedDate(completedDate1)
                let Ongoing1 = response?.data.filter(data => new Date(data.Check_in) <= new Date() && new Date(data.Check_out) >= new Date());
                setOngoing(Ongoing1)
                let Arriving1 = response?.data.filter(data => new Date(data.Check_in) >= new Date() );
                setArriving(Arriving1)
console.log(completedDate1)
console.log(Arriving1)
console.log(Ongoing1)
                setIsLoading(false);
                setBookings(response.data)


                setError(null);
            }
            catch (err) {
                setIsLoading(false);
                setError(err.response.data.message);
            }
        };
        fetchUser();
        console.log(bookings, ">>>>>>>>>>>>0000>>>>>>>>>>>>>>>>>>")

    }, []);

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
            <header className='p-4 flex justify-between border border-gray-200'>
                <a href='' className='flex items-center gap-1 '>
                    <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" onClick={() => Navigate('/home')} /></h3>
                    <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
                </a>

            </header>

            <div className='flex my-5 justify-center'>
      <h1 className='text-xl md:text-4xl font-bold  justify-center mx-10 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 flex'>My Bookings</h1>
    </div>

            <div className='mx-10 my-10 flex flex-wrap gap-6'>


                <div className=''></div>

                <div className='flex flex-row flex-wrap gap-4 justify-center'>
                    {currentItems?.length > 0 && currentItems.map(booking => (
                        <Link state={booking} key={booking._id} to={`/Mybookings/` + booking._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                            <div className="w-40 h-32">
                                <img src={booking?.hoster?.images[0]} className='object-cover w-40 h-36' alt='image' />
                            </div>
                            <div className="py-3 pr-3 grow">
                                <div className='flex flex-row w-full justify-between'>
                                    <h2 className="text-xl font-semibold">{booking?.hoster?.title}</h2>
                                    <h1 className='flex justify-end text-red-500 font-semibold'>{
                                        booking?.orderstatus === "Cancelled" ?
                                            <span className='text-red font-semibold flex flex-row'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className='mt-0' x="0px" y="0px"
                                                    width="26" height="26"

                                                    viewBox="0 0 48 48">
                                                    <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                                                </svg>
                                                Order cancelled
                                            </span>
                                            : ""

                                    }</h1>

                                    { (new Date(booking.Check_in) <= new Date() && new Date(booking.Check_out) >= new Date() && booking?.orderstatus !== "Cancelled") &&  <h1 className='flex justify-end text-white bg-green-500 font-semibold'>
                                            <span className='text-red font-semibold flex flex-row mx-3'>
                                               
                                            ongoing
                                            </span>
                                          

                                    </h1> }

                                    { (new Date(booking.Check_out) < new Date() && booking?.orderstatus !== "Cancelled") &&  <h1 className='flex justify-end text-white bg-yellow-500 font-semibold'>
                                            <span className='text-red font-semibold flex flex-row mx-3'>
                                               
                                            Completed
                                            </span>
                                          

                                    </h1> }

                                    { (new Date(booking.Check_in) >= new Date() && booking?.orderstatus !== "Cancelled") &&  <h1 className='flex justify-end text-white bg-blue-500 font-semibold'>
                                            <span className='text-red font-semibold flex flex-row mx-3'>
                                               
                                            Arriving
                                            </span>
                                          

                                    </h1> }
                                    {/* {Ongoing &&  <h1 className='flex justify-end text-red-500 font-semibold'>
                                            <span className='text-red font-semibold flex flex-row'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className='mt-0' x="0px" y="0px"
                                                    width="26" height="26"

                                                    viewBox="0 0 48 48">
                                                    <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                                                </svg>
                                               ongoing
                                            </span>
                                          

                                    </h1> }
                                    {Arriving &&  <h1 className='flex justify-end text-red-500 font-semibold'>
                                            <span className='text-red font-semibold flex flex-row'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className='mt-0' x="0px" y="0px"
                                                    width="26" height="26"

                                                    viewBox="0 0 48 48">
                                                    <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                                                </svg>
                                                -outed
                                            </span>
                                          

                                    </h1> } */}
                                </div>
                                <div className="text-xl">
                                    {/* <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" /> */}

                                    <div className={"flex  gap-1 mb-2 mt-4 text-gray-500 text-lg"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                        </svg>
                                        <h1 className=' text-gray-500'> {booking?.NumberOffdays}</h1> nights:
                                        {/* <br></br> */}
                                        <div className="flex gap-1 items-center ml-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                            </svg>
                                            {moment(booking?.Check_in).format('DD/MM/YYYY')}

                                        </div>
                                        &rarr;
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                            </svg>
                                            {/* {format(new Date(booking.Check_out), 'yyyy-MM-dd')} */}
                                            {moment(booking?.Check_out).format('DD/MM/YYYY')}
                                        </div>
                                    </div>

                                    <div className="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mt-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
                                        <span className="text-xl font-semibold mt-1">
                                            Total price:  ₹ {booking?.Amount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>


            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-num'
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />



        </>
    )
}

export default MyBookings