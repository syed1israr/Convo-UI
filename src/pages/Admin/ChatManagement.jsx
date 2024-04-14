import React, { useEffect, useState } from 'react';
import { Avatar, Stack } from '@mui/material';
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from '../../components/Shared/Table';
import { dashboardData } from "../../constants/SampleData";

import { transoformImage } from "../../lib/Features";
// Corrected function name
import AvatarCard from "../../components/Shared/AvatarCard";

const Columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "MuiDataGrid-colCell",
    width: 100
  },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 100,
    headerClassName: "MuiDataGrid-colCell",
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar[0]} />
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "MuiDataGrid-colCell",
    width: 200,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "MuiDataGrid-colCell",
    width: 100,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "MuiDataGrid-colCell",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members.map(member => member.avatar)} />
    )
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "MuiDataGrid-colCell",
    width: 200,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "MuiDataGrid-colCell",
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        <Avatar src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
    width: 250,
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dashboardData.chats.map((chat) => ({
      ...chat,
      id: chat._id, // Assigning unique id based on _id property
      avatar: chat.avatar.map((avatarUrl) => transoformImage(avatarUrl, 50)),
      creator: { // Correcting creator data
        name: chat.creator.name,
        avatar: transoformImage(chat.creator.avatar, 50)
      }
    })));
  }, []);

  return (
    <AdminLayout>
      <Table heading="All Chats" columns={Columns} rows={rows} />
    </AdminLayout>
  );
}

export default ChatManagement;