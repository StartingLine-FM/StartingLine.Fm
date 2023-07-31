import React from 'react';
import "./CalendarPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { Business, BrightnessLow, HorizontalSplit, Clear } from '@mui/icons-material';


const MenuSidebar = () => {

  const dispatch = useDispatch();
  
  const loadingEP = useSelector((state) => state.EP_Loading_Reducer);
  const loadingFU = useSelector((state) => state.FU_Loading_Reducer);
  const loadingChamber = useSelector((state) => state.chamber_Loading_Reducer);

  const handleEP_Click = () => {
    dispatch({ type: 'FETCH_EP' });
  };

  const handleFU_Click = () => {
    dispatch({ type: 'FETCH_FU' });
  };

  const handleChamber_Click = () => {
    dispatch({ type: 'FETCH_CHAMBER' });
  };

  const handleClearClick = () => {
    dispatch({ type: 'CLEAR_CALENDARS' });
  };

  return (
    <Box className='sidebar-contents'>

      <IconButton
      className='EP-button' 
      onClick={handleEP_Click} 
      disabled={loadingEP}>
      {loadingEP ? <CircularProgress size={20} /> : <BrightnessLow />}
      <Typography marginLeft={2}>Emerging Prairie</Typography>
      </IconButton>

      <IconButton 
      className='FU-button'
      onClick={handleFU_Click} 
      disabled={loadingFU}>
      {loadingFU ? <CircularProgress size={20} /> : <HorizontalSplit />}
      <Typography marginLeft={2}>Fargo Underground</Typography>
      </IconButton>

      <IconButton
      className='chamber-button' 
      onClick={handleChamber_Click} 
      disabled={loadingChamber}>
      {loadingChamber ? <CircularProgress size={20} /> : <Business />}
      <Typography marginLeft={2}>Chamber of Commerce</Typography>
      </IconButton>
      
      <IconButton onClick={handleClearClick }
      className='clear-button'
      >
      <Clear />
      <Typography marginLeft={2}>Clear Calendars</Typography>
      </IconButton>

    </Box>
  );
};

export default MenuSidebar;