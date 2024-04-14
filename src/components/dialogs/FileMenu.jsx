import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchorE1}) => {
  return (
        <Menu open={false} anchorEl={anchorE1}>
           <div style={{
            width:"10rem"
           }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti dolorum accusantium, esse quidem minus voluptates itaque repellat laborum sit omnis.
           </div>
        </Menu>
  )
}

export default FileMenu