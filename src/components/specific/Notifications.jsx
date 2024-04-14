
import React, { memo } from 'react'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,


  ListItem,
  Stack,

  Typography
} from '@mui/material';

import { SampleNotification } from '../../constants/SampleData';

const Notifications = () => {

  const friendRequestHandler=({_id,accept})=>{

  }
  return <Dialog open>
    <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"}>
      <DialogTitle>Notifications</DialogTitle>
      {
        SampleNotification.length>0? (
          SampleNotification.map((i)=><NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler} key={i._id} />)
        ):<Typography textAlign={"center"}  > No Notifications!</Typography>
      }
    </Stack>

  </Dialog>
}
const NotificationItem=memo(({sender,_id,handler})=>{
  const {name, avatar}=sender
  return(
    <ListItem
  
    >
    <Stack direction={{ 
      xs:"column",
      sm:"row"
    }} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar src={avatar}/>
        <Typography
        variant='body1'
        sx={{
            flexGrow:1,
            display:"-webkit-box",
            WebkitLineClamp:1,
            WebkitBoxOrient:"vertical",
            overflow:"hidden",
            textOverflow:"ellipsis"
        }}

        
        >{`${name} sent you a friend request`}</Typography>
        <Stack direction={"row"}>
          <Button onClick={()=>handler({_id,accept:true})} >Accept</Button>
          <Button color="error"  onClick={()=>handler({_id,accept:false})}>Reject</Button>
        </Stack>
    </Stack>
  </ListItem>
 )
})

export default Notifications