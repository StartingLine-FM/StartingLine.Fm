import React from 'react';
import Calendar from './Calendar';
import MenuSidebar from './MenuSidebar';
import { Grid, Box } from '@mui/material';

const CalendarPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <h1>StartingLine.FM</h1>
      <Grid container> 
        <Grid item xs={3}> 
          <MenuSidebar />
        </Grid>
        <Grid item xs={9}>
          <Calendar />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CalendarPage;