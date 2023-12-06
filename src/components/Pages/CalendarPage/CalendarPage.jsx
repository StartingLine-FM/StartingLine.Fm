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
    <Container style={{ marginBottom: '50px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3}>
            <Box sx={{ p: 2, flexDirection: "column" }} className='the-sidebar'>
              {/* // Typography component with a Tooltip and InfoIcon provides user guidance */}
              <Typography
                className='sidebar-title'
                variant="h5"
                align="center"
                gutterBottom>Menu
                <Tooltip title="Choose an institution to pull their calendar. Clicking it again will toggle it off. Clicking a calendar event will preload it into your own google calendar. The button and events are color coordinated.">
                  <InfoIcon style={{ marginLeft: '10px' }}
                    color="action" />
                </Tooltip>
              </Typography>
              {/* // MenuSidebar Component */}
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