import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const containerStyle = {
    padding: '16px',
    marginTop: '16px',
  };

  const sectionStyle = {
    marginBottom: '24px',
  };

  const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  return (
    <Container style={containerStyle}>
      <div style={sectionStyle}>
        <Typography variant="body1">
          Welcome to StartingLine.FM, the ultimate ecosystem designed to support and empower new startups and businesses in their journey towards success. Our platform aims to connect entrepreneurs with the essential resources they need to take their ventures to the next level, whether it's finding funding opportunities, accessing valuable information, or connecting with relevant support organizations.
        </Typography>
      </div>
      <div style={sectionStyle}>
        <Typography variant="body1" style={titleStyle}>
          Our Vision:
        </Typography>
        <Typography variant="body1">
          At StartingLine.FM, we envision a world where innovative ideas are nurtured, and aspiring entrepreneurs are equipped with the right tools and guidance to turn their visions into reality. We believe that every great idea deserves a chance to thrive, and by fostering a collaborative and supportive community, we can unlock the full potential of countless startups and businesses.
        </Typography>
      </div>
      <div style={sectionStyle}>
        <Typography variant="body1" style={titleStyle}>
          How We Help:
        </Typography>
        <Typography variant="body1">
          Whether you're an aspiring entrepreneur with a nascent idea or an established startup looking for growth opportunities, StartingLine.FM is here to support you. Our platform is continually evolving, driven by feedback from our dynamic community of users. Join us today and become a part of a thriving ecosystem dedicated to empowering startups and businesses across the globe.
        </Typography>
      </div>
      <div style={sectionStyle}>
        <Typography variant="body1" style={titleStyle}>
          Ready to Take Your Business to New Heights?
        </Typography>
        <Typography variant="body1">
          Sign up now and explore the limitless possibilities that StartingLine.FM has to offer. Together, let's shape a brighter future for innovation and entrepreneurship.
        </Typography>
      </div>
      <div style={sectionStyle}>
        <Typography variant="body1" style={titleStyle}>
          Contact Us:
        </Typography>
        <Typography variant="body1">
          If you have any questions or feedback, please don't hesitate to get in touch with our team at [Email Address]. We value your input and are committed to making StartingLine.FM the best platform for startup success. Thank you for being a part of our journey.
        </Typography>
      </div>
    </Container>
  );
}

export default AboutPage;
