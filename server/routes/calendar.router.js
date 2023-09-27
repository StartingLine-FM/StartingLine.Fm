const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const chrono = require("chrono-node");

//These are the urls of the public calendars being scraped.
const EP_url = "https://www.emergingprairie.com/calendar/"; //Emerging Praire 
const FU_url = "https://fargounderground.com/events/category/community/business/list/"; //Fargo Underground
const CHAMBER_url = "https://www.fmwfchamber.com/events/catgid/6?";  //Fargo Moorhead West Fargo Chamber of Commerce
const CEFB_url = "https://ndsu-cefb.com/events/list/"; //NDSU Center for Entrepreneurship and Famiy Business



const parseEventDate = (displayStart) => { //This parses the inconsistent start and end times of the scraped calendars.
  displayStart.includes("@") && (displayStart = displayStart.replace("@", "")); //Remove any stray "@" symbols from input.
  // Check if the date is in range format like "August 1 - August 2"
  const dateRangeMatch = displayStart.match(/^(.+) - (.+)$/);
  if (dateRangeMatch) { //It does this by attempting to date match first.
    //Parse the start and end dates using chrono node library.
    const start = chrono.parseDate(dateRangeMatch[1]);
    let end = chrono.parseDate(dateRangeMatch[2]);
    //Get the current date without the time part for comparison
    const now = new Date;
    const today = new Date(now.toDateString())

    // Check if the end date is missing or contains only the time part
    if (end.toDateString() === today.toDateString()) {
      end = start //set the end date to be the same as the start date
    }
    //These console logs are used to test the conversion ouptuts.
    // console.log('today is coming in as', today);
    // console.log("Start:", start);
    // console.log("End:", end);

    if (start && end) {//extract time information from the input zones
      const startTimeMatch = dateRangeMatch[1].match(/(\d{1,2}):(\d{2}) (am|pm)/i);
      const endTimeMatch = dateRangeMatch[2].match(/(\d{1,2}):(\d{2}) (am|pm)/i);

      //Console log testing for matches below
      // console.log("startTimeMatch:", startTimeMatch);
      // console.log("endTimeMatch:", endTimeMatch);

      //Initialize default start and end hours and minutes
      let startHours = 8;
      let startMinutes = 0;
      if (startTimeMatch) {
        startHours = parseInt(startTimeMatch[1]);
        startMinutes = parseInt(startTimeMatch[2]);
        //If Time information is available, parse and adjust to hours and minutes
        if (startTimeMatch[3].toLowerCase() === "pm" && startHours < 12) {
          startHours += 12;
        }
      }
      let endHours = 17;
      let endMinutes = 0;
      if (endTimeMatch) {
        endHours = parseInt(endTimeMatch[1]);
        endMinutes = parseInt(endTimeMatch[2]);
        if (endTimeMatch[3].toLowerCase() === "pm" && endHours < 12) {
          endHours += 12;
        }
      } //Format the start and end times with seconds as "00"
      const startSeconds = "00";
      const endSeconds = "00";
      const formattedStartTime = `${startHours.toString().padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}:${startSeconds}`;
      const formattedEndTime = `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}:${endSeconds}`;
      console.log("formattedStartTime:", formattedStartTime);
      console.log("formattedEndTime:", formattedEndTime);

      return { // moment applies a five hour UTC offset applies final ISO formatting
        start: moment(start).utcOffset(-5).format(`YYYY-MM-DDT${formattedStartTime}.000`),
        end: moment(end).utcOffset(-5).format(`YYYY-MM-DDT${formattedEndTime}.000`),
      };
    }
  }
}; //END OF PARSING FUNCTION



