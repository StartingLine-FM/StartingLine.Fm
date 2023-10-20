// const cron = require('node-cron');
const cefbScrape = require('./cefb_scrape');
const epScrape = require('./ep_scrape');
const fuScrape = require('./fu_scrape');
const chamberScrape = require('./chamber_scrape');

// // Schedule scraping scripts to run every 5 minutes
// cron.schedule('*/5 * * * *', async () => {
//   console.log('Running scraping scripts every 5 minutes.');
//   omniScrape();
// });


// Function to run all scraping scripts manually
async function omniScrape() {
  try {
    await cefbScrape(); // Call NDSU CEFB scraping script here
    await epScrape(); // Call Emerging Prairie scraping script here
    await fuScrape(); // Call Fargo Underground scraping script here
    await chamberScrape(); // Call FMWF Chamber of Commerce scraping script here
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

if (require.main === module) {
  console.log('scraping manually');
  omniScrape();
}

module.exports = omniScrape;