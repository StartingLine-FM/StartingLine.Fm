import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Calendar from './Calendar';



const MenuSidebar = () => {
    const EP_Events = useSelector((store) => store.EP_events);
    const FU_Events = useSelector((store) => store.FU_events);
    const CHAMBER_Events = useSelector((store) => store.CHAMBER_events);
    const dispatch = useDispatch();

    const [selectedCalendarData, setSelectedCalendarData] = useState([]);
  
    const handleEP_Click = () => {
      // Fetch Emerging Prairies Calendar Data
      dispatch({ type: 'FETCH_EP' });
      setSelectedCalendarData(EP_Events);
    };
  
    const handleFU_Click = () => {
      // Fetch Fargo Underground Calendar Data
      dispatch({ type: 'FETCH_FU' });
      setSelectedCalendarData(FU_Events);
    };
  
    const handleChamber_Click = () => {
      // Fetch Chamber of Commerce Calendar Data
      dispatch({ type: 'FETCH_CHAMBER' });
      setSelectedCalendarData(CHAMBER_Events);
    };
  
    return (
      <div className='button-container'>
        {/* Dashboard to Call Calendar Data */}
        <button className='calendar-call' onClick={handleEP_Click}>Emerging Prairie</button>
        <button className='calendar-call' onClick={handleFU_Click}>Fargo Underground</button>
        <button className='calendar-call' onClick={handleChamber_Click}>Chamber of Commerce</button>
        {/* Pass selectedCalendarData as a prop to the Calendar component */}
        {/* <Calendar selectedCalendarData={selectedCalendarData} /> */}
      </div>
    );
  };
  
  export default MenuSidebar