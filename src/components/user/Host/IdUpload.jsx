import React, { useContext, useState } from 'react';
import { GiBurningForest } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { Host_id } from '../../../Context/HostDetails';
import { useSelector } from 'react-redux';
import { HostVerification } from '../../../api/Services/HostsetUp';

function IdUpload() {
   console.log("1")
   const IdTypes = useSelector(state => state.HostVerifys.IdType);
   const [frontImage, setFrontImage] = useState(null);
   const [files ,setFiles] = useState([]);
   const [backImage, setBackImage] = useState(null);
   const [back ,setBack] = useState([]);
   const { hostid } = useContext(Host_id);

   const token = useSelector(state => state.userAuth.token);
   // const IdTypes = useSelector(state => state.HostVerifys.IdType)

   console.log("1")
   console.log("200",IdTypes)
   

   
   

   const handleFrontImageChange = (event) => {
      // console.log(event.target)
      setFrontImage(URL.createObjectURL(event.target.files[0]));
      setFiles(event.target.files[0])
     
      // reader.readAsDataURL(file);
      
      console.log(frontImage, "@@@")

   };

   const handleBackImageChange = (event) => {
      console.log(event.target)
      setBack(event.target.files[0])

      setBackImage(URL.createObjectURL(event.target.files[0]));

   };

   console.log(files,"ASDFgb")
   const Navigate = useNavigate();

   //convreting into base-64:
     const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
     };
   const HandleNext = async ()=>{

      try{
         const frontImageBase64 = await convertToBase64(files);
         const backImageBase64 = await convertToBase64(back);

         // const base64s = [];
         // for (var i = 0; i < files.length; i++) {
         //   var base = await convertBase64(files[i]);
         //   base64s.push(base);
         // const formData = new FormData();
         // formData.append("image1", frontImage);
         // formData.append("image2", backImage);
         // // }
         const formData = new FormData();
   //  formData.append('frontImage', frontImageBase64);
   //  formData.append('backImage', backImageBase64);
   //       console.log("hweeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeee",files.length)


         const response = await HostVerification(frontImageBase64,backImageBase64,hostid,IdTypes,token)
         console.log(response,"response from backend imges")
         if (response.status === 200){
            Navigate('/selfie-upload/'+hostid)
         }
         else{
            alert("wrong")
         }

      }
      catch(err){
         console.error(err);
      }
   }

   return (
      <>
         <header className='p-4 flex justify-between border-b-2 border-gray-250 '>
            <a href='
            ' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </a>
            <div className='flex gap-6 '>

               <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex
            ' >

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden md:block">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <div className='bg-gray-500 text-white rounded-full border border-gray overflow-hidden '>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-.5 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                     </svg>

                  </div>


               </div>
            </div>

         </header>
         <div className='py-6 flex flex-col md:flex gap-2  mx-6 mt-4 relative'>
            <div className="flex justify-center">
               <div className=' md:mx-20  my:5 md:my-10  bg-red width-full justify-start w-full md:w-2/4 p-4'>
                  <div className='flex flex-col'>
                     <h1 className='font-semibold text-2xl'>Upload images of your identity card</h1>
                     <h1 className='md:w-2/3 mt-4'>Make sure your photos aren’t blurry and the front of your identity card clearly shows your face.</h1>

                     <div className='flex flex-row gap-2 '>
                        <div className='flex  gap-2 justify-between w-full md:w-2/3 mt-7'>
                           <div className='border-2 border-dashed rounded-lg  border-black '>
                              <div className='w-[230px] h-[170px]'>

                                 <label htmlFor='dropzone-file'>
                                    <h2 className='text-center font-semibold'>Front Side</h2>
                                    <input type="file" className='hidden' id="dropzone-file" onChange={handleFrontImageChange} />
                                    {frontImage && <img src={frontImage} alt="Front Side" />}
                                 </label>
                              </div>
                           </div>

                           <div className='border-2 border-dashed rounded-lg  border-black  '>
                              <div className='w-[230px] h-[170px]'>
                                 <label htmlFor='dropzone-file1'>
                                    <h2 className='text-center font-semibold'>Back Side</h2>
                                    <input type="file" className='hidden' id="dropzone-file1" onChange={handleBackImageChange} />
                                    {backImage && <img src={backImage} alt="back Side" />}
                                 </label>



                              </div>

                           </div>


                        </div>

                     </div>
                     <hr className='text-gray-300 mt-5 mb-5'></hr>
                     <div className='flex right-0 justify-end mx-2 mt-6 '>
                        <button className='bg-black rounded-md justify-end mt-3' onClick={HandleNext}><h1 className='text-white mx-3 my-2.5'>Continue</h1></button>
                     </div>
                  </div>

               </div>

            </div>



         </div>

      </>
   )
}

export default IdUpload