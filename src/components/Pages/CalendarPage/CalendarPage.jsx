import React from 'react';
import "./CalendarPage.css";
import Calendar from './Calendar';
import MenuSidebar from './MenuSidebar';
import { Grid, Box, Container, Typography, Paper,  } from '@mui/material';

const CalendarPage = () => {
  return (
    <Container>
      <Grid container spacing={3}> 
        <Grid item xs={3}> 
          <Paper elevation={3}>
            <Box sx={{ p: 2 }} className='the-sidebar'>
              <Typography variant="h5" align="center" gutterBottom>Menu</Typography>
              <MenuSidebar />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ overflowX: 'auto' }} className="the-calendar">
            <Calendar />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CalendarPage;