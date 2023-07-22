const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios')
const cheerio = require('cheerio');
const moment = require('moment');

const EP_url = 'https://www.emergingprairie.com/calendar/';
const FU_url = 'https://fargounderground.com/events/category/community/business/list/';
const CHAMBER_url = 'https://www.fmwfchamber.com/events/catgid/6?'

const parseEventDate = (eventStart) => {
  const formats = [
    "MMMM D [\\@] h:mm a - h:mm a", // Format for "September 13 @ 4:00 pm - 6:00 pm"
    "MMMM D", // Format for "October 11"
    "MMMM D - MMMM D", // Format for "November 8 - November 10"
    "dddd MMM D, YYYY", // Format for "Tuesday Jul 25, 2023"
  ];

  const parsedDate = moment(eventStart, formats, true); // Parse the date string using moment.js

  if (parsedDate.isValid()) {
    // If the parsed date includes hours and minutes, format it in ISO8601 format
    if (parsedDate.hours() !== 0 || parsedDate.minutes() !== 0) {
      return parsedDate.format(); // Default format is ISO8601
    } else {
      // If the parsed date is an all-day event with no specific time, format it as "YYYY-MM-DD"
      return parsedDate.format('YYYY-MM-DD');
    }
  } else {
    return null; // Return null for invalid date strings
  }
};



router.get('/emerging-prairie', (req, res) => {
  axios.get(EP_url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const EP_events = []; //Scraped Calendar Blocks are pushed into this array.

      $('.tribe-events-calendar-list__event-details.tribe-common-g-col').each((index, element) => { //This is scraping the EP calendar
        const eventHeader = $(element).find('.tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium').text().replace(/\n|\t/g, '');
        const eventStart = $(element).find('.tribe-events-calendar-list__event-datetime').text().replace(/\n|\t/g, '');
        const eventLocation = $(element).find('.tribe-events-calendar-list__event-venue-title.tribe-common-b2--bold').text().replace(/\n|\t/g, '');
        const eventDescription = $(element).find('p').text().replace(/\n|\t/g, '');

        const parsedDate = moment(eventStart); // Parse the date string using moment.js
        const formattedDate = parseEventDate(eventStart); // Use the helper function to parse the date
       
        const EP_CalendarBlock = { //Scraped Data is formatted within this object.
          title: eventHeader,
          start: formattedDate,
          location: eventLocation,
          description: eventDescription,
        };

        EP_events.push(EP_CalendarBlock);
      });

      res.send(EP_events); // Send the scraped events as a response
    })
    .catch((error) => {
      console.log('Error pulling EP calendar', error);
      res.sendStatus(500); 
    });
});



  router.get('/fargo-underground', (req, res) => {
    axios.get(FU_url)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const FU_events = []; //Scraped Calendar Blocks are pushed into this array.
  
        $('.tribe-events-calendar-list__event-details.tribe-common-g-col').each((index, element) => { //This is scraping the FU calendar
          const eventHeader = $(element).find('.tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium').text().replace(/\n|\t/g, '');
          const eventStart = $(element).find('.tribe-events-calendar-list__event-datetime-wrapper.tribe-common-b2').text().replace(/\n|\t/g, '');
          const eventLocation = $(element).find('.tribe-events-calendar-list__event-venue-address').text().replace(/\n|\t/g, '');
          const eventDescription = $(element).find('p').text().replace(/\n|\t/g, '');

          const parsedDate = moment(eventStart); // Parse the date string using moment.js
          const formattedDate = parseEventDate(eventStart); // Use the helper function to parse the date
  
          const FU_CalendarBlock = { //Scraped Data is formatted within this object.
            title: eventHeader,
            start: formattedDate,
            location: eventLocation,
            description: eventDescription,
          };
  
          FU_events.push(FU_CalendarBlock);
        });
  
        res.send(FU_events); // Send the scraped events as a response
      })
      .catch((error) => {
        console.log('Error pulling FU calendar', error);
        res.sendStatus(500); 
      });
  });


  router.get('/chamber', (req, res) => {
    axios.get(CHAMBER_url)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const CHAMBER_events = []; //Scraped Calendar Blocks are pushed into this array.
  
        $('.card-body.gz-events-card-title').each((index, element) => {
            const eventHeader = $(element).find('.card-title.gz-card-title').text().replace(/\s+/g, ' ').trim();
            const eventStart = $(element).find('.list-group-item.gz-card-date').text().replace(/\s+/g, ' ').trim();
            const eventDescription = $(element).find('.card-text.gz-description.gz-events-description').text().replace(/\s+/g, ' ').trim();

            const parsedDate = moment(eventStart); // Parse the date string using moment.js
            const formattedDate = parseEventDate(eventStart); // Use the helper function to parse the date
          
            const CHAMBER_CalendarBlock = {
              title: eventHeader,
              start: formattedDate,
              description: eventDescription,
            };
          
            CHAMBER_events.push(CHAMBER_CalendarBlock);
          });
  
        res.send(CHAMBER_events); // Send the scraped events as a response
      })
      .catch((error) => {
        console.log('Error pulling CHAMBER calendar', error);
        res.sendStatus(500); 
      });
  });



module.exports = router;