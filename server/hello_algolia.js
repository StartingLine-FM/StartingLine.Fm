const pool = require('./modules/pool');
const algoliasearch = require('algoliasearch');

// Connect and authenticate with your Algolia app
const client = algoliasearch('ALGOLIA_APP_ID', '2123fc835b2954cd49ef43065ab14ba6');

// Create a new index and add records
const index = client.initIndex('test_resources_2');

// SQL query to retrieve data for indexing
const queryText = `
  SELECT
    "resource"."id" AS "objectID",
    "resource"."name",
    "resource"."description",
    "resource"."image_url",
    "resource"."category_id",
    "organization"."name" AS "organization_name",
    "resource"."stage_id",
    "stage"."name" AS "stage_name",
    "resource"."website",
    "resource"."email",
    "resource"."linkedin",
    "resource"."address"
  FROM "resource"
  JOIN "organization" ON "organization"."id" = "resource"."category_id"
  JOIN "stage" ON "stage"."id" = "resource"."stage_id"
`;

pool.query(queryText)
  .then(result => {
    const records = result.rows.map(row => {
      return {
        objectID: `objectID`,
        name: row.name,
        description: row.description,
        image_url: row.image_url,
        category_id: row.category_id,
        organization_name: row.organization_name,
        stage_id: row.stage_id,
        stage_name: row.stage_name,
        website: row.website,
        email: row.email,
        linkedin: row.linkedin,
        address: row.address,
      };
    });

    // Save the records to the Algolia index
    index.saveObjects(records);
    console.log('Data indexed successfully.');
  })
  .catch(err => console.error('Error indexing data:', err));

// Search the index and print the results
index
  .search('')
  .then(({ hits }) => console.log('First search result:', hits[0]))
  .catch(err => console.error('Error searching index:', err));
