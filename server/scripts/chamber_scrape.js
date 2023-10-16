const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const chrono = require("chrono-node");
const pool = require("../modules/pool");

// URL of the Fargo Moorhead West Fargo Chamber of Commerce calendar
const CHAMBER_url = "https://www.fmwfchamber.com/events/catgid/6?";


// chamber_scrape.js
async function chamberScrape() {
axios
    .get(CHAMBER_url)
    .then(async (response) => {
        const $ = cheerio.load(response.data);
        const CHAMBER_events = [];

        $(".card-body.gz-events-card-title").each((index, element) => {
            // Scraping the Chamber of Commerce calendar
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

            const CHAMBER_CalendarBlock = {
                source: "fmwf",
                title: eventHeader,
                start: eventStart,
                end: eventEnd,
                description: eventDescription,
            };

            CHAMBER_events.push(CHAMBER_CalendarBlock);
        });

        // Delete old Chamber events from the database
        await pool.query(
            `DELETE FROM "calendar" WHERE "source" = 'fmwf' AND "expiration" <= NOW();`
        );

        // Insert all events into the database with an expiration date
        for (const event of CHAMBER_events) {
            const expiration = moment().add(12, 'months').format(`YYYY-MM-DDTHH:mm:ss.SSSZ`);

            await pool.query(
                `INSERT INTO "calendar" ("source", "title", "start", "end", "description", "expiration")
      VALUES ($1, $2, $3, $4, $5, $6);`,
                [
                    event.source,
                    event.title,
                    event.start,
                    event.end,
                    event.description,
                    expiration,
                ]
            );
        }
        console.log("Successfully inserted Chamber events into the database");
    })
    .catch((error) => {
        console.error("Error scraping Chamber calendar:", error);
    });
}

module.exports = chamberScrape;