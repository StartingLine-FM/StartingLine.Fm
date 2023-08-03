import React from 'react';
import "./CalendarPage.css";
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'; // import list plugin
import moment from 'moment';
import { format, parseISO } from 'date-fns';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Box, Typography, Paper, Card, CardHeader } from '@mui/material';

const Calendar = () => {
  //These reducers hold the response arrays from the calendar.router.js
  const EP_Events = useSelector((store) => store.EP_Reducer); //Emerging Praire events
  const FU_Events = useSelector((store) => store.FU_Reducer); //Fargo Underground events
  const CHAMBER_Events = useSelector((store) => store.chamber_Reducer); //Chamber of Commerce Events
 


  // Combine events from all three reducers into a single array
  const allEvents = [...EP_Events, ...FU_Events, ...CHAMBER_Events];

  // Filter out null, undefined, or empty events from the array
  const filteredEvents = allEvents.filter((event) => event);
  console.log('filered events are', filteredEvents);


  const handleEventDidMount = (info) => {
    // Format the start date using date-fns
    const startDate = format(new Date(info.event.start), 'MMMM d @ h:mm a');
    const endDate = format(new Date(info.event.end), 'MMMM d @ h:mm a');
    // const date = format(new Date(info.event.date), 'MMMM d @ h:mm a - h:mm a');
    const { description, location } = info.event.extendedProps;
  
    let eventDetails = `<div> 
                            <span>Start: ${startDate}</span>
                            <span>End: ${endDate}</span>
                            <p>${description}</p>`;
    
    // Only include location if it is not an empty string or undefined
    if (location && location.trim() !== '') {
      eventDetails += `<p>Location: ${location}</p>`;
    }
  
    eventDetails += `</div>`;
  
    new bootstrap.Popover(info.el, { //The mouse over hover information for calendar entries
      title: info.event.title,
      placement: 'auto',
      trigger: 'hover',
      content: eventDetails,
      html: true,
    });
  };
  
  
  const handleEventClick = (info) => {
    // Format start and end dates for Google Calendar

    console.log(info)
    let startDate = moment(info.event.start).format('YYYYMMDD[T]HHmmSS');
    let endDate = moment(info.event.end).format('YYYYMMDD[T]HHmmSS')
    

  
    // Encode description to ensure it's URL-safe
    let description = encodeURIComponent(info.event.extendedProps.description);
  
    // Open Google Calendar event creation in a new tab
    window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${info.event.title}&dates=${startDate}/${endDate}&details=${description}&location=${info.event.extendedProps.location}`, '_blank');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      
      <Card sx={{paddingleft:2, paddingRight:2, paddingBottom:2}}>
        <CardHeader
        title='Local Events'
        className='calendar-title'
        />
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        contentHeight={'65vh'}
        
        //Below is where the reducer data is added to the calendar
        events={filteredEvents}

        headerToolbar={{ //This designates the upper toolbar buttons that render
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
        }}


        eventDidMount={handleEventDidMount} // attach the handleEventDidMount handler
        eventClick={handleEventClick} // attach the handleEventClick handler
        views={{
          dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
          },
          dayGridWeek: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
          },
          dayGridDay: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
          },
          listWeek: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
          },
        }}
      />
      </Card>
    </Box>
  );
};

export default Calendar;
