// Read the calendar from the CEFB website, parse it, and insert it into our database.

// This script is intended to be run from the command line, not from a web browser.
const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

const pool = require("../server/modules/pool");

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

        // Get the "<time />" element that is always there
        const startingTimeElement = $(element)
        .find("time.tribe-events-calendar-list__event-datetime");
        // Read the date from the datetime attribute
        const startingDate = startingTimeElement.attr("datetime");
        // The starting time always comes afer an "@" symbol, as the text in the element looks like "October 20 @ 4:00 pm - 6:00 pm", but isn't always there
        let startingTimeString = startingTimeElement.text().split("@")[1];
        const startingTime = startingTimeString ? startingTimeString.split('-')[0].trim() : "8:00 am";
        // get the ending time if there is one
        const endingTimeExists = startingTimeString ? startingTimeString.split('-')[1] : false;
        const endingTime = endingTimeExists ? startingTimeString.split('-')[1].trim() : "5:00 pm";

        // Combine the date and time into a single string
        const eventStartMoment = moment(`${startingDate} - ${startingTime}`, "YYYY-MM-DD - h:mm a");
        const eventStart = eventStartMoment.format("YYYY-MM-DDTHH:mm:ss");
        const eventEnd = moment(`${startingDate} - ${endingTime}`, "YYYY-MM-DD - h:mm a").format("YYYY-MM-DDTHH:mm:ss");

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
        date: 'some date',
        title: eventHeader,
        start: eventStart,
        end: eventStartMoment.add(1, "hours").format("YYYY-MM-DDTHH:mm:ss.000"),
        description: eventDescription,
        };

        // Add the event object to the array
        CEFB_events.push(CEFB_CalendarBlock);
    }
    );

    // Logging to check the scraped events
    console.log("CEFB Events:", CEFB_events);
    // insert the events into the database
    pool.query(
    `INSERT INTO "calendar" ("source", "date", "title", "start", "end", "description")
        VALUES ($1, $2, $3, $4, $5, $6);`,
    ["cefb", CEFB_events[0].date, CEFB_events[0].title, CEFB_events[0].start, CEFB_events[0].end, CEFB_events[0].description]
    ).then((result) => {
        console.log("Successfully inserted CEFB events into database");
    }).catch((error) => {
        console.log("Error inserting CEFB events into database:", error);
    });
});