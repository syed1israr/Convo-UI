import React, { useRef, useState } from 'react'
import AppLayout from '../components/Layout/AppLayout';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { CustomeGray, orange } from '../constants/Color';
import { AttachFile as AttachFileIcon, SendAndArchiveRounded  as SendAndArchiveRoundedIcon} from '@mui/icons-material';
import { InputBox } from '../components/Styles/StyledComponent';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/SampleData';
import MessageComponent from '../components/Shared/MessageComponent';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useChatDetailsQuery } from '../redux/api';
const user={
  _id:"user._id2",
  name:"Syed parveen"
}

const Chat = ({chatId}) => {
  const containerref=useRef(null)
  const [message,setMessage]=useState("")

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails?.data?.chat?.members;
  console.log(members)
  const socket=getSocket()
  const submitHandler=(e)=>{
      e.preventDefault();
      if(!message.trim()){
        return;
      }
      console.log(message)
      socket.emit(NEW_MESSAGE,{ chatId, members, message })
      setMessage("")
  }
  return  chatDetails.isLoading ? <Skeleton/> : (
    <>
    <Stack  ref={containerref}
    boxSizing={"border-box"}
    padding={"1rem"}
    spacing={"1rem"}
    bgcolor={CustomeGray}
    height={"90%"}
    sx={{
      overflowX:"hidden",
      overflowY:"auto"
    }}

    >
      {
        sampleMessage.map((i)=>(

         


          <MessageComponent key={i._id} message={i} user={user}/>
        ))
      }
   
     </Stack>


     <form style={{
      height:"10%"
     }}
     onSubmit={submitHandler}
     >
      <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
        <IconButton
        sx={{
          position:"absolute",
          left:"1.5rem",
          rotate:"90deg"
        }}
        >
          <AttachFileIcon/>
        </IconButton>
        <InputBox
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder='Type Message Here...'/>
      <IconButton type='submit' sx={{
       
        backgroundColor:orange,
        color:"white",
        padding:"0.5rem",
        "&:hover":{
          bgcolor:"error.dark",
        }
      }}>
        <SendAndArchiveRoundedIcon/>
      </IconButton>
      </Stack>
      <FileMenu/>
     </form>
     
     </>
  )
}

export default AppLayout(Chat);