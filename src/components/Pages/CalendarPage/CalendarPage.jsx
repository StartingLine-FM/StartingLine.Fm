import React from 'react';
import "./CalendarPage.css";
import Calendar from './Calendar';
import MenuSidebar from './MenuSidebar';
import { Grid, Box, Container, Typography, Paper, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

// The CalendarPage component organizes the overall layout of the calendar page in a grid format
const CalendarPage = () => {
  return (
    // The outermost Container component adds a margin at the bottom of the page for spacing
    <Container style={{marginBottom: '50px'}}>
      {/* // The Grid container creates a responsive layout with spacing between grid items */}
      <Grid container spacing={3}> 
        {/* // The sidebar occupies 3 out of 12 columns (or 'xs' grid units) in the grid */}
        <Grid item xs={3}> 
          {/* // The Paper component provides a background and shadow (elevation) for the sidebar */}
          <Paper elevation={3}>
            {/* // The Box component provides padding and houses the sidebar contents */}
            <Box sx={{ p: 2 }} className='the-sidebar'>
              {/* // Typography component with a Tooltip and InfoIcon provides user guidance */}
              <Typography 
                className='sidebar-title' 
                variant="h5" 
                align="center" 
                gutterBottom>Menu 
                <Tooltip title="Choose an institution to pull their calendar. Clicking a calendar event will preload it into your own google calendar.">
                  <InfoIcon style={{ marginLeft: '10px' }} 
                  color="action" />
                </Tooltip>
              </Typography>
              {/* // MenuSidebar is a custom component that displays a list of calendar options */}
              <MenuSidebar />
            </Box>
          </Paper>
        </Grid>
        {/* The calendar occupies the remaining 9 out of 12 grid units in the grid */}
        <Grid item xs={9}>
          {/* // The Box component allows the calendar to scroll horizontally if it overflows */}
          <Box sx={{ overflowX: 'auto' }} className="the-calendar">
            {/* // Calendar is a custom component that displays a full calendar */}
            <Calendar />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}