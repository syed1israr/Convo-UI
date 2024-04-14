import React, { Suspense, lazy, useState } from 'react';
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { orange } from '../../constants/Color';
import { Group as GroupIcon, Menu as MenuIcon, Search as SearchIcon, AddCircleRounded as AddIcon, LogoutRounded as LogoutRoundedIcon, Notifications as NotificationsIcon, ChatBubbleOutlineTwoTone, ChatBubbleRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { userExists } from '../../redux/reducers/auth';
import toast from 'react-hot-toast';

// Lazy-loaded components
const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroups'));

const Header = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const dispatch=useDispatch()
  const handleMobile = () => {
    setMobile(!mobile);
  };

  const openSearchDialog = () => {
    setIsSearch(!isSearch);
  };

  const openNewGroup = () => {
    setIsNewGroup(!isNewGroup);
  };

  const logoutHandler = () => {
    dispatch(userExists(false))
    toast.error("Nikal Bahar Bhosdike")
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
