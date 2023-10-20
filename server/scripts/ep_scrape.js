const axios = require("axios");
const cheerio = require("cheerio");
const chrono = require("chrono-node");
const moment = require("moment");
const pool = require("../modules/pool");

// URL of the Emerging Prairie calendar
const EP_url = "https://www.emergingprairie.com/calendar/";

// ep_scrape.js
async function epScrape() {
    axios
        .get(EP_url)
        .then(async (response) => {
            const $ = cheerio.load(response.data);
            const EP_events = [];

            $(".tribe-events-calendar-list__event-details.tribe-common-g-col").each(
                (index, element) => {
                    // Scraping the EP calendar
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
                        date = `${displayStart} 8:00 - 17:00`;
                    }

                    console.log("Raw date string:", date); // Log raw date string

                    const formattedDate = parseEventDate(date);

                    console.log("Formatted date:", formattedDate); // Log formatted date

                    const EP_CalendarBlock = {
                        source: "ep",
                        title: eventHeader,
                        start: formattedDate.start,
                        end: formattedDate.end,
                        description: eventDescription,
                        location: eventLocation,
                        expiration: formattedDate.expiration,
                    };

                    EP_events.push(EP_CalendarBlock);
                }
            );

            // Delete old EP events from the database
            await pool.query(
                `DELETE FROM "calendar" WHERE "source" = 'ep' AND "expiration" <= NOW();`
            );

            // Insert all events into the database
            for (const event of EP_events) {
                await pool.query(
                    `INSERT INTO "calendar" ("source", "title", "start", "end", "description", "location", "expiration")
                VALUES ($1, $2, $3, $4, $5, $6, $7);`,
                    [
                        event.source,
                        event.title,
                        event.start,
                        event.end,
                        event.description,
                        event.location,
                        event.expiration,
                    ]
                );
            }
            console.log("Successfully inserted EP events into the database");
        })
        .catch((error) => {
            console.error("Error scraping EP calendar:", error);
        });
}

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

module.exports = epScrape;
