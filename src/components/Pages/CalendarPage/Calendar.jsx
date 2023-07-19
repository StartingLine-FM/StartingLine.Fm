import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list'; // import list plugin

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin]} // add list plugin to plugins array
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today', // buttons for navigating
        center: 'title', // the current date / view title
        right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek', // buttons for changing view to month, week, day and list
      }}
      views={{
        dayGridMonth: { // name of view
          titleFormat: { year: 'numeric', month: 'short', day: 'numeric' } // other view-specific options here
        },
        dayGridWeek: {
          titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
        },
        dayGridDay: {
          titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
        },
        listWeek: { // list view
          titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
        },
      }}
    />
  );
};

export default Calendar;