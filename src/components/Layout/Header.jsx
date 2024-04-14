import { AddCircleRounded as AddIcon, ChatBubbleRounded, Group as GroupIcon, LogoutRounded as LogoutRoundedIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material';
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { Suspense, lazy, useState } from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orange } from '../../constants/Color';
import { server } from "../../constants/config.js";
import { userNotExists } from "../../redux/reducers/auth.js";
import { setIsMobile, setIsSearch } from '../../redux/reducers/misc.js';

// Lazy-loaded components
const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroups'));

const Header = () => {
  const navigate = useNavigate();
  const { isSearch } = useSelector(state=>state.misc)
  
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const dispatch=useDispatch()
  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearchDialog = () => {
      dispatch(setIsSearch(true))
  };

  const openNewGroup = () => {
    setIsNewGroup(!isNewGroup);
  };

  const logoutHandler = async () => {
 try {
     console.log("User Loggin out")
     const { data }= await  axios.get(`${server}/user/logout`,{
       withCredentials:true
     })
     toast.success(data.message)
     dispatch(userNotExists())
 } catch (error) {
    toast.error(error?.response?.data?.message || "Something went Wrong ")
 }
  };

  const openNotification = () => {
    setIsNotification(!isNotification);
  };

  const navigateToGroup = () => {
    navigate('/groups');
  };

  return (
    <>
      <Box height={'4rem'} sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
               Chat App <ChatBubbleRounded/>
            </Typography>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <IconBtn title="Search" icon={<SearchIcon />} onClick={openSearchDialog} />
            <IconBtn title="New Group" icon={<AddIcon />} onClick={openNewGroup} />
            <IconBtn title="Notifications" icon={<NotificationsIcon />} onClick={openNotification} />
            <IconBtn title="Manage Group" icon={<GroupIcon />} onClick={navigateToGroup} />
            <IconBtn title="Logout" icon={<LogoutRoundedIcon />} onClick={logoutHandler} />
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open/>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open/>}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
