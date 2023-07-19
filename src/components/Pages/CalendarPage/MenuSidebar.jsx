import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!



const CalendarMenu = () => {

const EP_Events = useSelector(store => EP.events);
const FU_Events = useSelector(store => FU.events);
const CHAMBER_Events = useSelector(store => CHAMBER.events);
const dispatch = useDispatch();

const handleEP_Click = () => {
    //Fetch Emerging Prairies Caledndar Data
    dispatch({ type: 'FETCH_EP' });
}

return(

<div></div>






)




}