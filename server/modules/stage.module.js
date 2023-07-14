const pool = require('./pool');

module.exports = async function fetchBusinessesByStage(stage) {
    let queryText;

    switch(stage) {
      case "Nascent":
      case "Early Stage":
      case "Startup/Seed":
      case "Growth":
        queryText = 'SELECT * FROM stage WHERE name = $1 OR name = \'All\'';
        break;
      default:  // if no or unknown stage is given, or 'All' is specified, fetch all businesses
        queryText = 'SELECT * FROM stage';
    }

    try {
      const { rows } = await pool.query(queryText, [stage]);
      return rows;
    } catch (error) {
      console.error(`Error fetching businesses in stage "${stage}"`, error);
      throw error;
    }
};