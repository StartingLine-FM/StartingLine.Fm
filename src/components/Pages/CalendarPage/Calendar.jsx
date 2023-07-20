import React from 'react';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import listPlugin from '@fullcalendar/list'; // import list plugin


import { Box, Typography } from '@mui/material';

const Calendar = () => {
  const EP_Events = useSelector((store) => store.EP_Reducer);
  const FU_Events = useSelector((store) => store.FU_Reducer);
  const CHAMBER_Events = useSelector((store) => store.chamber_Reducer);
  console.log('EP events are', EP_Events);
  console.log('FU events are', FU_Events);
  console.log('Chamber events are', CHAMBER_Events);


  const handleEventMouseEnter = (info) => {
    // Display the event info when a user hovers over the event
    info.el.setAttribute('title', info.event.title);
    info.el.setAttribute('location', info.event.location);
    info.el.setAttribute('time', info.event.time);
    info.el.setAttribute('description', info.event.description);
  }

  const handleEventClick = (info) => {
    // Redirect to Google Calendar upon clicking the event
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${info.event.title}&dates=${info.event.start.toISOString()}/${info.event.end.toISOString()}`, "_blank");
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
        events={EP_Events || FU_Events || CHAMBER_Events}
        // events={allEvents}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
        }}
        eventMouseEnter={handleEventMouseEnter} // attach the handleEventMouseEnter handler
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
