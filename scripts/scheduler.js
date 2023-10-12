const cron = require('node-cron');
const cefbScrape = require('./cefb_scrape'); // Import your scraping scripts
const epScrape = require('./ep_scrape');
const fuScrape = require('./fu_scrape');
const chamberScrape = require('./chamber_scrape');

// Schedule scraping scripts to run from 8 am to 6 pm
for (let hour = 8; hour <= 18; hour++) {
  cron.schedule(`0 ${hour} * * *`, () => {
    console.log(`Running scraping scripts at ${hour}:00`);
    cefbScrape(); // Call NDSU CEFB scraping script here
    epScrape(); // Call Emerging Prairie scraping script here
    fuScrape(); // Call Fargo Undergoundn scraping script here
    chamberScrape(); // Call FMWF Chamber of Commerce scraping script here
  });
}

// Function to run all scraping scripts manually
async function omniScrape() {
    try {
      console.log('Running all scraping scripts manually.');
      await cefbScrape(); // Call NDSU CEFB scraping script
      await epScrape(); // Call Emerging Prairie scraping script
      await fuScrape(); // Call Fargo Underground scraping script
      await chamberScrape(); // Call FMWF Chamber of Commerce scraping script
      console.log('All scraping scripts completed.');
    } catch (error) {
      console.error('Error running scraping scripts:', error);
      if (error.source) {
        console.error(`Error in ${error.source} scraping script:`, error);
      } else {
        console.error('Unknown source of error:', error);
      }
    }
  }
  
  // Uncomment the following line to run the scraping scripts manually
//   omniScrape();