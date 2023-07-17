const pool = require('./pool');

// function fetches businesses based on stage (parameter) selected
module.exports = function fetchBusinessesByStage(stage) {
    let queryText;
//user selects a business stage here and the stage results/plus the ones that fit under All results show up
    switch(stage) {
      case "Nascent":
      case "Early Stage":
      case "Startup/Seed":
      case "Growth":
        return queryText = '"stage_id" = $1 OR "stage_id" = 1';
      default:  // if no or unknown stage is given, or 'All' is specified, fetch all businesses
      //  return queryText = 'SELECT * FROM "resources" ORDER BY "stage_id";';
    }

    // try {
    //   const { rows } = await pool.query(queryText, [stage]);
    //   return rows;
    // } catch (error) {
    //   console.error(`Error fetching businesses in stage "${stage}"`, error);
    //   throw error;
    // }
};