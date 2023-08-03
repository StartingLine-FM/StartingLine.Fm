import React from 'react';
import "./CalendarPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Typography, CircularProgress, Tooltip } from '@mui/material';
import { Business, BrightnessLow, HorizontalSplit, Clear} from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';


const MenuSidebar = () => {

  const dispatch = useDispatch();
  
  //These reducers manage the load spinners when a calendar is called. 
  const loadingEP = useSelector((state) => state.EP_Loading_Reducer);
  const loadingFU = useSelector((state) => state.FU_Loading_Reducer);
  const loadingChamber = useSelector((state) => state.chamber_Loading_Reducer);

  const handleEP_Click = () => { //Call the emerging praire GET request which scrapes their calendar.
    dispatch({ type: 'FETCH_EP' });
  };

  const handleFU_Click = () => { //Call the Fargo Undergroun GET request which scrapes their calendar.
    dispatch({ type: 'FETCH_FU' });
  };

  const handleChamber_Click = () => { //Call the Chamber of Commerce GET request which scrapes their calendar.
    dispatch({ type: 'FETCH_CHAMBER' });
  };

  const handleClearClick = () => { //Clears all data from all three calendar reducers.
    dispatch({ type: 'CLEAR_CALENDARS' });
  };

  return (
    <Box>

      <IconButton //The Emerging Prairie Button
      className='EP-button'
      color='inherit' 
      onClick={handleEP_Click} 
      disabled={loadingEP}>
      {loadingEP ? <CircularProgress size={20} /> : <BrightnessLow />}
      <Typography marginLeft={1}>Emerging Prairie</Typography>
      </IconButton>

      <IconButton //The Fargo Underground Button
      className='FU-button'
      color='inherit'
      onClick={handleFU_Click} 
      disabled={loadingFU}>
      {loadingFU ? <CircularProgress size={20} /> : <HorizontalSplit />}
      <Typography marginLeft={1}>Fargo Underground</Typography>
      </IconButton>

      <IconButton //The Chamber of Commerce Button
      className='chamber-button' 
      color='inherit'
      onClick={handleChamber_Click} 
      disabled={loadingChamber}>
      {loadingChamber ? <CircularProgress size={20} /> : <Business />}
      <Typography marginLeft={1}>Chamber of Commerce</Typography>
      </IconButton>
      
      <IconButton onClick={handleClearClick } //The Clear Button
      className='clear-button'
      color='inherit'
      >
      <Clear />
      <Typography marginLeft={1}>Clear Calendars</Typography>
      </IconButton>

    </Box>
  );
};

export default MenuSidebar;