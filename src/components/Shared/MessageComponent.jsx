import { Box, Typography } from '@mui/material'
import { motion } from "framer-motion"
import moment from 'moment'
import React, { memo } from 'react'
import { LightBlue } from '../../constants/Color'
import { fileFormat } from '../../lib/Features'
import RenderContent from './RenderContent'

const MessageComponent = ({message, user}) => {
    const {sender, content ,attachments,createdAt}=message
    const sameSender=sender?._id===user?.data?._id
    
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
        {!sameSender && <Typography color={LightBlue} fontWeight={"600"} variant='caption'>{sender.name}</Typography>}
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
    </motion.div>
  )
}

export default memo(MessageComponent)