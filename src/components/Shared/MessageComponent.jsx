import { Box, Typography , Avatar } from '@mui/material'
import { motion } from "framer-motion"
import moment from 'moment'
import React, { memo } from 'react'

import { fileFormat } from '../../lib/Features'
import RenderContent from './RenderContent'
import { useSelector } from 'react-redux'
import { useChatDetailsQuery } from '../../redux/api'
import { useParams } from 'react-router-dom'

const MessageComponent = ({message}) => {

    const { user }=  useSelector(state=> state.auth);
    const params = useParams();
    const chatId = params.chatId;
    const {sender, content ,attachments,createdAt}=message
    const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId ,populate :true});
    
    const otherUserUrl = chatDetails?.data?.chat?.members[0].avatar

    const sameSender=sender?._id===((user?.data?._id) || (user?._id))
    
    const timeAgo=moment(createdAt).fromNow()
  return (
    <motion.div
        initial={{opacity:0,x:"-100%"}}
        whileInView={{opacity:1,x:0}}
        
        style={{
            alignSelf:sameSender? "flex-end"  : "flex-start",
            backgroundColor:"white",
            color:"black",
            borderRadius:"5px",
            padding:"0.5rem",
            width:"fit-content",
            borderRadius:"20px",
            border:"2px solid rgba(38,38,38,0.1)",
        }}
    >
       <div
       style={{
        display:"flex",
        flexDirection: sameSender ? "row-reverse" : "row",
        gap:"10px",
        alignItems:attachments ? "" : "center",
       }}
       >
       {
        sameSender ?  <Avatar src={(user?.data?.avatar?.url) || (user?.avatar?.url)}/> :  <Avatar src={otherUserUrl}/> 
        }
       <div>
       {!sameSender && <Typography color={"#2694ab"} fontWeight={"600"} variant='caption'>{sender.name}</Typography>}
        {
            content && <Typography>{content}</Typography>
        }
        {attachments?.length>0 && 
        (
            attachments.map((attachment,index)=>{
                const url=attachment.url;
                const file=fileFormat(url);

                return <Box key={index}>
                   
                    <a href={url} target='' download={true} style={{color:"black"}}>
                        {RenderContent(file,url)}
                    </a>
                </Box>
            })
        )
        }
        <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
       </div>
       </div>
    </motion.div>
  )
}

export default memo(MessageComponent)