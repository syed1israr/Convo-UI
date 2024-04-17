import { Box, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Close, ExitToApp, Groups2, ManageAccounts, Menu, Message } from "@mui/icons-material";
import { useLocation , Link as LinkComponent, Navigate } from 'react-router-dom';

import { Dashboard as DashboardIcon } from "@mui/icons-material";
import styled from '@emotion/styled';

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;

  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }

  ${(props) =>
    props.active &&
    `
    background-color: black;
    color: white;
    &:hover {
      color: white;
    }
  `}
`;


const admintabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />
  },
  {
    name: "Users",
    path: "/admin/user-management",
    icon: <ManageAccounts />
  },
  {
    name: "Chats",
    path: "/admin/chat-management",
    icon: <Groups2 />
  },
  {
    name: "Messages",
    path: "/admin/message-management",
    icon: <Message />
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const logOuthandler=()=>{
  
  }
  return (
    <Stack width={w} direction="column" p="3rem" spacing="3rem">
      <Typography variant="h5" textTransform="uppercase">Chattu</Typography>
      <Stack spacing="1rem">
        {admintabs.map((tab) => (
          <Link
           key={tab.path}
          to={tab.path}
          active={location.pathname === tab.path}
          >
            <Stack direction="row" spacing="1rem" alignItems="center">
              {tab.icon}
              <Typography fontSize={"1rem"}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link
        

          onClick={logOuthandler}
          >
            <Stack direction="row" spacing="1rem" alignItems="center">
              <ExitToApp/>
              <Typography>Logut</Typography>
            </Stack>
          </Link>
      </Stack>
    </Stack>
  );
};
const isAdmin=true;
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleClose = () => {
    setIsMobile(false); // Close drawer when handleClose is called
  };
  if(!isAdmin){
    return <Navigate to={"/admin"}/>
  }
  return (
    <Grid container minHeight="100vh">
      <Box sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        right: "1rem",
        top: "1rem"
      }}>
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <Menu />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ display: { xs: "block", md: "block" } }}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
