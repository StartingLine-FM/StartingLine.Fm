const pool = require('./modules/pool');
const algoliasearch = require('algoliasearch');

// Connect and authenticate with your Algolia app
const client = algoliasearch('KK1UO0W0NW', '2123fc835b2954cd49ef43065ab14ba6');

// Create a new index and add records
const index = client.initIndex('test_resources_2');

// SQL query to retrieve data for indexing
const queryText = `
  SELECT
  r."id" AS "objectID",
  r."name",
  r."description",
  r."image_url",
  o."name" AS "organization_name",
  s."name" AS "stage_name",
  e."title" AS "entrepreneur_title",
  STRING_AGG("support"."title", ', ') AS "support_titles",
  STRING_AGG("funding"."title", ', ') AS "funding_titles",
  r."website",
  r."email",
  r."address",
  r."linkedin"
FROM "resource" r
LEFT JOIN "organization" o ON o."id" = r."category_id"
LEFT JOIN "stage" s ON s."id" = r."stage_id"
LEFT JOIN "entrepreneur" e ON e."id" = r."entrepreneur_id"
LEFT JOIN "support_join" sj ON r."id" = sj."resource_id"
LEFT JOIN "support" support ON sj."support_id" = support."id"
LEFT JOIN "funding_join" fj ON r."id" = fj."resource_id"
LEFT JOIN "funding" funding ON fj."funding_id" = funding."id"
GROUP BY r."id", o."name", s."name", e."title";
`;

  pool.query(queryText)
      .then(result => index.saveObjects(result.rows))
      
      .catch(err => console.log("Error on algolia saveObjects:", err));

// Search the index and print the results
index
  .search('')
  .then(({ hits }) => console.log('First search result:', hits[0]))
  .catch(err => console.error('Error searching index:', err));
