import React from 'react';
import "./CalendarPage.css";
import Calendar from './Calendar';
import MenuSidebar from './MenuSidebar';
import { Grid, Box, Container, Typography, Paper, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const CalendarPage = () => {
  return (
    <Container style={{marginBottom: '50px'}}>
      <Grid container spacing={3}> 
        <Grid item xs={3}> 
          <Paper elevation={3}>
            <Box sx={{ p: 2 }} className='the-sidebar'>
            
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