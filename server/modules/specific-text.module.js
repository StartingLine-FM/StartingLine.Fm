function specificSearch(variant) {

  let queryText;
  // feeds bling variable in, just so we're not locked into only using $1
  // SIMILARITY takes the column title as the first arg, and the search query as the second arg,
  // returns results according to a similarity threshold between 0 and 1
  if (variant === "text only"){
  queryText =
  `
  SIMILARITY(resource.name, $1) > 0.06
  OR SIMILARITY(website, $1) > 0.06
  OR SIMILARITY(email, $1) > 0.06
  OR SIMILARITY(address, $1) > 0.06
  OR SIMILARITY(linkedin, $1) > 0.06
  OR SIMILARITY(resource.description, $1) > 0.06
  OR SIMILARITY(stage.name, $1) > 0.7
  OR SIMILARITY(category.name, $1) > 0.07
  `;
}
  else if (variant === "combined"){
  queryText = 
  `
  SIMILARITY(name, $1) > 0.06
  OR SIMILARITY(website, $1) > 0.06
  OR SIMILARITY(email, $1) > 0.06
  OR SIMILARITY(address, $1) > 0.06
  OR SIMILARITY(linkedin, $1) > 0.06
  OR SIMILARITY(description, $1) > 0.06
  `;
}

  return queryText;
}

module.exports = specificSearch;
