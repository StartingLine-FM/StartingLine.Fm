const { Pool } = require('pg');

async function specificSearch(searchText) {
  // try {

    // Perform the fuzzy search using the pg_trgm extension
    const queryText = `
          'name' ILIKE '%' || $1 || '%'
          OR 'website' ILIKE '%' || $1 || '%'
          OR 'email' ILIKE '%' || $1 || '%'
          OR 'address' ILIKE '%' || $1 || '%'
          OR 'linkedin' ILIKE '%' || $1 || '%'
          OR 'description' ILIKE '%' || $1 || '%';
      `;
    // const values = [searchText];
    // const result = await client.query(query, values);

    return queryText;
    // } catch (error) {
    //   console.error('Error occurred during specific search:', error);
    //   throw error;
    // }
  }




module.exports = specificSearch;

  "name, website, email. address, linkedin, description"