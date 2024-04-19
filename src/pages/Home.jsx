import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { Box, Typography  } from '@mui/material';
import { CustomeGray } from '../constants/Color';
{/*
  Hi
*/}
const Home = () => {
 return (
 <Box bgcolor={CustomeGray} height={"100%"}  >
  <Typography p={"2rem "} variant='h5' textAlign={"center"}>Select a Friend to chat</Typography>
 </Box>
 )
}

export default AppLayout(Home);