router.get("/emerging-prairie", (req, res) => {
  axios
    .get(EP_url) //This router scrapes this URL for its calendar data
    .then((response) => {
      const $ = cheerio.load(response.data);
      const EP_events = [];

      $(".tribe-events-calendar-list__event-details.tribe-common-g-col").each(
        (index, element) => {
          //This is Cheerio scraping the EP calendar
          const eventHeader = $(element)
            .find(
              ".tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium"
            )
            .text()
            .replace(/\n|\t/g, "");
          const displayStart = $(element)
            .find(".tribe-event-date-start")
            .text()
            .replace(/\n|\t/g, "");
          const displayTime = $(element)
            .find(".tribe-event-time")
            .text()
            .replace(/\n|\t/g, "");
          const displayEnd = $(element)
            .find(".tribe-event-date-end")
            .text()
            .replace(/\n|\t/g, "");
          const eventLocation = $(element)
            .find(
              ".tribe-events-calendar-list__event-venue-title.tribe-common-b2--bold"
            )
            .text()
            .replace(/\n|\t/g, "");
          const eventDescription = $(element)
            .find("p")
            .text()
            .replace(/\n|\t/g, "");

          let date;

          if (Boolean(displayTime)) {//This boolean checks for all day events, setting them to 8am - 5pm.
            date = `${displayStart} - ${displayTime}`;
          } else if (Boolean(displayEnd)) {
            date = `${displayStart} - ${displayEnd}`;
          } else {
            date = `${displayStart} 8:00 - 5:00`;
          }

          const formattedDate = parseEventDate(date); //here the date is ran through the parse function

          const EP_CalendarBlock = { //All calendar scrapes are consolidated into individual objects
            title: eventHeader,
            start: formattedDate.start,
            end: formattedDate.end,
            date: date,
            location: eventLocation,
            description: eventDescription,
          };

          EP_events.push(EP_CalendarBlock); //calendar objects are filled into this array
        }
      );

      res.send(EP_events); // Send the scraped events as a response
    })
    .catch((error) => {
      console.log("Error pulling EP calendar", error);
      res.sendStatus(500);
    });
});

router.get("/fargo-underground", (req, res) => {
  axios
    .get(FU_url)  //This router scrapes this URL for its calendar data
    .then((response) => {
      const $ = cheerio.load(response.data);
      const FU_events = [];

      $(".tribe-events-calendar-list__event-details.tribe-common-g-col").each(
        (index, element) => {
          //This is Cheerio scraping the FU calendar
          const eventHeader = $(element)
            .find(
              ".tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium"
            )
            .text()
            .replace(/\n|\t/g, "");
          const displayStart = $(element)
            .find(".tribe-event-date-start")
            .text()
            .replace(/\n|\t/g, "");
          const displayTime = $(element)
            .find(".tribe-event-time")
            .text()
            .replace(/\n|\t/g, "");
          const displayEnd = $(element)
            .find(".tribe-event-date-end")
            .text()
            .replace(/\n|\t/g, "");
          const eventLocation = $(element)
            .find(
              ".tribe-events-calendar-list__event-venue-title.tribe-common-b2--bold"
            )
            .text()
            .replace(/\n|\t/g, "");
          const eventDescription = $(element)
            .find("p")
            .text()
            .replace(/\n|\t/g, "");

          let date;

          if (Boolean(displayTime)) { //This boolean checks for all day events, setting them to 8am - 5pm.
            date = `${displayStart} - ${displayTime}`;
          } else if (Boolean(displayEnd)) {
            date = `${displayStart} - ${displayEnd}`;
          } else {
            date = `${displayStart} 8:00 - 5:00`;
          }

          const formattedDate = parseEventDate(date); //here the date is ran through the parse function

          const FU_CalendarBlock = { //All calendar scrapes are consolidated into individual objects
            title: eventHeader,
            start: formattedDate.start,
            end: formattedDate.end,
            location: eventLocation,
            description: eventDescription,
          };

          FU_events.push(FU_CalendarBlock); //calendar objects are filled into this array
        }
      );

      res.send(FU_events); // Send the scraped events as a response
    })
    .catch((error) => {
      console.log("Error pulling FU calendar", error);
      res.sendStatus(500);
    });
});

