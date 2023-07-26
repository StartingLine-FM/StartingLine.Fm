import React from 'react';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'; // import list plugin
import moment from 'moment';
import { format, parseISO } from 'date-fns';
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
  console.log('filered events are', filteredEvents);


  const handleEventDidMount = (info) => {
    // Format the start date using date-fns
    const startDate = format(new Date(info.event.start), 'MMMM d @ h:mm a');
    let eventDetails = `<div>
                            <span>Start: ${startDate}</span>
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
      <Typography variant="h4" component="h2">
        StartingLine.FM
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        
        events={filteredEvents}
        // events={[
        //   {
        //     title: 'Test Event 1',
        //     start: '2023-07-26T12:00 PM',
        //     description: 'This is a test event.',
        //     location: 'Test Location',
        //   }
        // ]}

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
