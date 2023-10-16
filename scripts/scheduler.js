const cron = require('node-cron');
const cefbScrape = require('./cefb_scrape');
const epScrape = require('./ep_scrape');
const fuScrape = require('./fu_scrape');
const chamberScrape = require('./chamber_scrape');

// Schedule scraping scripts to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    console.log('Running scraping scripts every 5 minutes.');
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
});


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