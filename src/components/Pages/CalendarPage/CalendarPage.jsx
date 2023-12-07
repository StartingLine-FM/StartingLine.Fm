import React from 'react';
import { useState } from "react";
import "./CalendarPage.css";
import Calendar from './Calendar';
import MenuSidebar from './MenuSidebar';
import { Grid, Box, Container, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalendarInfoModal from './CalendarInfoModal';

// The CalendarPage component organizes the overall layout of the calendar page in a grid format
const CalendarPage = () => {
  const [calendarInfoOpen, setCalendarInfoOpen] = useState(false);


  const handleCalendarInfoOpen = () => {
    setCalendarInfoOpen(true);
  };

  const handleCalendarInfoClose = () => {
    setCalendarInfoOpen(false);
  };

  return (
    // The outermost Container component adds a margin at the bottom of the page for spacing
    <Container style={{ marginBottom: '50px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3}>
            <CalendarInfoModal calendarInfoOpen={calendarInfoOpen} handleCalendarInfoClose={handleCalendarInfoClose} />
            <Box sx={{ p: 2 }} className='the-sidebar'>
              <Typography
                className='sidebar-title'
                variant="h5"
                align="center"
                gutterBottom>Menu
                <Tooltip title='How to use this calendar'>
                  <IconButton onClick={handleCalendarInfoOpen}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <MenuSidebar />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ overflowX: 'auto' }} className="the-calendar">
            <Calendar />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CalendarPage;