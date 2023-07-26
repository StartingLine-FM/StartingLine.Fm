import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#f2f2f2',
        padding: '10px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Typography variant="subtitle1">StartingLine.FM</Typography>
      {/* <Typography variant="subtitle1">©️ Kord Maurer, Eyan Anderson, Sawyer Jensen, Jack Blonigen</Typography> */}
      {/* <Typography variant="subtitle1">©️ Kord Maurer, Eyan Anderson, Sawyer Jensen, Jack Blonigen</Typography> */}
    </Box>
  );
};

export default Footer;
