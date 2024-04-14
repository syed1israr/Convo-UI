import React ,{ memo } from 'react'
import {StyledLink as Link} from '../Styles/StyledComponent'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'
const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,index=0,
    handleDeletChat
}) => {
    
 return <Link
    sx={{
        padding:"0.1rem",
       
    }}
 to={`/chat/${_id}`} onContextMenu={(e)=>handleDeletChat(e,_id,groupChat)} >
    <div style={{
        display:"flex",
        alignItems:"center",
        marginTop:"2px",
        padding:"1rem",
        backgroundColor: sameSender? "rgba(0,0,0,0.85)": "white",
        color:sameSender?  "white":"rgba(0,0,0,0.85)",
        position:"relative"
    }}>
        {/* avtar card*/}
        <AvatarCard avatar={avatar} />
        <Stack >
            <Typography>{name}</Typography>
            {
                newMessageAlert && (
                    <Typography>{newMessageAlert.count} newMessages</Typography>
                )
            }
        </Stack>
        {
            isOnline && <Box
            sx={{
                width:"10px",
                height:"10px",
                borderRadius:"50%",
                backgroundColor:"green",
                position:"absolute",
                top:"50%",
                right:"1rem",
                transform:"translateY(-50%)"
            }}
            />
        }
    </div>
 </Link>
}

export default memo(ChatItem)