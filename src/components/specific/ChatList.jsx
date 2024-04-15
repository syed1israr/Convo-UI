import React from 'react'
import { Stack } from '@mui/material'
import ChatItem from '../Shared/ChatItem'
const ChatList = ({w="100%",chats=[],chatId=[],onlineUsers=[],newMessagesAlert=[
    {
        chatId:"",
        count:0
    }
],handleDeletChat}) => {
  return (
   <Stack width={w} direction={"column"}
   
   overflow={"auto"}
   height={"100%"}
   >
        {
            chats?.map((data, index )=>{
               const { avatar,_id,name,groupChat,members}=data;
                console.log(avatar)
               const newMessageAlert=newMessagesAlert.find(
               ({chatId})=> chatId===_id
               )
               const isOnline=members?.some((member)=>onlineUsers.includes(_id));
               return <ChatItem 
               index={index}
               handleDeletChat={handleDeletChat}
               sameSender={chatId===_id} _id={_id} newMessageAlert={newMessageAlert} isOnline={isOnline}  name={name} avatar={avatar} groupChat={groupChat} key={_id}/>
            })
        }
   </Stack>
  )
}

export default ChatList