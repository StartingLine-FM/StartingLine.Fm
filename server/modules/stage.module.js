const pool = require('./pool');

module.exports = async function fetchBusinessesByStage(stage) {
    let queryText;

    switch(stage) {
      case "Nascent":
        queryText = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Early Stage":
        queryText = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Startup/Seed":
        queryText = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Growth":
        queryText = 'SELECT * FROM stage WHERE name = $1';
        break;
      default:  // if no or unknown stage is given, or 'All' is specified, fetch all businesses
        queryText = 'SELECT * FROM stage';
    }

    try {
      // If stage is 'All', we don't need to pass any parameters to the query
      if (stage === 'All' || stage === undefined || ["Nascent", "Early Stage", "Startup/Seed", "Growth"].indexOf(stage) === -1) {
        const { rows } = await pool.query(queryText);
        return rows;
      } else {
        const { rows } = await pool.query(queryText, [stage]);
        return rows;
      }
    } catch (error) {
      console.error(`Error fetching businesses in stage "${stage}"`, error);
      throw error;
    }
};