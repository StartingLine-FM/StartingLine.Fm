import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

function AboutPage() {
  // style constants
  const titleStyle = { fontWeight: 'bold', marginBottom: '8px' };
  const listItemStyle = { marginTop: '10px' };

  return (
    <Container style={{ marginBottom: '50px' }}>
      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" style={titleStyle} align="center">
          Research and Client Information:
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          Leading the charge at North Dakota State University is Dr. Onnolee Nordstrom, the distinguished Ozbun Chair of Entrepreneurship. Nordstrom, with her profound knowledge and dedicated research in entrepreneurship ecosystems, is shaping the future of startups in the Fargo-Moorhead area.
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          Working closely with Nordstrom is Dr. Joshua Marineau, an Associate Professor with a keen interest in organizational behavior, social networks, and interpersonal conflict. Marineau's unique blend of theoretical approaches has made significant contributions to the field.
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          The team also includes Omkar Jarajapu, a research intern at the University. Omkar has been instrumental in building collaborations with local entrepreneurs and CEOs, helping to establish a valuable resource platform for the startup ecosystem.
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          This dynamic team's work at North Dakota State University is opening new avenues in entrepreneurship and organizational behavior, contributing greatly to the Fargo-Moorhead business realm.
        </Typography>
      </Paper>



      <Paper style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6" style={titleStyle} align="center">
          Jolitz Cohort Information:
        </Typography>
        <Typography variant="body1">
          StartingLine is the result of one of the two client projects executed by Emerging Digital Academy's Jolitz Cohort over the summer of 2023. The original StartingLine team consisted of Kord Maurer, Eyan Anderson, Sawyer Jenson, and Jack Blonigen. The four worked together to create the original MVP, each tackling one of four primary components. Individual contribution include....
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Kord Maurer" secondary="Kord took the lead in developing StartingLine's orginal search input algorithm, crafting and styling an engaging landing page, and managing the presentation of search results into the cards. He also contributed heavily with the ToDo section, database schemas, and his attention to aesthetic detail." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Eyan Anderson" secondary="Eyan undertook the task of developing the majority of the ToDo list feature, creating this intuitive and functional tool for users. Eyan also played a significant role in shaping the project's aesthetic, contributing to the general styling and ensuring a visually cohesive and engaging user experience." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sawyer Jenson" secondary="Sawyer is the madman who did the Calendar feature; learning to web scrape data, apply regex expressions, and timezones; integrating all of it into the react full calendar api. He built and designed the institution side menu and the majority of the calendar feature. He also contributed to the admin page." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Jack Blonigen" secondary="Jack handled the majority of the original admin section, writing most of the back end code, as well as front end forms. Jack also was the one to figure out and implement the google calendar functionality within StartingLine's own calendar. He also contributed greatly to original documentation." />
          </ListItem>
        </List>
        <Typography variant="body1" style={listItemStyle}>
          The foundation built by this first-time team sets the stage for an effective resource platform that could revolutionize the startup ecosystem in the Fargo-Moorhead area.
        </Typography>
      </Paper>



      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" style={titleStyle} align="center">
          Emerging Digital Academy Co-Op Program:
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          In September of 2023, a little over a month after the Jolitz Cohort graduated on August 3rd, the EDA Co-Op program was born. Kord and Sawyer would continue working on the StartingLine application for Dr. Onnolee Nordstrom and Dr. Joshua Marineu.
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          Over the Fall and Winter of 2023 Kord and Sawyer oversaw multiple bug fixes and visual changes including mobile responsiveness. The tag system was overhauled from just two separate tags to the five categories we have now. The Calendar also added its fourth institution, NDSU CEFB which is Dr. Onnolee's Office. The calendar was also changed to do a database cron-job instead of single GET requests that scraped the institution calendars live. The admin page also got a comprehensive facelift. 
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          The most exhaustive and profound addition was the Algolia implementaion, a search handling software seen in applications like Amazon. Our hope is that one day StartingLine will have so many resources to filter through that this will be appreciated and help with rapid scaling.
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          {/* Nothing, write a new paragraph here if you want. */}
        </Typography>
      </Paper>



      <Paper style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6" style={titleStyle} align="center">
          Coding and Technology Details:
        </Typography>
        <Typography variant="body1">
          The project was built using a wide range of technologies:

          <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px' }}>
            Frontend:
          </Typography>
          <ul>
            <li>React</li>
            <li>Redux</li>
            <li>Material UI</li>
            <li>Fullcalendar.io</li>
            <li>Algolia InstantSearch</li>
          </ul>

          <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px' }}>
            Backend:
          </Typography>
          <ul>
            <li>Express</li>
            <li>PostgreSQL</li>
            <li>Passport</li>
            <li>Cheerio</li>
            <li>Chrono-node</li>
            <li>Node.js</li>
          </ul>
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
