import React from 'react';
import { useState, useEffect, useRef } from 'react';
import "./CalendarPage.css";
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import moment from 'moment';
import { format } from 'date-fns';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Box, Typography, Card, CardHeader, Paper } from '@mui/material';

const Calendar = () => {
  const EP_Events = useSelector((store) => store.EP_Reducer);
  const FU_Events = useSelector((store) => store.FU_Reducer);
  const CHAMBER_Events = useSelector((store) => store.chamber_Reducer);
  const CEFB_Events = useSelector((store) => store.CEFB_Reducer);

  // Combine events from all three reducers into a single array
  const allEvents = [
    ...EP_Events,
    ...FU_Events,
    ...CHAMBER_Events,
    ...CEFB_Events,
  ].flat(); // Use flat to remove nested arrays


  const ref = useRef(null);

  useEffect(() => {
    let calendarApi = ref.current.getApi();

    if (window.innerWidth > 600) {
      calendarApi.changeView("dayGridMonth")
    }
    if (window.innerWidth < 600) {
      calendarApi.changeView("listWeek")
    }
  }, []);

  const handleEventDidMount = (info) => {
    const startDate = format(new Date(info.event.start), 'MMMM d @ h:mm a');
    const endDate = format(new Date(info.event.end), 'MMMM d @ h:mm a');
    const { description, location } = info.event.extendedProps;

    let eventDetails = `<div> 
                            <span>Start: ${startDate}</span>
                            <span>End: ${endDate}</span>
                            <p>${description}</p>`;

    if (location && location.trim() !== '') {
      eventDetails += `<p>Location: ${location}</p>`;
    }

    eventDetails += `</div>`;

    new bootstrap.Popover(info.el, {
      title: info.event.title,
      placement: 'auto',
      trigger: 'hover',
      content: eventDetails,
      html: true,
    });
  };


  const handleEventClick = (info) => {
    let startDate = moment(info.event.start).format('YYYYMMDD[T]HHmmSS');
    let endDate = moment(info.event.end).format('YYYYMMDD[T]HHmmSS');
    let description = encodeURIComponent(info.event.extendedProps.description);

    window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${info.event.title}&dates=${startDate}/${endDate}&details=${description}&location=${info.event.extendedProps.location}`, '_blank');
  };

  return (
    <Paper sx={{ px: 2, pb: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6">Local Events</Typography>
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        events={allEvents}
        contentHeight="auto"
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
        }}
        eventDidMount={handleEventDidMount}
        eventClick={handleEventClick}
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
    </Paper>
  );
};

export default Calendar;
