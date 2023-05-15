import React, { useEffect, useRef, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { getUsers } from '../../api/Services/UserAuth';
import { addMessage, getMessages } from '../../api/Services/MessageRequest';
import {format} from 'timeago.js';
import InputEmogi from 'react-input-emoji'


function ChatBox({chat,currentUser,setSendMessage,recieveMessage}) {

    const [userData , setUserData] = useState(null);
    const [messages ,setMessages] = useState([]);
    const [newMessage ,setNewMessage] = useState("");

    const Scroll = useRef()

    const token = useSelector(state => state.userAuth.token);

//geting message from data base....................................
    useEffect(()=>{

        if(recieveMessage !==null && recieveMessage.chatId === chat._id){
            setMessages([...messages , recieveMessage]); 
        }

    },[recieveMessage])


//geting the userdatabase............................................
    useEffect(()=>{
        const userId = chat?.members?.find((id) =>id!==currentUser);
        const getUserData = async () =>{
            try{

                const response = await getUsers(userId,token);
                console.log(response,"here")
                if(response.status === 200){
                  setUserData(response.data)
         
                }
            }
            catch(error){
                console.log("error occured ",error)
            }       
        };
        if(chat!==null) getUserData();

    },[chat,currentUser])


 // fetchimg data for messages...................................

    useEffect(()=>{
        const fetchMessages = async () =>{
            try{
                const response = await getMessages(chat._id,token)
                console.log(response.data,"messages")
                setMessages(response.data)
            }
            catch(error){
                console.log("error occured ",error)
            }   
        }
        if(chat!==null) fetchMessages()

    },[chat])

    const Handlechange = (newMessage)=>{
        setNewMessage(newMessage)
    }

    const HandlesendMessage = async (e) =>{
        e.preventDefault()

        const message1 = {
            senderId:currentUser,
            text:newMessage,
            chatId:chat._id
        }

    //sending data to backend ................................
        try{
            const response = await addMessage(message1)
           if(response.status === 200){
            console.log("success")
            setMessages([...messages , response.data])
            setNewMessage("")

           }
        }
        catch(error){
            console.log("error occured ",error)
        }  

    //send messages to socket-server..........................

        const receiverId = chat.members.find((id) =>id != currentUser);

        setSendMessage({...message1 ,receiverId });
        
    }

    //scroll to the end.......................................

    useEffect(() =>{
        Scroll.current?.scrollIntoView({behavior :"smooth"})
    },[messages])

  return (
    
    <>
    <div className="flex flex-col gap-6 w-5/6 h-[646px] bg-gradient-to-r from-regal-blue via-regal-blue1 to-regal-blue2 rounded-md p-4 justify-between  my-4">
       {chat ? 
       (
        <>
        <div className="p-4 flex flex-col bg-white hover:bg-red-100">
            <div className="flex flex-row ">
            { userData?.Image ? <img src={userData.Image}  alt="image" className="w-12 h-12 rounded-full relative top-.5"></img> : <img className='w-12 h-12' src="https://img.icons8.com/3d-fluency/94/null/user-male-circle.png"/>}
            <div className='font-semibold mx-3 justify-center flex-col flex'>
              <span>{userData?.FirstName} {userData?.LastName}</span>
           

            </div>
            </div>
            <hr className='mt-3 border border-gray-300 '></hr>

        </div>


{/* chat-box messages*/}

<div className='flex flex-col gap-3 p-5 h-full  overflow-y-scroll'>
    {messages.length !==0  ? messages?.map((message)=>{
        return (
            <>
            <div ref={Scroll}
             className={message.senderId === currentUser ? " @apply self-end rounded-t-lg rounded-l-lg bg-sender flex flex-col text-white bg-primary" : " @apply text-[black] max-w-md w-fit flex flex-col gap-1 p-[-0.5rem] rounded-t-lg rounded-r-lg bg-white"}>
                <span className='text-sm font-semibold justify-center mx-3 my-2 ' >{message?.text}</span>
                <span className='text-xs justify-end flex mx-3 mb-1  ' >{format(message?.createdAt)}</span>

            </div>
            </>
        )

    }) :"hellos" }

</div>


{/* chat-sender */}

<div className='bg-white flex justify-between w-full overflow-hidden items-center gap-4 p-3 rounded-lg '>
    <div className='w-10 h-10 rounded-md bg-primary justify-center flex'><h1 className='justify-center mt-[7px] flex font-semibold text-white'> +</h1></div>
    <InputEmogi
    
  
    value = {newMessage}
    onChange = {Handlechange}/>

    <div className="bg-primary rounded-lg pointer hover:border hover:border-primary hover:text-primary hover:bg-white" onClick={HandlesendMessage} ><h1 className='mx-2 my-2 text-white'>Send</h1></div>


</div>



        </>
       ):(
        <span className="flex items-center justify-center font-semibold text-xl">
          Tap on a chat to start conversation...
        </span>
      )}

    </div>

    </>
  )
}

export default ChatBox