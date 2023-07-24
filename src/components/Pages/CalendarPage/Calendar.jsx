import React from 'react';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import listPlugin from '@fullcalendar/list'; // import list plugin
import moment from 'moment';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Box, Typography } from '@mui/material';

const Calendar = () => {
  const EP_Events = useSelector((store) => store.EP_Reducer);
  const FU_Events = useSelector((store) => store.FU_Reducer);
  const CHAMBER_Events = useSelector((store) => store.chamber_Reducer);
 


  // Combine events from all three reducers into a single array
  const allEvents = [...EP_Events, ...FU_Events, ...CHAMBER_Events];

  // Filter out null, undefined, or empty events from the array
  const filteredEvents = allEvents.filter((event) => event);


  const handleEventDidMount = (info) => {
    // Create a Bootstrap Popover on hover to display event details
    let eventDetails = `<div>
                            <span>Start: ${moment(info.event.start).format('LLL')}</span>
                            <p>${info.event.extendedProps.description}</p>
                            <p>Location: ${info.event.extendedProps.location}</p>
                        </div>`;
    new bootstrap.Popover(info.el, {
      title: info.event.title,
      placement: 'auto',
      trigger: 'hover',
      content: eventDetails,
      html: true,
    });
  }

  const handleEventClick = (info) => {
    // Format start and end dates for Google Calendar
    let startDate = moment(info.event.start).format('YYYYMMDD[T]HHmmSS[Z]');
    let endDate = info.event.end 
      ? moment(info.event.end).format('YYYYMMDD[T]HHmmSS[Z]')
      : moment(info.event.start).add(1, 'hour').format('YYYYMMDD[T]HHmmSS[Z]'); // Default to 1 hour if no end time
  
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
      <Typography variant="h4" component="h2">
        StartingLine.FM
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        // events={EP_Events}
        // events={EP_Events || FU_Events || CHAMBER_Events}
        events={filteredEvents}
        headerToolbar={{
          left: 'prev,next today',
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
    </Box>
  );
};

export default Calendar;
