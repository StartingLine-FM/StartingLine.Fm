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

  const handleSourceClick = (source) => {
    if (source === 'EP' && EP_Events.length === 0) {
      dispatch({ type: 'FETCH_EP' });
    } else if (source === 'EP') {
      dispatch({ type: 'CLEAR_EP' });
    } else if (source === 'FU' && FU_Events.length === 0) {
      dispatch({ type: 'FETCH_FU' });
    } else if (source === 'FU') {
      dispatch({ type: 'CLEAR_FU' });
    } else if (source === 'CHAMBER' && CHAMBER_Events.length === 0) {
      dispatch({ type: 'FETCH_CHAMBER' });
    } else if (source === 'CHAMBER') {
      dispatch({ type: 'CLEAR_CHAMBER' });
    } else if (source === 'CEFB' && CEFB_Events.length === 0) {
      dispatch({ type: 'FETCH_CEFB' });
    } else if (source === 'CEFB') {
      dispatch({ type: 'CLEAR_CEFB' });
    }
  };

  const handleClearClick = () => {
    dispatch({ type: 'CLEAR_CALENDARS' });
  };

  // Define a color mapping for each button
  const colorMap = {
    CEFB: 'green',
    EP: 'red',
    FU: 'orange',
    Chamber: 'purple',
  };

  return (
    <Box>
      <IconButton // The NDSU CEFB Button
        className={`calendar-button`}
        sx={{ color: CEFB_Events.length > 0 ? colorMap.CEFB : 'black' }} // Change color based on CEFB_Events length
        onClick={() => handleSourceClick('CEFB')}
        disabled={loadingCEFB}
      >
        {loadingCEFB ? <CircularProgress size={20} /> : <School />}
        <Typography className={CEFB_Events.length > 0 ? 'active-cefb' : 'passive'} paddingLeft={1} paddingRight={1}>NDSU CEFB</Typography>
      </IconButton>

      <IconButton // The Emerging Prairie Button
        className={`calendar-button`}
        sx={{ color: EP_Events.length > 0 ? colorMap.EP : 'black' }} // Change color based on EP_Events length
        onClick={() => handleSourceClick('EP')}
        disabled={loadingEP}
      >
        {loadingEP ? <CircularProgress size={20} /> : <BrightnessLow />}
        <Typography className={EP_Events.length > 0 ? 'active-ep' : 'passive'} paddingLeft={1} paddingRight={1}>Emerging Prairie</Typography>
      </IconButton>

      <IconButton // The Fargo Underground Button
        className={`calendar-button`}
        sx={{ color: FU_Events.length > 0 ? colorMap.FU : 'black' }} // Change color based on FU_Events length
        onClick={() => handleSourceClick('FU')}
        disabled={loadingFU}
      >
        {loadingFU ? <CircularProgress size={20} /> : <HorizontalSplit />}
        <Typography className={FU_Events.length > 0 ? 'active-fu' : 'passive'} paddingLeft={1} paddingRight={1}>Fargo Underground</Typography>
      </IconButton>

      <IconButton // The Chamber of Commerce Button
        className={`calendar-button`}
        sx={{ color: CHAMBER_Events.length > 0 ? colorMap.Chamber : 'black' }} // Change color based on Chamber_Events length
        onClick={() => handleSourceClick('CHAMBER')}
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
