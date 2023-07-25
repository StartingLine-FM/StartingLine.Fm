const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { parse, isValid, format } = require('date-fns');
const chrono = require("chrono-node");

const EP_url = 'https://www.emergingprairie.com/calendar/';
const FU_url = 'https://fargounderground.com/events/category/community/business/list/';
const CHAMBER_url = 'https://www.fmwfchamber.com/events/catgid/6?'


const parseEventDate = (displayStart) => {
  const parsedDateRange = chrono.parse(displayStart);

  if (parsedDateRange && parsedDateRange.length > 0) {
    const startTime = parsedDateRange[0].start;
    console.log('startTime:', startTime);
    const year = startTime.impliedValues.year.toString().padStart(4, '0');
    const month = startTime.knownValues.month.toString().padStart(2, '0');
    const day = startTime.knownValues.day.toString().padStart(2, '0');
    const hours = startTime.impliedValues.hour.toString().padStart(2, '0');
    const minutes = startTime.impliedValues.minute.toString().padStart(2, '0');
    const seconds = startTime.impliedValues.second.toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    console.log('formatted time is the', formattedTime);
    return `${year}-${month}-${day}T${formattedTime}.000Z`;
  }

  return null;
};


router.get('/emerging-prairie', (req, res) => {
  axios.get(EP_url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const EP_events = [];

      $('.tribe-events-calendar-list__event-details.tribe-common-g-col').each((index, element) => { //This is scraping the EP calendar
        const eventHeader = $(element).find('.tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium').text().replace(/\n|\t/g, '');
        const displayStart = $(element).find('.tribe-events-calendar-list__event-datetime').text().replace(/\n|\t/g, '');
        const eventLocation = $(element).find('.tribe-events-calendar-list__event-venue-title.tribe-common-b2--bold').text().replace(/\n|\t/g, '');
        const eventDescription = $(element).find('p').text().replace(/\n|\t/g, '');
        console.log('displayStart is', displayStart);

        const formattedDate = parseEventDate(displayStart);

        const EP_CalendarBlock = {
          title: eventHeader,
          start: formattedDate,
          displayStart: displayStart,
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
      const FU_events = [];

      $('.tribe-events-calendar-list__event-details.tribe-common-g-col').each((index, element) => { //This is scraping the FU calendar
        const eventHeader = $(element).find('.tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium').text().replace(/\n|\t/g, '');
        const eventStart = $(element).find('.tribe-events-calendar-list__event-datetime-wrapper.tribe-common-b2').text().replace(/\n|\t/g, '');
        const eventLocation = $(element).find('.tribe-events-calendar-list__event-venue-address').text().replace(/\n|\t/g, '');
        const eventDescription = $(element).find('p').text().replace(/\n|\t/g, '');

        const formattedDate = parseEventDate(eventStart); // Use the helper function to parse the date

        const FU_CalendarBlock = {
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
      const CHAMBER_events = [];

      $('.card-body.gz-events-card-title').each((index, element) => {
        const eventHeader = $(element).find('.card-title.gz-card-title').text().replace(/\s+/g, ' ').trim();
        const eventStart = $(element).find('.list-group-item.gz-card-date').text().replace(/\s+/g, ' ').trim();
        const eventDescription = $(element).find('.card-text.gz-description.gz-events-description').text().replace(/\s+/g, ' ').trim();

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
