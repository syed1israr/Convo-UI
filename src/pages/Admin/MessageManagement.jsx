import { useFetchData } from "6pp";
import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/Layout/AdminLayout';
import RenderContent from "../../components/Shared/RenderContent";
import Table from '../../components/Shared/Table';
import { server } from '../../constants/config';
import { useErrors } from '../../hooks/hooks';
import { fileFormat, transoformImage } from "../../lib/Features";
// Import Avatar component if not already imported
{/*
  Hi
*/}
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
    const{ loading , data ,error}=useFetchData(`${server}/admin/messages`,"dashboard-messages")
    useErrors([{
      isError:error,
      error:error
    }])
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        if(data){
            setRows(data?.transformedMessages.map((message, index) => ({
                ...message,
                id: message._id, // Ensure each row has a unique id property
                sender: {
                    name: message.sender.name,
                    avatar: transoformImage(message.sender.avatar, 50)
                },
                createdAt: moment(message.createdAt).format("YYYY-MM-DD HH:mm:ss") // Adjust format as needed
            })));
        }
  }, [data]);

    return (
        <AdminLayout>
           {
            loading? <Skeleton height={"100vh"} /> :  <Table heading={"All Messages"} 
            rowheight={200}
            columns={Columns} rows={rows}/>
           }
        </AdminLayout>
    );
}

export default MessageManagement;
