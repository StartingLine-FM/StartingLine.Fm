import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!



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
      <div className='button-container'>
        {/* Dashboard to Call Calendar Data */}
        <button className='calendar-call' onClick={handleEP_Click}>Emerging Prairie</button>
        <button className='calendar-call' onClick={handleFU_Click}>Fargo Underground</button>
        <button className='calendar-call' onClick={handleChamber_Click}>Chamber of Commerce</button>

      </div>
    );
  };
  
  export default MenuSidebar