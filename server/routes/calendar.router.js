const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

const chrono = require("chrono-node");

const EP_url = "https://www.emergingprairie.com/calendar/";
const FU_url =
  "https://fargounderground.com/events/category/community/business/list/";
const CHAMBER_url = "https://www.fmwfchamber.com/events/catgid/6?";

const parseEventDate = (displayStart) => {
  displayStart.includes("@") && (displayStart = displayStart.replace("@", ""));

  const parsedDateRange = chrono.parse(displayStart);

  if (parsedDateRange && parsedDateRange.length > 0) {
    const startTime = parsedDateRange[0].start;
    const startYear = startTime.impliedValues.year.toString().padStart(4, "0");
    const startMonth = startTime.knownValues.month.toString().padStart(2, "0");
    const startDay = startTime.knownValues.day.toString().padStart(2, "0");
    const startHours = startTime.knownValues.hour
      ? startTime.knownValues.hour.toString().padStart(2, "0")
      : "8";
    const startMinutes = startTime.knownValues.minute
      ? startTime.knownValues.minute.toString().padStart(2, "0")
      : "00";
    const startSeconds = startTime.impliedValues.second
      ? startTime.impliedValues.second.toString().padStart(2, "0")
      : "00";
    const formattedStartTime = `${startHours}:${startMinutes}:${startSeconds}`;

    const endTime = parsedDateRange[0].end;
    const endYear = endTime.impliedValues.year
      ? endTime.impliedValues.year.toString().padStart(4, "0")
      : endTime.knownValues.year.toString().padStart(4, "0");
    const endMonth = endTime.knownValues.month.toString().padStart(2, "0");
    const endDay = endTime.knownValues.day.toString().padStart(2, "0");
    const endHours = endTime.knownValues.hour
      ? endTime.knownValues.hour.toString().padStart(2, "0")
      : "5";
    const endMinutes = endTime.knownValues.minute
      ? endTime.knownValues.minute.toString().padStart(2, "0")
      : "00";
    const endSeconds = endTime.impliedValues.second
      ? endTime.impliedValues.second.toString().padStart(2, "0")
      : "00";
    const formattedEndTime = `${endHours}:${endMinutes}:${endSeconds}`;

    return {
      start: `${startYear}-${startMonth}-${startDay}T${formattedStartTime}.000Z`,
      end: `${endYear}-${endMonth}-${endDay}T${formattedEndTime}.000Z`,
    };
  }

  return null;
};

router.get("/emerging-prairie", (req, res) => {
  axios
    .get(EP_url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const EP_events = [];

      $(".tribe-events-calendar-list__event-details.tribe-common-g-col").each(
        (index, element) => {
          //This is scraping the EP calendar
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

          if (Boolean(displayTime)) {
            date = `${displayStart} - ${displayTime}`;
          } else if (Boolean(displayEnd)) {
            date = `${displayStart} - ${displayEnd}`;
          } else {
            date = `${displayStart} 8:00 - 5:00`;
          }

          const formattedDate = parseEventDate(date);

          const EP_CalendarBlock = {
            title: eventHeader,
            start: formattedDate.start,
            end: formattedDate.end,
            location: eventLocation,
            description: eventDescription,
          };

          EP_events.push(EP_CalendarBlock);
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
    .get(FU_url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const FU_events = [];

      $(".tribe-events-calendar-list__event-details.tribe-common-g-col").each(
        (index, element) => {
          //This is scraping the FU calendar
          const eventHeader = $(element)
            .find(
              ".tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium"
            )
            .text()
            .replace(/\n|\t/g, "");
          const eventStart = $(element)
            .find(
              ".tribe-events-calendar-list__event-datetime-wrapper.tribe-common-b2"
            )
            .text()
            .replace(/\n|\t/g, "");
          const eventLocation = $(element)
            .find(".tribe-events-calendar-list__event-venue-address")
            .text()
            .replace(/\n|\t/g, "");
          const eventDescription = $(element)
            .find("p")
            .text()
            .replace(/\n|\t/g, "");

          const formattedDate = parseEventDate(eventStart); // Use the helper function to parse the date

          const FU_CalendarBlock = {
            title: eventHeader,
            start: formattedDate,
            location: eventLocation,
            description: eventDescription,
          };

          FU_events.push(FU_CalendarBlock);
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
    .get(CHAMBER_url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const CHAMBER_events = [];

      $(".card-body.gz-events-card-title").each((index, element) => {
        const eventHeader = $(element)
          .find(".card-title.gz-card-title")
          .text()
          .replace(/\s+/g, " ")
          .trim();
        const eventStart = $(element)
          .find(".list-group-item.gz-card-date")
          .text()
          .replace(/\s+/g, " ")
          .trim();
        const eventDescription = $(element)
          .find(".card-text.gz-description.gz-events-description")
          .text()
          .replace(/\s+/g, " ")
          .trim();

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
      console.log("Error pulling CHAMBER calendar", error);
      res.sendStatus(500);
    });
});

module.exports = router;