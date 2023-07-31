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
        <Typography variant="h6" style={titleStyle} align="center">
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
        <Typography variant="h6" style={titleStyle} align="center">
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
        <Typography variant="h6" style={titleStyle} align="center">
          Category and Stage Definitions:
        </Typography>

        <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px' }}>
          Categories:
        </Typography>
        <ul>
          <li>Government: Resources from federal, state, and local governments that can assist startups in various ways.</li>
          <li>Funding: Sources of financial support for startups, including venture capitalists, angel investors, and grant programs.</li>
          <li>University: University-affiliated programs, incubators, or resources that can assist startups.</li>
          <li>Support: Organizations or platforms that offer support to startups, such as mentorship programs, networking organizations, coworking spaces, and incubators.</li>
          <li>Service Provider: Businesses that provide services that startups may need, such as legal services, marketing, business consulting, etc.</li>
          <li>Big Company: Large corporations that might provide partnerships, sponsorships, or resources for startups.</li>
          <li>Research: Research institutions or platforms that can provide startups with market, industry, or technological research.</li>
        </ul>

        <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px' }}>
          Stages:
        </Typography>
        <ul>
          <li>All Stages: Resources that are applicable to startups at any stage in their life cycle.</li>
          <li>Nascent: Resources targeted towards ideas or businesses in the very early stages of development.</li>
          <li>Early: Resources for startups that have begun operations but are still in the early stages of their business life cycle.</li>
          <li>Startup/Seed: Resources for startups that are in the process of developing their product or service and likely looking for seed funding.</li>
          <li>Growth: Resources for startups that have a finished product or service and are looking to scale up their operations.</li>
        </ul>
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
            <li>Framer-Motion</li>
            <li>Axios</li>
            <li>Date-fns</li>
            <li>Moment</li>
          </ul>

          <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px' }}>
            Backend:
          </Typography>
          <ul>
            <li>Express</li>
            <li>PG</li>
            <li>Passport</li>
            <li>Cheerio</li>
            <li>Chrono-node</li>
            <li>Dotenv</li>
            <li>Node.js</li>
          </ul>
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
