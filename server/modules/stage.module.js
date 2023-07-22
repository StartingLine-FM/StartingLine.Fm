const pool = require('./pool');

// function fetches businesses based on stage (parameter) selected
module.exports = function fetchBusinessesByStage(stage) {
    let queryText;
//user selects a business stage here and the stage results/plus the ones that fit under All results show up
    switch(stage) {
      case "Nascent":
        return queryText = `"stage_id" = 2 OR "stage_id" = 1`
      case "Early Stage":
        return queryText = `"stage_id" = 3 OR "stage_id" = 1`
      case "Startup/Seed":
        return queryText = `"stage_id" = 4 OR "stage_id" = 1`
      case "Growth":
        return queryText = `"stage_id" = 5 OR "stage_id" = 1`
      default:  // if no or unknown stage is given, or 'All' is specified, fetch all businesses
       return queryText = ''
    }
};