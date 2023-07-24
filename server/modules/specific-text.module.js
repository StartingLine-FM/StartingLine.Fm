function specificSearch(variant) {

  let queryText;
  // feeds bling variable in, just so we're not locked into only using $1
  // SIMILARITY takes the column title as the first arg, and the search query as the second arg,
  // returns results according to a similarity threshold between 0 and 1
  if (variant === "text only"){
  queryText =
  `
  WORD_SIMILARITY($1, resource.description) > 0.4
  OR WORD_SIMILARITY($1, resource.name) > 0.4
  OR WORD_SIMILARITY($1, stage.name) > 0.4
  OR WORD_SIMILARITY($1, category.name) > 0.4
  OR WORD_SIMILARITY($1, website) > 0.4
  OR WORD_SIMILARITY($1, email) > 0.4
  OR WORD_SIMILARITY($1, address) > 0.4
  OR WORD_SIMILARITY($1, linkedin) > 0.4
  `;
}
  else if (variant === "combined"){
  queryText = 
  `
  WORD_SIMILARITY($1, description) > 0.4
  OR WORD_SIMILARITY($1, name) > 0.4
  OR WORD_SIMILARITY($1, website) > 0.4
  OR WORD_SIMILARITY($1, email) > 0.4
  OR WORD_SIMILARITY($1, address) > 0.4
  OR WORD_SIMILARITY($1, linkedin) > 0.4
  `;
}

  return queryText;
}

module.exports = specificSearch;