router.get("/chamber", (req, res) => {
  axios
    .get(CHAMBER_url) //This router scrapes this URL for its calendar data
    .then((response) => {
      const $ = cheerio.load(response.data);
      const CHAMBER_events = [];

      $(".card-body.gz-events-card-title").each((index, element) => {
        //This is cheerio scraping the chamber of commerce calendar
        const eventHeader = $(element)
          .find(".card-title.gz-card-title")
          .text()
          .replace(/\s+/g, " ");
        const eventStart = $(element)
          .find(".list-group-item.gz-card-date span")
          .attr('content');
        const eventEnd = $(element)
          .find(".list-group-item.gz-card-date meta")
          .attr("content");
        const eventDescription = $(element)
          .find(".card-text.gz-description.gz-events-description")
          .text()
          .replace(/\s+/g, " ");

        //This is the only calendar not run through the parse function

        const CHAMBER_CalendarBlock = { //Elements consolidate into a series of objects.
          title: eventHeader,
          start: eventStart,
          end: eventEnd,
          description: eventDescription,
        }
        CHAMBER_events.push(CHAMBER_CalendarBlock); //All objects added to an array.
      });

      res.send(CHAMBER_events); // Send the scraped events as a response
    })
    .catch((error) => {
      console.log("Error pulling CHAMBER calendar", error);
      res.sendStatus(500);
    });
});

router.get("/cefb", (req, res) => {
  axios
    .get(CEFB_url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const CEFB_events = [];

      $(".tribe-events-calendar-list__event-details.tribe-common-g-col").each(
        (index, element) => {
          // Logging to check if each element is being processed
          console.log("Processing element #" + index);

          // Scrape data from the CEFB website
          const eventHeader = $(element)
            .find(".tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium")
            .text()
            .replace(/\s+/g, " ");

          const eventStart = $(element)
            .find(".tribe-event-date-start")
            .text()
            .replace(/\s+/g, " ");

          const eventEnd = $(element)
            .find(".tribe-event-time")
            .text()
            .replace(/\s+/g, " ");

          const eventDescription = $(element)
            .find("p")
            .text()
            .replace(/\s+/g, " ");

          // Logging to check extracted data
          console.log("Event Header:", eventHeader);
          console.log("Event Start:", eventStart);
          console.log("Event End:", eventEnd);
          console.log("Event Description:", eventDescription);

          // Create an object for the event
          const CEFB_CalendarBlock = {
            title: eventHeader,
            start: eventStart,
            end: eventEnd,
            description: eventDescription,
          };

          // Add the event object to the array
          CEFB_events.push(CEFB_CalendarBlock);
        }
      );

      // Logging to check the scraped events
      console.log("CEFB Events:", CEFB_events);

      res.send(CEFB_events); // Send the scraped events as a response
    })
    .catch((error) => {
      // Logging the error
      console.error("Error pulling CEFB calendar:", error);
      res.sendStatus(500);
    });
});

// router.get("/test-cefb", (req, res) => {
//   axios
//     .get(CEFB_url)
//     .then((response) => {
//       const $ = cheerio.load(response.data);

//       // Define the CSS selector for the element you want to scrape
//       const selector = ".tribe-events-calendar-list__event-details.tribe-common-g-col";

//       // Scrape data from a single element
//       const firstElement = $(selector).first();
//       const eventHeader = firstElement
//         .find(".tribe-event-time")
//         .text()
//         .replace(/\s+/g, " ");

//       // Log the extracted data for testing
//       console.log("Event Header:", eventHeader);

//       res.send({ eventHeader }); // Send the scraped data as a response
//     })
//     .catch((error) => {
//       // Log and handle errors
//       console.error("Error scraping CEFB for testing:", error);
//       res.sendStatus(500);
//     });
// });


module.exports = router;