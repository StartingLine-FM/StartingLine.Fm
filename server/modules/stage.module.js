const pool= require('./pool')

module.exports = async function fetchBusinessesByStage(stage) {
    let query;
  
    switch(stage) {
      case "Nascent":
        query = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Startup (pre-revenue)":
        query = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Startup (post-revenue)":
        query = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Managed growth":
        query = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Aggressive growth":
        query = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Mature":
        query = 'SELECT * FROM stage WHERE name = $1';
        break;
      case "Looking to exit":
        query = 'SELECT * FROM stage WHERE name = $1';
        break;
      default:
        query = 'SELECT * FROM stage';  // if no or unknown stage is given, fetch all businesses
    }
  
    try {
      const { rows } = await pool.query(query, [stage]);
      return rows;
    } catch (error) {
      console.error(`Error fetching businesses in stage "${stage}"`, error);
      throw error;
    }
  };