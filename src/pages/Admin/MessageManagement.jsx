import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout/AdminLayout';
import Table from '../../components/Shared/Table';
import { dashboardData } from '../../constants/SampleData';
import { fileFormat, transoformImage } from "../../lib/Features";
import moment from 'moment';
import { Avatar, Box, Stack } from '@mui/material';
import RenderContent from  "../../components/Shared/RenderContent"

// Import Avatar component if not already imported

const Columns = [{
    field: "id",
    headerName: "ID",
    headerClassName: "MuiDataGrid-colCell",
    width: 200
},
{
    field: "attachments",
    headerName: "Attachments",
    width: 300,
    headerClassName: "MuiDataGrid-colCell",
    renderCell: (params) => {
      const { attachments } =params.row;
      
      return attachments?.length > 0 ? attachments.map(i=>{
        const url=i.url;
        const file=fileFormat(url);

        return  <Box>
          <a href={url}
          download={true}
          target='_blank'
          style={{
            color:"black"
          }}
          > { RenderContent(file,url)}</a>
        </Box>
      }) : "No attachements"
   
  
  }
},
{
    field: "content",
    headerName: "Content",
    headerClassName: "MuiDataGrid-colCell",
    width: 400,
},
{
    field: "sender",
    headerName: "Sent By",
    width: 150,
    headerClassName: "MuiDataGrid-colCell",
    renderCell: (params) => <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
        <Avatar alt={params.row.sender.avatar} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
    </Stack>
},
{
    field: "chat",
    headerName: "Chat",
    headerClassName: "MuiDataGrid-colCell",
    width: 220,
},
{
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "MuiDataGrid-colCell",
    width: 100,
},
{
    field: "createdAt",
    headerName: "Time",
    headerClassName: "MuiDataGrid-colCell",
    width: 100,
},
];

const MessageManagement = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
      setRows(dashboardData.messages.map((message, index) => ({
          ...message,
          id: message._id, // Ensure each row has a unique id property
          sender: {
              name: message.sender.name,
              avatar: transoformImage(message.sender.avatar, 50)
          },
          createdAt: moment(message.createdAt).format("YYYY-MM-DD HH:mm:ss") // Adjust format as needed
      })));
  }, []);

    return (
        <AdminLayout>
            <Table heading={"All Messages"} 
            rowheight={200}
            columns={Columns} rows={rows}/>
        </AdminLayout>
    );
}

export default MessageManagement;
