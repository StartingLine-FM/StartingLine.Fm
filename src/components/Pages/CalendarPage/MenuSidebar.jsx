import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, Typography, Un} from '@mui/material';
import { Event, Business } from '@mui/icons-material';

const MenuSidebar = () => {
    const EP_Events = useSelector((store) => store.EP_events);
    const FU_Events = useSelector((store) => store.FU_events);
    const CHAMBER_Events = useSelector((store) => store.CHAMBER_events);
    const dispatch = useDispatch();

  
    const handleEP_Click = () => {
      // Fetch Emerging Prairies Calendar Data
      dispatch({ type: 'FETCH_EP' });
    };
  
    const handleFU_Click = () => {
      // Fetch Fargo Underground Calendar Data
      dispatch({ type: 'FETCH_FU' });
    };
  
    const handleChamber_Click = () => {
      // Fetch Chamber of Commerce Calendar Data
      dispatch({ type: 'FETCH_CHAMBER' });
    };
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton onClick={handleEP_Click}>
          <Event />
          <Typography>Emerging Prairie</Typography>
        </IconButton>
        <IconButton onClick={handleFU_Click}>
          <Typography>Fargo Underground</Typography>
        </IconButton>
        <IconButton onClick={handleChamber_Click}>
          <Business />
          <Typography>Chamber of Commerce</Typography>
        </IconButton>
      </Box>
    );
};
  
  export default MenuSidebar