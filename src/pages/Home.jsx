import React from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../components/Layout/AppLayout';
import { Box, Stack, Typography } from '@mui/material';
import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { CustomeGray } from '../constants/Color';
// Corrected the spelling of 'CustomGray'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '91vh', // Set height to 100vh for full viewport height
        backgroundColor: CustomeGray, // Used CustomGray instead of CustomeGray
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Stack textAlign="center">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <Typography variant="h5" pt="2rem">
            ConvoConnect <ChatBubbleOutlineOutlined />
          </Typography>
        </motion.div>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 80 }}
        >
          <Typography>
            Unlock the Power of Meaningful Conversations with ConvoConnect 🖤
          </Typography>
        </motion.div>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 80 }}
        >
          <Typography variant="h6">
            Select a Friend To Chat!
          </Typography>
        </motion.div>
      </Stack>
    </motion.div>
  );
};

export default AppLayout(Home);
