import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../Chatbot';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          padding: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Box>
      <Chatbot />
      <Footer />
    </Box>
  );
};

export default Layout; 