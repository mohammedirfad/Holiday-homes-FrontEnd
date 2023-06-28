import React, { useEffect, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { getUsers } from '../../api/Services/UserAuth';

function Conversation({data , currentUser,online}) {

    const [userData , setUserData] = useState(null);

    const token = useSelector(state => state.userAuth.token);

    useEffect(()=>{
        const userId = data.members.find((id) =>id!==currentUser);

        const getUserData = async () =>{
            const response  = await getUsers(userId,token);
            console.log(response,"here")
            if(response?.status === 200){
              setUserData(response?.data)
     
            }
        }
         getUserData()
     },[])


  return (
   
    <>
        <div className='flex  '>

          <div className=' flex flex-row mx-2 my-3 relative'>
      {online ? <div className=' absolute bg-green-500 rounded-full  w-[14px] h-[14px] border-2 border-white z-50'></div> :       <div className=' absolute bg-red-500 rounded-full  mt-1 w-[14px] h-[14px] border-2 border-white z-50'></div>}


            { userData?.Image ? <img src={userData.Image}  alt="image" className="w-12 h-12 rounded-full relative top-.5"></img> : <img className='w-12 h-12' src="https://img.icons8.com/3d-fluency/94/null/user-male-circle.png"/>}
            <div className='font-semibold mx-4 justify-center flex-col flex'>
              <span>{userData?.FirstName} {userData?.LastName}</span>
              {online ?<span className='text-sm text-green-500'>online</span> :<span className='text-sm text-red-500'>offline</span>}

            </div>
          </div>

        </div>
          <hr className='mt-1'></hr>
       
    
    </>
  )
}

export default Conversation