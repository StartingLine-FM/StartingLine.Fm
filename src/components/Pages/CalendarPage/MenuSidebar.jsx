import React from 'react';
import "./CalendarPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { School, Business, BrightnessLow, HorizontalSplit, Clear } from '@mui/icons-material';

const MenuSidebar = () => {
  const dispatch = useDispatch();

  // These reducers hold the response arrays from the calendar.router.js
  const EP_Events = useSelector((store) => store.EP_Reducer); // Emerging Prairie events
  const FU_Events = useSelector((store) => store.FU_Reducer); // Fargo Underground events
  const CHAMBER_Events = useSelector((store) => store.chamber_Reducer); // Chamber of Commerce Events
  const CEFB_Events = useSelector((store) => store.CEFB_Reducer); // NDSU CEFB Events

  // These reducers manage the load spinners when a calendar is called. 
  const loadingEP = useSelector((state) => state.EP_Loading_Reducer);
  const loadingFU = useSelector((state) => state.FU_Loading_Reducer);
  const loadingChamber = useSelector((state) => state.chamber_Loading_Reducer);
  const loadingCEFB = useSelector((state) => state.CEFB_Loading_Reducer);

  const handleEP_Click = () => {
    if (EP_Events.length === 0) {
      // If EP calendar data is empty, fetch it
      dispatch({ type: 'FETCH_EP' });
    } else {
      // If EP calendar data is not empty, clear it
      dispatch({ type: 'CLEAR_EP' }); 
    }
  };

  const handleFU_Click = () => {
    if (FU_Events.length === 0) {
      // If FU calendar data is empty, fetch it
      dispatch({ type: 'FETCH_FU' });
    } else {
      // If FU calendar data is not empty, clear it
      dispatch({ type: 'CLEAR_FU' }); 
    }
  };
  
  const handleChamber_Click = () => {
    if (CHAMBER_Events.length === 0) {
      // If Chamber calendar data is empty, fetch it
      dispatch({ type: 'FETCH_CHAMBER' });
    } else {
      // If Chamber calendar data is not empty, clear it
      dispatch({ type: 'CLEAR_CHAMBER' });
    }
  };

  const handleCEFB_Click = () => {
    if (CEFB_Events.length === 0) {
      // If CEFB calendar data is empty, fetch it
      dispatch({ type: 'FETCH_CEFB' });
    } else {
      // If CEFB calendar data is not empty, clear it
      dispatch({ type: 'CLEAR_CEFB' });
    }
  };

  const handleClearClick = () => { // Clears all data from every calendar reducers.
    dispatch({ type: 'CLEAR_CALENDARS' });
  };

  return (
    <Box>
      <IconButton // The NDSU CEFB Button
        className={`calendar-button`}
        color='inherit'
        onClick={handleCEFB_Click}
        disabled={loadingCEFB}
      >
        {loadingCEFB ? <CircularProgress size={20} /> : <School color='green'/>}
        <Typography className={CEFB_Events.length > 0 ? 'active-cefb' : 'passive'} paddingLeft={1} paddingRight={1}>NDSU CEFB</Typography>
      </IconButton>

      <IconButton // The Emerging Prairie Button
        className={`calendar-button`}
        color='inherit'
        onClick={handleEP_Click}
        disabled={loadingEP}
      >
        {loadingEP ? <CircularProgress size={20} /> : <BrightnessLow />}
        <Typography className={EP_Events.length > 0 ? 'active-ep' : 'passive'} paddingLeft={1} paddingRight={1}>Emerging Prairie</Typography>
      </IconButton>

      <IconButton // The Fargo Underground Button
        className={`calendar-button`}
        color='inherit'
        onClick={handleFU_Click}
        disabled={loadingFU}
      >
        {loadingFU ? <CircularProgress size={20} /> : <HorizontalSplit />}
        <Typography className={FU_Events.length > 0 ? 'active-fu' : 'passive'} paddingLeft={1} paddingRight={1}>Fargo Underground</Typography>
      </IconButton>

      <IconButton // The Chamber of Commerce Button
        className={`calendar-button`}
        color='inherit'
        onClick={handleChamber_Click}
        disabled={loadingChamber}
      >
        {loadingChamber ? <CircularProgress size={20} /> : <Business />}
        <Typography className={CHAMBER_Events.length > 0 ? 'active-chamber' : 'passive'} paddingLeft={1} paddingRight={1}>FMWF Chamber</Typography>
      </IconButton>

      <IconButton onClick={handleClearClick} // The Clear Button
        className='calendar-button'
        color='inherit'
      >
        <Clear />
        <Typography marginLeft={1}>Clear Calendars</Typography>
      </IconButton>
    </Box>
  );
};

export default MenuSidebar;
