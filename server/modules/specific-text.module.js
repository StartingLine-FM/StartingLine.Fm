function specificSearch() {

  const queryText = 
  // feeds bling variable in, just so we're not locked into only using $1
  // SIMILARITY takes the column title as the first arg, and the search query as the second arg,
  // returns results according to a similarity threshold between 0 and 1 (> 0.07, in our case)
  `
    SIMILARITY(name, $1) > 0.07
    OR SIMILARITY(website, $1) > 0.07
    OR SIMILARITY(email, $1) > 0.07
    OR SIMILARITY(address, $1) > 0.07
    OR SIMILARITY(linkedin, $1) > 0.07
    OR SIMILARITY(description, $1) > 0.07
  `;

  return queryText;
}

module.exports = specificSearch;
