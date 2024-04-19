import { FileOpen } from '@mui/icons-material';
import React from 'react';
import { transoformImage } from '../../lib/Features';

const RenderContent = (file,url) => {
    switch (file) {
        case "video":
           return  <video src={url} preload='none' width={"200px"} controls/>
            
        case "audio":
            return <audio src={url} preload='none' controls/>
            
        case "image":
            return <img src={transoformImage(url,200)} height={"150px"} width={"200px"} style={{objectFit:"contain"}} />
             
    
        default:
            return  <FileOpen/>
    }
}

export default RenderContent