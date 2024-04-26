import React from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../components/Layout/AppLayout';
import { Box, Stack, Typography } from '@mui/material';
import { ChatBubbleOutlineOutlined } from '@mui/icons-material';


const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop={"40%"}
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
            transition={{ type: 'spring', stiffness: 80}}
          >
            <Typography >
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
      </Box>
    </motion.div>
  );
};

export default AppLayout(Home);