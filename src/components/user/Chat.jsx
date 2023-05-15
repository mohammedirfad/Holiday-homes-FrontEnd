import React, { useEffect, useRef, useState } from 'react';
import { GiBurningForest } from 'react-icons/gi';
import { useNavigate,useParams } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { userChats } from '../../api/Services/ChatRequest';
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import {io} from 'socket.io-client'
function Chat() {

    const [chats,setChats] = useState([]);
    const [currentChat , setCurrentChat] = useState(null);
    const [onlineUsers ,setOnlineUsers ] = useState([]);
    const [sendMessage ,setSendMessage] = useState(null);

    const [recieveMessage ,setRecieveMessage] = useState(null);


    const socket = useRef()

    const id = useSelector(state => state.userAuth.id);
    console.log(id,"userid")
    const Navigate = useNavigate();


    useEffect(()=>{
        socket.current = io('https://holiday-homes-socketio.onrender.com');
        socket.current.emit('new-user-add' , id);
        socket.current.on('get-users', (users)=>{
            setOnlineUsers(users);
            console.log(onlineUsers,"onlineeeeeeeeeeeeeeee")
        })
    },[id])

    useEffect(()=> {
        const getChats = async ()=> {
            try{
                
                const data = await userChats(id)
                setChats(data.data);
                console.log(data,";;;;;;;");
            }
            catch(error){
                console.error(error,"error getting chats");
            }
        }
        getChats()

    },[id]);

    useEffect(()=>{
        if(sendMessage !== null){
            socket.current.emit('send-message' , sendMessage);

        }
        
    },[sendMessage])

    useEffect(()=>{
        socket.current.on('recieve-message', (data)=>{
            setRecieveMessage(data);
            console.log(data,"data from socket recieved")
        })
       
        
    },[]);


    const checkOnlineStatus = (chat) =>{
        const chatMembers = chat?.members?.find((member) => member !== id);

        const online = onlineUsers.find((user) => user.userId ===chatMembers);
        return online ? true :false;


    }
    
   

  return (
  <div className='bg-irfad '>

<header className='p-4 flex justify-between border border-gray-200'>
            <a href='' className='flex items-center gap-1 '>
               <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" onClick={()=>Navigate('/home')} /></h3>
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Holiday Homes</span>
            </a>

    </header>

  <div className='relative flex flex-row  gap-4' >

     {/* Leftside */}
     <div className='flex flex-col gap-4'>

        <div className='flex flex-col gap-4 rounded-lg p-4 h-auto w-full mx-5 my-4  bg-white'>
            <h1 className='font-bold text-xl'>Chats</h1>


            <div className='flex flex-col gap-4 mt-3 mx-3 rounded-md  '>
               { console.log("asdfgbgggggggg",chats)}
                {chats.length!==0 ? chats.map((chat)=>(
                    <div className='hover:bg-irfad rounded-md ' onClick={()=> setCurrentChat(chat)}>
                        <Conversation data={chat} currentUser={id} online={checkOnlineStatus(chat)} />

                        
                    </div>
                )) : "hello"}

            </div>
        </div>


     </div>


    {/* Rightside */}

    <div className="flex flex-col gap-4">
       

    </div>


    {/* Chat-Body */}

    <div className='w-[1030px] h-full '>
        <ChatBox chat={currentChat} currentUser={id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />

    </div>

   </div>



   </div>
  )
}

export default Chat