import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { Event, Business } from '@mui/icons-material';


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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton onClick={handleEP_Click} disabled={loadingEP}>
        {loadingEP ? <CircularProgress size={20} /> : <Event />}
        <Typography>Emerging Prairie</Typography>
      </IconButton>
      <IconButton onClick={handleFU_Click} disabled={loadingFU}>
        {loadingFU ? <CircularProgress size={20} /> : <Typography>Fargo Underground</Typography>}
      </IconButton>
      <IconButton onClick={handleChamber_Click} disabled={loadingChamber}>
        {loadingChamber ? <CircularProgress size={20} /> : <Business />}
        <Typography>Chamber of Commerce</Typography>
      </IconButton>
      <IconButton onClick={handleClearClick}>
        <Event />
        <Typography>Clear Calendars</Typography>
      </IconButton>
    </Box>
  );
};

export default MenuSidebar;