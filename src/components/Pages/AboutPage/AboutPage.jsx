import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  // style constants
  const titleStyle = { fontWeight: 'bold', marginBottom: '8px' };
  const listItemStyle = { marginTop: '10px' };

  return (
    <Container style={{ marginBottom: '50px' }}>
      <Paper style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6" style={titleStyle}>
          Research and Client Information:
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          Leading the charge at North Dakota State University is Onnolee Nordstrom, the distinguished Ozbun Chair of Entrepreneurship. Nordstrom, with her profound knowledge and dedicated research in entrepreneurship ecosystems, is shaping the future of startups in the Fargo-Moorhead area.
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          Working closely with Nordstrom is Dr. Joshua Marineau, an Associate Professor with a keen interest in organizational behavior, social networks, and interpersonal conflict. Marineau's unique blend of theoretical approaches has made significant contributions to the field.
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          The team also includes Omkar, a research intern at the University. Omkar has been instrumental in building collaborations with local entrepreneurs and CEOs, helping to establish a valuable resource platform for the startup ecosystem.
        </Typography>
        <Typography variant="body1" style={listItemStyle}>
          This dynamic team's work at North Dakota State University is opening new avenues in entrepreneurship and organizational behavior, contributing greatly to the Fargo-Moorhead business realm.
        </Typography>
      </Paper>

      <Paper style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6" style={titleStyle}>
          Project and Team Information:
        </Typography>
        <Typography variant="body1">
          The project was the result of the first-time collaboration of a team comprising Kord Maurer, Eyan Anderson, Sawyer Jensen, and Jack Blonigen. Their collective expertise and shared commitment paved the way for the creation of a startup business ecosystem for North Dakota State University.
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Kord Maurer" secondary="Kord stepped up to the challenge, demonstrating his technical abilities and teamwork skills in his first ever team project. Kord took the lead in developing a robust search filter, crafting an engaging landing page, and managing the presentation of search results. His versatility shone through in his assistance with the ToDo section, his work on the database, and his attention to aesthetic detail in the general styling of the project." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Eyan Anderson" secondary="Eyan navigated his first team project with a steadfast determination and quickly became a core member of the team. He undertook the demanding task of developing the majority of the ToDo section, creating an intuitive and functional tool for users. Eyan also played a significant role in shaping the project's aesthetic, contributing to the general styling and ensuring a visually cohesive and engaging user experience." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sawyer Jensen" secondary="For Sawyer, the project presented an opportunity to delve into team dynamics for the first time, and he embraced it with enthusiasm. He undertook the complex task of learning to scrape data and worked diligently on components of the admin section, contributing to general styling. His notable accomplishment was the implementation of the calendar, a feature that has added great value to the project." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Jack Blonigen" secondary="Jack, despite being new to working in a team, demonstrated strong leadership and technical skills. He successfully handled the primary aspects of the admin section, ensuring a smooth backend functionality. Jack's expertise shone in his work on the calendar features specific to Google and his detailed work on the about section. His general contributions to styling further elevated the overall user experience." />
          </ListItem>
        </List>
        <Typography variant="body1" style={listItemStyle}>
          The foundation built by this first-time team sets the stage for an effective resource platform that could revolutionize the startup ecosystem in the Fargo-Moorhead area. 
        </Typography>
      </Paper>

      <Paper style={{ marginTop: '20px', padding: '20px' }}>
  <Typography variant="h6" style={titleStyle}>
    Coding and Technology Details:
  </Typography>
  <Typography variant="body1">
    The project was built using a wide range of technologies:

    <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px' }}>
      Frontend:
    </Typography>
    <ul>
      <li>React (^18.0.1)</li>
      <li>React-DOM (^18.0.1)</li>
      <li>React-Redux (^7.2.6)</li>
      <li>React-Router-DOM (^5.2.0)</li>
      <li>Redux (^4.1.2)</li>
      <li>Redux-Saga (^1.1.3)</li>
      <li>Redux-Logger (^3.0.6)</li>
      <li>@mui/material (^5.14.0)</li>
      <li>@mui/icons-material (^5.14.1)</li>
      <li>@mui/styles (^5.14.1)</li>
      <li>@emotion/react (^11.11.1)</li>
      <li>@emotion/styled (^11.11.0)</li>
      <li>@fullcalendar/react (^6.1.8)</li>
      <li>@fullcalendar/daygrid (^6.1.8)</li>
      <li>@fullcalendar/interaction (^6.1.8)</li>
      <li>@fullcalendar/list (^6.1.8)</li>
      <li>Bootstrap (^5.3.0)</li>
      <li>Framer-Motion (^10.13.1)</li>
      <li>Axios (^0.21.1)</li>
      <li>Query-string (^8.1.0)</li>
      <li>React-scripts (^5.0.1)</li>
      <li>Prop-types (^15.7.2)</li>
      <li>Date-fns (^2.30.0)</li>
    </ul>

    <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px' }}>
      Backend:
    </Typography>
    <ul>
      <li>Express (^4.17.1)</li>
      <li>PG (^8.5.1)</li>
      <li>Passport (^0.4.1)</li>
      <li>Passport-local (^1.0.0)</li>
      <li>Cookie-session (^2.0.0)</li>
      <li>Bcryptjs (^2.4.3)</li>
      <li>Request (^2.88.2)</li>
      <li>Cheerio (^1.0.0-rc.12)</li>
      <li>Chrono-node (^2.6.4)</li>
      <li>Dotenv (^8.6.0)</li>
    </ul>

    The application runs on Node.js (version 16.x). The project also uses Nodemon (^2.0.4) in the development environment.
    Some of these technologies were used for both frontend and backend.
  </Typography>
</Paper>
    </Container>
  );
};

export default AboutPage;
