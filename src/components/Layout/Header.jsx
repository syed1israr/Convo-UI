import { AddCircleRounded as AddIcon, ChatBubbleRounded, Group as GroupIcon, LogoutRounded as LogoutRoundedIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material';
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { Suspense, lazy } from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orange } from '../../constants/Color';
import { server } from "../../constants/config.js";
import { userNotExists } from "../../redux/reducers/auth.js";
import { resetNotificationCount } from '../../redux/reducers/chat.js';
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc.js';

// Lazy-loaded components
const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroups'));

const Header = () => {
  const navigate = useNavigate();
  const { isSearch } = useSelector(state=>state.misc)
  const { isNotification } = useSelector(state=>state.misc)
  const { notificationCount } = useSelector(state=>state.chat)
  const { IsNewGroup } = useSelector(state=>state.misc)
  const a=IsNewGroup
  const b=setIsNewGroup
  
  
  const dispatch=useDispatch()
  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearchDialog = () => {
      dispatch(setIsSearch(true))
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  };

  const logoutHandler = async () => {
 try {
     
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
      dispatch(setIsNotification(true))
      dispatch(resetNotificationCount())
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
            <IconBtn title="Notifications" 
              value={notificationCount}
            icon={<NotificationsIcon />} onClick={openNotification} />
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
      {IsNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};


  const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
          {value ? (
            <Badge badgeContent={value} color="error">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </IconButton>
      </Tooltip>
    );
};


export default Header;
