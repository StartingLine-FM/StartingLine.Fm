const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios')
const cheerio = require('cheerio');

const EP_url = 'https://www.emergingprairie.com/calendar/';
const FU_url = 'https://fargounderground.com/events/category/community/business/list/';
const CHAMBER_url = 'https://www.fmwfchamber.com/events/catgid/6?'


router.get('/emerging-prairie', (req, res) => {
    axios.get(EP_url)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const EP_events = []; //Scraped Calendar Blocks are pushed into this array.
  
        $('.tribe-events-calendar-list__event-details.tribe-common-g-col').each((index, element) => { //This is scraping the EP calendar
          const eventHeader = $(element).find('.tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium').text().replace(/\n|\t/g, '');
          const eventTime = $(element).find('.tribe-events-calendar-list__event-datetime').text().replace(/\n|\t/g, '');
          const eventLocation = $(element).find('.tribe-events-calendar-list__event-venue-title.tribe-common-b2--bold').text().replace(/\n|\t/g, '');
          const eventDescription = $(element).find('p').text().replace(/\n|\t/g, '');
  
          const EP_CalendarBlock = { //Scraped Data is formatted within this object.
            title: eventHeader,
            time: eventTime,
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
          const eventTime = $(element).find('.tribe-events-calendar-list__event-datetime-wrapper.tribe-common-b2').text().replace(/\n|\t/g, '');
          const eventLocation = $(element).find('.tribe-events-calendar-list__event-venue-address').text().replace(/\n|\t/g, '');
          const eventDescription = $(element).find('p').text().replace(/\n|\t/g, '');
  
          const FU_CalendarBlock = { //Scraped Data is formatted within this object.
            title: eventHeader,
            time: eventTime,
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
            const eventTime = $(element).find('.list-group-item.gz-card-date').text().replace(/\s+/g, ' ').trim();
            const eventDescription = $(element).find('.card-text.gz-description.gz-events-description').text().replace(/\s+/g, ' ').trim();
          
            const CHAMBER_CalendarBlock = {
              title: eventHeader,
              time: eventTime,
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