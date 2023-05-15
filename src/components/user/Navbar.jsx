import React, { useState, useRef } from 'react';
import { GiBurningForest } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { Link, useNavigate } from 'react-router-dom';
import { UserLogin } from "../../api/Services/UserAuth.js";
import { OtpSubmit } from "../../api/Services/UserAuth.js";
import { useDispatch } from "react-redux";
import { setLogin } from '../../Store/features/authSlice'
import { useSelector } from 'react-redux';
import axios from '../../api/Axios.js';
import queryString from 'query-string'



function Navbar() {
   const navigate = useNavigate()
   const RegForm = useRef(null)
   const dispatch = useDispatch();
   const image  = useSelector (state => state?.userAuth?.imageUrl)
   const token = useSelector(state => state?.userAuth?.token);


   const [Nav, setNav] = useState(false);
   const [otpModal, setotpModal] = useState(false);
   const [signupModal, setSignupModal] = useState(false);
   const [sideMenu ,setSideMenu] =useState(false);
   const [Searchtext1, setSearchtext1] = useState('');
   const [Searchtext2, setSearchtext2] = useState('');
   const [Searchtext3, setSearchtext3] = useState('');
   const [locationdata,setLocationdata]=useState([])
   const [Datedata,setdatesuggetiondata]=useState([])
   const [guestsuggtiondata,setguestSuggetiondata]=useState([])

   const [num, setNum] = useState("")
   const [otp, setOtp] = useState("")

   const param1 = Searchtext1;
const param2 = Searchtext2;
const param3 = Searchtext3;



const setjobsearch=(event)=>{
   setSearchtext1(event)
     if(event === null || event === undefined || event === ""){
       setSearchtext1(null)  
        }else{
         console.log(event,' eventt');
   //       SearchResultjob(token,event).then((res)=>{
   //         console.log(res,"foudhufd fdushfjd ");
   //         if(res.data.success){
   //          setLocationdata(res.data?.SearchResult) 
   //         }else{
   //          setLocationdata([])
   //         }
   // })
        }
     }
     
     const setcompanysearch=(event)=>{
       setSearchtext2(event)
         if(event === null || event === undefined || event === ""){
           setSearchtext2(null)  
            }else{
             console.log(event,' eventt');
            //  SearchResultcompany(token,event).then((res)=>{
            //    console.log(res,"foudhufd fdushfjd ");
            //    if(res.data.success){
            //       setdatesuggetiondata(res.data?.SearchResult) 
            //    }else{
            //       setdatesuggetiondata([])
            //    }
             
            //  })
            }
         }
   
         const setlocationsearch=(event)=>{
           setSearchtext3(event)
             if(event === null || event === undefined || event === ""){
               setSearchtext3(null)  
                }else{
                 console.log(event,' eventt');
               //   SearchResultlocation(token,event).then((res)=>{
               //     console.log(res,"foudhufd fdushfjd ");
               //     if(res.data.success){
               //       setguestSuggetiondata(res.data?.SearchResult) 
               //     }else{
               //       setguestSuggetiondata([])
               //     }
                 
               //   })
                }
             }


             function clearText(number){
               if(number===1)
               setSearchtext1('');
               setLocationdata([])
               if(number===2)
               setSearchtext2('');
               setdatesuggetiondata([])
               if(number===3)
               setSearchtext3('');
               setguestSuggetiondata([])
             }

             const handleClick = () => {
               const params = { param1: Searchtext1, param2: Searchtext2,param3:Searchtext3};
               const query = queryString.stringify(params);
             
               navigate(`/search?${query}`);
             };

   //LOGIN-HANDLING
   const handleSubmit = async (e) => {

      e.preventDefault();

      try {

         const response = await UserLogin(num)


         if (response.status === 200) {
            setNav("")
            setNav(false)
            setSignupModal(false)
            setTimeout(() => {
               setotpModal(true)
            }, "5000");

         }
         if (response.status === 202) {

            setNav(false)
            setotpModal(false)
            setSignupModal(true)
         }

      }
      catch (err) {
         console.log("err", err)
      }
   }

   //OTP-HANDLING...
   async function handleSubmitotp(e) {
      e.preventDefault();
      console.log("!!!!!", otp);
      try {
         const response = await OtpSubmit(otp, num)

         if (response?.status === 201) {
            navigate('/home')
            console.log(response?.data);
            setNav(false);
            setSignupModal(false);
            setotpModal(false);
            setSideMenu(false)

            dispatch(
               setLogin({
                  user: "user",
                  name: response?.data.User.FirstName,
                  token: response?.data.Token,
                  id: response?.data.User._id,
                  imageUrl : response?.data.User.Image
               })
            )


         } else {
            console.log("something went wrong !");
            return;
         }
      }
      catch (err) {
         console.log("err", err);
      }
   }

   //SIGNUP-HANDLING..
   const handleRegister = async (e) => {
      e.preventDefault();
      try {
         console.log(RegForm, "<>>>>>>>>>>>>>>>>>>>>>>")

         const FirstName = RegForm.current.FirstName.value;
         const LastName = RegForm.current.LastName.value;
         const DateofBirth = RegForm.current.DateofBirth.value;
         const Email = RegForm.current.Email.value;
         const PhoneNumber = num;

         const res = await axios({
            url: "/signup",
            method: "post",
            data: {
               FirstName,
               LastName,
               DateofBirth,
               Email,
               PhoneNumber
            }

         });
         if (res.status === 201) {
            setNav(false)
            setotpModal(false)
            setSignupModal(false)
            
            setSideMenu(false)


            console.log(res.data.newUser.FirstName)
            const isAuth = res.data;
            localStorage.setItem("Token",isAuth.Token)
            console.log(isAuth)
            if (isAuth) {
               dispatch(
                  setLogin({
                     user: "user",
                     name: isAuth.newUser.FirstName,
                     token: isAuth.Token,
                     id   : isAuth.newUser._id,

                  })
               )
            };

         }
         else {
            return;
         }

      }
      catch (err) {
         throw err;
      }
   }


   //Google-Auth

   const googleAuth = async (datas) => {
      console.log(datas)
      try {
         const response = await axios({
            url: "/google-Auth",
            method: "post",
           
            data: {
               datas
            }
         });
         if (response.status === 201) {
            setNav(false)
            setotpModal(false)
            setSignupModal(false)
            
            setSideMenu(false)

            

console.log(response,"<><><>")
            console.log(response.data.User.FirstName)
            const isAuth = response.data;
            localStorage.setItem("Token",isAuth.Token)
            console.log(isAuth)
            if (isAuth) {
               dispatch(
                  setLogin({
                     user: "user",
                     name: isAuth.User.FirstName,
                     token: isAuth.Token,
                     id: isAuth.User._id,
                     imageUrl : isAuth.User.Image
                  })
               )
            };
         }
         else {
            return;
         }
      }
      catch (err) {
         console.log(err)
      }

   }

   const NavModal = () => { setNav(!Nav) }

   const sideMenus = () => {setSideMenu(!sideMenu) }

   const otp_Modal = () => { setotpModal(!otpModal) }

   const signup_Modal = () => { setSignupModal(!signupModal) }

   return (
      <div className="">
      {  Nav && <div className='w-screen absolute h-screen bg-gray-200 opacity-30' onClick={sideMenus}></div>}

         <header className='p-4 flex justify-between border border-gray-200'>
            <Link to='/hostings' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" onClick={()=>navigate('/hosting')} /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </Link>

            <div className='flex  gap-2 border border-300 rounded-full py-2 px-4 shadow-md shadow-270 mx-auto sm:px-4 justify-center items-center w-1/4'>
               <div className='font-medium flex flex-row'>
               <input type="text" className='bg-transparent text-black focus:outline-none w-full'
                value={Searchtext1} 
                onChange={e =>setjobsearch(e.target.value)} 
                placeholder='Any Where'/>
              {Searchtext1&&<AiOutlineCloseCircle className='text-[25px] text-[#a5a6a6] hover:text-black icon' onClick={()=>{
                clearText(1)
              }}/>}
               </div>






               <div className='font-bold border-l border-gray-300'></div>
               <div className='font-medium flex flex-row'>
               <input type="text" className='bg-transparent text-black focus:outline-none w-full'
                value={Searchtext2} 
                onChange={e => setcompanysearch(e.target.value)
                }
                 placeholder='Any weeks'/>
               {Searchtext2&&<AiOutlineCloseCircle className='text-[25px] text-[#a5a6a6] hover:text-black icon' onClick={()=>{clearText(2)}}/>}
               </div>
               <div className='border-l border-gray-300'></div>

               <div className='text-slate-400 font-bold flex flex-row'>
               <input type="text" className='bg-transparent text-black focus:outline-none w-full' 
               value={Searchtext3} onChange={e => setlocationsearch(e.target.value)} placeholder='Any Guests'/>
               {Searchtext3&&<AiOutlineCloseCircle className='text-[25px] text-[#a5a6a6] hover:text-black icon' onClick={()=>{clearText(3)}}/>}
               </div>
               <button className='bg-primary text-white px-1 p-1 rounded-full font-bold' onClick={handleClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-xl">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>

               </button>

            </div>

            <div className='flex gap-6 '>

               <div className='items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md hidden md:block' onClick={()=>navigate('/host')}>
                  <p className="md:after:content-['_Your_Home'] font-bold "><a href='/host'>Host</a></p>
               </div>

               <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex
            ' onClick={sideMenus}>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden md:block">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <div className='bg-gray-500 text-white rounded-full border border-gray overflow-hidden '>
                    { image ? <img src={image} alt="image" className="w-6 h-6 relative top-.5"></img> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-.5 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                     </svg>}

                  </div>


               </div>
            </div>

         </header>



{
   sideMenu && <div className='flex flex-col bg-white absolute right-0 mx-5 rounded-md border border-gray-300 shadow-md'>
   <div className='mx-10 my-3 flex flex-col '>
   {
      !token && <>
      <h1 className='my-1 font-semibold' onClick={NavModal}>Login</h1>
      <h1 className='my-1 font-semibold' onClick={NavModal}>Sign in</h1>
      </>
   }
 
 
    <h1 className='my-1 font-semibold' onClick={()=>navigate('/chat')}>Messages</h1>
    <h1 className='my-1 font-semibold'  onClick={()=>navigate('/Mybookings')}>My Bookings</h1>
    <h1 className='my-1 font-semibold' onClick={()=>navigate('/chat')}>Accounts</h1>
    <hr className='mt-2'></hr>
    <h1 className='my-1 font-semibold' onClick={()=>navigate('/hosting')}>view Listing</h1>
    <h1 className='my-1 font-semibold' onClick={()=>navigate('/chat')}>Help</h1>
    <h1 className='my-1 font-semibold' >Logout</h1>
 
   </div>
 </div>
}


         {console.log(Nav, 11111)}

         <div className=" mt-5 flex justify-center bg-white  border-gray-400">
            <div className="  flex flex-col mt-50 max-w-lg gap-4 p-0 bg-white  rounded-md shadow-md  dark:bg-black-400 absolute">

               {
                  Nav && (
                     <div className={"sticky"}>


                        <button className="absolute top-2 left-5" onClick={NavModal}>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-4 h-4 text-black">
                              <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                           </svg>
                        </button>

                        <div className='flex justify-center w- full'>  <h4 className=" gap-2 font-semibold text-black mt-2 ">Log in or Sign up</h4></div>
                        <div className='w-full border border-gray-250 mt-5'></div>


                        <div className='px-6'>
                           <h1 className='mt-4 font-semibold text-xl text-black'>Welcome to Holiday Homes</h1>

                           <form onSubmit={handleSubmit} >

                              <div className='flex border border-black-550 rounded-md mt-4 h-12'>
                                 <input className='pl-1 justify-center text-black color-gray w-full'
                                    type='number'
                                    placeholder='Phone Number..'
                                    name='PhoneNumber'
                                    value={num}
                                    onChange={(e) => setNum(e.target.value)}
                                 ></input>
                              </div>
                              <span className='mt-2 flex text-xs text-black font-normal'>We’ll call or text you to confirm your number.@ stanterd rates . <p className='text-xs font-bold underline'> Privacy Policy</p></span>

                              <button type="submit" className="w-full hover:scale-100 mt-4  px-5 py-3 font-semibold rounded-md bg-primary " onClick={otp_Modal}><span className='text-white'>Continue</span></button>
                           </form>

                           <div className='flex w-2/5  mt-4' ></div>
                           <span className='flex items-center justify-center '>or</span>
                           {/* <div className='flex w-2/5 border border-gray-300'></div> */}

                           {/* <button type="button" className="w-full hover:scale-100 mt-4  px-5 py-3 font-semibold rounded-md border border-black "><span className='text-black'>Continue with Google</span></button> */}
                           <LoginSocialGoogle
                              client_id={"366705276579-pfjib8v3kphbvrd96nm4qh6ua0k9b8pb.apps.googleusercontent.com"}
                              scope="openid profile email"
                              discoveryDocs="claims_supported"
                              access_type="offline"
                              // onResolve={({provider, data }) => {
                              //    console.log(provider, data);
                              // }}
                              onResolve={googleAuth}

                              onReject={(err) => {
                                 console.log(err);
                              }}
                           >
                              <GoogleLoginButton />
                           </LoginSocialGoogle>
                           <button type="button" className="w-full hover:scale-100 mb-4 mt-4 px-5 py-3 font-semibold rounded-md border border-black "><span className='text-black'>Continue with Facebook</span></button>

                        </div>

                     </div>
                  )
               }




               {/* <div className={otpModal ? "w-full" : "hidden"}> */}
               {
                  otpModal && (<div className={"w-full"}>
                     <button className="absolute top-2 left-5" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-4 h-4" onClick={otp_Modal}>
                           <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                        </svg>
                     </button>

                     <div className='flex justify-center w- full'>  <h4 className=" gap-2 font-semibold   ">Confirm Your Number </h4></div>
                     <div className='w-full border border-gray-250 mt-5'></div>


                     <div className='px-6'>
                        <h1 className='mt-4  text-md text-gray'>Enter the code we've sent via SMS to +91{num}:</h1>

                        <form onSubmit={handleSubmitotp} >

                           <div className='flex border border-black-550 rounded-md mt-4 h-12 w-1/4'>
                              <input className='pl-1 justify-center color-gray w-full'
                                 type='number'
                                 placeholder=' - - - - - - '
                                 name='PhoneNumber'
                                 value={otp}
                                 onChange={(e) => setOtp(e.target.value)}
                              ></input>
                           </div>

                           <div className='w-full border border-gray-250 mt-5'></div>
                           <button type="submit" className=" hover:scale-100 mt-5  px-5 py-3 font-semibold rounded-md bg-black  "><span className='text-white'>Continue</span></button>


                        </form>

                        <div className='flex w-2/5 border border-gray-300 mt-4' ></div>
                     </div>



                  </div>)
               }

               <div className={signupModal ? "w-full" : "hidden"}>
                  <button className="absolute top-2 left-5" onClick={signup_Modal}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-4 h-4">
                        <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                     </svg>
                  </button>

                  <div className='flex justify-center w- full'>  <h4 className=" gap-2 font-semibold   ">Finish signing up </h4></div>
                  <div className='w-full border border-gray-250 mt-5'></div>


                  <div className='px-6'>


                     <form ref={RegForm} >

                        <div className='flex border border-gray rounded-md mt-4 h-14'>
                           <input className='pl-1 justify-center color-gray w-full'
                              type='text'
                              placeholder='First Name '
                              name='FirstName'
                              // value={}
                              onChange={(e) => setOtp()}
                           ></input>


                        </div>
                        <div className='flex border border-black-550 rounded-md  h-14'>


                           <input className='pl-1 justify-center color-gray w-full'
                              type='text'
                              placeholder='Last Name'
                              name='LastName'
                           // value={otp}

                           ></input>
                        </div>
                        <span className='mt-2 flex text-xs text-black-400 font-normal'>Make sure it matches the name on your.<p className='text-xs text-black-500 font-bold underline'> government ID</p></span>

                        <div className='flex border border-black-550 rounded-md mt-5 h-14'>
                           <input className='pl-1 justify-center color-gray w-full'
                              type='date'
                              placeholder='Date of Birth'
                              name='DateofBirth'
                           // value={otp}

                           ></input>
                        </div>

                        <span className='mt-2 flex text-xs text-black-400 font-normal'>To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Holiday Homes.</span>

                        <div className='flex border border-black-550 rounded-md mt-5 h-14'>
                           <input className='pl-1 justify-center color-gray w-full'
                              type='email'
                              placeholder='email'
                              name='Email'
                              // value={otp}
                              onChange={(e) => setOtp()}
                           ></input>
                        </div>

                        <span className='mt-2 flex text-xs text-black-400 font-normal'> We'll email you trip confirmations and receipts.</span>

                        <div className='w-full border border-gray-250 mt-5'></div>
                        <button type="submit" onClick={handleRegister} className="w-full hover:scale-100 mt-4  px-5 py-3 font-semibold rounded-md bg-primary "><span className='text-white'>Agree and Continue</span></button>


                     </form>

                     <div className='flex w-2/5 border border-gray-300 mt-4' ></div>
                  </div>
               </div>


            </div>
         </div>
         {/* )} */}

         <div className="bg-gray border border-gray absolute bottom-0  flex gap-6 sm:hidden w-full py-3 justify-center  ">
            <div className='bg-white-500 text-gray rounded-full  justify-center '>
               {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 my-1 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
               </svg> */}
{image ? <img src={image} alt="image" className="w-6 h-6 relative rounded-full mt-1 "></img> : <CgProfile className="w-6 h-6 text-primary mt-1"/>}
             


            </div>
            <button className='px-1 p-1 rounded-full font-bold'>
               
               <BiSearch className='w-6 h-6 text-primary '/>

            </button>
            <button className='px-1 p-1 rounded-full font-bold'>
              
               <AiOutlineHeart className='w-6 h-6 text-primary '/>

            </button>
         </div>

      </div>
   );
}

export default Navbar;
