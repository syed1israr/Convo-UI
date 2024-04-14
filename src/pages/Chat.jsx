import React, { useRef } from 'react'
import AppLayout from '../components/Layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { CustomeGray, orange } from '../constants/Color';
import { AttachFile as AttachFileIcon, SendAndArchiveRounded  as SendAndArchiveRoundedIcon} from '@mui/icons-material';
import { InputBox } from '../components/Styles/StyledComponent';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/SampleData';
import MessageComponent from '../components/Shared/MessageComponent';
const user={
  _id:"user._id2",
  name:"Syed parveen"
}

const Chat = () => {
  const containerref=useRef(null)
  return (
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
     }}>
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
        <InputBox placeholder='Type Message Here...'/>
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