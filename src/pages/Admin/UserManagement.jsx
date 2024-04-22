import { useFetchData } from '6pp';
import { Avatar, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from '../../components/Shared/Table';
import { server } from '../../constants/config';
import { useErrors } from '../../hooks/hooks';
import { transoformImage } from "../../lib/Features";

const Columns = [{
    field: "id",
    headerName: "ID",
    headerClassName: "MuiDataGrid-colCell", // Correct property name for header class
    width: 200
  },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 150,
    headerClassName: "MuiDataGrid-colCell", // Correct property name for header class
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
  },
  {
    field: "name",
    headerName: "name",
    headerClassName: "MuiDataGrid-colCell", // Correct property name for header class
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "MuiDataGrid-colCell", // Correct property name for header class
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "MuiDataGrid-colCell", // Correct property name for header class
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "MuiDataGrid-colCell", // Correct property name for header class
    width: 200,
  },
];

const UserManagement = () => {

  const{ loading , data ,error}=useFetchData(`${server}/admin/users`,"dashboard-users")
  

  useErrors([{
    isError:error,
    error:error
  }])
  const [rows, setRows] = useState([]);
  console.log("Data",data)
  useEffect(() => {
    if(data){
      setRows(
        data?.transformedUsers?.map((i) => ({
          ...i,
          id: i._id,
          avatar: transoformImage(i.avatar, 50),
          friends: i.friendsCount,
          groups: i.groupCount
        })) || []
      );
      
    }
  }, [data]);

  return (
    <AdminLayout>
      {
        loading? <Skeleton height={"100vh"} /> : <Table heading={"All users"} columns={Columns} rows={rows} />
      }
    </AdminLayout>
  );
}

export default UserManagement;
