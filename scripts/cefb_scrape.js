const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const pool = require("../server/modules/pool");

// URL of the CEFB calendar
const CEFB_url = "https://ndsu-cefb.com/events/list/";

axios
  .get(CEFB_url)
  .then(async (response) => {
    const $ = cheerio.load(response.data);
    const CEFB_events = [];

    // Loop through each event element and scrape data
    $(".tribe-events-calendar-list__event-details.tribe-common-g-col").each(
      (index, element) => {

        // Scrape data from the CEFB website
        const eventHeader = $(element)
          .find(
            ".tribe-events-calendar-list__event-title.tribe-common-h6.tribe-common-h4--min-medium"
          )
          .text()
          .replace(/\s+/g, " ");

        // Get the "<time />" element that is always there
        const startingTimeElement = $(element)
          .find("time.tribe-events-calendar-list__event-datetime");
        // Read the date from the datetime attribute
        const startingDate = startingTimeElement.attr("datetime");
        // The starting time always comes after an "@" symbol, as the text in the element looks like "October 20 @ 4:00 pm - 6:00 pm," but isn't always there
        let startingTimeString = startingTimeElement.text().split("@")[1];
        const startingTime = startingTimeString
          ? startingTimeString.split("-")[0].trim()
          : "8:00 am";
        // Get the ending time if there is one
        const endingTimeExists = startingTimeString
          ? startingTimeString.split("-")[1]
          : false;
        const endingTime = endingTimeExists
          ? startingTimeString.split("-")[1].trim()
          : "5:00 pm";

        // Combine the date and time into a single string
        const eventStartMoment = moment(
          `${startingDate} - ${startingTime}`,
          "YYYY-MM-DD - h:mm a"
        );
        const eventStart = eventStartMoment.format("YYYY-MM-DDTHH:mm:ss");
        const eventEnd = moment(
          `${startingDate} - ${endingTime}`,
          "YYYY-MM-DD - h:mm a"
        ).format("YYYY-MM-DDTHH:mm:ss");

        const eventDescription = $(element)
          .find("p")
          .text()
          .replace(/\s+/g, " ");


        // Create an object for the event
        const CEFB_CalendarBlock = {
          source: "cefb",
          title: eventHeader,
          start: eventStart,
          end: eventEnd,
          description: eventDescription,
          expiration: moment().add(12, "months").format("YYYY-MM-DDTHH:mm:ss")
        };

        // Add the event object to an array
        CEFB_events.push(CEFB_CalendarBlock);
      }
    );


    // Delete old CEFB events based on expiration date
    await pool.query(
      `DELETE FROM "calendar" WHERE "source" = 'cefb' AND "expiration" < NOW();`
    );

    // Insert new CEFB events into the database
    for (const event of CEFB_events) {
      await pool.query(
        `INSERT INTO "calendar" ("source", "title", "start", "end", "description", "expiration")
            VALUES ($1, $2, $3, $4, $5, $6);`,
        [event.source, event.title, event.start, event.end, event.description, event.expiration]
      );
    }

    console.log("Successfully updated CEFB events in the database");
  })
  .catch((error) => {
    console.error("Error scraping CEFB calendar:", error);
  });
