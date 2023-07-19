import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list'; // import list plugin
import MenuSidebar from './MenuSidebar';

import { Box, Typography } from '@mui/material';

const Calendar = () => {

  const EP_Events = useSelector((store) => store.EP_events);
  const FU_Events = useSelector((store) => store.FU_events);
  const CHAMBER_Events = useSelector((store) => store.CHAMBER_events);
  const dispatch = useDispatch();


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
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={EP_Events || FU_Events || CHAMBER_Events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
        }}
        views={{
          dayGridMonth: { 
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
          },
          dayGridWeek: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
          },
          dayGridDay: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
          },
          listWeek: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
          },
        }}
      />
    </Box>
  );
};

export default Calendar;