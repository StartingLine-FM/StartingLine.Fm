function specificSearch(searchText, bling) {

  const queryText = 
  // feeds bling variable in, just so we're not locked into only using $1
  // SIMILARITY takes the column title as the first arg, and the search query as the second arg,
  // returns results according to a similarity threshold between 0 and 1 (> 0.07, in our case)
  `
    SIMILARITY(name, ${bling}) > 0.07
    OR SIMILARITY(website, ${bling}) > 0.07
    OR SIMILARITY(email, ${bling}) > 0.07
    OR SIMILARITY(address, ${bling}) > 0.07
    OR SIMILARITY(linkedin, ${bling}) > 0.07
    OR SIMILARITY(description, ${bling}) > 0.07
  `;

  return queryText;
}

module.exports = specificSearch;
