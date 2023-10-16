const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const chrono = require("chrono-node");
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
                    date = `${displayStart} 8:00 - 5:00`;
                }

                const formattedDate = parseEventDate(date);

                const EP_CalendarBlock = {
                    source: "ep",
                    title: eventHeader,
                    start: formattedDate.start,
                    end: formattedDate.end,
                    description: eventDescription,
                    location: eventLocation,
                    expiration: formattedDate.expiration, // Added expiration column
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
                    event.expiration, // Include expiration column in INSERT
                ]
            );
        }
        console.log("Successfully inserted EP events into the database");
    })
    .catch((error) => {
        console.error("Error scraping EP calendar:", error);
    });

const parseEventDate = (displayStart) => {
    displayStart.includes("@") && (displayStart = displayStart.replace("@", ""));
    const dateRangeMatch = displayStart.match(/^(.+) - (.+)$/);
    if (dateRangeMatch) {
        const start = chrono.parseDate(dateRangeMatch[1]);
        let end = chrono.parseDate(dateRangeMatch[2]);
        const now = new Date();
        const today = new Date(now.toDateString());

        if (end.toDateString() === today.toDateString()) {
            end = start;
        }

        if (start && end) {
            const startTimeMatch = dateRangeMatch[1].match(/(\d{1,2}):(\d{2}) (am|pm)/i);
            const endTimeMatch = dateRangeMatch[2].match(/(\d{1,2}):(\d{2}) (am|pm)/i);

            let startHours = 8;
            let startMinutes = 0;
            if (startTimeMatch) {
                startHours = parseInt(startTimeMatch[1]);
                startMinutes = parseInt(startTimeMatch[2]);
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
            }

            const formattedStartTime = moment(start)
                .utcOffset(-5)
                .format(`YYYY-MM-DDTHH:mm:ss.SSSZ`);

            const formattedEndTime = moment(end)
                .utcOffset(-5)
                .format(`YYYY-MM-DDTHH:mm:ss.SSSZ`);


            // Calculate expiration date 12 months from now
            const expiration = moment()
                .add(12, 'months')
                .utcOffset(-5)
                .format(`YYYY-MM-DDTHH:mm:ss.SSSZ`);

            return {
                start: moment(start).utcOffset(-5).format(`YYYY-MM-DDT${formattedStartTime}:00.000`),
                end: moment(end).utcOffset(-5).format(`YYYY-MM-DDT${formattedEndTime}:00.000`),
                expiration, // Include expiration date
            };
        }
    }
};
}

module.exports = epScrape;