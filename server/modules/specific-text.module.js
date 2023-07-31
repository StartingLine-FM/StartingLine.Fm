function specificSearch(variant, bling) {

  let queryText;
  // feeds bling variable in, just so we're not locked into only using $1
  // SIMILARITY takes the column title as the first arg, and the search query as the second arg,
  // returns results according to a similarity threshold between 0 and 1
  if (variant === "text only"){
  queryText =
  `
  WORD_SIMILARITY(${bling}, resource.description) > 0.4
  OR WORD_SIMILARITY(${bling}, resource.name) > 0.4
  OR WORD_SIMILARITY(${bling}, stage.name) > 0.4
  OR WORD_SIMILARITY(${bling}, category.name) > 0.4
  OR WORD_SIMILARITY(${bling}, website) > 0.4
  OR WORD_SIMILARITY(${bling}, email) > 0.4
  OR WORD_SIMILARITY(${bling}, address) > 0.4
  OR WORD_SIMILARITY(${bling}, linkedin) > 0.4
  `;
}
  else if (variant === "combined"){
  queryText = 
  `
  WORD_SIMILARITY(${bling}, resource.description) > 0.4
  OR WORD_SIMILARITY(${bling}, resource.name) > 0.4
  OR WORD_SIMILARITY(${bling}, website) > 0.4
  OR WORD_SIMILARITY(${bling}, email) > 0.4
  OR WORD_SIMILARITY(${bling}, address) > 0.4
  OR WORD_SIMILARITY(${bling}, linkedin) > 0.4
  `;
}

  return queryText;
}

module.exports = specificSearch;
